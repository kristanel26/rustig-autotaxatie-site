import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, FileText, ShieldAlert, Wrench, Upload } from "lucide-react";

/* ───────── toggle + text field helper ───────── */
const ToggleWithDetail = ({
  label, checked, onCheckedChange, detailLabel, detailValue, onDetailChange, detailPlaceholder,
}: {
  label: string; checked: boolean; onCheckedChange: (v: boolean) => void;
  detailLabel?: string; detailValue?: string; onDetailChange?: (v: string) => void; detailPlaceholder?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
    {checked && detailLabel && (
      <Input
        placeholder={detailPlaceholder || detailLabel}
        value={detailValue || ""}
        onChange={e => onDetailChange?.(e.target.value)}
        className="h-10"
      />
    )}
  </div>
);

const introCards = [
  { icon: FileText, title: "Een volledig rapport", text: "Jij kent de camper van binnen en buiten. Met jouw input maken wij een zo compleet mogelijk rapport voor de verzekeraar." },
  { icon: ShieldAlert, title: "Voorkom onderverzekering", text: "Een volledig beeld van de camper zorgt dat je bij calamiteiten uitbetaald krijgt waar je recht op hebt." },
  { icon: Wrench, title: "Accessoires en aanpassingen", text: "Kosten van aangebrachte accessoires, uitgevoerde reparaties en revisies worden meegenomen in de waardebepaling." },
  { icon: Upload, title: "Facturen uploaden", text: "Heb je facturen van aanpassingen of materialen? Upload ze via het formulier. Lukt dit niet? De taxateur bespreekt dit ter plekke met je." },
];

const CamperInformatieformulier = () => {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Simple form state — flat object for all fields
  const [f, setF] = useState<Record<string, string>>({});
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const set = (key: string, val: string) => setF(prev => ({ ...prev, [key]: val }));
  const tog = (key: string) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  const isOn = (key: string) => !!toggles[key];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageMeta
        title="Camper Informatieformulier | Automobiel Taxaties"
        description="Vul het online informatieformulier in voor je campertaxatie. Help ons jouw camper zo volledig mogelijk in beeld te brengen."
      />
      <SiteHeader />

      {/* Hero — solid navy, no photo */}
      <section className="flex items-center" style={{ height: 320, minHeight: 320, background: '#1d3c71' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
          <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: '#ff751f' }}>CAMPER TAXATIE</p>
          <h1 className="text-white font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            Online informatieformulier
          </h1>
          <p className="text-white/80 text-lg max-w-[560px]" style={{ lineHeight: 1.7 }}>
            Help ons jouw camper zo volledig mogelijk in beeld te brengen.<br />
            Zo maken wij het meest complete taxatierapport voor jou.
          </p>
        </div>
      </section>

      {/* Intro cards */}
      <section className="py-16" style={{ background: '#fff' }}>
        <div className="max-w-[760px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {introCards.map(c => (
              <div key={c.title} className="rounded-xl p-5 flex gap-4 items-start bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
                <c.icon className="w-6 h-6 shrink-0 mt-0.5" style={{ color: '#ff751f' }} />
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: '#1d3c71' }}>{c.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm italic text-muted-foreground text-center">
            NB: Aan de camper gewerkte uren worden niet meegenomen in de waardebepaling.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 pt-4" style={{ background: '#f7f8fa' }}>
        <div className="max-w-[900px] mx-auto px-6">
          {submitted ? (
            <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: '#1d3c71' }}>Bedankt!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Wij hebben jouw formulier ontvangen en nemen dit mee in de taxatie.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 md:p-10">
              <h3 className="text-xl font-bold mb-1" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>Vul het formulier in</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Lukt het niet om alles digitaal aan te leveren? Geen probleem, onze taxateur bespreekt dit tijdens de inspectie met je.
              </p>

              <Accordion type="multiple" defaultValue={["opdrachtgever"]} className="space-y-3">
                {/* Sectie 1 */}
                <AccordionItem value="opdrachtgever" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>1. Gegevens opdrachtgever</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Voorletters en achternaam *</Label><Input required value={f.naam||""} onChange={e=>set("naam",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5"><Label>Telefoonnummer *</Label><Input required type="tel" value={f.telefoon||""} onChange={e=>set("telefoon",e.target.value)} className="h-10" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Straatnaam en huisnummer</Label><Input value={f.adres||""} onChange={e=>set("adres",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5"><Label>Postcode en woonplaats</Label><Input value={f.postcode||""} onChange={e=>set("postcode",e.target.value)} className="h-10" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>E-mailadres *</Label><Input required type="email" value={f.email||""} onChange={e=>set("email",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5"><Label>Verzekeraar</Label><Input value={f.verzekeraar||""} onChange={e=>set("verzekeraar",e.target.value)} className="h-10" /></div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Sectie 2 */}
                <AccordionItem value="algemeen" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>2. Algemene gegevens camper</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Kenteken *</Label><Input required value={f.kenteken||""} onChange={e=>set("kenteken",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5">
                        <Label>Stalling</Label>
                        <Select value={f.stalling||""} onValueChange={v=>set("stalling",v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>
                            {["Garage","Oprit","Straat","Camperplaats","Anders"].map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <ToggleWithDetail label="Importvoertuig" checked={isOn("import")} onCheckedChange={()=>tog("import")} />
                      <div className="space-y-1.5">
                        <Label>Soort gebruik</Label>
                        <Select value={f.gebruik||""} onValueChange={v=>set("gebruik",v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>
                            {["Particulier","Zakelijk","Verhuur"].map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <ToggleWithDetail label="Kwart-tarief al aangevraagd?" checked={isOn("kwarttarief")} onCheckedChange={()=>tog("kwarttarief")} />
                  </AccordionContent>
                </AccordionItem>

                {/* Sectie 3 */}
                <AccordionItem value="beveiliging" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>3. Beveiliging</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    {[
                      { key: "scm", label: "Beveiliging SCM certificaat", detail: "Klasse" },
                      { key: "volgsysteem", label: "Voertuigvolgsysteem", detail: "Type/merk" },
                      { key: "versnellingsbakslot", label: "Mechanisch versnellingsbakslot", detail: "Merk/type" },
                      { key: "stuurslot", label: "Mechanisch stuurslot", detail: "Merk/type" },
                      { key: "extrasloten", label: "Extra sloten", detail: "Klasse" },
                      { key: "startonderbreker", label: "AF-fabriek startonderbreker", detail: "Type" },
                    ].map(item => (
                      <ToggleWithDetail
                        key={item.key}
                        label={item.label}
                        checked={isOn(item.key)}
                        onCheckedChange={() => tog(item.key)}
                        detailLabel={item.detail}
                        detailValue={f[item.key + "_detail"] || ""}
                        onDetailChange={v => set(item.key + "_detail", v)}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Sectie 4 */}
                <AccordionItem value="techniek" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>4. Techniek en comfort</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    {[
                      { key: "cruisecontrol", label: "Cruisecontrol" },
                      { key: "motorairco", label: "Motorairco" },
                      { key: "vuilwatertank", label: "Vuilwatertank", detail: "Inhoud (liter)" },
                      { key: "schoonwatertank", label: "Schoonwatertank", detail: "Inhoud (liter)" },
                      { key: "lpg", label: "LPG (losse fles / inbouw)", detail: "Type + keuringsdatum" },
                      { key: "gasdrukregelaar", label: "Gasdrukregelaar", detail: "Keuringsdatum" },
                      { key: "gasslangen", label: "Gasslangen", detail: "Keuringsdatum" },
                      { key: "thermisch", label: "Thermisch beveiligd" },
                      { key: "verwarming", label: "Verwarming", detail: "Soort/merk/type/voltage" },
                      { key: "aardlekschakelaar", label: "Aardlekschakelaar + gezekerd" },
                      { key: "boordaccu", label: "Boordaccu", detail: "Merk/type" },
                      { key: "startaccu", label: "Startaccu", detail: "Merk/type" },
                      { key: "brandmelder", label: "Brandmelder", detail: "Aantal" },
                      { key: "brandblusapparaat", label: "Brandblusapparaat", detail: "Houdbaar tot" },
                      { key: "gasdetectie", label: "Gasdetectie" },
                    ].map(item => (
                      <ToggleWithDetail
                        key={item.key}
                        label={item.label}
                        checked={isOn(item.key)}
                        onCheckedChange={() => tog(item.key)}
                        detailLabel={item.detail}
                        detailValue={f[item.key + "_detail"] || ""}
                        onDetailChange={v => set(item.key + "_detail", v)}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Sectie 5 */}
                <AccordionItem value="binnenzijde" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>5. Binnenzijde camper</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    {[
                      { key: "verduistering", label: "Verduistering voorruit / gordijnen" },
                      { key: "airco", label: "Airco (voor/achter)", detail: "Merk/type" },
                      { key: "omvormer", label: "Omvormer", detail: "Merk/type/voltage/wattage" },
                      { key: "extraisolatie", label: "Extra isolatie / winterisolatie" },
                      { key: "dubbelebodem", label: "Dubbele bodem" },
                      { key: "leveler", label: "Automatisch leveler systeem", detail: "Merk/type" },
                      { key: "sportstoelen", label: "Sportstoelen", detail: "Merk" },
                      { key: "vasttoilet", label: "Vast toilet met vaste opvangtank" },
                      { key: "wifi", label: "Wifi versterker", detail: "Merk/type" },
                      { key: "achteruitrijcamera", label: "Achteruitrijcamera" },
                      { key: "kluis", label: "Kluis" },
                      { key: "audio", label: "Audio installatie (radio/CD, Sonos)" },
                      { key: "navigatie", label: "Navigatiesysteem (los/vast)", detail: "Merk" },
                      { key: "afzuiging", label: "Mechanische afzuiging / dakventilator" },
                      { key: "warmwater", label: "Warmwatervoorziening (combiketel/boiler)" },
                      { key: "tv", label: "TV (flatscreen, DVD)", detail: "Aantal" },
                      { key: "toiletruimte", label: "Toiletruimte / douche / cassettetoilet / SOG" },
                      { key: "raambekleding", label: "Raambekleding (combirollo's, hordeur, plissedeur)" },
                      { key: "koelkast", label: "Koelkast (gas/elektrisch)", detail: "Type" },
                      { key: "diepvries", label: "Diepvries" },
                      { key: "fornuis", label: "Fornuis 3-pits" },
                      { key: "magnetron", label: "Magnetron" },
                      { key: "oven", label: "Oven" },
                    ].map(item => (
                      <ToggleWithDetail
                        key={item.key}
                        label={item.label}
                        checked={isOn(item.key)}
                        onCheckedChange={() => tog(item.key)}
                        detailLabel={item.detail}
                        detailValue={f[item.key + "_detail"] || ""}
                        onDetailChange={v => set(item.key + "_detail", v)}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Sectie 6 */}
                <AccordionItem value="buitenzijde" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>6. Buitenzijde camper</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    {[
                      { key: "garage", label: "Vaste garage achterin", detail: "Enkele/dubbele deur" },
                      { key: "luifel", label: "Luifel (vast/elektrisch)", detail: "Merk/type/lengte" },
                      { key: "tent", label: "Tent", detail: "Type" },
                      { key: "trekhaak", label: "Trekhaak" },
                      { key: "opstap", label: "Opstap (elektrisch/manueel)", detail: "Merk" },
                      { key: "aggregaat", label: "Aggregaat", detail: "Merk/type/voltage" },
                      { key: "schotelantenne", label: "Schotelantenne", detail: "Merk/type" },
                      { key: "fietsendrager", label: "Fietsendrager", detail: "Merk/type" },
                      { key: "dakreling", label: "Dakreling" },
                      { key: "buitengas", label: "Buitengasaansluiting", detail: "Merk/type" },
                      { key: "zonnepanelen", label: "Zonnepanelen", detail: "Merk/type/aantal" },
                    ].map(item => (
                      <ToggleWithDetail
                        key={item.key}
                        label={item.label}
                        checked={isOn(item.key)}
                        onCheckedChange={() => tog(item.key)}
                        detailLabel={item.detail}
                        detailValue={f[item.key + "_detail"] || ""}
                        onDetailChange={v => set(item.key + "_detail", v)}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Sectie 7 */}
                <AccordionItem value="aanvullend" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>7. Aanvullende informatie</AccordionTrigger>
                  <AccordionContent className="space-y-5 pt-2 pb-4">
                    <div className="space-y-1.5">
                      <Label>Overige bijzonderheden, aanpassingen of opmerkingen</Label>
                      <Textarea rows={5} className="resize-none" value={f.opmerkingen||""} onChange={e=>set("opmerkingen",e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Upload facturen, bonnen of documentatie (PDF, JPG, PNG — max 10 MB per bestand)</Label>
                      <Input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="h-auto py-2" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Agreement + submit */}
              <div className="mt-8 space-y-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-input accent-[#ff751f]"
                    required
                  />
                  <span className="text-sm text-foreground/80">
                    Ik verklaar hierbij dat alles naar waarheid is ingevuld.
                  </span>
                </label>

                <Button
                  type="submit"
                  variant="cta"
                  size="xl"
                  className="w-full"
                  disabled={!agreed}
                >
                  Informatieformulier verzenden
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We gaan zorgvuldig om met je gegevens en gebruiken deze alleen voor het verwerken van je taxatie.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default CamperInformatieformulier;
