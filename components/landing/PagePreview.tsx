"use client";

import { useMemo, useState } from "react";
import { Monitor, Expand, Shrink } from "lucide-react";

type PreviewImage = {
  src: string;
  alt: string;
  caption?: string;
};

type PagePreviewProps = {
  title: string;
  description?: string;
  deviceLabel?: string; // default: "Desktop"
  images: PreviewImage[]; // one or more
  tip?: string;
  defaultCols?: 1 | 2; // default: 2
};

export function PagePreview({
  title,
  description,
  deviceLabel = "Desktop",
  images,
  tip = "Tip: Use clean screenshots (no sensitive data). 1400px+ width looks best.",
  defaultCols = 2,
}: PagePreviewProps) {
  const [cols, setCols] = useState<1 | 2>(defaultCols);

  const canToggle = images.length > 1;

  const gridColsClass = useMemo(() => {
    // always 1 col on small screens, and on large screens use toggle
    return cols === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2";
  }, [cols]);

  const toggleCols = () => setCols((prev) => (prev === 2 ? 1 : 2));

  return (
    <section className="mt-8 rounded-2xl lg:border border-gray-200 bg-white lg:p-8 lg:shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-950">{title}</h2>
          {description ? (
            <p className="mt-2 text-gray-700 max-w-2xl">{description}</p>
          ) : null}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {/* Toggle button (only shows on large screens & when images are more than 1) */}
          {canToggle ? (
            <button
              type="button"
              onClick={toggleCols}
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
              aria-label={cols === 2 ? "Expand preview" : "Collapse preview"}
              title={cols === 2 ? "Expand" : "Collapse"}
            >
              {cols === 2 ? (
                <>
                  <Expand className="h-4 w-4" />
                  Expand
                </>
              ) : (
                <>
                  <Shrink className="h-4 w-4" />
                  Collapse
                </>
              )}
            </button>
          ) : null}

          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
            <Monitor className="h-4 w-4" />
            {deviceLabel}
          </span>
        </div>
      </div>

      <div className={`mt-6 grid gap-6 ${gridColsClass}`}>
        {images.map((img) => (
          <div
            key={`${img.src}-${img.caption ?? img.alt}`}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
          >
            <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

              <span className="ml-3 text-xs font-medium text-gray-600">
                {img.caption ?? "Preview (sample)"}
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} className="w-full h-auto" />
          </div>
        ))}
      </div>

      {tip ? <p className="mt-3 text-xs text-gray-500">{tip}</p> : null}
    </section>
  );
}
