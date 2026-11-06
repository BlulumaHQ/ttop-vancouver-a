import { createFileRoute } from "@tanstack/react-router";
import { MontessoriPage } from "@/components/pages/montessori";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/zh-cn/montessori")({
  component: MontessoriPage,
  head: () => localizedHead("zh-CN", "/montessori", "Montessori Daily Meals | TTOP Chicken", "Daily meal service for Montessori and daycares in Greater Vancouver. Balanced nutrition, bite-sized portions, quiet delivery — designed to fit a prepared environment."),
});
