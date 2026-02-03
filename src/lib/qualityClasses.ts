// Quality class definitions for appraisal reports
// These are the exact values stored in the database

export interface QualityClass {
  value: string;
  label: string;
  description: string;
}

export const qualityClasses: QualityClass[] = [
  {
    value: 'Uitmuntend',
    label: 'Uitmuntend',
    description: 'Optisch en technisch in topstaat. Origineel, zonder waarneembare gebreken, beschadigingen of gebruikssporen. Restauratie volgens destijds geldende specificaties. Potentieel concourswinnaar.',
  },
  {
    value: 'Zeer goed',
    label: 'Zeer goed',
    description: 'In zeer goede, niet-gerestaureerde staat verkerend voertuig dan wel vakkundig gerestaureerd. Met geringe gebruikssporen.',
  },
  {
    value: 'Goed',
    label: 'Goed',
    description: 'In gebruikte toestand met normale gebruikssporen overeenkomstig de ouderdom van het voertuig. Carrosserie in goede staat.',
  },
  {
    value: 'Matig',
    label: 'Matig',
    description: 'Een voertuig dat nog wel inzetbaar is. Compleet in alle onderdelen. Wel met direct zichtbare gebruiks- en slijtage­sporen. Enige corrosie mogelijk. Eenvoudige reparaties zijn noodzakelijk.',
  },
  {
    value: 'Slecht',
    label: 'Slecht',
    description: 'Niet rijklare toestand. Veel werk nodig aan het gehele voertuig om het weer rijvaardig te maken. Er ontbreken dikwijls meerdere onderdelen.',
  },
];

export const getQualityClassByValue = (value: string | null): QualityClass | undefined => {
  if (!value) return undefined;
  return qualityClasses.find((qc) => qc.value === value);
};
