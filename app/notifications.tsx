import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Notifications() {
  const router = useRouter();

  const notificacoes = [
    {
      id: 1,
      icon: 'checkmark-circle-outline',
      title: 'Agendamento confirmado',
      text: 'Seu horário para Cabelo & Barba Premium foi confirmado para 15 Abr às 11:00.',
      time: 'Agora',
    },
    {
      id: 2,
      icon: 'pricetag-outline',
      title: 'Promoção disponível',
      text: 'Barbearias próximas estão com descontos em cortes premium hoje.',
      time: '20 min',
    },
    {
      id: 3,
      icon: 'time-outline',
      title: 'Lembrete de horário',
      text: 'Chegue com 10 minutos de antecedência para evitar atrasos.',
      time: '1 h',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#111" />
      </TouchableOpacity>

      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.subtitle}>Acompanhe novidades e lembretes do seu atendimento.</Text>

      {notificacoes.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons name={item.icon as any} size={24} color="#d4af37" />
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#d4af37',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#d4af37',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 22,
  },
  subtitle: {
    color: '#aaa',
    marginTop: 8,
    marginBottom: 22,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#232323',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  time: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: '700',
  },
  cardText: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
});