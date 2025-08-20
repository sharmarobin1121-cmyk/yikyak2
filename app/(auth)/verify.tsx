import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowLeft, Sparkles, Zap, Lock, CircleCheck as CheckCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function VerifyScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(phoneNumber || '', verificationCode);
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    Alert.alert('Code Sent', 'A new verification code has been sent to your phone');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background Image */}
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />

        {/* Floating Elements */}
        <View style={[styles.floatingElement, styles.sparkle1]}>
          <Sparkles size={22} color="rgba(255, 255, 255, 0.5)" />
        </View>
        <View style={[styles.floatingElement, styles.zap1]}>
          <Zap size={20} color="rgba(255, 255, 255, 0.4)" fill="rgba(255, 255, 255, 0.4)" />
        </View>
        <View style={[styles.floatingElement, styles.lock1]}>
          <Lock size={18} color="rgba(255, 255, 255, 0.3)" />
        </View>
        <View style={[styles.floatingElement, styles.check1]}>
          <CheckCircle size={24} color="rgba(255, 255, 255, 0.4)" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.headerContainer}>
                <View style={styles.iconContainer}>
                  <LinearGradient
                    colors={['#ff6b9d', '#c471ed', '#12c2e9']}
                    style={styles.iconGradient}
                  >
                    <Shield size={42} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.title}>Almost There! ✨</Text>
                <Text style={styles.subtitle}>
                  We sent a magic code to{'\n'}
                  <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                </Text>
              </View>

              <View style={styles.codeContainer}>
                <View style={styles.codeInputContainer}>
                  {code.map((digit, index) => (
                    <View key={index} style={styles.codeInputWrapper}>
                      <TextInput
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={[
                          styles.codeInput,
                          digit ? styles.codeInputFilled : null
                        ]}
                        value={digit}
                        onChangeText={(text) => handleCodeChange(text, index)}
                        onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        selectTextOnFocus
                      />
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleVerify}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={['#ff6b9d', '#c471ed', '#12c2e9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {isLoading ? 'Verifying Magic...' : 'Verify & Spark! 🚀'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleResendCode}
                >
                  <Text style={styles.resendButtonText}>
                    Didn't get the code? <Text style={styles.resendLink}>Resend ✨</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  floatingElement: {
    position: 'absolute',
    zIndex: 1,
  },
  sparkle1: {
    top: height * 0.18,
    right: width * 0.08,
  },
  zap1: {
    top: height * 0.28,
    left: width * 0.06,
  },
  lock1: {
    top: height * 0.72,
    right: width * 0.12,
  },
  check1: {
    top: height * 0.82,
    left: width * 0.1,
  },
  keyboardAvoidingView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 70,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 28,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  iconGradient: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  phoneNumber: {
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  codeContainer: {
    alignItems: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
    gap: 16,
  },
  codeInputWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  codeInput: {
    width: 56,
    height: 68,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1F2937',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  codeInputFilled: {
    borderColor: '#ff6b9d',
    backgroundColor: '#FFFFFF',
    shadowColor: '#ff6b9d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  button: {
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 28,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    paddingVertical: 22,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  resendButton: {
    paddingVertical: 16,
  },
  resendButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  resendLink: {
    fontWeight: '800',
    textDecorationLine: 'underline',
    color: '#FFFFFF',
  },
});