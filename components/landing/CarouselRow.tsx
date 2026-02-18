"use client";

import Image from "next/image";

interface Props {
  images: { id: number }[];
  className: string;
}

export default function CarouselRow({ images, className }: Props) {
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-3 ${className}`}>
        {[...images, ...images].map((img, i) => {
          const dashboardImage = `/dashboardImage/dash-${i + 1}.png`;
          return (
            <div
              key={i}
              className="h-60 w-55 shrink-0 overflow-hidden lg:h-60 lg:w-98"
            >
              <Image
                src={dashboardImage}
                alt="Community"
                width={395}
                height={240}
                className="h-full rounded-2xl object-cover md:rounded-3xl"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
