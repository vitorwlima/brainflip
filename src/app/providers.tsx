"use client";

import type { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null;

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  if (!convexClient) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_CONVEX_URL is not set. Convex features are disabled."
      );
    }
    return children;
  }

  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
};

export default Providers;

