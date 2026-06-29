import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

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
      {
        title:
          "Corrugated Box Manufacturer & Supplier in Dharuhera | Mohit Packaging Industries",
      },
      {
        name: "description",
        content:
          "ISO 9001:2008 certified manufacturer of 3/5/7 ply corrugated boxes, die cut boxes, sheets, wooden pallets and edge protectors. Bulk supply across India since 2008.",
      },
      { name: "theme-color", content: "#F5F1E8" },
      {
        property: "og:title",
        content:
          "Corrugated Box Manufacturer & Supplier Since 2008 | Mohit Packaging Industries",
      },
      {
        property: "og:description",
        content:
          "Custom corrugated boxes, sheets, wooden pallets and industrial packaging for bulk supply across India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mohit Packaging Industries" },
      { title: "MOHIT PACKAGING INDUSTRIES" },
      { property: "og:title", content: "MOHIT PACKAGING INDUSTRIES" },
      { name: "twitter:title", content: "MOHIT PACKAGING INDUSTRIES" },
      { name: "description", content: "A premium B2B website for Mohit Packaging Industries, showcasing corrugated packaging solutions." },
      { property: "og:description", content: "A premium B2B website for Mohit Packaging Industries, showcasing corrugated packaging solutions." },
      { name: "twitter:description", content: "A premium B2B website for Mohit Packaging Industries, showcasing corrugated packaging solutions." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/JakCj6WikVOR47W4rOTKRtVfN883/social-images/social-1780486649076-ChatGPT_Image_Jun_2,_2026,_05_00_36_PM__002.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/JakCj6WikVOR47W4rOTKRtVfN883/social-images/social-1780486649076-ChatGPT_Image_Jun_2,_2026,_05_00_36_PM__002.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Mohit Packaging Industries",
          foundingDate: "2008",
          description:
            "ISO 9001:2008 certified manufacturer and supplier of corrugated boxes, die cut boxes, corrugated sheets, wooden pallets, wooden boxes and edge protectors.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Vill. Akera, Narayan Vihar",
            addressLocality: "Dharuhera",
            addressRegion: "Haryana",
            postalCode: "123106",
            addressCountry: "IN",
          },
          areaServed: "IN",
          telephone: "+91-98111-56482",
          email: "mohitpackaging96@gmail.com",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Industrial Packaging",
            itemListElement: [
              "3 Ply Corrugated Boxes",
              "5 Ply Corrugated Boxes",
              "7 Ply Corrugated Boxes",
              "Printed Corrugated Boxes",
              "Industrial Corrugated Boxes",
              "Die Cut Folding Boxes",
              "Plain Die Cut Boxes",
              "Corrugated Sheets",
              "Corrugated Rolls",
              "Wooden Pallets",
              "Wooden Boxes",
              "Edge Protectors",
            ].map((n) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Product", name: n },
            })),
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: React.ReactNode }) {
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

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
