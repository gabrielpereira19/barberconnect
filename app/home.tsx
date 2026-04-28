import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ScaleButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: any;
  activeOpacity?: number;
};

function ScaleButton({
  children,
  onPress,
  style,
  activeOpacity = 0.95,
}: ScaleButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function Home() {
  const router = useRouter();
  const [busca, setBusca] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const salvarFavorito = async (nome: string, distancia: string) => {
    try {
      const dados = await AsyncStorage.getItem('favoritos');
      const favoritos = dados ? JSON.parse(dados) : [];

      const jaExiste = favoritos.find((item: any) => item.nome === nome);

      if (jaExiste) {
        alert('Essa barbearia já está nos favoritos');
        return;
      }

      const novoFavorito = { nome, distancia };
      const novaLista = [...favoritos, novoFavorito];

      await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
      alert('Barbearia adicionada aos favoritos');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View style={styles.topArea}>
          <View style={styles.header}>
            <View>
              <Text style={styles.welcome}>Olá, Italo</Text>
              <Text style={styles.subtitle}>Encontre a barbearia ideal sem espera</Text>
            </View>

            <ScaleButton
  style={styles.notificationButton}
  onPress={() => router.push('/notifications')}
>
  <View style={styles.notificationButtonInner}>
    <Ionicons name="notifications-outline" size={22} color="#fff" />
  </View>
</ScaleButton>
          </View>

          <View style={styles.searchBox}>
            <Feather name="search" size={18} color="#8f8f8f" />
            <TextInput
  placeholder="Buscar barbeiros..."
  placeholderTextColor="#8f8f8f"
  style={styles.searchInput}
  value={busca}
  onChangeText={setBusca}
/>
            <Ionicons name="options-outline" size={20} color="#8f8f8f" />
          </View>

          <ScaleButton style={styles.heroCard} onPress={() => router.push('/map')}>
            <View>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200',
                }}
                style={styles.heroImage}
              />

              <View style={styles.heroOverlay} />

              <View style={styles.heroContent}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Localização em destaque</Text>
                </View>

                <Text style={styles.heroTitle}>Barbearias perto de você</Text>
                <Text style={styles.heroText}>
                  Veja no mapa, compare avaliações e agende em poucos toques.
                </Text>

                <View style={styles.heroButton}>
                  <Text style={styles.heroButtonText}>Abrir mapa</Text>
                </View>
              </View>
            </View>
          </ScaleButton>
        </View>

        <View style={styles.statsRow}>
          <ScaleButton style={styles.statCard}>
            <View style={styles.statCardInner}>
              <Text style={styles.statNumber}>12+</Text>
              <Text style={styles.statLabel}>Barbearias</Text>
            </View>
          </ScaleButton>

          <ScaleButton style={styles.statCard}>
            <View style={styles.statCardInner}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Média geral</Text>
            </View>
          </ScaleButton>

          <ScaleButton style={styles.statCard}>
            <View style={styles.statCardInner}>
              <Text style={styles.statNumber}>5 min</Text>
              <Text style={styles.statLabel}>Agendamento</Text>
            </View>
          </ScaleButton>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Barbearias próximas</Text>
            <Text style={styles.sectionSubtitle}>Escolha a melhor opção para hoje</Text>
          </View>

          <ScaleButton onPress={() => router.push('/map')}>
            <Text style={styles.seeAll}>Ver mapa</Text>
          </ScaleButton>
        </View>

        <ScaleButton
          style={styles.card}
          onPress={() =>
  router.push({
    pathname: '/barber-details',
    params: {
      nome: 'Barbearia Gonzaga',
      imagem: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=1200',
      distancia: '300 m',
      tempo: '15 min',
      nota: '4.8',
      avaliacoes: '845 avaliações',
    },
  })
}
          activeOpacity={0.92}
        >
          <View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=1200',
              }}
              style={styles.cardImage}
            />

            <View style={styles.cardBody}>
              <View style={styles.cardTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Barbearia Gonzaga</Text>

                  <View style={styles.reviewRow}>
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star-half-full" size={12} color="#f5c451" />
                    <Text style={styles.reviewText}>845 avaliações</Text>
                  </View>
                </View>

                <View style={styles.noteBox}>
                  <FontAwesome name="star" size={13} color="#f5c451" />
                  <Text style={styles.noteText}>4.8</Text>
                </View>
              </View>

              <View style={styles.cardInfoRow}>
                <View style={styles.infoItem}>
                  <Ionicons name="location-outline" size={14} color="#bbb" />
                  <Text style={styles.infoText}>300 m</Text>
                </View>

                <ScaleButton
                  style={styles.heartButton}
                  onPress={() => salvarFavorito('Barbearia Gonzaga', '300 m')}
                >
                  <View style={styles.heartButtonInner}>
                    <Ionicons name="heart-outline" size={17} color="#d4af37" />
                  </View>
                </ScaleButton>

                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={14} color="#bbb" />
                  <Text style={styles.infoText}>15 min</Text>
                </View>
              </View>

              <ScaleButton
                style={styles.actionButton}
                onPress={() => router.push('/barber-details')}
              >
                <View style={styles.actionButtonInner}>
                  <Text style={styles.actionButtonText}>Ver detalhes</Text>
                </View>
              </ScaleButton>
            </View>
          </View>
        </ScaleButton>
        <ScaleButton
  style={styles.card}
onPress={() =>
  router.push({
    pathname: '/barber-details',
    params: {
      nome: 'Barbearia Imperial',
      imagem: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200',
      distancia: '850 m',
      tempo: '18 min',
      nota: '4.6',
      avaliacoes: '126 avaliações',
    },
  })
}  activeOpacity={0.92}
>
  <View>
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200' }}
      style={styles.cardImage}
    />

    <View style={styles.cardBody}>
      <View style={styles.cardTopRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Barbearia Imperial</Text>

          <View style={styles.reviewRow}>
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star-half-full" size={12} color="#f5c451" />
            <Text style={styles.reviewText}>126 avaliações</Text>
          </View>
        </View>

        <View style={styles.noteBox}>
          <FontAwesome name="star" size={13} color="#f5c451" />
          <Text style={styles.noteText}>4.6</Text>
        </View>
      </View>

      <View style={styles.cardInfoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={14} color="#bbb" />
          <Text style={styles.infoText}>850 m</Text>
        </View>

        <ScaleButton
          style={styles.heartButton}
          onPress={() => salvarFavorito('Barbearia Imperial', '850 m')}
        >
          <View style={styles.heartButtonInner}>
            <Ionicons name="heart-outline" size={17} color="#d4af37" />
          </View>
        </ScaleButton>

        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={14} color="#bbb" />
          <Text style={styles.infoText}>18 min</Text>
        </View>
      </View>

      <ScaleButton
  style={styles.actionButton}
  onPress={() =>
    router.push({
      pathname: '/barber-details',
      params: {
        nome: 'Barbearia Imperial',
        imagem: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200',
        distancia: '850 m',
        tempo: '18 min',
        nota: '4.6',
        avaliacoes: '126 avaliações',
      },
    })
  }
>
        <View style={styles.actionButtonInner}>
          <Text style={styles.actionButtonText}>Ver detalhes</Text>
        </View>
      </ScaleButton>
    </View>
  </View>
</ScaleButton>

<ScaleButton
  style={styles.card}
  onPress={() =>
  router.push({
    pathname: '/barber-details',
    params: {
      nome: 'Navalha Premium',
      imagem: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200',
      distancia: '1,2 km',
      tempo: '20 min',
      nota: '4.9',
      avaliacoes: '210 avaliações',
    },
  })
}
  activeOpacity={0.92}
>
  <View>
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200' }}
      style={styles.cardImage}
    />

    <View style={styles.cardBody}>
      <View style={styles.cardTopRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Navalha Premium</Text>

          <View style={styles.reviewRow}>
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star-half-full" size={12} color="#f5c451" />
            <Text style={styles.reviewText}>210 avaliações</Text>
          </View>
        </View>

        <View style={styles.noteBox}>
          <FontAwesome name="star" size={13} color="#f5c451" />
          <Text style={styles.noteText}>4.9</Text>
        </View>
      </View>

      <View style={styles.cardInfoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={14} color="#bbb" />
          <Text style={styles.infoText}>1,2 km</Text>
        </View>

        <ScaleButton
          style={styles.heartButton}
          onPress={() => salvarFavorito('Navalha Premium', '1,2 km')}
        >
          <View style={styles.heartButtonInner}>
            <Ionicons name="heart-outline" size={17} color="#d4af37" />
          </View>
        </ScaleButton>

        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={14} color="#bbb" />
          <Text style={styles.infoText}>20 min</Text>
        </View>
      </View>

      <ScaleButton
  style={styles.actionButton}
  onPress={() =>
    router.push({
      pathname: '/barber-details',
      params: {
        nome: 'Navalha Premium',
        imagem: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200',
        distancia: '1,2 km',
        tempo: '20 min',
        nota: '4.9',
        avaliacoes: '210 avaliações',
      },
    })
  }
>
  <View style={styles.actionButtonInner}>
    <Text style={styles.actionButtonText}>Ver detalhes</Text>
  </View>
</ScaleButton>
    </View>
  </View>
</ScaleButton>

<ScaleButton
  style={styles.card}
 onPress={() =>
  router.push({
    pathname: '/barber-details',
    params: {
      nome: 'Navalha Premium',
      imagem: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200',
      distancia: '1,2 km',
      tempo: '20 min',
      nota: '4.9',
      avaliacoes: '210 avaliações',
    },
  })
}
  activeOpacity={0.92}
>
  <View>
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200' }}
      style={styles.cardImage}
    />

    <View style={styles.cardBody}>
      <View style={styles.cardTopRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Classic Barber House</Text>

          <View style={styles.reviewRow}>
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star" size={12} color="#f5c451" />
            <FontAwesome name="star-half-full" size={12} color="#f5c451" />
            <Text style={styles.reviewText}>398 avaliações</Text>
          </View>
        </View>

        <View style={styles.noteBox}>
          <FontAwesome name="star" size={13} color="#f5c451" />
          <Text style={styles.noteText}>4.8</Text>
        </View>
      </View>

      <View style={styles.cardInfoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={14} color="#bbb" />
          <Text style={styles.infoText}>1 km</Text>
        </View>

        <ScaleButton
          style={styles.heartButton}
          onPress={() => salvarFavorito('Classic Barber House', '1 km')}
        >
          <View style={styles.heartButtonInner}>
            <Ionicons name="heart-outline" size={17} color="#d4af37" />
          </View>
        </ScaleButton>

        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={14} color="#bbb" />
          <Text style={styles.infoText}>12 min</Text>
        </View>
      </View>

      <ScaleButton
  style={styles.actionButton}
  onPress={() =>
    router.push({
      pathname: '/barber-details',
      params: {
        nome: 'Classic Barber House',
        imagem: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200',
        distancia: '1 km',
        tempo: '12 min',
        nota: '4.8',
        avaliacoes: '398 avaliações',
      },
    })
  }
>
        <View style={styles.actionButtonInner}>
          <Text style={styles.actionButtonText}>Ver detalhes</Text>
        </View>
      </ScaleButton>
    </View>
  </View>
</ScaleButton>

        <ScaleButton
          style={styles.card}
          onPress={() =>
  router.push({
    pathname: '/barber-details',
    params: {
      nome: 'Top Style Barbershop',
      imagem: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=1200',
      distancia: '600 m',
      tempo: '10 min',
      nota: '4.7',
      avaliacoes: '30 avaliações',
    },
  })
}
          activeOpacity={0.92}
        >
          <View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=1200',
              }}
              style={styles.cardImage}
            />

            <View style={styles.cardBody}>
              <View style={styles.cardTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Top Style Barbershop</Text>

                  <View style={styles.reviewRow}>
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star" size={12} color="#f5c451" />
                    <FontAwesome name="star-half-full" size={12} color="#f5c451" />
                    <Text style={styles.reviewText}>30 avaliações</Text>
                  </View>
                </View>

                <View style={styles.noteBox}>
                  <FontAwesome name="star" size={13} color="#f5c451" />
                  <Text style={styles.noteText}>4.7</Text>
                </View>
              </View>

              <View style={styles.cardInfoRow}>
                <View style={styles.infoItem}>
                  <Ionicons name="location-outline" size={14} color="#bbb" />
                  <Text style={styles.infoText}>600 m</Text>
                </View>

                <ScaleButton
                  style={styles.heartButton}
                  onPress={() => salvarFavorito('Barbearia Top Style', '600 m')}
                >
                  <View style={styles.heartButtonInner}>
                    <Ionicons name="heart-outline" size={17} color="#d4af37" />
                  </View>
                </ScaleButton>

                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={14} color="#bbb" />
                  <Text style={styles.infoText}>10 min</Text>
                </View>
              </View>

              <ScaleButton
  style={styles.actionButton}
  onPress={() =>
    router.push({
      pathname: '/barber-details',
      params: {
        nome: 'Top Style Barbershop',
        imagem: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=1200',
        distancia: '600 m',
        tempo: '10 min',
        nota: '4.7',
        avaliacoes: '30 avaliações',
      },
    })
  }
>
                <View style={styles.actionButtonInner}>
                  <Text style={styles.actionButtonText}>Ver detalhes</Text>
                </View>
              </ScaleButton>
            </View>
          </View>
        </ScaleButton>

        <View style={styles.bottomNav}>
          <ScaleButton style={styles.navItem} onPress={() => router.replace('/home')}>
            <View style={styles.navInner}>
              <Ionicons name="home" size={22} color="#d4af37" />
              <Text style={styles.navActive}>Início</Text>
            </View>
          </ScaleButton>

          <ScaleButton style={styles.navItem} onPress={() => router.push('/appointments')}>
            <View style={styles.navInner}>
              <Ionicons name="calendar-outline" size={22} color="#777" />
              <Text style={styles.navText}>Agenda</Text>
            </View>
          </ScaleButton>

          <ScaleButton style={styles.navItem} onPress={() => router.push('/favorites')}>
            <View style={styles.navInner}>
              <Ionicons name="heart-outline" size={22} color="#777" />
              <Text style={styles.navText}>Favoritos</Text>
            </View>
          </ScaleButton>

          <ScaleButton style={styles.navItem} onPress={() => router.push('/profile')}>
            <View style={styles.navInner}>
              <Ionicons name="person-outline" size={22} color="#777" />
              <Text style={styles.navText}>Perfil</Text>
            </View>
          </ScaleButton>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    paddingHorizontal: 16,
    paddingTop: 38,
  },
  topArea: {
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9a9a9a',
    fontSize: 14,
    marginTop: 6,
  },
  notificationButton: {
    borderRadius: 22,
  },
  notificationButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },
  searchBox: {
    marginTop: 18,
    backgroundColor: '#151515',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 14,
  },
  heroCard: {
    marginTop: 18,
    height: 200,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,175,55,0.18)',
    borderWidth: 1,
    borderColor: '#d4af37',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: '#f0d77d',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  heroText: {
    color: '#ddd',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
    maxWidth: '90%',
  },
  heroButton: {
    marginTop: 14,
    backgroundColor: '#d4af37',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  heroButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
  },
  statCardInner: {
    backgroundColor: '#151515',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#232323',
  },
  statNumber: {
    color: '#d4af37',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 6,
  },
  sectionHeader: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#8d8d8d',
    fontSize: 13,
    marginTop: 4,
  },
  seeAll: {
    color: '#d4af37',
    fontWeight: '700',
    fontSize: 13,
  },
  card: {
    borderRadius: 20,
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 148,
  },
  cardBody: {
    backgroundColor: '#151515',
    padding: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#232323',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  reviewText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 4,
  },
  noteBox: {
    backgroundColor: '#1d1d1d',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  noteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  cardInfoRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    color: '#c4c4c4',
    fontSize: 13,
  },
  heartButton: {
    borderRadius: 18,
  },
  heartButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  actionButton: {
    marginTop: 16,
    borderRadius: 14,
  },
  actionButtonInner: {
    height: 46,
    borderRadius: 14,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 15,
  },
  bottomNav: {
    backgroundColor: '#111',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 4, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#232323',
  },
  navItem: {
    flex: 1,
  },
  navInner: {
    alignItems: 'center',
  },
  navText: {
    color: '#777',
    fontSize: 11,
    marginTop: 4,
  },
  navActive: {
    color: '#d4af37',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '700',
  },
});