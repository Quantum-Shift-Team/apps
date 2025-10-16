import { MainLayout } from "@/components/layout/MainLayout";
import { PaybackCalculator } from "../PaybackCalculator";

export default function CalculatorPage() {
  return (
    <MainLayout fixedHeight={true}>
      <PaybackCalculator />
    </MainLayout>
  );
}
