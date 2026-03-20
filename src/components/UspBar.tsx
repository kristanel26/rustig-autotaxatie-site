import React from "react";
import { Shield, MapPin, Scale as ScaleIcon, Users } from "lucide-react";

const usps = [
  { icon: Shield, title: "Erkend taxateur", sub: "Aangesloten bij Federatie TMV, VRT Register en FEHAC" },
  { icon: MapPin, title: "Op locatie bij je", sub: "Werkzaam in het grootste gedeelte van Nederland" },
  { icon: ScaleIcon, title: "Juridisch verdedigbaar", sub: "Gedegen onderbouwing, verdedigbaar bij bezwaar en beroep" },
  { icon: Users, title: "Direct contact", sub: "Persoonlijk en snel geholpen, zonder omwegen" },
];

const UspBar = () => (
  <section style={{ background: '#1d3c71', borderTop: '5px solid #ff751f', borderBottom: '5px solid #ff751f' }}>
    <div className="max-w-[1100px] mx-auto flex flex-wrap md:flex-nowrap items-stretch">
      {usps.map((usp, i) => (
        <React.Fragment key={i}>
          <div
            className="flex items-center gap-4 flex-[0_0_50%] md:flex-1 transition-colors duration-200 hover:bg-white/[0.06]"
            style={{ padding: '28px 32px' }}
          >
            <usp.icon style={{ width: 28, height: 28, color: '#ff751f', flexShrink: 0 }} />
            <div className="flex flex-col">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: '#ffffff', marginBottom: 3 }}>
                {usp.title}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.60)' }}>
                {usp.sub}
              </span>
            </div>
          </div>
          {i < usps.length - 1 && (
            <div className="hidden md:block self-stretch flex-shrink-0" style={{ width: 1, background: 'rgba(255,255,255,0.12)' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  </section>
);

export default UspBar;
