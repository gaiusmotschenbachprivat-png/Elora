import { LinkButton } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";

export default function NotFound() {
  return (
    <>
      <PageIntro eyebrow="404" title={<>This page<br />does not exist.</>} lede="It may have moved. You will find everything important on the home page." />
      <div className="frame pb-28">
        <LinkButton href="/" arrow>
          Back to home
        </LinkButton>
      </div>
    </>
  );
}
