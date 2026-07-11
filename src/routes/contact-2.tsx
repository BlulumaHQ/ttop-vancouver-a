import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-2")({
  component: () => <Navigate to="/contact" replace />,
});