import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MapScreen() {
  const router = useRouter();

  const barbearias = [
    {
      id: 1,
      nome: 'Barbearia Gonzaga',
      distancia: '300 m',
      tempo: '15 min',
      nota: '4.8',
      reviews: '845 avaliações',
      top: '26%',
      left: '18%',
    },
    {
      id: 2,
      nome: 'Top Style Barbershop',
      distancia: '600 m',
      tempo: '10 min',
      nota: '4.7',
      reviews: '30 avaliações',
      top: '45%',
      left: '62%',
    },
    {
      id: 3,
      nome: 'Classic Barber House',
      distancia: '1 km',
      tempo: '18 min',
      nota: '4.9',
      reviews: '210 avaliações',
      top: '67%',
      left: '24%',
    },
  ];

  const [selecionada, setSelecionada] = useState(barbearias[1]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MAPA DE BARBEARIAS</Text>
      </View>

      <View style={styles.searchBox}>
        <Feather name="search" size={18} color="#999" />
        <TextInput
          placeholder="Buscar por nome ou localização"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <Ionicons name="options-outline" size={18} color="#999" />
      </View>

      <View style={styles.mapWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200',
          }}
          style={styles.map}
          imageStyle={styles.mapImage}
        >
          <View style={styles.mapOverlay} />

          {barbearias.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.pinContainer,
                { top: item.top as any, left: item.left as any },
              ]}
              onPress={() => setSelecionada(item)}
            >
              <View
                style={[
                  styles.pin,
                  selecionada.id === item.id && styles.pinActive,
                ]}
              >
                <Ionicons
                  name="cut-outline"
                  size={18}
                  color={selecionada.id === item.id ? '#111' : '#d4af37'}
                />
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.floatingCard}>
            <View style={styles.floatingTop}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={22} color="#d4af37" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.floatingName}>{selecionada.nome}</Text>

                <View style={styles.ratingRow}>
                  <FontAwesome name="star" size={12} color="#f5c451" />
                  <Text style={styles.ratingText}>{selecionada.nota}</Text>
                  <Text style={styles.reviewText}>{selecionada.reviews}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={14} color="#bbb" />
                <Text style={styles.infoText}>{selecionada.distancia}</Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={14} color="#bbb" />
                <Text style={styles.infoText}>{selecionada.tempo}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/barber-details')}
            >
              <Text style={styles.primaryButtonText}>Ver detalhes</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Barbearias em destaque</Text>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Text style={styles.seeAll}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsRow}
      >
        {barbearias.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              selecionada.id === item.id && styles.cardActive,
            ]}
            onPress={() => setSelecionada(item)}
          >
            <View style={styles.cardTopRow}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <View style={styles.noteBox}>
                <FontAwesome name="star" size={12} color="#f5c451" />
                <Text style={styles.noteText}>{item.nota}</Text>
              </View>
            </View>

            <Text style={styles.cardReview}>{item.reviews}</Text>

            <View style={styles.cardInfoRow}>
              <View style={styles.cardInfoItem}>
                <Ionicons name="location-outline" size={14} color="#bbb" />
                <Text style={styles.cardInfoText}>{item.distancia}</Text>
              </View>

              <View style={styles.cardInfoItem}>
                <Ionicons name="time-outline" size={14} color="#bbb" />
                <Text style={styles.cardInfoText}>{item.tempo}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.scheduleButton}
              onPress={() => router.push('/barber-details')}
            >
              <Text style={styles.scheduleButtonText}>Agendar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#e2c98b',
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  headerTitle: {
    color: '#111',
    fontWeight: '700',
    fontSize: 16,
  },
  searchBox: {
    marginTop: 16,
    backgroundColor: '#151515',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginHorizontal: 10,
  },
  mapWrapper: {
    marginTop: 16,
    height: 390,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },
  map: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  mapImage: {
    borderRadius: 22,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  pinContainer: {
    position: 'absolute',
    zIndex: 3,
  },
  pin: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinActive: {
    backgroundColor: '#d4af37',
  },
  floatingCard: {
    zIndex: 4,
    backgroundColor: 'rgba(17,17,17,0.95)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginTop: 'auto',
  },
  floatingTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1d1d1d',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  floatingName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  ratingText: {
    color: '#fff',
    fontSize: 13,
  },
  reviewText: {
    color: '#999',
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 12,
    marginBottom: 14,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    color: '#bbb',
    fontSize: 13,
  },
  primaryButton: {
    height: 44,
    backgroundColor: '#d4af37',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 15,
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  seeAll: {
    color: '#d4af37',
    fontSize: 13,
    fontWeight: '700',
  },
  cardsRow: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    width: 260,
    backgroundColor: '#151515',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#232323',
  },
  cardActive: {
    borderColor: '#d4af37',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noteText: {
    color: '#fff',
    fontSize: 13,
  },
  cardReview: {
    color: '#999',
    marginTop: 6,
    fontSize: 13,
  },
  cardInfoRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
    marginBottom: 14,
  },
  cardInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardInfoText: {
    color: '#bbb',
    fontSize: 13,
  },
  scheduleButton: {
    height: 42,
    backgroundColor: '#d4af37',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 14,
  },
});