import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/pages/index";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/zh-tw/")({
  component: Home,
  head: () => localizedHead("zh-TW", "/", "Taiwanese Bento & Chicken Pot in Richmond, BC | TTOP Chicken", "Authentic Taiwanese chicken pot, bentos and street snacks in Richmond, BC."),
});
