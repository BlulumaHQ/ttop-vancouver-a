import { createFileRoute } from "@tanstack/react-router";
import { ChuChuBarPage } from "@/components/pages/chuchu-bar";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/zh-tw/chuchu-bar")({
  component: ChuChuBarPage,
  head: () => localizedHead("zh-TW", "/chuchu-bar", "ChuChu Bar — Drinks & Vinegar Cubes | TTOP Chicken", "ChuChu Bar at TTOP Chicken — fresh-brewed signature milk tea, dark plum juice, pomelo tea and our natural vinegar cube drinks in Richmond, BC."),
});
