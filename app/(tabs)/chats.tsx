import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Heart, Sparkles, Search, Plus, Users } from 'lucide-react-native';

export default function ChatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Chats</Text>
            <Text style={styles.headerSubtitle}>0/5 active conversations</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <LinearGradient
              colors={['#ff6b9d', '#c471ed', '#12c2e9']}
              style={styles.emptyIconGradient}
            >
              <MessageCircle size={56} color="#FFFFFF" />
            </LinearGradient>
          </View>
          
          <Text style={styles.emptyTitle}>No Chats Yet</Text>
          <Text style={styles.emptyDescription}>
            Start discovering amazing people nearby to begin your first anonymous conversation!
          </Text>
          
          <TouchableOpacity style={styles.discoverButton}>
            <LinearGradient
              colors={['#ff6b9d', '#c471ed', '#12c2e9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.discoverButtonGradient}
            >
              <Sparkles size={22} color="#FFFFFF" />
              <Text style={styles.discoverButtonText}>Start Discovering</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#ff6b9d', '#ff8a80']}
                style={styles.featureDot}
              />
              <Text style={styles.featureText}>Up to 5 active chats</Text>
            </View>
            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.featureDot}
              />
              <Text style={styles.featureText}>100% anonymous by default</Text>
            </View>
            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#12c2e9', '#c471ed']}
                style={styles.featureDot}
              />
              <Text style={styles.featureText}>Mutual reveal option</Text>
            </View>
          </View>
        </View>

        {/* Tips Card */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipsCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.tipsImage}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.tipsOverlay}
            >
              <Text style={styles.tipsTitle}>💡 Chat Tips</Text>
              <Text style={styles.tipsText}>
                Be genuine, ask interesting questions, and remember - everyone starts as a mystery!
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#ff6b9d', '#c471ed']}
                style={styles.quickActionGradient}
              >
                <Plus size={28} color="#FFFFFF" />
                <Text style={styles.quickActionText}>New Chat</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.quickActionGradient}
              >
                <Users size={28} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Find People</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '600',
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 50,
  },
  emptyIconContainer: {
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
  emptyIconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  emptyDescription: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  discoverButton: {
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  discoverButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: 28,
    gap: 10,
  },
  discoverButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  featuresContainer: {
    alignItems: 'flex-start',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  tipsContainer: {
    paddingHorizontal: 28,
    marginTop: 20,
    marginBottom: 32,
  },
  tipsCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  tipsImage: {
    width: '100%',
    height: 140,
  },
  tipsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 24,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  tipsText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingHorizontal: 28,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  quickActionGradient: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
    letterSpacing: 0.3,
  },
});