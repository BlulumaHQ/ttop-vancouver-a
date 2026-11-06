import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/contact";
import { localizedHead } from "@/lib/i18n";

export const Route = createFileRoute("/zh-cn/contact")({
  component: ContactPage,
  head: () => localizedHead("zh-CN", "/contact", "Contact | TTOP Chicken", "Get in touch with TTOP Chicken — Taiwanese bentos and chicken pot in Richmond, BC. Visit us at 223-13986 Cambie Road, or call 604-285-8867."),
});
