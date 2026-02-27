import Image from "next/image";
import Link from "next/link";
const logoSrc2 = "/new_axign_black.png";

const theme = {
  accent: "#9b7a19",
  accentHover: "#7a5f13",
  accentLight: "#9b7a1910",

  // Dark / black tones
  dark: "#030712",
  darkCard: "#030712",
  darkBorder: "#1f2937",

  // Bar chart colors
  barDefault: "#1f2937",
  barDefaultTop: "#374151",

  accentB: "#2C3E50",
  barDefaultB: "#111c24",
  barDefaultTopB: "#1e3040",
};

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: theme.darkCard }}
      className="text-white pt-20 pb-10 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src={logoSrc2}
                alt="Axign logo"
                width={90}
                height={60}
                priority
              />
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-md text-sm">
              Empowering teams to achieve extraordinary results through
              intelligent task management, accountability tracking, and seamless
              collaboration.
            </p>

            <p className="text-xs text-gray-500 mt-6">
              Trusted by modern teams worldwide.
            </p>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {["Product", "Company", "Resources"].map((section, si) => {
              const links = [
                [
                  { label: "Features", href: "#features" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Integrations", href: "#" },
                ],
                [
                  { label: "About", href: "/about" },
                  { label: "Blog", href: "#" },
                  { label: "Contact", href: "/contact" },
                ],
                [
                  { label: "Documentation", href: "/documentation" },
                  { label: "Help Center", href: "#" },
                  { label: "Community", href: "#" },
                ],
              ];
              return (
                <div key={section}>
                  <h4
                    // style={{ color: theme.accent }}
                    style={{ color: "white" }}
                    className="text-sm font-semibold tracking-wide uppercase mb-6"
                  >
                    {section}
                  </h4>
                  <ul className="space-y-4 text-sm">
                    {links[si].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={`text-gray-400 hover:text-[${theme.accent}] transition-colors`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{ borderColor: theme.darkBorder }}
          className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Axign. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs">
            {["Privacy Policy", "Terms of Service", "Security"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
