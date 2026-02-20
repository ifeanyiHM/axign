"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-gray-900 hover:bg-gray-700
        text-white
        shadow-lg
        transition-all duration-300
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
      `}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </Button>
  );
}
