import type { Metadata } from "next";
import { IngredientIndex } from "@/components/home/IngredientIndex";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "The planned ingredients of ELORA DAY – potassium, magnesium, sodium, vitamin C and optionally vitamin B12 – explained factually.",
};

export default function Page() {
  return (
    <div className="pt-16 lg:pt-20">
      <IngredientIndex detailed headingLevel={1} />
      <Newsletter />
    </div>
  );
}
