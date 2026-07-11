import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us-3")({
  component: () => <Navigate to="/about" replace />,
});