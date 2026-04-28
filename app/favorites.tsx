import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Favorites() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useFocusEffect(
  useCallback(() => {
    carregarFavoritos();
  }, [])
);

  const carregarFavoritos = async () => {
    try {
      const dados = await AsyncStorage.getItem('favoritos');
      if (dados) {
        setFavoritos(JSON.parse(dados));
      } else {
        setFavoritos([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removerFavorito = async (nome: string) => {
    try {
      const novaLista = favoritos.filter((item) => item.nome !== nome);
      setFavoritos(novaLista);
      await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
<TouchableOpacity onPress={() => router.push('/home')}>          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAVORITOS</Text>
      </View>

      <Text style={styles.mainTitle}>Suas barbearias favoritas</Text>
      <Text style={styles.subtitle}>
        Acesse rapidamente as barbearias que você mais gostou.
      </Text>

      {favoritos.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="heart-outline" size={42} color="#d4af37" />
          <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
          <Text style={styles.emptyText}>
            Toque no coração das barbearias para salvar aqui.
          </Text>
        </View>
      ) : (
        favoritos.map((item: any, index: number) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.iconBox}>
                <Ionicons name="cut-outline" size={22} color="#d4af37" />
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.name}>{item.nome}</Text>

                <View style={styles.ratingRow}>
                  <FontAwesome name="star" size={12} color="#f5c451" />
                  <Text style={styles.ratingText}>4.8</Text>
                  <Text style={styles.reviewText}>• Favorita</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => removerFavorito(item.nome)}>
                <Ionicons name="heart" size={22} color="#d4af37" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={15} color="#bbb" />
                <Text style={styles.infoText}>{item.distancia}</Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={15} color="#bbb" />
                <Text style={styles.infoText}>10 min</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/barber-details')}
            >
              <Text style={styles.buttonText}>Ver barbearia</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
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
    marginBottom: 18,
  },
  headerTitle: {
    color: '#111',
    fontWeight: '700',
    fontSize: 16,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20,
  },
  emptyBox: {
    backgroundColor: '#151515',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#222',
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 14,
  },
  emptyText: {
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 5,
  },
  ratingText: {
    color: '#fff',
    fontSize: 13,
  },
  reviewText: {
    color: '#888',
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 14,
    marginBottom: 14,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    color: '#bbb',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#d4af37',
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 15,
  },
});