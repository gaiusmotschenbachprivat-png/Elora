/**
 * Central content for ELORA DAY.
 *
 * IMPORTANT: formulation, amounts, raw material forms and labelling are in
 * development. Values in square brackets are placeholders and must be replaced
 * with verified data (incl. legal review) before publication.
 *
 * Health claims are quoted verbatim from the EU Register of authorised claims
 * (Regulation (EU) No 432/2012). They may only be used if the final formulation
 * meets the conditions of use (as a rule at least 15 % NRV per serving).
 */

export type Ingredient = {
  symbol: string;
  group: "Electrolyte" | "Vitamin";
  name: string;
  optional?: boolean;
  role: string;
  claims: string[];
  note?: string;
};

export const ingredients: Ingredient[] = [
  {
    symbol: "K",
    group: "Electrolyte",
    name: "Potassium",
    role: "A mineral and one of the body’s main electrolytes.",
    claims: ["Potassium contributes to the maintenance of normal blood pressure.", "Potassium contributes to normal muscle function."],
  },
  {
    symbol: "Mg",
    group: "Electrolyte",
    name: "Magnesium",
    role: "A mineral involved in many processes in the body.",
    claims: ["Magnesium contributes to electrolyte balance.", "Magnesium contributes to the reduction of tiredness and fatigue."],
  },
  {
    symbol: "Na",
    group: "Electrolyte",
    name: "Sodium",
    role: "A mineral and electrolyte that occurs naturally in many foods.",
    claims: [],
    note: "There is no authorised health claim for sodium, so we deliberately make no claims about it.",
  },
  {
    symbol: "C",
    group: "Vitamin",
    name: "Vitamin C",
    role: "A water-soluble vitamin, classically associated with citrus fruit.",
    claims: ["Vitamin C contributes to the normal function of the immune system.", "Vitamin C contributes to the reduction of tiredness and fatigue."],
  },
  {
    symbol: "B12",
    group: "Vitamin",
    name: "Vitamin B12",
    optional: true,
    role: "A water-soluble vitamin. Whether it becomes part of the final formulation is still open.",
    claims: ["Vitamin B12 contributes to normal energy-yielding metabolism."],
  },
];

export type FaqItem = {
  q: string;
  /** "fixed" = confirmed principle, "preliminary" = may change, "planned" = intention */
  status: "fixed" | "preliminary" | "planned";
  a: string[];
};

export const faq: FaqItem[] = [
  {
    q: "What is ELORA DAY?",
    status: "fixed",
    a: [
      "ELORA DAY is the first product from ELORA: a citrus ginger drink powder that you mix with water, designed for your morning ritual. It combines selected electrolytes and micronutrients.",
      "The product is currently in development and not yet available.",
    ],
  },
  {
    q: "Which ingredients does it contain?",
    status: "preliminary",
    a: [
      "Planned are the electrolytes potassium, magnesium and sodium, plus vitamin C. Whether vitamin B12 will be included is still open. For the flavour we use citrus with a gentle note of ginger.",
      "The final formulation, amounts and raw material forms are in development. As soon as they are confirmed, we will publish the full ingredient list and nutrition table.",
    ],
  },
  {
    q: "Does ELORA DAY contain caffeine?",
    status: "fixed",
    a: ["No. ELORA DAY is developed without caffeine and without taurine. We also avoid unnecessary artificial additives."],
  },
  {
    q: "How do I prepare it?",
    status: "preliminary",
    a: [
      "Prepare a glass of cold water, add one serving of ELORA DAY and stir.",
      "Serving size and the recommended amount of water will be set with the final formulation: [— g] in [— ml] water.",
    ],
  },
  {
    q: "Who is it for?",
    status: "preliminary",
    a: [
      "ELORA DAY is intended for adults who want to begin their day with intention and complement their everyday diet in a simple way.",
      "Specific recommendations and notices – for example during pregnancy, breastfeeding or when taking medication – will be set with the final labelling. If in doubt, please ask your doctor.",
    ],
  },
  {
    q: "When will ELORA DAY be available?",
    status: "planned",
    a: ["The launch is currently planned for spring 2027. Join the launch list and we will let you know – with no obligation."],
  },
  {
    q: "Can I already buy or pre-order?",
    status: "fixed",
    a: [
      "Not yet. As long as formulation, price, delivery terms and all legal information are not final, no order is possible – including paid pre-orders. You can join the launch list without obligation.",
    ],
  },
  {
    q: "How many servings are in one pack?",
    status: "preliminary",
    a: ["The number of servings per pack has not been finalised yet. Fill quantity and packaging format will be confirmed with the final formulation."],
  },
];

export const faqStatusLabel: Record<FaqItem["status"], string> = {
  fixed: "Confirmed",
  preliminary: "Preliminary",
  planned: "Planned",
};

/** Transparency record: what is confirmed and what is still in progress. */
export type ProtocolEntry = { area: string; commitment: string; status: "fixed" | "in-progress" | "before-launch" };

export const protocol: ProtocolEntry[] = [
  {
    area: "Raw materials",
    commitment: "Each raw material is selected for quality, origin and suitability. Raw material forms will be disclosed with the final formulation.",
    status: "in-progress",
  },
  {
    area: "Formulation",
    commitment: "A short ingredient list. Every ingredient has to earn its place – without caffeine, without taurine, without unnecessary additives.",
    status: "fixed",
  },
  {
    area: "Quality controls",
    commitment: "Type and scope of controls are being defined with our manufacturing partner. We publish results only once they exist.",
    status: "before-launch",
  },
  {
    area: "Transparency",
    commitment: "Ingredients, amounts per serving and reference intakes will be listed in full on the product page as soon as they are final.",
    status: "before-launch",
  },
  {
    area: "Responsible claims",
    commitment: "Health-related statements only within the authorised EU claims – and only if the formulation meets the conditions.",
    status: "fixed",
  },
];

export const protocolStatus: Record<ProtocolEntry["status"], string> = {
  fixed: "Confirmed",
  "in-progress": "In progress",
  "before-launch": "Before launch",
};

/** Morning ritual – three steps (a real sequence). */
export const ritual = [
  { n: "01", title: "Prepare", text: "Prepare your glass of water.", image: "ritual-prepare", alt: "Concept visualisation: a glass of clear water on a light wooden board in morning light" },
  { n: "02", title: "Mix", text: "Add ELORA DAY and stir.", image: "ritual-mix", alt: "Concept visualisation: drink powder in a ceramic dish, a wooden spoon and a glass on linen" },
  { n: "03", title: "Begin", text: "Enjoy your daily morning ritual.", image: "ritual-begin", alt: "Concept visualisation: a glass of ELORA DAY with ice next to a halved citrus fruit" },
] as const;
