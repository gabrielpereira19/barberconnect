import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { agendamentos } from './data';

export default function Checkout() {
  const router = useRouter();
  const { barbearia, servico, data, hora, valor } = useLocalSearchParams();

  function finalizar() {
    agendamentos.push({
      id: Date.now(),
      barbearia: String(barbearia || 'Top Style Barbershop'),
      servico: String(servico || 'Cabelo & Barba Premium'),
      data: String(data || '15 Abr'),
      hora: String(hora || '11:00'),
      status: 'Confirmado',
    });

    alert('Pagamento realizado com sucesso!');
    router.push('/appointments');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout seguro</Text>

      <View style={styles.card}>
        <Text style={styles.barbearia}>{String(barbearia || 'Top Style Barbershop')}</Text>
        <Text style={styles.servico}>{String(servico || 'Cabelo & Barba Premium')}</Text>
        <Text style={styles.info}>Data: {String(data || '15 Abr')}</Text>
        <Text style={styles.info}>Hora: {String(hora || '11:00')}</Text>
        <Text style={styles.total}>Total: R${String(valor || '85,00')}</Text>
      </View>

      <Text style={styles.section}>Pagamento</Text>

      <View style={styles.card}>
        <Text style={styles.method}>PIX</Text>

        <Image
          source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIX' }}
          style={styles.qr}
        />

        <Text style={styles.pixText}>Escaneie para pagar</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={finalizar}>
        <Text style={styles.buttonText}>Finalizar pagamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    color: '#d4af37',
    fontSize: 26,
    fontWeight: 'bold',
  },
  section: {
    color: '#d4af37',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#151515',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  barbearia: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  servico: {
    color: '#aaa',
    marginTop: 5,
  },
  info: {
    color: '#bbb',
    marginTop: 5,
  },
  total: {
    color: '#d4af37',
    marginTop: 10,
    fontWeight: 'bold',
  },
  method: {
    color: '#fff',
    fontWeight: 'bold',
  },
  qr: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
  pixText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#d4af37',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontWeight: 'bold',
  },
});