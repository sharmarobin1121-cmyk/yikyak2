import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Settings, Shield, Heart, Bell, CircleHelp as HelpCircle, Star, CreditCard as Edit3, Camera, Award, Zap } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: Edit3,
      title: 'Edit Profile',
      subtitle: 'Update your information',
      gradient: ['#ff6b9d', '#ff8a80'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Profile editing will be available in a future update');
      },
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'Privacy & preferences',
      gradient: ['#667eea', '#764ba2'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Settings will be available in a future update');
      },
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Manage your alerts',
      gradient: ['#12c2e9', '#c471ed'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Notification settings will be available in a future update');
      },
    },
    {
      icon: Shield,
      title: 'Privacy & Safety',
      subtitle: 'Control your experience',
      gradient: ['#10b981', '#34d399'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Privacy settings will be available in a future update');
      },
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get assistance',
      gradient: ['#f59e0b', '#fbbf24'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Help & Support will be available in a future update');
      },
    },
    {
      icon: Star,
      title: 'Rate Spark',
      subtitle: 'Share your feedback',
      gradient: ['#ef4444', '#f87171'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Rating feature will be available in a future update');
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
              style={styles.avatar}
            >
              <User size={48} color="#FFFFFF" />
            </LinearGradient>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.phoneNumber}>{user?.phoneNumber}</Text>
          <Text style={styles.memberSince}>Member since today</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <LinearGradient
              colors={['#ff6b9d', '#ff8a80']}
              style={styles.statGradient}
            >
              <Heart size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.statGradient}
            >
              <Zap size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Chats</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <LinearGradient
              colors={['#12c2e9', '#c471ed']}
              style={styles.statGradient}
            >
              <Award size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reveals</Text>
          </View>
        </View>

        {/* Achievement Card */}
        <View style={styles.achievementContainer}>
          <View style={styles.achievementCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.achievementImage}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.achievementOverlay}
            >
              <Text style={styles.achievementTitle}>🎉 Welcome to Spark!</Text>
              <Text style={styles.achievementText}>
                You're all set to start making meaningful connections
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <LinearGradient
                  colors={item.gradient}
                  style={styles.menuIconContainer}
                >
                  <item.icon size={22} color="#FFFFFF" />
                </LinearGradient>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.menuArrow}>
                <Text style={styles.menuArrowText}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutContent}>
            <LogOut size={22} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Spark v1.0.0</Text>
          <View style={styles.footerSubtextContainer}>
            <Text style={styles.footerSubtext}>Made with </Text>
            <Heart size={14} color="#ff6b9d" fill="#ff6b9d" />
            <Text style={styles.footerSubtext}> for meaningful connections</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 28,
    paddingVertical: 36,
    paddingTop: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff6b9d',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  phoneNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  memberSince: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 28,
    marginTop: -24,
    borderRadius: 24,
    paddingVertical: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  achievementContainer: {
    paddingHorizontal: 28,
    marginTop: 28,
  },
  achievementCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  achievementImage: {
    width: '100%',
    height: 140,
  },
  achievementOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 24,
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  achievementText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 28,
    marginTop: 28,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  menuSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
  },
  menuArrow: {
    marginLeft: 16,
  },
  menuArrowText: {
    fontSize: 24,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 28,
    marginTop: 28,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 16,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#EF4444',
    letterSpacing: 0.2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 28,
  },
  footerText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  footerSubtextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerSubtext: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
  },
});