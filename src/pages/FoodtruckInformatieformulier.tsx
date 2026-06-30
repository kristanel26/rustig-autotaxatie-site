import { useState, useRef } from "react";
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
import { CheckCircle, FileText, ShieldAlert, Wrench, Upload, X, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ───── helpers (hergebruikt patroon CamperInformatieformulier) ───── */
const Tog = ({ label, k, isOn, tog }: { label: string; k: string; isOn: (k: string) => boolean; tog: (k: string) => void }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm">{label}</span>
    <Switch checked={isOn(k)} onCheckedChange={() => tog(k)} />
  </div>
);

const Txt = ({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) => (
  <Input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="h-10" />
);

const Remark = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <Input placeholder="Opmerking (optioneel)" value={value} onChange={e => onChange(e.target.value)} className="h-10 text-sm" />
);

const DateField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <Input type="date" value={value} onChange={e => onChange(e.target.value)} className="h-10" />
  </div>
);

const introCards = [
  { icon: FileText, title: "Een volledig rapport", text: "Jij kent jouw foodtruck van binnen en buiten. Met jouw input maken wij een zo compleet mogelijk rapport voor de verzekeraar." },
  { icon: ShieldAlert, title: "Voorkom onderverzekering", text: "Een volledig beeld van jouw foodtruck zorgt dat je bij schade of verlies uitbetaald krijgt waar je recht op hebt." },
  { icon: Wrench, title: "Inbouw en apparatuur", text: "Keukenapparatuur, installaties en aanpassingen worden meegenomen in de waardebepaling." },
  { icon: Upload, title: "Facturen uploaden", text: "Heb je facturen van apparatuur, keuringen of vergunningen? Upload ze via het formulier. Hoe meer documenten, hoe beter voor de waardebepaling." },
];

const FoodtruckInformatieformulier = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [f, setF] = useState<Record<string, string>>({});
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [facturen, setFacturen] = useState<File[]>([]);
  const facturenInputRef = useRef<HTMLInputElement>(null);

  const s = (key: string, val: string) => setF(prev => ({ ...prev, [key]: val }));
  const g = (key: string) => f[key] || "";
  const tog = (key: string) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  const isOn = (key: string) => !!toggles[key];

  const addFacturen = (files: FileList | null) => {
    if (!files) return;
    const nf = Array.from(files).filter(file => file.size <= 10 * 1024 * 1024);
    setFacturen(prev => [...prev, ...nf]);
  };
  const removeFactuur = (i: number) => setFacturen(prev => prev.filter((_, idx) => idx !== i));

  const sanitizeName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);

  const uploadFiles = async (files: File[], folder: string, sub: string) => {
    const paths: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = `${folder}/${sub}/${Date.now()}-${i}-${sanitizeName(file.name)}`;
      const { error } = await supabase.storage
        .from("aanvraag-uploads")
        .upload(path, file, { contentType: file.type || undefined, upsert: false });
      if (error) throw error;
      paths.push(path);
    }
    return paths;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const folder = (crypto as Crypto & { randomUUID?: () => string }).randomUUID?.() ||
        `aanvraag-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const factuurPaths = await uploadFiles(facturen, folder, "facturen");

      const { data, error } = await supabase.functions.invoke("verstuur-aanvraag", {
        body: {
          bron: "foodtruck-informatieformulier",
          service_type: "Foodtruck Informatieformulier (FOOD)",
          rapport_type: "FOOD",
          naam: f.naam || null,
          email: f.email || null,
          telefoon: f.telefoon || null,
          kenteken: f.kenteken || null,
          postcode: f.postcode || null,
          adres: f.adres || null,
          bericht: f.opmerkingen || null,
          payload: { rapport_type: "FOOD", velden: f, toggles, facturen_aantal: facturen.length },
          fotos: [],
          facturen: factuurPaths,
        },
      });
      if (error || (data as { error?: string })?.error) {
        throw new Error((data as { error?: string })?.error || error?.message || "Onbekende fout");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrorMsg("Versturen is helaas mislukt. Bel 085 483 2461 of stuur een WhatsApp naar 06 50694978.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const TogItem = ({ k, label, children }: { k: string; label: string; children?: React.ReactNode }) => (
    <div className="space-y-2">
      <Tog label={label} k={k} isOn={isOn} tog={tog} />
      {isOn(k) && children}
      {isOn(k) && !children && <Remark value={g(k + "_remark")} onChange={v => s(k + "_remark", v)} />}
    </div>
  );

  return (
    <>
      <PageMeta title="Foodtruck Informatieformulier | Automobiel Taxaties" description="Vul het online informatieformulier in voor jouw foodtrucktaxatie. Help ons jouw foodtruck zo volledig mogelijk in beeld te brengen." />
      <SiteHeader />

      {/* Hero */}
      <section className="flex items-center" style={{ height: 320, minHeight: 320, background: '#1d3c71' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
          <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: '#ff751f' }}>FOODTRUCK TAXATIE</p>
          <h1 className="text-white font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>Online informatieformulier</h1>
          <p className="text-white/80 text-lg max-w-[560px]" style={{ lineHeight: 1.7 }}>Dit formulier vul je in voorafgaand aan de taxatie.<br />Vragen die niet van toepassing zijn kun je overslaan.</p>
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
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 pt-4" style={{ background: '#f7f8fa' }}>
        <div className="max-w-[900px] mx-auto px-6">
          {submitted ? (
            <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6"><CheckCircle className="w-8 h-8 text-accent" /></div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: '#1d3c71' }}>Bedankt!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Wij hebben jouw formulier ontvangen en nemen dit mee in de taxatie.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 md:p-10">
              <h3 className="text-xl font-bold mb-1" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>Vul het formulier in</h3>
              <p className="text-sm text-muted-foreground mb-8">Vragen die niet van toepassing zijn kun je overslaan. Lukt het niet om alles digitaal aan te leveren? De taxateur bespreekt dit ter plekke met je.</p>

              <Accordion type="multiple" defaultValue={["klant"]} className="space-y-3">

                {/* Klantgegevens */}
                <AccordionItem value="klant" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>1. Klantgegevens</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Naam *</Label><Input required value={g("naam")} onChange={e => s("naam", e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5"><Label>Telefoon *</Label><Input required type="tel" value={g("telefoon")} onChange={e => s("telefoon", e.target.value)} className="h-10" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Adres</Label><Input value={g("adres")} onChange={e => s("adres", e.target.value)} className="h-10" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5"><Label>Postcode</Label><Input value={g("postcode")} onChange={e => s("postcode", e.target.value)} className="h-10" /></div>
                        <div className="space-y-1.5"><Label>Woonplaats</Label><Input value={g("woonplaats")} onChange={e => s("woonplaats", e.target.value)} className="h-10" /></div>
                      </div>
                    </div>
                    <div className="space-y-1.5"><Label>E-mail *</Label><Input required type="email" value={g("email")} onChange={e => s("email", e.target.value)} className="h-10" /></div>
                  </AccordionContent>
                </AccordionItem>

                {/* Voertuiggegevens */}
                <AccordionItem value="voertuig" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>2. Voertuiggegevens</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="space-y-1.5">
                      <Label>Kenteken</Label>
                      <Input
                        value={g("kenteken")}
                        onChange={e => s("kenteken", e.target.value.toUpperCase())}
                        placeholder="AB-123-CD"
                        className="h-10 uppercase tracking-wider"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Over jouw foodtruck */}
                <AccordionItem value="basis" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>3. Over jouw foodtruck</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Type foodtruck</Label>
                        <Select value={g("type_foodtruck")} onValueChange={v => s("type_foodtruck", v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>{["Bus of bedrijfswagen", "Aanhanger", "Trailer of oplegger", "Container", "Anders"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Bouwjaar opbouw (indien afwijkend)</Label>
                        <Input type="number" value={g("bouwjaar_opbouw")} onChange={e => s("bouwjaar_opbouw", e.target.value)} placeholder="2018" className="h-10" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Hoe wordt de foodtruck gestald</Label>
                        <Select value={g("stalling")} onValueChange={v => s("stalling", v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>{["Garage", "Loods", "Buiten", "Stallingsbedrijf", "Anders"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Waarvoor wordt de foodtruck gebruikt</Label>
                        <Select value={g("gebruik")} onValueChange={v => s("gebruik", v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>{["Evenementen", "Festivals", "Catering", "Dagelijkse standplaats", "Verhuur", "Anders"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Welk type horeca of gerecht</Label>
                      <Input value={g("horeca_type")} onChange={e => s("horeca_type", e.target.value)} placeholder="Bijvoorbeeld pizza, burgers, koffie, ijs" className="h-10" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Keukenapparatuur */}
                <AccordionItem value="keuken" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>4. Keukenapparatuur</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <TogItem k="bakplaat" label="Bakplaat of grill aanwezig">
                      <Txt placeholder="Merk of type" value={g("bakplaat_detail")} onChange={v => s("bakplaat_detail", v)} />
                    </TogItem>
                    <TogItem k="friteuse" label="Friteuse aanwezig">
                      <Txt placeholder="Aantal of capaciteit" value={g("friteuse_detail")} onChange={v => s("friteuse_detail", v)} />
                    </TogItem>
                    <TogItem k="oven" label="Oven aanwezig">
                      <Txt placeholder="Type oven (bijvoorbeeld pizzaoven, combisteamer)" value={g("oven_detail")} onChange={v => s("oven_detail", v)} />
                    </TogItem>
                    <TogItem k="koeling" label="Koeling aanwezig">
                      <Txt placeholder="Type (koelkast, koelwerkbank, vriezer)" value={g("koeling_detail")} onChange={v => s("koeling_detail", v)} />
                    </TogItem>
                    <TogItem k="afzuiging" label="Afzuiging of motorkap aanwezig">
                      <Txt placeholder="Type of capaciteit" value={g("afzuiging_detail")} onChange={v => s("afzuiging_detail", v)} />
                    </TogItem>
                    <TogItem k="koffie" label="Koffiemachine of tap aanwezig">
                      <Txt placeholder="Merk of type" value={g("koffie_detail")} onChange={v => s("koffie_detail", v)} />
                    </TogItem>
                  </AccordionContent>
                </AccordionItem>

                {/* Installaties en aansluitingen */}
                <AccordionItem value="installaties" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>5. Installaties en aansluitingen</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Gasinstallatie</Label>
                        <Select value={g("gas")} onValueChange={v => s("gas", v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>{["Propaan of butaan flessen", "Vaste aansluiting", "Geen"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Elektra-aansluiting</Label>
                        <Select value={g("elektra")} onValueChange={v => s("elektra", v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>{["230V CEE blauw", "400V krachtstroom", "Beide", "Geen"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <TogItem k="watertank" label="Watertank of boiler aanwezig">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Inhoud schoonwater (liter)" value={g("watertank_schoon")} onChange={v => s("watertank_schoon", v)} />
                        <Txt placeholder="Inhoud vuilwater (liter)" value={g("watertank_vuil")} onChange={v => s("watertank_vuil", v)} />
                      </div>
                    </TogItem>
                    <TogItem k="generator" label="Generator of aggregaat aanwezig">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("generator_merk")} onChange={v => s("generator_merk", v)} />
                        <Txt placeholder="Vermogen (kVA)" value={g("generator_kva")} onChange={v => s("generator_kva", v)} />
                      </div>
                    </TogItem>
                    <TogItem k="zonnepanelen" label="Zonnepanelen aanwezig">
                      <Txt placeholder="Wattage" value={g("zonnepanelen_wattage")} onChange={v => s("zonnepanelen_wattage", v)} />
                    </TogItem>
                  </AccordionContent>
                </AccordionItem>

                {/* Vergunningen en keuringen */}
                <AccordionItem value="vergunningen" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>6. Vergunningen en keuringen</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <TogItem k="haccp" label="Geldige HACCP-registratie">
                      <Txt placeholder="Laatste controle of opmerkingen" value={g("haccp_detail")} onChange={v => s("haccp_detail", v)} />
                    </TogItem>
                    <TogItem k="keuring" label="Gas- of elektrakeuring uitgevoerd">
                      <DateField label="Datum laatste keuring" value={g("keuring_datum")} onChange={v => s("keuring_datum", v)} />
                    </TogItem>
                    <TogItem k="vergunning" label="Standplaats- of omgevingsvergunning">
                      <Txt placeholder="Gemeente of locatie" value={g("vergunning_detail")} onChange={v => s("vergunning_detail", v)} />
                    </TogItem>
                  </AccordionContent>
                </AccordionItem>

                {/* Aanvullende informatie */}
                <AccordionItem value="aanvullend" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>7. Aanvullende informatie</AccordionTrigger>
                  <AccordionContent className="space-y-5 pt-2 pb-4">
                    <TogItem k="belettering" label="Belettering, wrap of branding aanwezig">
                      <Txt placeholder="Omschrijving" value={g("belettering_detail")} onChange={v => s("belettering_detail", v)} />
                    </TogItem>
                    <div className="space-y-1.5">
                      <Label>Verbouwingen of aanpassingen</Label>
                      <Textarea
                        rows={4}
                        className="resize-none"
                        placeholder="Bijvoorbeeld extra apparatuur, isolatie, indeling aangepast"
                        value={g("opmerkingen")}
                        onChange={e => s("opmerkingen", e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Documenten uploaden */}
                <AccordionItem value="documenten" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>8. Documenten uploaden</AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2 pb-4">
                    <p className="text-sm text-muted-foreground">Upload facturen, keuringsrapporten en vergunningen. Hoe meer documenten, hoe beter voor de waardebepaling.</p>
                    <div
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/30"
                      onClick={() => facturenInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-primary"); }}
                      onDragLeave={e => e.currentTarget.classList.remove("border-primary")}
                      onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("border-primary"); addFacturen(e.dataTransfer.files); }}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium text-foreground/70">Klik of sleep bestanden hierheen</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG. Max 10 MB per bestand.</p>
                      <input ref={facturenInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => addFacturen(e.target.files)} />
                    </div>
                    {facturen.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {facturen.map((file, i) => (
                          <li key={i} className="flex items-center justify-between text-sm bg-muted/30 rounded px-3 py-1.5">
                            <span className="truncate">{file.name}</span>
                            <button type="button" onClick={() => removeFactuur(i)} className="ml-2 text-muted-foreground hover:text-foreground">
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Akkoord en submit */}
              <div className="mt-8 space-y-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 rounded border-input accent-[#ff751f]" required />
                  <span className="text-sm text-foreground/80">Ik ga akkoord met de opdracht en verklaar dat alles naar waarheid is ingevuld.</span>
                </label>
                {errorMsg && (
                  <div role="alert" className="flex items-start gap-2 rounded-lg p-3 text-sm" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                <Button type="submit" variant="cta" size="xl" className="w-full" disabled={!agreed || isSubmitting}>
                  {isSubmitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Versturen…</span>) : "Informatieformulier verzenden"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">We gaan zorgvuldig om met jouw gegevens en gebruiken deze alleen voor het verwerken van jouw taxatie.</p>
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

export default FoodtruckInformatieformulier;
