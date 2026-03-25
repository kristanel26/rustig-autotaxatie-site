import { Star } from "lucide-react";

const stats = [
  { value: "4,9", label: "GOOGLE REVIEWS", labelMobile: "GOOGLE REVIEWS", stars: true },
  { value: "25.000+", label: "VOERTUIGEN GETAXEERD", labelMobile: "VOERTUIGEN GETAXEERD" },
  { value: "15 jaar", label: "ERVARING", labelMobile: "ERVARING" },
  { value: "Landelijk", label: "WERKZAAM IN GROOT DEEL VAN NL", labelMobile: "WERKZAAM IN NL" },
];

const StatsBar = () => (
  <section className="px-6 md:px-8" style={{ background: '#f7f8fa', borderTop: '1px solid #e0e6ed', borderBottom: '1px solid #e0e6ed', padding: '16px 0' }}>
    <div className="container-wide">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
        {stats.map((stat, i) => (
          <div key={i} className={`text-center ${i > 0 ? 'md:border-l' : ''}`} style={{ borderColor: '#e0e6ed' }}>
            {stat.stars && (
              <div className="flex justify-center mb-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4" style={{ color: '#ff751f', fill: '#ff751f' }} />
                ))}
              </div>
            )}
            <p className="font-bold text-[28px] md:text-[24px]" style={{ fontFamily: 'Inter, sans-serif', color: '#1d3c71' }}>{stat.value}</p>
            <p className="uppercase hidden md:block" style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.1em', color: '#888' }}>{stat.label}</p>
            <p className="uppercase block md:hidden" style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.1em', color: '#888' }}>{stat.labelMobile}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
