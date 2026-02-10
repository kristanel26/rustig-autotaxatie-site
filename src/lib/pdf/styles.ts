import { StyleSheet } from '@react-pdf/renderer';

/**
 * Centralized PDF styles — matching existing report typography.
 * Uses Helvetica (built-in) for maximum compatibility.
 */
export const pdfStyles = StyleSheet.create({
  // === PAGE LAYOUT ===
  page: {
    paddingTop: 56, // ~20mm
    paddingBottom: 56,
    paddingLeft: 71, // ~25mm
    paddingRight: 56, // ~20mm
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.4,
    color: '#000000',
  },
  pageStandard: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 28,
    paddingRight: 28,
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.4,
    color: '#000000',
  },

  // === TYPOGRAPHY ===
  h1: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 12,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  h1Cover: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  h2: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#000000',
  },
  h3: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    color: '#000000',
  },
  body: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#000000',
  },
  bodyLarge: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.7,
    color: '#000000',
  },
  label: {
    fontSize: 8,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  valueLarge: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginTop: 3,
  },
  valueSmaller: {
    fontSize: 10,
    color: '#000000',
    marginTop: 1.5,
  },

  // === LAYOUT COMPONENTS ===
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  col: {
    flex: 1,
  },
  col50: {
    width: '50%',
  },

  // === TABLE ===
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingVertical: 4,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    paddingVertical: 3,
  },
  sectionHeader: {
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },

  // === FOOTER ===
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 28,
    right: 28,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerCover: {
    position: 'absolute',
    bottom: 56,
    left: 71,
    right: 56,
  },

  // === SPACING ===
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mb32: { marginBottom: 32 },
  mt8: { marginTop: 8 },
  mt16: { marginTop: 16 },
  mt24: { marginTop: 24 },
});
