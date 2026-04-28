import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentMethods() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/profile')}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MÉTODOS DE PAGAMENTO</Text>
      </View>

      <Text style={styles.title}>Escolha como deseja pagar</Text>
      <Text style={styles.subtitle}>
        Gerencie suas formas de pagamento para agendar cortes com mais rapidez.
      </Text>

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name="card-outline" size={26} color="#d4af37" />
        </View>

        <View style={styles.info}>
          <Text style={styles.methodTitle}>Cartão de crédito</Text>
          <Text style={styles.methodText}>Visa final 1234</Text>
        </View>

        <Ionicons name="checkmark-circle" size={24} color="#d4af37" />
      </View>

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name="qr-code-outline" size={26} color="#d4af37" />
        </View>

        <View style={styles.info}>
          <Text style={styles.methodTitle}>Pix</Text>
          <Text style={styles.methodText}>Pague rápido pelo QR Code</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#888" />
      </View>

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name="cash-outline" size={26} color="#d4af37" />
        </View>

        <View style={styles.info}>
          <Text style={styles.methodTitle}>Dinheiro</Text>
          <Text style={styles.methodText}>Pague diretamente na barbearia</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#888" />
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={22} color="#111" />
        <Text style={styles.addButtonText}>Adicionar novo cartão</Text>
      </TouchableOpacity>
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
    marginBottom: 22,
  },
  headerTitle: {
    color: '#111',
    fontWeight: '800',
    fontSize: 15,
  },
  title: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '800',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 22,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252525',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  methodTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  methodText: {
    color: '#999',
    marginTop: 5,
    fontSize: 13,
  },
  addButton: {
    backgroundColor: '#d4af37',
    borderRadius: 14,
    height: 52,
    marginTop: 14,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '900',
  },
});