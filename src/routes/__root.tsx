import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TopBar } from "@/components/site/TopBar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] flex-col">
      <div className="flex flex-1 items-center justify-center bg-[#faf6ef] px-5 py-24">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-[#1d418f]">404</h1>
          <p className="mt-4 text-base text-[#17233f]/70">
            The page you're looking for doesn't exist. Try the menu or head home.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/" className="inline-flex items-center rounded-sm border border-[#1d418f] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#1d418f] hover:bg-[#1d418f] hover:text-white">Home</a>
            <a href="/menu" className="inline-flex items-center rounded-sm bg-[#ca3134] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#a5262a]">View Menu</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Taiwanese Bento & Chicken Pot in Richmond, BC | TTOP Chicken" },
      { name: "description", content: "Taiwan Taipei Original Pot serves authentic Taiwanese chicken pot, bentos and street snacks in Richmond, BC — dine in, order online, take home frozen cooked foods, or book our school hot-lunch and Montessori meal programs." },
      { name: "author", content: "TTOP Chicken" },
      { property: "og:site_name", content: "TTOP Chicken" },
      { property: "og:title", content: "Taiwanese Bento & Chicken Pot in Richmond, BC | TTOP Chicken" },
      { property: "og:description", content: "Authentic Taiwanese chicken pot, bentos and street snacks in Richmond, BC." },
      { property: "og:locale", content: "en_CA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Noto+Serif+TC:wght@400;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-white">
        <TopBar />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
