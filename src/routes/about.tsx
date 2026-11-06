import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/about";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => localizedHead("en", "/about", "About TTOP Chicken — Our Story | TTOP Chicken", "A love letter to the people who raised us. The Lee brothers — Albert & Eric — bring three generations of Taiwanese family cooking to Richmond, BC through TTOP Chicken."),
});
