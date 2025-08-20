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
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Sparkles, Phone, Zap, Star, Users } from 'lucide-react-native';

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
    // Clean phone number (remove formatting)
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    
    if (!cleanPhoneNumber || cleanPhoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    // Format phone number for Twilio (add +1 for US numbers)
    const formattedPhoneNumber = `+1${cleanPhoneNumber}`;

    setIsLoading(true);
    try {
      const success = await sendVerificationCode(formattedPhoneNumber);
      if (success) {
        router.push({
          pathname: '/(auth)/verify',
          params: { phoneNumber: formattedPhoneNumber },
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
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background Image */}
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />

        {/* Floating Elements */}
        <View style={[styles.floatingElement, styles.heart1]}>
          <Heart size={24} color="rgba(255, 255, 255, 0.4)" fill="rgba(255, 255, 255, 0.4)" />
        </View>
        <View style={[styles.floatingElement, styles.sparkle1]}>
          <Sparkles size={20} color="rgba(255, 255, 255, 0.5)" />
        </View>
        <View style={[styles.floatingElement, styles.zap1]}>
          <Zap size={22} color="rgba(255, 255, 255, 0.4)" fill="rgba(255, 255, 255, 0.4)" />
        </View>
        <View style={[styles.floatingElement, styles.star1]}>
          <Star size={18} color="rgba(255, 255, 255, 0.3)" fill="rgba(255, 255, 255, 0.3)" />
        </View>
        <View style={[styles.floatingElement, styles.users1]}>
          <Users size={26} color="rgba(255, 255, 255, 0.3)" />
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
                    colors={['#ff6b9d', '#c471ed', '#12c2e9']}
                    style={styles.logoGradient}
                  >
                    <Heart size={48} color="#FFFFFF" fill="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.appName}>Spark</Text>
                <Text style={styles.tagline}>Where hearts connect anonymously</Text>
              </View>

              {/* Main Content */}
              <View style={styles.mainContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Ready to Spark? ✨</Text>
                  <Text style={styles.subtitle}>
                    Connect with amazing souls nearby while staying completely anonymous
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIconContainer}>
                      <Phone size={22} color="#667eea" />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      placeholderTextColor="rgba(102, 126, 234, 0.6)"
                      value={phoneNumber}
                      onChangeText={handlePhoneNumberChange}
                      keyboardType="phone-pad"
                      maxLength={17}
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleSendCode}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={['#ff6b9d', '#c471ed', '#12c2e9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.buttonText}>
                        {isLoading ? 'Sending Magic...' : 'Send Verification Code ✨'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <View style={styles.featuresContainer}>
                  <View style={styles.feature}>
                    <View style={[styles.featureIcon, { backgroundColor: 'rgba(255, 107, 157, 0.2)' }]}>
                      <Heart size={18} color="#ff6b9d" />
                    </View>
                    <Text style={styles.featureText}>100% Anonymous</Text>
                  </View>
                  <View style={styles.feature}>
                    <View style={[styles.featureIcon, { backgroundColor: 'rgba(196, 113, 237, 0.2)' }]}>
                      <Zap size={18} color="#c471ed" />
                    </View>
                    <Text style={styles.featureText}>5-Mile Radius</Text>
                  </View>
                  <View style={styles.feature}>
                    <View style={[styles.featureIcon, { backgroundColor: 'rgba(18, 194, 233, 0.2)' }]}>
                      <Sparkles size={18} color="#12c2e9" />
                    </View>
                    <Text style={styles.featureText}>Real Connections</Text>
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.footerLink}>Terms of Service</Text> and{' '}
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
  heart1: {
    top: height * 0.12,
    right: width * 0.08,
  },
  sparkle1: {
    top: height * 0.22,
    left: width * 0.06,
  },
  zap1: {
    top: height * 0.32,
    right: width * 0.12,
  },
  star1: {
    top: height * 0.68,
    left: width * 0.1,
  },
  users1: {
    top: height * 0.78,
    right: width * 0.06,
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
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
    paddingHorizontal: 10,
  },
  formContainer: {
    marginBottom: 50,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 25,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  inputIconContainer: {
    paddingLeft: 24,
    paddingRight: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 22,
    paddingRight: 24,
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '600',
  },
  button: {
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
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
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  featureText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  footerLink: {
    fontWeight: '700',
    textDecorationLine: 'underline',
    color: 'rgba(255, 255, 255, 0.95)',
  },
});