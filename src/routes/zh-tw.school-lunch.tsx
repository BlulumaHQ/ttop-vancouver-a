import { createFileRoute } from "@tanstack/react-router";
import { SchoolLunchPage } from "@/components/pages/school-lunch";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/zh-tw/school-lunch")({
  component: SchoolLunchPage,
  head: () => localizedHead("zh-TW", "/school-lunch", "School Hot Lunch Program | TTOP Chicken", "Nutritious hot lunch for elementary schools across Greater Vancouver. Class-sorted delivery, on-time guaranteed, peanut-free and nut-free menu. Book a consultation with TTOP Chicken."),
});
