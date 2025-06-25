// screens/CRMFeatureScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const pipelineData = [
  { id: '1', name: 'Qualification', count: 12 },
  { id: '2', name: 'Proposal', count: 7 },
  { id: '3', name: 'Won', count: 5 },
];

const CRMFeatureScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CRM</Text>

      {/* KPI Cards */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>24</Text>
          <Text style={styles.kpiLabel}>Leads</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>14</Text>
          <Text style={styles.kpiLabel}>Opportunities</Text>
        </View>
      </View>

      {/* Pipeline */}
      <Text style={styles.sectionTitle}>Pipeline</Text>
      <FlatList
        data={pipelineData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.pipelineCard}>
            <Text style={styles.pipelineName}>{item.name}</Text>
            <Text style={styles.pipelineCount}>{item.count}</Text>
          </View>
        )}
      />

      {/* Action Button */}
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>+ New Lead</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CRMFeatureScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  kpiCard: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 16, width: '48%' },
  kpiNumber: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  kpiLabel: { fontSize: 14, textAlign: 'center', color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  pipelineCard: { backgroundColor: '#e0f7fa', borderRadius: 8, padding: 20, marginRight: 12, alignItems: 'center' },
  pipelineName: { fontSize: 16, fontWeight: '500' },
  pipelineCount: { fontSize: 22, fontWeight: '700', marginTop: 4 },
  actionButton: {
    backgroundColor: '#2196F3', padding: 14, borderRadius: 8,
    alignItems: 'center', position: 'absolute', bottom: 20, right: 20
  },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
