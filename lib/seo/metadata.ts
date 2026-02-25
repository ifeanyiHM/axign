import { SITE_NAME, SITE_URL } from "@/utils/constants";
import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: `${SITE_NAME} – Assign, Track, Drive Team Performance Efficiently.`,
  description:
    "Axign is a comprehensive platform that helps modern organizations assign tasks, track progress, and enhance employee performance efficiently.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${SITE_NAME} – Assign, Track, Drive Team Performance Efficiently.`,
    description:
      "Axign is a comprehensive platform that helps modern organizations assign tasks, track progress, and enhance employee performance efficiently.",
    url: SITE_URL,
    siteName: `${SITE_NAME} – Assign, Track, Drive Team Performance Efficiently.`,
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Assign, Track, Drive Team Performance Efficiently.`,
    description:
      "Axign is a comprehensive platform that helps modern organizations assign tasks, track progress, and enhance employee performance efficiently.",
    images: ["/og-image.jpg"],
  },
};

// align the logo and header with the desktop showing the chat and make the header a little smaller and use a different font
