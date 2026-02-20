import { SITE_URL } from "@/utils/constants";
import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/contact",
  "/blog",
  "/signup",
  "/verify-email",
  "/activate-account",
  "/approve-employee",
  "/login",
  "/forgot-password",
  "/reset-password",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route === "" ? "/" : route}`,
    lastModified: new Date(),
  }));
}
