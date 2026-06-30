import tmv from "@/assets/cert-tmv.png.asset.json";
import vrt from "@/assets/cert-vrt.png.asset.json";
import fehac from "@/assets/cert-fehac.png.asset.json";
import hobeon from "@/assets/cert-hobeon.png.asset.json";

const logos = [
  { src: tmv.url, alt: "Federatie TMV" },
  { src: vrt.url, alt: "VRT Register" },
  { src: fehac.url, alt: "FEHAC" },
  { src: hobeon.url, alt: "Hobeon SKO" },
];

interface CertificationBarProps {
  variant?: "section" | "inline";
}

const CertificationBar = ({ variant = "section" }: CertificationBarProps) => {
  if (variant === "inline") {
    return (
      <div className="bg-white rounded-lg px-6 py-5 mb-7" style={{ border: '1px solid #e6eaf0' }}>
        <p className="text-center mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ff751f' }}>
          Aangesloten en gecertificeerd
        </p>
        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l) => (
            <img key={l.alt} src={l.src} alt={l.alt} className="h-[52px] w-auto object-contain mx-auto" loading="lazy" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-14 px-6" style={{ borderTop: '1px solid #e6eaf0' }}>
      <div className="max-w-[1100px] mx-auto">
        <p className="text-center mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ff751f' }}>
          Aangesloten en gecertificeerd
        </p>
        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {logos.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className="h-[60px] w-auto object-contain mx-auto"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationBar;
