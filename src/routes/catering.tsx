import { createFileRoute } from "@tanstack/react-router";
import { CateringPage } from "@/components/pages/catering";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/catering")({
  component: CateringPage,
  head: () => localizedHead("en", "/catering", "Catering & Group Orders | TTOP Chicken", "Bentos, chicken pots and Taiwanese street snacks for your team or event. Companies and groups welcome — please give us one week's notice for large orders."),
});
