// "use client";

// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Role-Based Access",
//     desc: "CEO and Employee dashboards with permission control.",
//   },
//   {
//     title: "Organization Filtering",
//     desc: "Multi-tenant architecture built for scale.",
//   },
//   {
//     title: "Task Analytics",
//     desc: "Visual reports and productivity tracking.",
//   },
// ];

// export default function Features() {
//   return (
//     <section id="features" className="py-32 bg-white">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-bold text-[#0B2545] mb-16">
//           Built for Modern Teams
//         </h2>

//         <div className="grid md:grid-cols-3 gap-12">
//           {features.map((feature, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
//             >
//               <h3 className="text-xl font-semibold text-[#13315C] mb-4">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600">{feature.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "Role-Based Dashboards",
    desc: "Different views for CEOs and employees.",
  },
  { title: "Analytics & Reports", desc: "Track performance and productivity." },
  { title: "Team Automation", desc: "Reduce manual task assignment work." },
];

export default function Features() {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[var(--brand-navy)] mb-12">
          Works the Way Teams Want
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold text-[var(--brand-deep)] mb-3">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
