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
import { CheckCircle, FileText, ShieldAlert, Wrench, Upload, X, ImagePlus, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ───── helpers ───── */
const Tog = ({ label, k, isOn, tog }: { label: string; k: string; isOn: (k: string) => boolean; tog: (k: string) => void }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm">{label}</span>
    <Switch checked={isOn(k)} onCheckedChange={() => tog(k)} />
  </div>
);

const SubTog = ({ label, k, isOn, tog }: { label: string; k: string; isOn: (k: string) => boolean; tog: (k: string) => void }) => (
  <div className="flex items-center gap-3 pl-4">
    <Switch checked={isOn(k)} onCheckedChange={() => tog(k)} className="scale-90" />
    <span className="text-sm text-muted-foreground">{label}</span>
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
  { icon: FileText, title: "Een volledig rapport", text: "Jij kent de camper van binnen en buiten. Met jouw input maken wij een zo compleet mogelijk rapport voor de verzekeraar." },
  { icon: ShieldAlert, title: "Voorkom onderverzekering", text: "Een volledig beeld van de camper zorgt dat je bij calamiteiten uitbetaald krijgt waar je recht op hebt." },
  { icon: Wrench, title: "Accessoires en aanpassingen", text: "Kosten van aangebrachte accessoires, uitgevoerde reparaties en revisies worden meegenomen in de waardebepaling." },
  { icon: Upload, title: "Facturen uploaden", text: "Heb je facturen van aanpassingen of materialen? Upload ze via het formulier. Lukt dit niet? De taxateur bespreekt dit ter plekke met je." },
];

const CamperInformatieformulier = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [f, setF] = useState<Record<string, string>>({});
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [facturen, setFacturen] = useState<File[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const s = (key: string, val: string) => setF(prev => ({ ...prev, [key]: val }));
  const g = (key: string) => f[key] || "";
  const tog = (key: string) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  const isOn = (key: string) => !!toggles[key];

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const np = Array.from(files).filter(f => f.size <= 10 * 1024 * 1024).slice(0, 20 - photos.length).map(file => ({ file, preview: URL.createObjectURL(file) }));
    setPhotos(prev => [...prev, ...np].slice(0, 20));
  };
  const removePhoto = (i: number) => { setPhotos(prev => { URL.revokeObjectURL(prev[i].preview); return prev.filter((_, idx) => idx !== i); }); };

  const addFacturen = (files: FileList | null) => {
    if (!files) return;
    const nf = Array.from(files).filter(f => f.size <= 10 * 1024 * 1024);
    setFacturen(prev => [...prev, ...nf]);
  };
  const removeFactuur = (i: number) => setFacturen(prev => prev.filter((_, idx) => idx !== i));

  const sanitizeName = (name: string) =>
    name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);

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
      const fotoPaths = await uploadFiles(photos.map(p => p.file), folder, "fotos");
      const factuurPaths = await uploadFiles(facturen, folder, "facturen");

      const { data, error } = await supabase.functions.invoke("verstuur-aanvraag", {
        body: {
          bron: "camper-informatieformulier",
          service_type: "Camper Informatieformulier",
          naam: f.naam || null,
          email: f.email || null,
          telefoon: f.telefoon || null,
          kenteken: f.kenteken || null,
          postcode: f.postcode || null,
          adres: f.adres || null,
          bericht: f.opmerkingen || null,
          payload: { velden: f, toggles, fotos_aantal: photos.length, facturen_aantal: facturen.length },
          fotos: fotoPaths,
          facturen: factuurPaths,
        },
      });
      if (error || (data as { error?: string })?.error) {
        throw new Error((data as { error?: string })?.error || error?.message || "Onbekende fout");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(
        "Versturen is helaas mislukt. Bel 085 483 2461 of stuur een WhatsApp naar 06 50694978."
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  /* ───── Toggle item with optional expanded fields ───── */
  const TogItem = ({ k, label, children }: { k: string; label: string; children?: React.ReactNode }) => (
    <div className="space-y-2">
      <Tog label={label} k={k} isOn={isOn} tog={tog} />
      {isOn(k) && children}
      {isOn(k) && !children && <Remark value={g(k+"_remark")} onChange={v=>s(k+"_remark",v)} />}
    </div>
  );

  return (
    <>
      <PageMeta title="Camper Informatieformulier | Automobiel Taxaties" description="Vul het online informatieformulier in voor jou campertaxatie. Help ons jouw camper zo volledig mogelijk in beeld te brengen." />
      <SiteHeader />

      {/* Hero */}
      <section className="flex items-center" style={{ height: 320, minHeight: 320, background: '#1d3c71' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
          <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: '#ff751f' }}>CAMPER TAXATIE</p>
          <h1 className="text-white font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>Online informatieformulier</h1>
          <p className="text-white/80 text-lg max-w-[560px]" style={{ lineHeight: 1.7 }}>Help ons jouw camper zo volledig mogelijk in beeld te brengen.<br />Zo maken wij het meest complete taxatierapport voor jou.</p>
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
          <p className="text-sm italic text-muted-foreground text-center">NB: Aan de camper gewerkte uren worden niet meegenomen in de waardebepaling.</p>
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
              <p className="text-sm text-muted-foreground mb-8">Lukt het niet om alles digitaal aan te leveren? Geen probleem, onze taxateur bespreekt dit tijdens de inspectie met je.</p>

              <Accordion type="multiple" defaultValue={["opdrachtgever"]} className="space-y-3">

                {/* ─── Sectie 1: Opdrachtgever ─── */}
                <AccordionItem value="opdrachtgever" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>1. Gegevens opdrachtgever</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Voorletters en achternaam *</Label><Input required value={g("naam")} onChange={e=>s("naam",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5"><Label>Telefoonnummer *</Label><Input required type="tel" value={g("telefoon")} onChange={e=>s("telefoon",e.target.value)} className="h-10" /></div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Straatnaam en huisnummer</Label><Input value={g("adres")} onChange={e=>s("adres",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5"><Label>Postcode en woonplaats</Label><Input value={g("postcode")} onChange={e=>s("postcode",e.target.value)} className="h-10" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>E-mailadres *</Label><Input required type="email" value={g("email")} onChange={e=>s("email",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5"><Label>Verzekeraar</Label><Input value={g("verzekeraar")} onChange={e=>s("verzekeraar",e.target.value)} className="h-10" /></div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Sectie 2: Algemeen ─── */}
                <AccordionItem value="algemeen" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>2. Algemene gegevens camper</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label>Kenteken *</Label><Input required value={g("kenteken")} onChange={e=>s("kenteken",e.target.value)} className="h-10" /></div>
                      <div className="space-y-1.5">
                        <Label>Stalling</Label>
                        <Select value={g("stalling")} onValueChange={v=>s("stalling",v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>{["Garage","Oprit","Straat","Camperplaats","Anders"].map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <TogItem k="import" label="Importvoertuig" />
                      <div className="space-y-1.5">
                        <Label>Soort gebruik</Label>
                        <Select value={g("gebruik")} onValueChange={v=>s("gebruik",v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent>{["Recreatief","Verhuur"].map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <TogItem k="kwarttarief" label="Kwart-tarief al aangevraagd?" />
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Sectie 3: Beveiliging ─── */}
                <AccordionItem value="beveiliging" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>3. Beveiliging</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <TogItem k="bev_aanwezig" label="Beveiliging aanwezig">
                      <Txt placeholder="Beveiliging soort" value={g("bev_aanwezig_soort")} onChange={v=>s("bev_aanwezig_soort",v)} />
                      <Remark value={g("bev_aanwezig_remark")} onChange={v=>s("bev_aanwezig_remark",v)} />
                    </TogItem>
                    <TogItem k="scm" label="SCM certificaat">
                      <Txt placeholder="Beveiliging klasse" value={g("scm_detail")} onChange={v=>s("scm_detail",v)} />
                      <Remark value={g("scm_remark")} onChange={v=>s("scm_remark",v)} />
                    </TogItem>
                    <TogItem k="volgsysteem" label="Voertuigvolgsysteem">
                      <Remark value={g("volgsysteem_remark")} onChange={v=>s("volgsysteem_remark",v)} />
                    </TogItem>
                    <TogItem k="versnellingsbakslot" label="Mechanisch versnellingsbakslot">
                      <Remark value={g("versnellingsbakslot_remark")} onChange={v=>s("versnellingsbakslot_remark",v)} />
                    </TogItem>
                    <TogItem k="stuurslot" label="Mechanisch stuurslot">
                      <Remark value={g("stuurslot_remark")} onChange={v=>s("stuurslot_remark",v)} />
                    </TogItem>
                    <TogItem k="extrasloten" label="Extra sloten">
                      <Txt placeholder="Klasse" value={g("extrasloten_detail")} onChange={v=>s("extrasloten_detail",v)} />
                      <Remark value={g("extrasloten_remark")} onChange={v=>s("extrasloten_remark",v)} />
                    </TogItem>
                    <TogItem k="startonderbreker" label="AF-fabriek startonderbreker">
                      <Remark value={g("startonderbreker_remark")} onChange={v=>s("startonderbreker_remark",v)} />
                    </TogItem>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Sectie 4: Techniek en comfort ─── */}
                <AccordionItem value="techniek" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>4. Techniek en comfort</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <TogItem k="cruisecontrol" label="Cruisecontrol" />
                    <TogItem k="motorairco" label="Motorairco" />
                    <TogItem k="vuilwatertank" label="Inhoud vuilwatertank">
                      <Txt placeholder="Inhoud (liter)" value={g("vuilwatertank_liter")} onChange={v=>s("vuilwatertank_liter",v)} />
                      <Remark value={g("vuilwatertank_remark")} onChange={v=>s("vuilwatertank_remark",v)} />
                    </TogItem>
                    <TogItem k="schoonwatertank" label="Inhoud schoonwatertank">
                      <Txt placeholder="Inhoud (liter)" value={g("schoonwatertank_liter")} onChange={v=>s("schoonwatertank_liter",v)} />
                      <Remark value={g("schoonwatertank_remark")} onChange={v=>s("schoonwatertank_remark",v)} />
                    </TogItem>
                    <TogItem k="lpg_fles" label="LPG losse fles">
                      <DateField label="Keuringsdatum fles" value={g("lpg_fles_datum")} onChange={v=>s("lpg_fles_datum",v)} />
                      <Remark value={g("lpg_fles_remark")} onChange={v=>s("lpg_fles_remark",v)} />
                    </TogItem>
                    <TogItem k="lpg_inbouw" label="LPG in/onderbouw">
                      <DateField label="Keuringsdatum LPG" value={g("lpg_inbouw_datum")} onChange={v=>s("lpg_inbouw_datum",v)} />
                      <Remark value={g("lpg_inbouw_remark")} onChange={v=>s("lpg_inbouw_remark",v)} />
                    </TogItem>
                    <TogItem k="gasdrukregelaar" label="Gasdrukregelaar">
                      <DateField label="Keuringsdatum" value={g("gasdrukregelaar_datum")} onChange={v=>s("gasdrukregelaar_datum",v)} />
                      <Remark value={g("gasdrukregelaar_remark")} onChange={v=>s("gasdrukregelaar_remark",v)} />
                    </TogItem>
                    <TogItem k="gasslangen" label="Gasslangen">
                      <DateField label="Keuringsdatum" value={g("gasslangen_datum")} onChange={v=>s("gasslangen_datum",v)} />
                      <Remark value={g("gasslangen_remark")} onChange={v=>s("gasslangen_remark",v)} />
                    </TogItem>
                    <TogItem k="thermisch" label="Thermisch beveiligd" />
                    <TogItem k="verwarming" label="Verwarming">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Soort" value={g("verwarming_soort")} onChange={v=>s("verwarming_soort",v)} />
                        <Txt placeholder="Merk" value={g("verwarming_merk")} onChange={v=>s("verwarming_merk",v)} />
                        <Txt placeholder="Type" value={g("verwarming_type")} onChange={v=>s("verwarming_type",v)} />
                        <Txt placeholder="Voltage" value={g("verwarming_voltage")} onChange={v=>s("verwarming_voltage",v)} />
                      </div>
                      <Remark value={g("verwarming_remark")} onChange={v=>s("verwarming_remark",v)} />
                    </TogItem>
                    <TogItem k="aardlekschakelaar" label="Aardlekschakelaar" />
                    <TogItem k="gezekerd" label="Gezekerd" />
                    <TogItem k="boordaccu" label="Boordaccu">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("boordaccu_merk")} onChange={v=>s("boordaccu_merk",v)} />
                        <Txt placeholder="Type" value={g("boordaccu_type")} onChange={v=>s("boordaccu_type",v)} />
                      </div>
                      <Remark value={g("boordaccu_remark")} onChange={v=>s("boordaccu_remark",v)} />
                    </TogItem>
                    <TogItem k="startaccu" label="Startaccu">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("startaccu_merk")} onChange={v=>s("startaccu_merk",v)} />
                        <Txt placeholder="Type" value={g("startaccu_type")} onChange={v=>s("startaccu_type",v)} />
                      </div>
                      <Remark value={g("startaccu_remark")} onChange={v=>s("startaccu_remark",v)} />
                    </TogItem>
                    <TogItem k="brandmelder" label="Brandmelder">
                      <Txt placeholder="Aantal" value={g("brandmelder_aantal")} onChange={v=>s("brandmelder_aantal",v)} />
                      <Remark value={g("brandmelder_remark")} onChange={v=>s("brandmelder_remark",v)} />
                    </TogItem>
                    <TogItem k="brandblusapparaat" label="Brandblusapparaat">
                      <DateField label="Houdbaar tot" value={g("brandblusapparaat_datum")} onChange={v=>s("brandblusapparaat_datum",v)} />
                      <Remark value={g("brandblusapparaat_remark")} onChange={v=>s("brandblusapparaat_remark",v)} />
                    </TogItem>
                    <TogItem k="gasdetectie" label="Gasdetectie" />
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Sectie 5: Binnenzijde ─── */}
                <AccordionItem value="binnenzijde" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>5. Binnenzijde camper</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <TogItem k="verduistering" label="Verduistering voorruit" />
                    <TogItem k="gordijnen" label="Gordijnen" />
                    <TogItem k="airco" label="Airco">
                      <SubTog label="Airco voor" k="airco_voor" isOn={isOn} tog={tog} />
                      <SubTog label="Airco achter" k="airco_achter" isOn={isOn} tog={tog} />
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("airco_merk")} onChange={v=>s("airco_merk",v)} />
                        <Txt placeholder="Type" value={g("airco_type")} onChange={v=>s("airco_type",v)} />
                      </div>
                      <Remark value={g("airco_remark")} onChange={v=>s("airco_remark",v)} />
                    </TogItem>
                    <TogItem k="omvormer" label="Omvormer">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("omvormer_merk")} onChange={v=>s("omvormer_merk",v)} />
                        <Txt placeholder="Type" value={g("omvormer_type")} onChange={v=>s("omvormer_type",v)} />
                        <Txt placeholder="Voltage" value={g("omvormer_voltage")} onChange={v=>s("omvormer_voltage",v)} />
                        <Txt placeholder="Wattage" value={g("omvormer_wattage")} onChange={v=>s("omvormer_wattage",v)} />
                      </div>
                      <Remark value={g("omvormer_remark")} onChange={v=>s("omvormer_remark",v)} />
                    </TogItem>
                    <TogItem k="extraisolatie" label="Extra isolatie">
                      <SubTog label="Binnen isolatie voor wintersport" k="isolatie_wintersport" isOn={isOn} tog={tog} />
                      <Remark value={g("extraisolatie_remark")} onChange={v=>s("extraisolatie_remark",v)} />
                    </TogItem>
                    <TogItem k="dubbelebodem" label="Dubbele bodem" />
                    <TogItem k="leveler" label="Automatisch leveler systeem">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("leveler_merk")} onChange={v=>s("leveler_merk",v)} />
                        <Txt placeholder="Type" value={g("leveler_type")} onChange={v=>s("leveler_type",v)} />
                      </div>
                      <Remark value={g("leveler_remark")} onChange={v=>s("leveler_remark",v)} />
                    </TogItem>
                    <TogItem k="mistlampen" label="Mistlampen achter" />
                    <TogItem k="sportstoelen" label="Sportstoelen">
                      <Txt placeholder="Merk" value={g("sportstoelen_merk")} onChange={v=>s("sportstoelen_merk",v)} />
                      <Remark value={g("sportstoelen_remark")} onChange={v=>s("sportstoelen_remark",v)} />
                    </TogItem>
                    <TogItem k="vasttoilet" label="Vast toilet met vaste opvangtank" />
                    <TogItem k="wifi" label="Wifi versterker">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("wifi_merk")} onChange={v=>s("wifi_merk",v)} />
                        <Txt placeholder="Type" value={g("wifi_type")} onChange={v=>s("wifi_type",v)} />
                      </div>
                      <Remark value={g("wifi_remark")} onChange={v=>s("wifi_remark",v)} />
                    </TogItem>
                    <TogItem k="achteruitrijcamera" label="Achteruitrijcamera" />
                    <TogItem k="kluis" label="Kluis" />
                    <TogItem k="audio" label="Audio installatie">
                      <SubTog label="Radio met CD-speler" k="audio_radio_cd" isOn={isOn} tog={tog} />
                      <SubTog label="Sonos" k="audio_sonos" isOn={isOn} tog={tog} />
                      <Remark value={g("audio_remark")} onChange={v=>s("audio_remark",v)} />
                    </TogItem>
                    <TogItem k="navigatie" label="Navigatiesysteem">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Type</Label>
                        <Select value={g("navigatie_type")} onValueChange={v=>s("navigatie_type",v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent><SelectItem value="Los">Los</SelectItem><SelectItem value="Vast">Vast</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <Txt placeholder="Merk" value={g("navigatie_merk")} onChange={v=>s("navigatie_merk",v)} />
                      <Remark value={g("navigatie_remark")} onChange={v=>s("navigatie_remark",v)} />
                    </TogItem>
                    <TogItem k="afzuiging" label="Mechanische afzuiging">
                      <SubTog label="Afzuigkap" k="afzuiging_kap" isOn={isOn} tog={tog} />
                      <SubTog label="Ventilator in het dak" k="afzuiging_dak" isOn={isOn} tog={tog} />
                      <Remark value={g("afzuiging_remark")} onChange={v=>s("afzuiging_remark",v)} />
                    </TogItem>
                    <TogItem k="warmwater" label="Warmwatervoorziening">
                      <SubTog label="Combiketel" k="warmwater_combi" isOn={isOn} tog={tog} />
                      <SubTog label="Boiler" k="warmwater_boiler" isOn={isOn} tog={tog} />
                      <Remark value={g("warmwater_remark")} onChange={v=>s("warmwater_remark",v)} />
                    </TogItem>
                    <TogItem k="tv" label="TV">
                      <SubTog label="Flatscreen" k="tv_flatscreen" isOn={isOn} tog={tog} />
                      <SubTog label="DVD-speler" k="tv_dvd" isOn={isOn} tog={tog} />
                      <Txt placeholder="Aantal TV's" value={g("tv_aantal")} onChange={v=>s("tv_aantal",v)} />
                      <Remark value={g("tv_remark")} onChange={v=>s("tv_remark",v)} />
                    </TogItem>
                    <TogItem k="toiletruimte" label="Toiletruimte">
                      <SubTog label="Douche" k="toilet_douche" isOn={isOn} tog={tog} />
                      <SubTog label="Cassettetoilet" k="toilet_cassette" isOn={isOn} tog={tog} />
                      <SubTog label="SOG afzuiging" k="toilet_sog" isOn={isOn} tog={tog} />
                      <Remark value={g("toiletruimte_remark")} onChange={v=>s("toiletruimte_remark",v)} />
                    </TogItem>
                    <TogItem k="raambekleding" label="Raambekleding">
                      <SubTog label="Combirollo's" k="raam_combirollo" isOn={isOn} tog={tog} />
                      <SubTog label="Hordeur" k="raam_hordeur" isOn={isOn} tog={tog} />
                      <SubTog label="Plissedeur" k="raam_plissedeur" isOn={isOn} tog={tog} />
                      <Remark value={g("raambekleding_remark")} onChange={v=>s("raambekleding_remark",v)} />
                    </TogItem>
                    <TogItem k="keuken" label="Keuken">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Koelkast type</Label>
                        <Select value={g("keuken_koelkast")} onValueChange={v=>s("keuken_koelkast",v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent><SelectItem value="Gas">Gas</SelectItem><SelectItem value="Elektrisch">Elektrisch</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <SubTog label="Diepvries" k="keuken_diepvries" isOn={isOn} tog={tog} />
                      <SubTog label="Fornuis 3-pits" k="keuken_fornuis" isOn={isOn} tog={tog} />
                      <SubTog label="Magnetron" k="keuken_magnetron" isOn={isOn} tog={tog} />
                      <SubTog label="Oven" k="keuken_oven" isOn={isOn} tog={tog} />
                      <Remark value={g("keuken_remark")} onChange={v=>s("keuken_remark",v)} />
                    </TogItem>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Sectie 6: Buitenzijde ─── */}
                <AccordionItem value="buitenzijde" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>6. Buitenzijde camper</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4">
                    <TogItem k="garage" label="Vaste garage achterin">
                      <SubTog label="Enkele deur" k="garage_enkel" isOn={isOn} tog={tog} />
                      <SubTog label="Dubbele deur" k="garage_dubbel" isOn={isOn} tog={tog} />
                      <Remark value={g("garage_remark")} onChange={v=>s("garage_remark",v)} />
                    </TogItem>
                    <TogItem k="luifel" label="Luifel">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Type</Label>
                        <Select value={g("luifel_soort")} onValueChange={v=>s("luifel_soort",v)}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Kies..." /></SelectTrigger>
                          <SelectContent><SelectItem value="Vast">Vast</SelectItem><SelectItem value="Elektrisch">Elektrisch</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Txt placeholder="Merk" value={g("luifel_merk")} onChange={v=>s("luifel_merk",v)} />
                        <Txt placeholder="Type" value={g("luifel_type")} onChange={v=>s("luifel_type",v)} />
                        <Txt placeholder="Lengte" value={g("luifel_lengte")} onChange={v=>s("luifel_lengte",v)} />
                      </div>
                      <Remark value={g("luifel_remark")} onChange={v=>s("luifel_remark",v)} />
                    </TogItem>
                    <TogItem k="tent" label="Tent">
                      <Txt placeholder="Type" value={g("tent_type")} onChange={v=>s("tent_type",v)} />
                      <Remark value={g("tent_remark")} onChange={v=>s("tent_remark",v)} />
                    </TogItem>
                    <TogItem k="trekhaak" label="Trekhaak" />
                    <TogItem k="opstap" label="Opstap">
                      <SubTog label="Elektrisch bediend" k="opstap_elektrisch" isOn={isOn} tog={tog} />
                      <Txt placeholder="Merk" value={g("opstap_merk")} onChange={v=>s("opstap_merk",v)} />
                      <Remark value={g("opstap_remark")} onChange={v=>s("opstap_remark",v)} />
                    </TogItem>
                    <TogItem k="aggregaat" label="Aggregaat">
                      <div className="grid grid-cols-3 gap-2">
                        <Txt placeholder="Merk" value={g("aggregaat_merk")} onChange={v=>s("aggregaat_merk",v)} />
                        <Txt placeholder="Type" value={g("aggregaat_type")} onChange={v=>s("aggregaat_type",v)} />
                        <Txt placeholder="Voltage" value={g("aggregaat_voltage")} onChange={v=>s("aggregaat_voltage",v)} />
                      </div>
                      <Remark value={g("aggregaat_remark")} onChange={v=>s("aggregaat_remark",v)} />
                    </TogItem>
                    <TogItem k="schotelantenne" label="Schotelantenne">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("schotelantenne_merk")} onChange={v=>s("schotelantenne_merk",v)} />
                        <Txt placeholder="Type" value={g("schotelantenne_type")} onChange={v=>s("schotelantenne_type",v)} />
                      </div>
                      <Remark value={g("schotelantenne_remark")} onChange={v=>s("schotelantenne_remark",v)} />
                    </TogItem>
                    <TogItem k="fietsendrager" label="Fietsendrager">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("fietsendrager_merk")} onChange={v=>s("fietsendrager_merk",v)} />
                        <Txt placeholder="Type" value={g("fietsendrager_type")} onChange={v=>s("fietsendrager_type",v)} />
                      </div>
                      <Remark value={g("fietsendrager_remark")} onChange={v=>s("fietsendrager_remark",v)} />
                    </TogItem>
                    <TogItem k="dakreling" label="Dakreling" />
                    <TogItem k="buitengas" label="Buitengasaansluiting">
                      <div className="grid grid-cols-2 gap-2">
                        <Txt placeholder="Merk" value={g("buitengas_merk")} onChange={v=>s("buitengas_merk",v)} />
                        <Txt placeholder="Type" value={g("buitengas_type")} onChange={v=>s("buitengas_type",v)} />
                      </div>
                      <Remark value={g("buitengas_remark")} onChange={v=>s("buitengas_remark",v)} />
                    </TogItem>
                    <TogItem k="zonnepanelen" label="Zonnepanelen">
                      <div className="grid grid-cols-3 gap-2">
                        <Txt placeholder="Merk" value={g("zonnepanelen_merk")} onChange={v=>s("zonnepanelen_merk",v)} />
                        <Txt placeholder="Type" value={g("zonnepanelen_type")} onChange={v=>s("zonnepanelen_type",v)} />
                        <Txt placeholder="Aantal" value={g("zonnepanelen_aantal")} onChange={v=>s("zonnepanelen_aantal",v)} />
                      </div>
                      <Remark value={g("zonnepanelen_remark")} onChange={v=>s("zonnepanelen_remark",v)} />
                    </TogItem>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Sectie 7: Aanvullend ─── */}
                <AccordionItem value="aanvullend" className="border rounded-lg px-5">
                  <AccordionTrigger className="text-base font-semibold" style={{ color: '#1d3c71' }}>7. Aanvullende informatie</AccordionTrigger>
                  <AccordionContent className="space-y-5 pt-2 pb-4">
                    <div className="space-y-1.5">
                      <Label>Overige bijzonderheden, aanpassingen of opmerkingen</Label>
                      <Textarea rows={5} className="resize-none" value={g("opmerkingen")} onChange={e=>s("opmerkingen",e.target.value)} />
                    </div>

                    {/* Photo upload */}
                    <div className="space-y-2">
                      <Label>Foto's van de camper (optioneel)</Label>
                      <div
                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/30"
                        onClick={() => photoInputRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-primary"); }}
                        onDragLeave={e => e.currentTarget.classList.remove("border-primary")}
                        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("border-primary"); addPhotos(e.dataTransfer.files); }}
                      >
                        <ImagePlus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground/70">Klik of sleep foto's hierheen</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, HEIC. Max 10 MB per foto, max 20 foto's.</p>
                        <input ref={photoInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.heic" className="hidden" onChange={e => addPhotos(e.target.files)} />
                      </div>
                      {photos.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
                          {photos.map((p, i) => (
                            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border">
                              <img src={p.preview} alt="" className="w-full h-full object-cover" />
                              <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">Upload foto's van de binnen- en buitenzijde, aanpassingen en bijzonderheden.</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Upload facturen, bonnen of documentatie (PDF, JPG, PNG, max 10 MB per bestand)</Label>
                      <Input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="h-auto py-2" onChange={e => addFacturen(e.target.files)} />
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
                    </div>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Agreement + submit */}
              <div className="mt-8 space-y-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 rounded border-input accent-[#ff751f]" required />
                  <span className="text-sm text-foreground/80">Ik verklaar hierbij dat alles naar waarheid is ingevuld.</span>
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
                <p className="text-xs text-muted-foreground text-center">We gaan zorgvuldig om met jouw gegevens en gebruiken deze alleen voor het verwerken van je taxatie.</p>
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
