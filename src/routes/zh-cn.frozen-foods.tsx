import { createFileRoute } from "@tanstack/react-router";
import { FrozenFoodsPage } from "@/components/pages/frozen-foods";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/zh-cn/frozen-foods")({
  component: FrozenFoodsPage,
  head: () => localizedHead("zh-CN", "/frozen-foods", "Formosa Chef-Pacs | TTOP Chicken", "TTOP at Home — restaurant dishes vacuum-packed and frozen the day they're cooked. Chicken pot, beef noodle, LOBA sauce and more, available in Richmond, BC."),
});
