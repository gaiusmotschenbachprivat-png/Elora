import { LinkButton } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";

export default function NotFound() {
  return (
    <>
      <PageIntro eyebrow="404" title={<>Diese Seite gibt es <em className="display-italic">nicht.</em></>} lede="Vielleicht wurde sie verschoben. Auf der Startseite findest du alles Wichtige." />
      <div className="frame pb-28">
        <LinkButton href="/" arrow>
          Zur Startseite
        </LinkButton>
      </div>
    </>
  );
}
