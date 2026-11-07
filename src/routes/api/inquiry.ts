import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/inquiry")({ server: { handlers: {
  POST: async ({ request }) => { const { handleInquiry } = await import("@/lib/inquiry.server"); return handleInquiry(request); },
} } });
