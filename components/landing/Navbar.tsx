// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function Navbar() {
//   return (
//     <motion.nav
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200"
//     >
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//         <div className="flex items-center gap-2">
//           <Image src="/logo.png" alt="Axign" width={36} height={36} />
//           <span className="text-xl font-semibold text-[#0B2545]">Axign</span>
//         </div>

//         <div className="hidden md:flex gap-8 text-[#13315C] font-medium">
//           <a href="#features">Features</a>
//           <a href="#how">How it Works</a>
//           <a href="#pricing">Pricing</a>
//         </div>

//         <button className="bg-[#F4C430] text-[#0B2545] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
//           Get Started
//         </button>
//       </div>
//     </motion.nav>
//   );
// }

"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Axign Logo" width={36} height={36} />
          <span className="text-xl font-bold text-[var(--brand-navy)]">
            Axign
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-[var(--brand-deep)] font-medium">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
        </div>

        <button className="bg-[var(--brand-gold)] text-[var(--brand-navy)] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
          Try Free
        </button>
      </div>
    </motion.nav>
  );
}
