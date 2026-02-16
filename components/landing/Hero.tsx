// "use client";

// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="pt-40 pb-32 bg-gradient-to-br from-[#F8FAFC] to-[#E6EEF8]">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-6xl font-bold text-[#0B2545] leading-tight"
//         >
//           Manage Teams.
//           <br />
//           Assign Tasks.
//           <span className="text-[#F4C430]"> Scale Faster.</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="mt-6 text-lg text-[#13315C] max-w-2xl mx-auto"
//         >
//           Axign is a powerful role-based task management system built for
//           organizations that want clarity, accountability, and performance.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mt-10 flex justify-center gap-4"
//         >
//           <button className="bg-[#F4C430] text-[#0B2545] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
//             Start Free Trial
//           </button>

//           <button className="border border-[#13315C] text-[#13315C] px-8 py-4 rounded-xl font-semibold hover:bg-[#13315C] hover:text-white transition">
//             Book Demo
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-40 pb-32 bg-[var(--bg-light)] text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-[var(--brand-navy)]"
      >
        Build More Clarity.
        <br />
        Assign Tasks.
        <span className="text-[var(--brand-gold)]"> Drive Results.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-lg text-[var(--brand-deep)] max-w-2xl mx-auto"
      >
        Axign is the task management system for modern organizations — with
        role-based dashboards, analytics, and team automation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex justify-center gap-4"
      >
        <button className="bg-[var(--brand-gold)] text-[var(--brand-navy)] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
          Start Free Trial
        </button>
        <button className="border border-[var(--brand-deep)] text-[var(--brand-deep)] px-8 py-4 rounded-xl hover:bg-[var(--brand-deep)] hover:text-white transition">
          Book Demo
        </button>
      </motion.div>
    </section>
  );
}
