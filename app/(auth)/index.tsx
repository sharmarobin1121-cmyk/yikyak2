import React, { useState } from 'react';
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
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Sparkles, Phone, Zap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sendVerificationCode } = useAuth();

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.length < 14) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      const success = await sendVerificationCode(phoneNumber);
      if (success) {
        router.push({
          pathname: '/(auth)/verify',
          params: { phoneNumber },
        });
      } else {
        Alert.alert('Error', 'Failed to send verification code. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        <View style={[styles.floatingElement, styles.heart1]}>
          <Heart size={20} color="rgba(255, 255, 255, 0.3)" fill="rgba(255, 255, 255, 0.3)" />
        </View>
        <View style={[styles.floatingElement, styles.sparkle1]}>
          <Sparkles size={16} color="rgba(255, 255, 255, 0.4)" />
        </View>
        <View style={[styles.floatingElement, styles.zap1]}>
          <Zap size={18} color="rgba(255, 255, 255, 0.3)" fill="rgba(255, 255, 255, 0.3)" />
        </View>
        <View style={[styles.floatingElement, styles.heart2]}>
          <Heart size={14} color="rgba(255, 255, 255, 0.2)" fill="rgba(255, 255, 255, 0.2)" />
        </View>
        <View style={[styles.floatingElement, styles.sparkle2]}>
          <Sparkles size={22} color="rgba(255, 255, 255, 0.3)" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              {/* Logo Section */}
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <LinearGradient
                    colors={['#FF6B9D', '#8B5CF6']}
                    style={styles.logoGradient}
                  >
                    <Heart size={40} color="#FFFFFF" fill="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.appName}>Spark</Text>
                <Text style={styles.tagline}>Anonymous connections that matter</Text>
              </View>

              {/* Main Content */}
              <View style={styles.mainContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Ready to Spark?</Text>
                  <Text style={styles.subtitle}>
                    Connect anonymously with amazing people nearby
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIconContainer}>
                      <Phone size={20} color="#8B5CF6" />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="(555) 123-4567"
                      placeholderTextColor="rgba(139, 92, 246, 0.5)"
                      value={phoneNumber}
                      onChangeText={handlePhoneNumberChange}
                      keyboardType="phone-pad"
                      maxLength={14}
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleSendCode}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={['#FF6B9D', '#8B5CF6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.buttonText}>
                        {isLoading ? 'Sending Magic...' : 'Send Code ✨'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <View style={styles.featuresContainer}>
                  <View style={styles.feature}>
                    <View style={styles.featureIcon}>
                      <Heart size={16} color="#FF6B9D" />
                    </View>
                    <Text style={styles.featureText}>100% Anonymous</Text>
                  </View>
                  <View style={styles.feature}>
                    <View style={styles.featureIcon}>
                      <Zap size={16} color="#8B5CF6" />
                    </View>
                    <Text style={styles.featureText}>5-Mile Radius</Text>
                  </View>
                  <View style={styles.feature}>
                    <View style={styles.featureIcon}>
                      <Sparkles size={16} color="#3B82F6" />
                    </View>
                    <Text style={styles.featureText}>Real Connections</Text>
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.footerLink}>Terms</Text> and{' '}
                  <Text style={styles.footerLink}>Privacy Policy</Text>
                </Text>
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
  heart1: {
    top: height * 0.15,
    right: width * 0.1,
  },
  sparkle1: {
    top: height * 0.25,
    left: width * 0.08,
  },
  zap1: {
    top: height * 0.35,
    right: width * 0.15,
  },
  heart2: {
    top: height * 0.65,
    left: width * 0.12,
  },
  sparkle2: {
    top: height * 0.75,
    right: width * 0.08,
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
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
  formContainer: {
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputIconContainer: {
    paddingLeft: 20,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingRight: 20,
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '600',
  },
  button: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
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
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});