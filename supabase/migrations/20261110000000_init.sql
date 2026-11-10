-- =====================================================================
-- ELORA – Datenbankschema (Supabase / PostgreSQL)
-- Sicherheitsprinzip: Row Level Security (RLS) ist auf allen Tabellen aktiv.
-- Öffentlich lesbar sind nur Produkt- und Versanddaten. Bestellungen,
-- Gutscheine und Launch-Registrierungen werden ausschließlich über Edge
-- Functions mit dem Service-Role-Key geschrieben.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Produkte & Varianten (zentrale Produktverwaltung)
-- ---------------------------------------------------------------------
create table public.products (
  id          text primary key,
  name        text not null,
  -- Verkaufsmodus: launch = Vormerkung, preorder = bezahlte Vorbestellung, sale = Verkauf
  sales_mode  text not null default 'launch' check (sales_mode in ('launch', 'preorder', 'sale')),
  status      text not null default 'in-development' check (status in ('in-development', 'available', 'archived')),
  preorder_delivery_note text,
  active      boolean not null default true,
  updated_at  timestamptz not null default now()
);

create table public.product_variants (
  id               text primary key,
  product_id       text not null references public.products(id) on delete cascade,
  name             text not null,
  sku              text unique,
  servings         text,
  price_cents      integer check (price_cents is null or price_cents > 0),
  net_weight_grams integer check (net_weight_grams is null or net_weight_grams > 0),
  stock            integer check (stock is null or stock >= 0),
  tax_rate         numeric(4,2) not null default 7.00,  -- vor Launch steuerlich prüfen
  active           boolean not null default true,
  updated_at       timestamptz not null default now()
);

create table public.shipping_methods (
  id            text primary key,
  label         text not null,
  price_cents   integer check (price_cents is null or price_cents >= 0),
  free_from_cents integer,
  countries     text[] not null default array['DE'],
  delivery_note text,
  active        boolean not null default true
);

-- ---------------------------------------------------------------------
-- Kund*innen
-- ---------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text,
  last_name   text,
  updated_at  timestamptz not null default now()
);

create table public.addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  first_name  text not null,
  last_name   text not null,
  street      text not null,
  addition    text,
  zip         text not null,
  city        text not null,
  country     text not null default 'DE' check (country in ('DE', 'AT')),
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);
create index addresses_user_idx on public.addresses(user_id);

-- Profil automatisch bei Registrierung anlegen
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name')
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- Gutscheine
-- ---------------------------------------------------------------------
create table public.coupons (
  code            text primary key,
  kind            text not null check (kind in ('percent', 'fixed')),
  value           integer not null check (value > 0),   -- Prozent oder Cent
  min_subtotal_cents integer,
  valid_from      timestamptz,
  valid_until     timestamptz,
  max_redemptions integer,
  redemptions     integer not null default 0,
  active          boolean not null default true
);

-- ---------------------------------------------------------------------
-- Bestellungen
-- ---------------------------------------------------------------------
create sequence public.order_number_seq start 10001;

create table public.orders (
  id                uuid primary key default gen_random_uuid(),
  number            text not null unique default ('EL-' || nextval('public.order_number_seq')),
  user_id           uuid references auth.users(id) on delete set null,
  email             text not null,
  kind              text not null check (kind in ('order', 'preorder')),
  status            text not null default 'pending_payment'
                    check (status in ('pending_payment', 'paid', 'fulfilled', 'cancelled', 'refunded')),
  shipping_address  jsonb not null,
  billing_address   jsonb not null,
  shipping_method   text not null references public.shipping_methods(id),
  coupon_code       text references public.coupons(code),
  subtotal_cents    integer not null,
  discount_cents    integer not null default 0,
  shipping_cents    integer not null,
  total_cents       integer not null,
  currency          text not null default 'EUR',
  stripe_session_id text unique,
  stripe_payment_intent text,
  terms_accepted_at timestamptz not null,
  paid_at           timestamptz,
  created_at        timestamptz not null default now()
);
create index orders_user_idx on public.orders(user_id);

create table public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  variant_id  text not null references public.product_variants(id),
  name        text not null,
  qty         integer not null check (qty > 0),
  unit_cents  integer not null,
  line_cents  integer not null
);
create index order_items_order_idx on public.order_items(order_id);

-- Bestand atomar reduzieren (nur aus der Edge Function aufrufbar)
create or replace function public.decrement_stock(p_variant text, p_qty integer) returns void
language sql security definer set search_path = public as $$
  update public.product_variants set stock = greatest(stock - p_qty, 0)
  where id = p_variant and stock is not null;
$$;
revoke execute on function public.decrement_stock(text, integer) from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- Launch-Registrierung / Newsletter (Einwilligungsnachweis)
-- ---------------------------------------------------------------------
create table public.launch_signups (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  list          text not null check (list in ('launch', 'newsletter')),
  product_id    text references public.products(id),
  consent_text  text not null,
  consent_at    timestamptz not null default now(),
  status        text not null default 'pending_confirmation' check (status in ('pending_confirmation', 'confirmed', 'unsubscribed')),
  created_at    timestamptz not null default now(),
  unique (email, list)
);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.products         enable row level security;
alter table public.product_variants enable row level security;
alter table public.shipping_methods enable row level security;
alter table public.profiles         enable row level security;
alter table public.addresses        enable row level security;
alter table public.coupons          enable row level security;
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;
alter table public.launch_signups   enable row level security;

-- Öffentlich lesbar: aktive Produkte, Varianten, Versandarten
create policy "products are public" on public.products for select using (active);
create policy "variants are public" on public.product_variants for select using (active);
create policy "shipping is public"  on public.shipping_methods for select using (active);

-- Eigene Profile
create policy "own profile read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- Eigene Adressen
create policy "own addresses read"   on public.addresses for select using (auth.uid() = user_id);
create policy "own addresses insert" on public.addresses for insert with check (auth.uid() = user_id);
create policy "own addresses update" on public.addresses for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own addresses delete" on public.addresses for delete using (auth.uid() = user_id);

-- Eigene Bestellungen nur lesen (Schreiben ausschließlich serverseitig)
create policy "own orders read" on public.orders for select using (auth.uid() = user_id);
create policy "own order items read" on public.order_items for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- coupons, launch_signups: keine Policies → für anon/authenticated nicht zugänglich

-- ---------------------------------------------------------------------
-- Startdaten: ELORA DAY im Launch-Modus, ohne Preis (noch nicht festgelegt)
-- ---------------------------------------------------------------------
insert into public.products (id, name, sales_mode, status) values ('elora-day', 'ELORA DAY', 'launch', 'in-development');
insert into public.product_variants (id, product_id, name, servings) values ('elora-day-30', 'elora-day', 'Dose', 'ca. 30 Portionen');
insert into public.shipping_methods (id, label, countries, delivery_note) values ('standard', 'Standardversand', array['DE','AT'], null);
