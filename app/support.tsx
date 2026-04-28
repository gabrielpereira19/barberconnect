import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Support() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AJUDA E SUPORTE</Text>
      </View>

      <Text style={styles.mainTitle}>Como podemos ajudar?</Text>
      <Text style={styles.subtitle}>
        Encontre respostas rápidas ou fale com nossa equipe de suporte.
      </Text>

      <Text style={styles.sectionTitle}>Contato rápido</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
            <View>
              <Text style={styles.menuText}>WhatsApp</Text>
              <Text style={styles.menuSubtext}>Atendimento rápido e direto</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Feather name="mail" size={20} color="#d4af37" />
            <View>
              <Text style={styles.menuText}>E-mail</Text>
              <Text style={styles.menuSubtext}>suporte@barberconnect.com</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Feather name="phone-call" size={20} color="#d4af37" />
            <View>
              <Text style={styles.menuText}>Telefone</Text>
              <Text style={styles.menuSubtext}>(87) 99999-9999</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Perguntas frequentes</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Como cancelar um agendamento?</Text>
          <Ionicons name="chevron-down" size={18} color="#d4af37" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Como alterar meu horário?</Text>
          <Ionicons name="chevron-down" size={18} color="#d4af37" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Como favoritar uma barbearia?</Text>
          <Ionicons name="chevron-down" size={18} color="#d4af37" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Como editar meu perfil?</Text>
          <Ionicons name="chevron-down" size={18} color="#d4af37" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Atendimento</Text>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <MaterialIcons name="access-time" size={18} color="#d4af37" />
          <Text style={styles.infoText}>Segunda a Sexta • 08:00 às 18:00</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#d4af37" />
          <Text style={styles.infoText}>Suporte online para todo o Brasil</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.supportButton}>
        <Text style={styles.supportButtonText}>Falar com um atendente</Text>
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
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 20,
  },
  sectionTitle: {
    color: '#d4af37',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#232323',
  },
  menuItem: {
    minHeight: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  menuSubtext: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#252525',
  },
  faqItem: {
    minHeight: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  infoBox: {
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#232323',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
  },
  supportButton: {
    marginTop: 24,
    marginBottom: 30,
    backgroundColor: '#d4af37',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
  },
});