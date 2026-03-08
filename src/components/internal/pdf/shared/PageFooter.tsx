import { View, Text, Image } from '@react-pdf/renderer';
import paraafErik from '@/assets/paraaf-erik-elderson.png';

interface PageFooterProps {
  pageNumber: number;
  totalPages: number;
  variant?: 'standard' | 'cover' | 'photos';
  photoPageIndex?: number;
}

export function PageFooter({ pageNumber, totalPages, variant = 'standard', photoPageIndex }: PageFooterProps) {
  if (variant === 'cover') {
    return (
      <View style={{
        position: 'absolute',
        bottom: 56,
        left: 71,
        right: 56,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View>
            <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 3 }}>
              Automobiel Taxaties
            </Text>
            <Text style={{ fontSize: 8.5, color: '#000000', marginBottom: 1.5 }}>
              Leigraaf 160, 6651 GJ Druten
            </Text>
            <Text style={{ fontSize: 8.5, color: '#000000', marginBottom: 1.5 }}>
              KvK: 95549269 · BTW: NL003366178B93
            </Text>
            <Text style={{ fontSize: 8.5, color: '#000000', marginBottom: 1.5 }}>
              TMV: 33106 · VRT: 22-523-M
            </Text>
            <Text style={{ fontSize: 8.5, color: '#000000' }}>
              Bank: NL80 RABO 0387 9156 80
            </Text>
          </View>
          <Text style={{ fontSize: 8.5, color: '#000000' }}>
            Pagina 1 van {totalPages}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{
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
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#000000' }}>Automobiel Taxaties</Text>
        <Text style={{ fontSize: 9, color: '#000000', marginHorizontal: 4 }}>|</Text>
        <Text style={{ fontSize: 9, color: '#000000' }}>Leigraaf 160, 6651 GJ Druten</Text>
        <Text style={{ fontSize: 9, color: '#000000', marginHorizontal: 4 }}>|</Text>
        <Text style={{ fontSize: 9, color: '#000000' }}>KVK: 95549269</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 8, color: '#000000' }}>Paraaf</Text>
        <Image src={paraafErik} style={{ height: 18, width: 'auto', opacity: 0.85 }} />
        <Text style={{ fontSize: 9, color: '#000000', marginLeft: 8 }}>
          {variant === 'photos' 
            ? `Fotobijlage ${(photoPageIndex ?? 0) + 1}`
            : `Pagina ${pageNumber} van ${totalPages}`
          }
        </Text>
      </View>
    </View>
  );
}
