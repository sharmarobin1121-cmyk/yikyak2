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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowLeft, Sparkles, Zap } from 'lucide-react-native';

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
        colors={['#FF6B9D', '#8B5CF6', '#3B82F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Floating Elements */}
        <View style={[styles.floatingElement, styles.sparkle1]}>
          <Sparkles size={18} color="rgba(255, 255, 255, 0.4)" />
        </View>
        <View style={[styles.floatingElement, styles.zap1]}>
          <Zap size={16} color="rgba(255, 255, 255, 0.3)" fill="rgba(255, 255, 255, 0.3)" />
        </View>
        <View style={[styles.floatingElement, styles.sparkle2]}>
          <Sparkles size={14} color="rgba(255, 255, 255, 0.3)" />
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
                    colors={['#FF6B9D', '#8B5CF6']}
                    style={styles.iconGradient}
                  >
                    <Shield size={36} color="#FFFFFF" />
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
                    colors={['#FF6B9D', '#8B5CF6']}
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
  floatingElement: {
    position: 'absolute',
    zIndex: 1,
  },
  sparkle1: {
    top: height * 0.2,
    right: width * 0.1,
  },
  zap1: {
    top: height * 0.3,
    left: width * 0.08,
  },
  sparkle2: {
    top: height * 0.7,
    right: width * 0.15,
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  phoneNumber: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  codeContainer: {
    alignItems: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 12,
  },
  codeInputWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  codeInput: {
    width: 50,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1F2937',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  codeInputFilled: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFFFFF',
  },
  button: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 24,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  resendButton: {
    paddingVertical: 12,
  },
  resendButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  resendLink: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});