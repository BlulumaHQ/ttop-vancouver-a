import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/components/pages/menu";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => localizedHead("en", "/menu", "Menu | TTOP Chicken", "TTOP Chicken menu — signature Hua Diao chicken pot, Taiwanese bentos, rice bowls, street food and frozen cooked foods. Photo menu for browsing; order online for pickup or delivery in Richmond, BC."),
});
