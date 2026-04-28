import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
  <TouchableOpacity onPress={() => router.replace('/home')}>
    <Ionicons name="arrow-back" size={22} color="#111" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>MEU PERFIL</Text>
</View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200' }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Italo Gabriel</Text>
        <Text style={styles.email}>italogabriel@gmail.com</Text>

        <View style={styles.memberTag}>
          <Ionicons name="diamond-outline" size={14} color="#111" />
          <Text style={styles.memberTagText}>Cliente Premium</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Informações pessoais</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="phone" size={18} color="#d4af37" />
          <View>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>(87) 99999-9999</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Feather name="mail" size={18} color="#d4af37" />
          <View>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={styles.infoValue}>italogabriel@email.com</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <MaterialIcons name="badge" size={18} color="#d4af37" />
          <View>
            <Text style={styles.infoLabel}>CPF</Text>
            <Text style={styles.infoValue}>000.000.000-00</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#d4af37" />
          <View>
            <Text style={styles.infoLabel}>Endereço</Text>
            <Text style={styles.infoValue}>João Pessoa - PB</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Resumo da conta</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Agendamentos</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>R$420</Text>
          <Text style={styles.statLabel}>Gasto total</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Pagamento</Text>

      <View style={styles.menuCard}>
        <TouchableOpacity 
  style={styles.menuItem}
  onPress={() => router.push('/payment-methods')}
>
          <View style={styles.menuLeft}>
            <Ionicons name="card-outline" size={20} color="#d4af37" />
            <Text style={styles.menuText}>Métodos de pagamento</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <FontAwesome5 name="file-invoice-dollar" size={18} color="#d4af37" />
            <Text style={styles.menuText}>Histórico de pagamentos</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Configurações</Text>

      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="person-outline" size={20} color="#d4af37" />
            <Text style={styles.menuText}>Editar perfil</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="notifications-outline" size={20} color="#d4af37" />
            <Text style={styles.menuText}>Notificações</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="lock-closed-outline" size={20} color="#d4af37" />
            <Text style={styles.menuText}>Segurança</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/support')}>
  <View style={styles.menuLeft}>
    <Ionicons name="help-circle-outline" size={20} color="#d4af37" />
    <Text style={styles.menuText}>Ajuda e suporte</Text>
  </View>
  <Ionicons name="chevron-forward" size={18} color="#888" />
</TouchableOpacity>

        
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/(tabs)')}>
        <Text style={styles.logoutButtonText}>Sair da conta</Text>
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
  profileCard: {
    backgroundColor: '#151515',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#232323',
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 48,
    marginBottom: 14,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  email: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 6,
  },
  memberTag: {
    marginTop: 14,
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberTagText: {
    color: '#111',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#d4af37',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#232323',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  infoLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#252525',
    marginVertical: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#151515',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#232323',
  },
  statNumber: {
    color: '#d4af37',
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  menuCard: {
    backgroundColor: '#151515',
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#232323',
  },
  menuItem: {
    minHeight: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 24,
    marginBottom: 30,
    backgroundColor: '#d4af37',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
  },
});