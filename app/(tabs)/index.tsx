import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Heart, 
  MessageCircle, 
  Users, 
  Zap,
  Sparkles,
  MapPin,
  Clock,
  TrendingUp,
  Star,
  Compass
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const quickActions = [
    {
      icon: Zap,
      title: 'Quick Match',
      subtitle: 'Find someone now',
      gradient: ['#ff6b9d', '#ff8a80'],
      onPress: () => {},
    },
    {
      icon: Compass,
      title: 'Explore',
      subtitle: 'Discover nearby',
      gradient: ['#667eea', '#764ba2'],
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Hey there! ✨</Text>
            <Text style={styles.subWelcomeText}>Ready to spark some connections?</Text>
          </View>
          <View style={styles.sparkIcon}>
            <Sparkles size={26} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#ff6b9d', '#ff8a80']}
              style={styles.statGradient}
            >
              <Heart size={28} color="#FFFFFF" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.statGradient}
            >
              <MessageCircle size={28} color="#FFFFFF" />
              <Text style={styles.statNumber}>0/5</Text>
              <Text style={styles.statLabel}>Active Chats</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#12c2e9', '#c471ed']}
              style={styles.statGradient}
            >
              <Users size={28} color="#FFFFFF" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Nearby</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={action.onPress}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.quickActionGradient}
                >
                  <action.icon size={32} color="#FFFFFF" />
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Main CTA */}
        <View style={styles.ctaContainer}>
          <View style={styles.ctaCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.ctaImage}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.ctaOverlay}
            >
              <View style={styles.ctaHeader}>
                <Text style={styles.ctaTitle}>Start Your Journey</Text>
                <Text style={styles.ctaSubtitle}>
                  Discover amazing people within 5 miles of you. All conversations start anonymously.
                </Text>
              </View>
              
              <TouchableOpacity style={styles.ctaButton}>
                <LinearGradient
                  colors={['#ff6b9d', '#c471ed', '#12c2e9']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.ctaButtonGradient}
                >
                  <Sparkles size={22} color="#FFFFFF" />
                  <Text style={styles.ctaButtonText}>Start Discovering</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Trending Section */}
        <View style={styles.trendingContainer}>
          <View style={styles.trendingHeader}>
            <LinearGradient
              colors={['#ff6b9d', '#c471ed']}
              style={styles.trendingIconGradient}
            >
              <TrendingUp size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.trendingTitle}>Trending Now</Text>
          </View>
          <View style={styles.trendingCard}>
            <Text style={styles.trendingText}>🔥 12 people are actively looking for connections near you</Text>
            <Text style={styles.trendingSubtext}>Join them and start sparking conversations!</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Clock size={28} color="#9CA3AF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>No recent activity</Text>
              <Text style={styles.activitySubtitle}>
                Your connections and interactions will appear here
              </Text>
            </View>
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
    paddingVertical: 28,
    paddingTop: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subWelcomeText: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '600',
  },
  sparkIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    marginTop: -24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  statGradient: {
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quickActionsContainer: {
    paddingHorizontal: 28,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  quickActionGradient: {
    padding: 28,
    borderRadius: 24,
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '600',
  },
  ctaContainer: {
    paddingHorizontal: 28,
    marginTop: 40,
  },
  ctaCard: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },
  ctaImage: {
    width: '100%',
    height: 220,
  },
  ctaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  ctaHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  ctaSubtitle: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '600',
  },
  ctaButton: {
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: 24,
    gap: 10,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  trendingContainer: {
    paddingHorizontal: 28,
    marginTop: 40,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  trendingIconGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: 0.3,
  },
  trendingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderLeftWidth: 6,
    borderLeftColor: '#ff6b9d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  trendingText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  trendingSubtext: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
  },
  activityContainer: {
    paddingHorizontal: 28,
    marginTop: 40,
    marginBottom: 40,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  activityIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  activitySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    fontWeight: '600',
  },
});