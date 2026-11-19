import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "Subscription confirmed", robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Launch list" title={<>Thank you.<br /><span className="display-italic text-ink">You are on the list.</span></>} lede="Your email address is confirmed. We will be in touch as soon as there is news about ELORA DAY." />
      <div className="frame pb-28">
        <LinkButton href="/produkte/elora-day/" arrow>
          View ELORA DAY
        </LinkButton>
      </div>
    </>
  );
}
