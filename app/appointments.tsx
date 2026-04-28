import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Appointments() {
  const router = useRouter();
  const [agendamentos, setAgendamentos] = useState<any[]>([]);

  async function carregarAgendamentos() {
    try {
      const dados = await AsyncStorage.getItem('agendamentos');
      setAgendamentos(dados ? JSON.parse(dados) : []);
    } catch (error) {
      console.log(error);
    }
  }

  async function cancelarAgendamento(id: number) {
    Alert.alert(
      'Cancelar agendamento',
      'Tem certeza que deseja cancelar esse horário?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: async () => {
            const novaLista = agendamentos.filter((item) => item.id !== id);
            setAgendamentos(novaLista);
            await AsyncStorage.setItem('agendamentos', JSON.stringify(novaLista));
          },
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      carregarAgendamentos();
    }, [])
  );

  const totalGasto = agendamentos.reduce((total, item) => {
    const valor = Number(String(item.valor || '0').replace(',', '.'));
    return total + valor;
  }, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MEUS AGENDAMENTOS</Text>
      </View>

      <Text style={styles.title}>Seus cortes marcados</Text>
      <Text style={styles.subtitle}>
        Acompanhe seus horários, serviços e pagamentos confirmados.
      </Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{agendamentos.length}</Text>
          <Text style={styles.summaryLabel}>Marcados</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>R${totalGasto.toFixed(2).replace('.', ',')}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
      </View>

      {agendamentos.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="calendar-outline" size={48} color="#d4af37" />
          <Text style={styles.emptyTitle}>Nenhum agendamento</Text>
          <Text style={styles.emptyText}>
            Depois de finalizar um pagamento, seu corte aparecerá aqui.
          </Text>

          <TouchableOpacity style={styles.emptyButton} onPress={() => router.replace('/home')}>
            <Text style={styles.emptyButtonText}>Buscar barbearia</Text>
          </TouchableOpacity>
        </View>
      ) : (
        agendamentos.map((item, index) => (
          <View key={item.id || index} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.iconBox}>
                <FontAwesome5 name="cut" size={22} color="#d4af37" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.barbearia}>{item.barbearia}</Text>
                <Text style={styles.servico}>{item.servico}</Text>
              </View>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status || 'Confirmado'}</Text>
              </View>
            </View>

            <View style={styles.detailsBox}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={18} color="#d4af37" />
                <View>
                  <Text style={styles.detailLabel}>Data</Text>
                  <Text style={styles.detailValue}>{item.data}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={18} color="#d4af37" />
                <View>
                  <Text style={styles.detailLabel}>Horário</Text>
                  <Text style={styles.detailValue}>{item.hora}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={18} color="#d4af37" />
                <View>
                  <Text style={styles.detailLabel}>Valor</Text>
                  <Text style={styles.detailValue}>R${item.valor || '85,00'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push('/home')}
              >
                <Text style={styles.secondaryButtonText}>Agendar outro</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => cancelarAgendamento(item.id)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
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
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 22,
  },
  headerTitle: {
    color: '#111',
    fontWeight: '900',
    fontSize: 15,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#151515',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },
  summaryNumber: {
    color: '#d4af37',
    fontSize: 22,
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#aaa',
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyBox: {
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#252525',
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 14,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: '#d4af37',
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 13,
    marginTop: 18,
  },
  emptyButtonText: {
    color: '#111',
    fontWeight: '900',
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252525',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barbearia: {
    color: '#d4af37',
    fontSize: 19,
    fontWeight: '900',
  },
  servico: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: 'rgba(76,175,80,0.16)',
    borderColor: '#4caf50',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    color: '#7CFF8A',
    fontSize: 11,
    fontWeight: '900',
  },
  detailsBox: {
    backgroundColor: '#101010',
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailLabel: {
    color: '#777',
    fontSize: 12,
  },
  detailValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  secondaryButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#d4af37',
    fontWeight: '900',
  },
  cancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#2a1515',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5a2424',
  },
  cancelButtonText: {
    color: '#ff7777',
    fontWeight: '900',
  },
});