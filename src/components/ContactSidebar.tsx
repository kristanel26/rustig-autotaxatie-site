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
          <a href="https://wa.me/31650694978" className="hover:underline">06 506 949 78</a>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="w-4 h-4 shrink-0 opacity-70" />
          <a href="mailto:algemeen@automobieltaxaties.nl" className="hover:underline text-[13px]">algemeen@automobieltaxaties.nl</a>
        </li>
        <li className="flex items-center gap-3">
          <Clock className="w-4 h-4 shrink-0 opacity-70" />
          <span>ma - vr 8:30 – 17:00</span>
        </li>
      </ul>
      <p className="mt-5 text-xs italic" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Liever direct contact? Wij reageren binnen één werkdag.
      </p>
      <a
        href="https://wa.me/31650694978"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: '#25D366' }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.146.561 4.16 1.543 5.905L.058 23.708a.5.5 0 00.612.612l5.803-1.485A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.94 0-3.793-.5-5.404-1.41l-.387-.229-4.018 1.029 1.029-4.018-.229-.387A9.778 9.778 0 012.182 12c0-5.422 4.396-9.818 9.818-9.818S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
        </svg>
        App ons direct
      </a>
    </div>
  );
};

export default ContactSidebar;
