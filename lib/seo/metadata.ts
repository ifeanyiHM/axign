import { SITE_NAME, SITE_URL } from "@/utils/constants";
import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: SITE_NAME,
  description:
    "Role-based dashboards for modern organizations. Manage tasks, employees, and performance seamlessly.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description:
      "All-in-one task management platform for modern organizations.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "All-in-one task management platform for modern organizations.",
    images: ["/og-image.jpg"],
  },
};
