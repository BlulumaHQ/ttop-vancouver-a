import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/frozezn-foods")({
  component: () => <Navigate to="/frozen-foods" replace />,
});