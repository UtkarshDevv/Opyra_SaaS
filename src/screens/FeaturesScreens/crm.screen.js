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
    // <View style={styles.container}>
    //   <Text style={styles.header}>CRM</Text>

    //   {/* KPI Cards */}
    //   <View style={styles.kpiRow}>
    //     <View style={styles.kpiCard}>
    //       <Text style={styles.kpiNumber}>24</Text>
    //       <Text style={styles.kpiLabel}>Leads</Text>
    //     </View>
    //     <View style={styles.kpiCard}>
    //       <Text style={styles.kpiNumber}>14</Text>
    //       <Text style={styles.kpiLabel}>Opportunities</Text>
    //     </View>
    //   </View>

    //   {/* Pipeline */}
    //   <Text style={styles.sectionTitle}>Pipeline</Text>
    //   <FlatList
    //     data={pipelineData}
    //     horizontal
    //     keyExtractor={item => item.id}
    //     renderItem={({ item }) => (
    //       <View style={styles.pipelineCard}>
    //         <Text style={styles.pipelineName}>{item.name}</Text>
    //         <Text style={styles.pipelineCount}>{item.count}</Text>
    //       </View>
    //     )}
    //   />

    //   {/* Action Button */}
    //   <TouchableOpacity style={styles.actionButton}>
    //     <Text style={styles.actionButtonText}>+ New Lead</Text>
    //   </TouchableOpacity>
    // </View>
    <View className="flex-1 p-[16] bg-[#fff]">
      <Text className="text-[24] font-bold mb-[16]">CRM</Text>

      {/* KPI Cards */}
      <View className="flex-row justify-between mb-[20]">
        <View className="bg-[#f5f5f5] rounded-sm p-[16] w-[48%]">
          <Text className="text-[28] font-medium text-center">24</Text>
          <Text className="font-regular text-[#666] text-center">Leads</Text>
        </View>
        <View className="bg-[#f5f5f5] rounded-sm p-[16] w-[48%]">
          <Text className="text-[28] font-medium text-center">14</Text>
          <Text className="font-regular text-[#666] text-center">Opportunities</Text>
        </View>
      </View>

      {/* Pipeline */}
      <Text className="text-[18] font-medium mb-sm">Pipeline</Text>
      <FlatList
        data={pipelineData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-[#e0f7fa] rounded-sm p-[16] mr-[12] items-center">
            <Text className="text-[16] font-medium">{item.name}</Text>
            <Text className="font-bold text-[22] mt-1">{item.count}</Text>
          </View>
        )}
      />

      {/* Action Button */}
      <TouchableOpacity className="bg-[#2196F3] p-[14] rounded-sm items-center absolute bottom-[20] right-[20]">
        <Text className="text-[#fff] text-md font-medium">+ New Lead</Text>
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
