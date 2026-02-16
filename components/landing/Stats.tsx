// export default function Stats() {
//   return (
//     <section className="py-24 bg-[#0B2545] text-white text-center">
//       <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
//         <div>
//           <h3 className="text-4xl font-bold text-[#F4C430]">10K+</h3>
//           <p className="mt-2">Tasks Managed</p>
//         </div>
//         <div>
//           <h3 className="text-4xl font-bold text-[#F4C430]">500+</h3>
//           <p className="mt-2">Organizations</p>
//         </div>
//         <div>
//           <h3 className="text-4xl font-bold text-[#F4C430]">99.9%</h3>
//           <p className="mt-2">Uptime</p>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

export default function Stats() {
  return (
    <section className="py-24 bg-[var(--brand-navy)] text-white text-center">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-4xl font-bold text-[var(--brand-gold)]">10K+</h3>
          <p>Tasks Created</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-[var(--brand-gold)]">500+</h3>
          <p>Teams Using Axign</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-[var(--brand-gold)]">99.9%</h3>
          <p>Uptime</p>
        </div>
      </div>
    </section>
  );
}
