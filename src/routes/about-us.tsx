import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: () => <Navigate to="/about" replace />,
});