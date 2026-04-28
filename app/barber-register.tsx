import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BarberRegister() {
  const router = useRouter();

  const [nomeBarbeiro, setNomeBarbeiro] = useState('');
  const [nomeBarbearia, setNomeBarbearia] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [horario, setHorario] = useState('');
  const [instagram, setInstagram] = useState('');
  const [descricao, setDescricao] = useState(' ');
  const [pix, setPix] = useState('');
  const [atendeDomicilio, setAtendeDomicilio] = useState(false);

  function cadastrarBarbeiro() {
    if (
      !nomeBarbeiro ||
      !nomeBarbearia ||
      !cpfCnpj ||
      !telefone ||
      !email ||
      !senha ||
      !endereco ||
      !cidade ||
      !horario
    ) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    alert('Barbearia cadastrada com sucesso!');
    router.push('/(tabs)');
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CADASTRO DE BARBEIRO</Text>
      </View>

      <Text style={styles.mainTitle}>Cadastre sua barbearia</Text>
      <Text style={styles.subtitle}>
        Preencha suas informações profissionais para começar a receber clientes pelo app.
      </Text>

      <Text style={styles.sectionTitle}>Dados do profissional</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Nome do barbeiro"
          placeholderTextColor="#888"
          style={styles.input}
          value={nomeBarbeiro}
          onChangeText={setNomeBarbeiro}
        />

        <TextInput
          placeholder="Nome da barbearia"
          placeholderTextColor="#888"
          style={styles.input}
          value={nomeBarbearia}
          onChangeText={setNomeBarbearia}
        />

        <TextInput
          placeholder="CPF ou CNPJ"
          placeholderTextColor="#888"
          style={styles.input}
          value={cpfCnpj}
          onChangeText={setCpfCnpj}
        />

        <TextInput
          placeholder="Telefone"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TextInput
          placeholder="E-mail profissional"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <Text style={styles.sectionTitle}>Localização e funcionamento</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Endereço da barbearia"
          placeholderTextColor="#888"
          style={styles.input}
          value={endereco}
          onChangeText={setEndereco}
        />

        <TextInput
          placeholder="Cidade / Estado"
          placeholderTextColor="#888"
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
        />

        <TextInput
          placeholder="Horário de funcionamento"
          placeholderTextColor="#888"
          style={styles.input}
          value={horario}
          onChangeText={setHorario}
        />

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Atende a domicílio?</Text>
            <Text style={styles.switchSub}>Marque se oferece atendimento externo</Text>
          </View>
          <Switch
            value={atendeDomicilio}
            onValueChange={setAtendeDomicilio}
            trackColor={{ false: '#444', true: '#d4af37' }}
            thumbColor={atendeDomicilio ? '#111' : '#ddd'}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Perfil comercial</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Instagram da barbearia"
          placeholderTextColor="#888"
          style={styles.input}
          value={instagram}
          onChangeText={setInstagram}
        />

        <TextInput
          placeholder="Chave PIX"
          placeholderTextColor="#888"
          style={styles.input}
          value={pix}
          onChangeText={setPix}
        />

        <TextInput
          placeholder="Descrição da barbearia"
          placeholderTextColor="#888"
          style={[styles.input, styles.multiline]}
          multiline
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <Text style={styles.sectionTitle}>Serviços iniciais</Text>

      <View style={styles.servicesCard}>
        <View style={styles.serviceItem}>
          <FontAwesome5 name="cut" size={18} color="#d4af37" />
          <Text style={styles.serviceText}>Corte masculino</Text>
        </View>

        <View style={styles.serviceItem}>
          <MaterialIcons name="face" size={20} color="#d4af37" />
          <Text style={styles.serviceText}>Barba</Text>
        </View>

        <View style={styles.serviceItem}>
          <Ionicons name="star-outline" size={18} color="#d4af37" />
          <Text style={styles.serviceText}>Combo cabelo + barba</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={cadastrarBarbeiro}>
        <Text style={styles.buttonText}>Cadastrar barbearia</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Voltar para o login</Text>
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
    padding: 14,
    borderWidth: 1,
    borderColor: '#232323',
  },
  input: {
    backgroundColor: '#0f0f0f',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  switchRow: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  switchSub: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  servicesCard: {
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#232323',
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  serviceText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#d4af37',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
  },
  link: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 30,
  },
});