import { Phone, Mail, Clock, MessageCircle } from "lucide-react";

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
        Liever direct bellen of appen? We helpen je graag verder.
      </p>
      <p className="mt-2 text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Geen verplichtingen. Wij kijken samen wat de slimste aanpak is voor jouw situatie.
      </p>
    </div>
  );
};

export default ContactSidebar;
