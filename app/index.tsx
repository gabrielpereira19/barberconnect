import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function entrar() {
    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    router.replace('/home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>💈</Text>
        </View>

        <Text style={styles.title}>BarberConnect</Text>
        <Text style={styles.subtitle}>
          Agende seu corte com praticidade, estilo e sem filas.
        </Text>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={21} color="#d4af37" />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={21} color="#d4af37" />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#777"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />

          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Ionicons
              name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={entrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/forgot')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/barber-register')}>
          <Text style={styles.barberLink}>Sou barbeiro / Cadastrar barbearia</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#101010',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#242424',
  },
  logoBox: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#d4af37',
    marginBottom: 18,
  },
  logoIcon: {
    fontSize: 38,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 26,
    lineHeight: 20,
  },
  inputBox: {
    height: 56,
    backgroundColor: '#171717',
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  button: {
    height: 56,
    backgroundColor: '#d4af37',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '900',
  },
  link: {
    color: '#ddd',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 12,
    fontWeight: '600',
  },
  barberLink: {
    color: '#d4af37',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 18,
    fontWeight: '800',
  },
});