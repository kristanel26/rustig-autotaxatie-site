import { Phone, Mail, Clock, MessageCircle, MapPin } from "lucide-react";

const ContactSidebar = () => {
  return (
    <div
      className="rounded-2xl p-10 text-white flex flex-col h-full"
      style={{ background: '#1d3c71' }}
    >
      <h3 className="text-lg font-semibold mb-5">Direct contact</h3>
      <ul className="space-y-3.5 text-sm">
        <li className="flex items-center gap-3">
          <Phone className="w-4 h-4 shrink-0 opacity-70" />
          <a href="tel:+31854832461" className="hover:underline">085 483 2461</a>
        </li>
        <li className="flex items-center gap-3">
          <MessageCircle className="w-4 h-4 shrink-0 opacity-70" />
          <a href="https://wa.me/31650694978" className="hover:underline">06 50694978</a>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="w-4 h-4 shrink-0 opacity-70" />
          <a href="mailto:algemeen@automobieltaxaties.nl" className="hover:underline text-[13px]">algemeen@automobieltaxaties.nl</a>
        </li>
        <li className="flex items-center gap-3">
          <Clock className="w-4 h-4 shrink-0 opacity-70" />
          <span>ma-vr 8:30 – 17:00</span>
        </li>
      </ul>
      <p className="mt-5 text-xs italic" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Liever direct bellen of appen? We helpen jou graag verder.
      </p>
      <p className="mt-2 text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Geen verplichtingen. Wij kijken samen wat de slimste aanpak is voor jouw situatie.
      </p>

      <div className="mt-auto pt-6">
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 20 }} />
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-4 h-4 shrink-0 opacity-70 mt-0.5" />
          <div className="text-[13px]" style={{ opacity: 0.75, lineHeight: 1.5 }}>
            <p>Van Heemstraweg 123</p>
            <p>6651 KH Druten</p>
          </div>
        </div>
        <div className="text-[12px] space-y-0.5 mb-5" style={{ opacity: 0.5 }}>
          <p>KvK: 71468889</p>
          <p>BTW: NL858727493B01</p>
        </div>
        <a href="tel:+31854832461" className="block">
          <button
            className="w-full font-bold text-[15px] rounded-lg transition-colors"
            style={{ background: '#ff751f', color: '#fff', height: 48, border: 'none', cursor: 'pointer', boxShadow: '0 3px 12px rgba(255,117,31,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.background = '#e8651a'}
            onMouseLeave={e => e.currentTarget.style.background = '#ff751f'}
          >
            Bel direct: 085 483 2461
          </button>
        </a>
      </div>
    </div>
  );
};

export default ContactSidebar;
