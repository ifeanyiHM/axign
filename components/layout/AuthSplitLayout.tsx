import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

type AuthSplitLayoutProps = {
  heroImage: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  header?: React.ReactNode;
  headerActions?: React.ReactNode;
  form: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export const AuthSplitLayout = ({
  heroImage,
  title,
  subtitle,
  eyebrow,
  header,
  headerActions,
  form,
  aside,
  footer,
  className,
}: AuthSplitLayoutProps) => {
  const showIntro = Boolean(title || subtitle || eyebrow);
  const showHeaderActions = Boolean(headerActions);

  return (
    <div className={cn("min-h-screen bg-white", className)}>
      <div className="grid min-h-screen w-full lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)]">
        <section className="flex w-full bg-white">
          <div className="flex min-h-screen w-full flex-col">
            <div className="sticky top-0 z-10 bg-white px-6 pt-6">
              <div className="flex items-start">{header}</div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-10">
              <div className="mx-auto w-full max-w-md space-y-6">
                {showIntro ? (
                  <div className="space-y-3 text-left">
                    {eyebrow && (
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span>{eyebrow}</span>
                      </div>
                    )}
                    {title && (
                      <p className="text-3xl font-semibold ">{title}</p>
                    )}
                    {subtitle && <p className=" ">{subtitle}</p>}
                  </div>
                ) : null}
                {showHeaderActions ? (
                  <div className="space-y-4">
                    {headerActions}
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      <span className="h-px flex-1 bg-neutral-200" />
                      <span>or</span>
                      <span className="h-px flex-1 bg-neutral-200" />
                    </div>
                  </div>
                ) : null}
                {form}
                {aside && <div className="pt-2">{aside}</div>}
              </div>
            </div>
            <div className="px-4 pb-6 mt-32">
              {footer ?? (
                <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 text-xs text-neutral-900">
                  <p>©2026 TCN Group. All rights reserved.</p>
                  <div className="flex items-center gap-4">
                    <Link href={"/support"} className="hover:text-neutral-600">
                      Support
                    </Link>
                    <Link
                      href={"/legal-terms"}
                      className="hover:text-neutral-600"
                    >
                      Legal Terms
                    </Link>
                    <Link
                      href={"/privacy-policy"}
                      className="hover:text-neutral-600"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="relative hidden lg:block">
          <div className="sticky top-0 h-screen">
            <Image
              src={heroImage}
              alt="Auth illustration"
              fill
              priority
              sizes="60vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/10 via-black/0 to-transparent" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
