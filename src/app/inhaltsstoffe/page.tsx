import type { Metadata } from "next";
import { IngredientIndex } from "@/components/home/IngredientIndex";
import { Join } from "@/components/home/Join";

export const metadata: Metadata = {
  title: "Inhaltsstoffe",
  description: "Die geplanten Inhaltsstoffe von ELORA DAY: Kalium, Magnesium, Natrium, Vitamin C und optional Vitamin B12 – sachlich erklärt.",
};

export default function Page() {
  return (
    <div className="pt-12 lg:pt-16">
      <IngredientIndex detailed headingLevel={1} />
      <Join />
    </div>
  );
}
