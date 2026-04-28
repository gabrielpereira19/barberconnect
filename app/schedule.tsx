import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Schedule() {
  const router = useRouter();
  const { barbearia, servico, valor } = useLocalSearchParams();

  const [diaSelecionado, setDiaSelecionado] = useState('15 Abr');
  const [horarioSelecionado, setHorarioSelecionado] = useState('11:00');

  const dias = [
    { semana: 'Segunda', dia: '14', mes: 'Abr' },
    { semana: 'Terça', dia: '15', mes: 'Abr' },
    { semana: 'Quarta', dia: '16', mes: 'Abr' },
    { semana: 'Quinta', dia: '17', mes: 'Abr' },
  ];

  const horariosManha = ['09:00', '10:00', '11:00'];
  const horariosTarde = ['12:00', '13:00', '14:00'];

 function irParaCheckout() {
  router.push({
    pathname: '/checkout',
    params: {
      barbearia: String(barbearia || 'Barbearia Gonzaga'),
      servico: String(servico || 'Cabelo & Barba Premium'),
      data: diaSelecionado,
      hora: horarioSelecionado,
      valor: String(valor || '85,00'),
    },
  });
}

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     <View style={styles.header}>
  <TouchableOpacity onPress={() => router.replace('/home')}>
    <Ionicons name="arrow-back" size={22} color="#111" />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>SELECIONE O DIA E HORÁRIO</Text>
</View>
      <Text style={styles.mainTitle}>SELECIONE O DIA E HORÁRIO</Text>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionLeft}>
          <MaterialIcons name="date-range" size={18} color="#d4af37" />
          <Text style={styles.sectionTitle}>Data</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysRow}>
        {dias.map((item) => {
          const valor = `${item.dia} ${item.mes}`;
          const selecionado = diaSelecionado === valor;

          return (
            <TouchableOpacity
              key={valor}
              style={[styles.dayCard, selecionado && styles.dayCardSelected]}
              onPress={() => setDiaSelecionado(valor)}
            >
              <Text style={[styles.dayWeek, selecionado && styles.dayWeekSelected]}>
                {item.semana}
              </Text>
              <Text style={[styles.dayNumber, selecionado && styles.dayNumberSelected]}>
                {item.dia}
              </Text>
              <Text style={[styles.dayMonth, selecionado && styles.dayMonthSelected]}>
                {item.mes}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionLeft}>
          <FontAwesome5 name="concierge-bell" size={16} color="#d4af37" />
          <Text style={styles.sectionTitle}>Serviço</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.serviceCard}>
        <View style={styles.serviceIconBox}>
          <FontAwesome5 name="cut" size={24} color="#d4af37" />
        </View>

        <View style={{ flex: 1 }}>
         <Text style={styles.serviceTitle}>{String(servico || 'Cabelo & Barba Premium')}</Text>
<Text style={styles.servicePrice}>R${String(valor || '85,00')}</Text>
          <Text style={styles.servicePrice}>R$85,00</Text>

          <View style={styles.serviceTimeRow}>
            <Ionicons name="time-outline" size={14} color="#aaa" />
            <Text style={styles.serviceTime}>30 min</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionLeft}>
          <Ionicons name="time-outline" size={18} color="#d4af37" />
          <Text style={styles.sectionTitle}>Horários</Text>
        </View>
      </View>

      <Text style={styles.subPeriod}>Manhã</Text>
      <View style={styles.hoursWrap}>
        {horariosManha.map((hora) => {
          const selecionado = horarioSelecionado === hora;
          return (
            <TouchableOpacity
              key={hora}
              style={[styles.hourButton, selecionado && styles.hourButtonSelected]}
              onPress={() => setHorarioSelecionado(hora)}
            >
              <Text style={[styles.hourText, selecionado && styles.hourTextSelected]}>
                {hora}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.subPeriod}>Tarde</Text>
      <View style={styles.hoursWrap}>
        {horariosTarde.map((hora) => {
          const selecionado = horarioSelecionado === hora;
          return (
            <TouchableOpacity
              key={hora}
              style={[styles.hourButton, selecionado && styles.hourButtonSelected]}
              onPress={() => setHorarioSelecionado(hora)}
            >
              <Text style={[styles.hourText, selecionado && styles.hourTextSelected]}>
                {hora}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={irParaCheckout}>
        <Text style={styles.confirmButtonText}>Confirmar agendamento</Text>
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
  },
  headerTitle: {
    color: '#111',
    fontWeight: '700',
    fontSize: 16,
  },
  mainTitle: {
    color: '#d4af37',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backText: {
    color: '#ddd',
    fontSize: 14,
  },
  daysRow: {
    marginBottom: 18,
  },
  dayCard: {
    width: 92,
    backgroundColor: '#151515',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  dayCardSelected: {
    backgroundColor: '#e2c98b',
    borderColor: '#e2c98b',
  },
  dayWeek: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 8,
  },
  dayWeekSelected: {
    color: '#111',
  },
  dayNumber: {
    color: '#d4af37',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  dayNumberSelected: {
    color: '#111',
  },
  dayMonth: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 2,
  },
  dayMonthSelected: {
    color: '#111',
  },
  serviceCard: {
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#242424',
    marginBottom: 20,
  },
  serviceIconBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
  },
  servicePrice: {
    color: '#d4af37',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '700',
  },
  serviceTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  serviceTime: {
    color: '#aaa',
    fontSize: 13,
  },
  subPeriod: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 6,
  },
  hoursWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  hourButton: {
    width: 96,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7a6938',
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourButtonSelected: {
    backgroundColor: '#e2c98b',
    borderColor: '#e2c98b',
  },
  hourText: {
    color: '#d4af37',
    fontSize: 22,
    fontWeight: '500',
  },
  hourTextSelected: {
    color: '#111',
    fontWeight: '700',
  },
  confirmButton: {
    marginTop: 18,
    marginBottom: 30,
    backgroundColor: '#d4af37',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
  },
});