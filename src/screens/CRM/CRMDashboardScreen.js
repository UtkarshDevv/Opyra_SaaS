import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const CRMDashboardScreen = ({ navigation }) => {
  const stats = {
    totalLeads: 156,
    newLeads: 23,
    totalContacts: 892,
    activeDeals: 45,
    wonDeals: 12,
    lostDeals: 8,
    revenue: "$125,430",
    conversionRate: "68%",
  };

  const recentLeads = [
    {
      id: 1,
      name: "John Smith",
      company: "Tech Solutions Inc",
      email: "john@techsolutions.com",
      phone: "+1 (555) 123-4567",
      status: "New",
      value: "$15,000",
      source: "Website",
      lastContact: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Global Marketing",
      email: "sarah@globalmarketing.com",
      phone: "+1 (555) 987-6543",
      status: "Qualified",
      value: "$25,000",
      source: "Referral",
      lastContact: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Wilson",
      company: "StartupXYZ",
      email: "mike@startupxyz.com",
      phone: "+1 (555) 456-7890",
      status: "Proposal",
      value: "$35,000",
      source: "LinkedIn",
      lastContact: "3 days ago",
    },
  ];

  const pipelineStages = [
    { name: "New", count: 23, color: "#FF6B35", percentage: 15 },
    { name: "Qualified", count: 18, color: "#FFC107", percentage: 12 },
    { name: "Proposal", count: 12, color: "#17A2B8", percentage: 8 },
    { name: "Negotiation", count: 8, color: "#6F42C1", percentage: 5 },
    { name: "Closed Won", count: 12, color: "#28A745", percentage: 8 },
    { name: "Closed Lost", count: 8, color: "#DC3545", percentage: 5 },
  ];

  const renderLeadCard = (lead) => (
    <Card key={lead.id} className="mb-md p-lg">
      <View className="flex-row justify-between items-center mb-md">
        <View className="flex-1">
          <Text className="font-bold text-lg text-textPrimary mb-xs">{lead.name}</Text>
          <Text className="font-regular text-sm text-textSecondary">{lead.company}</Text>
        </View>
        <View className="ml-sm">
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(lead.status) },
            ]}
          >
            <Text className="font-medium text-xs text-white">{lead.status}</Text>
          </View>
        </View>
      </View>

      <View className="mb-md">
        <View className="flex-row items-center mb-xs">
          <Ionicons
            name="mail-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text className="font-regular text-sm text-textSecondary ml-xs">{lead.email}</Text>
        </View>
        <View className="flex-row items-center mb-xs">
          <Ionicons
            name="call-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text className="font-regular text-sm text-textSecondary ml-xs">{lead.phone}</Text>
        </View>
        <View className="flex-row items-center mb-xs">
          <Ionicons
            name="cash-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text className="font-regular text-sm text-textSecondary ml-xs">{lead.value}</Text>
        </View>
        <View className="flex-row items-center mb-xs">
          <Ionicons
            name="time-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text className="font-regular text-sm text-textSecondary ml-xs">{lead.lastContact}</Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        <Button
          title="View Details"
          variant="outline"
          size="small"
          onPress={() => navigation.navigate("LeadDetail", { lead })}
        />
        <Button
          title="Contact"
          variant="primary"
          size="small"
          onPress={() => navigation.navigate("ContactLead", { lead })}
        />
      </View>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return COLORS.info;
      case "Qualified":
        return COLORS.warning;
      case "Proposal":
        return COLORS.secondary;
      case "Negotiation":
        return COLORS.primary;
      case "Closed Won":
        return COLORS.success;
      case "Closed Lost":
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Header
        title="CRM Dashboard"
        subtitle="Customer Relationship Management"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="add-outline"
        onRightPress={() => navigation.navigate("AddLead")}
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View className="mb-lg">
          <LinearGradient
            colors={["#00A09D", "#33B3B0"]}
            style={styles.statsGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="flex-row flex-wrap justify-between">
              <View className="w-[48%] items-center mb-md">
                <Text className="font-bold text-xxl text-white mb-xs">
                  {stats.totalLeads}
                </Text>
                <Text className="font-regular text-sm text-center text-[rgba(255,255,255,0.9)]">
                  Total Leads
                </Text>
              </View>
              <View className="w-[48%] items-center mb-md">
                <Text className="font-bold text-xxl text-white mb-xs">
                  {stats.newLeads}
                </Text>
                <Text className="font-regular text-sm text-center text-[rgba(255,255,255,0.9)]">
                  New This Week
                </Text>
              </View>
              <View className="w-[48%] items-center mb-md">
                <Text className="font-bold text-xxl text-white mb-xs">
                  {stats.activeDeals}
                </Text>
                <Text className="font-regular text-sm text-center text-[rgba(255,255,255,0.9)]">
                  Active Deals
                </Text>
              </View>
              <View className="w-[48%] items-center mb-md">
                <Text className="font-bold text-xxl text-white mb-xs">
                  {stats.revenue}
                </Text>
                <Text className="font-regular text-sm text-center text-[rgba(255,255,255,0.9)]">
                  Revenue
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Pipeline Overview */}
        <View className="mb-lg">
          <Card className="p-lg">
            <View className="flex-row justify-between items-center mb-md">
              <Text className="font-bold text-lg text-textPrimary">Sales Pipeline</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Pipeline')}>
                <Text className="font-medium text-sm text-primary">View All</Text>
              </TouchableOpacity>
            </View>
            
            <View className="mt-md">
              {pipelineStages.map((stage, index) => (
                <View key={index} className="mb-lg">
                  <View className="flex-row items-center mb-xs">
                    {/*  */}
                    <View style={[styles.stageColor, { backgroundColor: stage.color }]}/>
                    <Text className="flex-1 font-medium text-sm text-textPrimary">{stage.name}</Text>
                    <Text className="font-bold text-sm text-textPrimary">{stage.count}</Text>
                  </View>
                  <View className="h-[6] bg-lightGray overflow-hidden rounded-[3]">
                    <View 
                      style={[
                        styles.stageProgress, 
                        { 
                          backgroundColor: stage.color,
                          width: `${stage.percentage}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Recent Leads */}
        <View className="mb-lg">
          <View className="flex-row justify-between items-center mb-md">
            <Text className="font-bold text-lg text-textPrimary">Recent Leads</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AllLeads")}>
              <Text className="font-medium text-sm text-primary">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-col gap-lg">{recentLeads.map(renderLeadCard)}</View>
          
        </View>
        
        {/* Quick Actions */}
        <View className="mb-xl ">
          <Card className="p-lg">
            <Text className="font-bold text-lg text-textPrimary mb-md">Quick Actions</Text>
            <View className="flex-row flex-wrap gap-2 font-bold text-lg text-textPrimary mb-md">
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-[8px]"
                onPress={() => navigation.navigate("AddLead")}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">Add Lead</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-[8px]"
                onPress={() => navigation.navigate("ImportContacts")}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">Import Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-[8px]"
                onPress={() => navigation.navigate("Reports")}
              >
                <Ionicons
                  name="bar-chart-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-[8px]"
                onPress={() => navigation.navigate("Settings")}
              >
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">Settings</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  statsGradient: {
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
  },
  stageColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  stageProgress: {
    height: "100%",
    borderRadius: 3,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default CRMDashboardScreen;
