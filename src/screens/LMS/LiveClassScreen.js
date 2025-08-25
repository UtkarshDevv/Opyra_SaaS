import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const LiveClassScreen = ({ navigation, route }) => {
  const [isJoined, setIsJoined] = useState(false);

  // Mock live class data
  const liveClass = {
    id: route.params?.classId || 1,
    title: "React Native Live Q&A Session",
    instructor: "Jane Smith",
    date: "2024-01-15",
    time: "14:00",
    duration: "60 min",
    description:
      "Join us for an interactive Q&A session where we'll discuss React Native best practices, common challenges, and advanced topics. Bring your questions!",
    participants: 25,
    maxParticipants: 50,
    topics: [
      "React Native Performance Optimization",
      "State Management Best Practices",
      "Navigation Patterns",
      "Testing Strategies",
    ],
    materials: [
      { name: "Session Slides", type: "pdf" },
      { name: "Code Examples", type: "zip" },
      { name: "Reference Links", type: "link" },
    ],
  };

  const upcomingClasses = [
    {
      id: 1,
      title: "React Native Live Q&A",
      instructor: "Jane Smith",
      date: "2024-01-15",
      time: "14:00",
      duration: "60 min",
      participants: 25,
      maxParticipants: 50,
    },
    {
      id: 2,
      title: "JavaScript Workshop",
      instructor: "John Wilson",
      date: "2024-01-17",
      time: "16:00",
      duration: "90 min",
      participants: 18,
      maxParticipants: 30,
    },
    {
      id: 3,
      title: "Mobile Development Best Practices",
      instructor: "Sarah Brown",
      date: "2024-01-20",
      time: "10:00",
      duration: "120 min",
      participants: 12,
      maxParticipants: 25,
    },
  ];

  const handleJoinClass = () => {
    setIsJoined(true);
    // Here you would typically integrate with a video conferencing service
    console.log("Joining live class:", liveClass.id);
  };

  // const renderUpcomingClass = ({ item }) => (
  //   <TouchableOpacity
  //     style={styles.upcomingClassCard}
  //     onPress={() => navigation.navigate("LiveClass", { classId: item.id })}
  //   >
  //     <View style={styles.classHeader}>
  //       <Text style={styles.classTitle}>{item.title}</Text>
  //       <View style={styles.classStatus}>
  //         <Ionicons name="time-outline" size={16} color={COLORS.primary} />
  //         <Text style={styles.classTime}>{item.time}</Text>
  //       </View>
  //     </View>

  //     <View style={styles.classMeta}>
  //       <Text style={styles.classInstructor}>by {item.instructor}</Text>
  //       <Text style={styles.classDate}>{item.date}</Text>
  //     </View>

  //     <View style={styles.classStats}>
  //       <View style={styles.statItem}>
  //         <Ionicons
  //           name="time-outline"
  //           size={14}
  //           color={COLORS.textSecondary}
  //         />
  //         <Text style={styles.statText}>{item.duration}</Text>
  //       </View>
  //       <View style={styles.statItem}>
  //         <Ionicons
  //           name="people-outline"
  //           size={14}
  //           color={COLORS.textSecondary}
  //         />
  //         <Text style={styles.statText}>
  //           {item.participants}/{item.maxParticipants}
  //         </Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  const renderUpcomingClass = ({ item }) => (
    <TouchableOpacity
      className="bg-white border-border rounded-xl p-md mr-md shadow-md w-64"
      onPress={() => navigation.navigate("LiveClass", { classId: item.id })}
    >
      {/* Header */}
      <View className="flex-row flex-wrap items-center justify-between mb-sm">
        <Text className="text-base text-sm font-bold text-textPrimary">
          {item.title}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color={COLORS.primary} />
          <Text className="ml-xs text-sm text-primary">{item.time}</Text>
        </View>
      </View>

      {/* Meta */}
      <View className="mb-sm">
        <Text className="text-sm text-textSecondary">by {item.instructor}</Text>
        <Text className="text-sm text-textSecondary">{item.date}</Text>
      </View>

      {/* Stats */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons
            name="time-outline"
            size={14}
            color={COLORS.textSecondary}
          />
          <Text className="ml-xs text-xs text-textSecondary">
            {item.duration}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons
            name="people-outline"
            size={14}
            color={COLORS.textSecondary}
          />
          <Text className="ml-xs text-xs text-textSecondary">
            {item.participants}/{item.maxParticipants}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    // <View style={styles.container}>
    //   <Header
    //     title="Live Class"
    //     subtitle={liveClass.title}
    //     showBack={true}
    //     onBackPress={() => navigation.goBack()}
    //     rightIcon="share-outline"
    //     onRightPress={() => console.log('Share class')}
    //   />

    //   <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
    //     {/* Class Details */}
    //     <Card style={styles.classCard}>
    //       <View style={styles.classHeader}>
    //         <Text style={styles.classTitle}>{liveClass.title}</Text>
    //         <View style={styles.classStatus}>
    //           <Ionicons name="videocam" size={20} color={COLORS.success} />
    //           <Text style={styles.statusText}>Live</Text>
    //         </View>
    //       </View>

    //       <Text style={styles.classDescription}>{liveClass.description}</Text>

    //       <View style={styles.classInfo}>
    //         <View style={styles.infoItem}>
    //           <Ionicons name="person-outline" size={16} color={COLORS.textSecondary} />
    //           <Text style={styles.infoText}>{liveClass.instructor}</Text>
    //         </View>
    //         <View style={styles.infoItem}>
    //           <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
    //           <Text style={styles.infoText}>{liveClass.date} at {liveClass.time}</Text>
    //         </View>
    //         <View style={styles.infoItem}>
    //           <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
    //           <Text style={styles.infoText}>{liveClass.duration}</Text>
    //         </View>
    //         <View style={styles.infoItem}>
    //           <Ionicons name="people-outline" size={16} color={COLORS.textSecondary} />
    //           <Text style={styles.infoText}>{liveClass.participants}/{liveClass.maxParticipants} participants</Text>
    //         </View>
    //       </View>
    //     </Card>

    //     {/* Topics */}
    //     <Card style={styles.topicsCard}>
    //       <Text style={styles.sectionTitle}>Topics Covered</Text>
    //       {liveClass.topics.map((topic, index) => (
    //         <View key={index} style={styles.topicItem}>
    //           <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
    //           <Text style={styles.topicText}>{topic}</Text>
    //         </View>
    //       ))}
    //     </Card>

    //     {/* Materials */}
    //     <Card style={styles.materialsCard}>
    //       <Text style={styles.sectionTitle}>Session Materials</Text>
    //       {liveClass.materials.map((material, index) => (
    //         <TouchableOpacity key={index} style={styles.materialItem}>
    //           <Ionicons
    //             name={material.type === 'pdf' ? 'document-text' : material.type === 'zip' ? 'archive' : 'link'}
    //             size={16}
    //             color={COLORS.primary}
    //           />
    //           <Text style={styles.materialText}>{material.name}</Text>
    //           <Ionicons name="download-outline" size={16} color={COLORS.textSecondary} />
    //         </TouchableOpacity>
    //       ))}
    //     </Card>

    //     {/* Join Button */}
    //     <TouchableOpacity
    //       style={[styles.joinButton, isJoined && styles.joinedButton]}
    //       onPress={handleJoinClass}
    //       disabled={isJoined}
    //     >
    //       <Ionicons
    //         name={isJoined ? "checkmark-circle" : "videocam"}
    //         size={20}
    //         color={COLORS.white}
    //       />
    //       <Text style={styles.joinButtonText}>
    //         {isJoined ? 'Joined' : 'Join Class'}
    //       </Text>
    //     </TouchableOpacity>

    //     {/* Upcoming Classes */}
    //     <View style={styles.upcomingSection}>
    //       <Text style={styles.sectionTitle}>Upcoming Classes</Text>
    //       <FlatList
    //         data={upcomingClasses}
    //         renderItem={renderUpcomingClass}
    //         keyExtractor={item => item.id.toString()}
    //         horizontal
    //         showsHorizontalScrollIndicator={false}
    //         contentContainerStyle={styles.upcomingList}
    //       />
    //     </View>
    //   </ScrollView>
    // </View>
    <View className="flex-1 bg-white">
      <Header
        title="Live Class"
        subtitle={liveClass.title}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="share-outline"
        onRightPress={() => console.log("Share class")}
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-md">
          {/* Class Details */}
          <Card className="p-md mb-md rounded-2xl shadow-sm">
            <View className="flex-row justify-between items-center mb-sm">
              <Text className="text-lg font-bold text-textPrimary">
                {liveClass.title}
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="videocam" size={20} color={COLORS.success} />
                <Text className="ml-xs text-success font-semibold">Live</Text>
              </View>
            </View>

            <Text className="text-base text-textSecondary mb-md">
              {liveClass.description}
            </Text>

            <View className="space-y-xs">
              <View className="flex-row items-center">
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text className="ml-xs text-sm text-textSecondary">
                  {liveClass.instructor}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text className="ml-xs text-sm text-textSecondary">
                  {liveClass.date} at {liveClass.time}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text className="ml-xs text-sm text-textSecondary">
                  {liveClass.duration}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons
                  name="people-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text className="ml-xs text-sm text-textSecondary">
                  {liveClass.participants}/{liveClass.maxParticipants}{" "}
                  participants
                </Text>
              </View>
            </View>
          </Card>

          {/* Topics */}
          <Card className="p-md mb-md rounded-2xl shadow-sm">
            <Text className="text-lg font-semibold text-textPrimary mb-sm">
              Topics Covered
            </Text>
            {liveClass.topics.map((topic, index) => (
              <View key={index} className="flex-row items-center mb-xs">
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={COLORS.success}
                />
                <Text className="ml-xs text-sm text-textSecondary">
                  {topic}
                </Text>
              </View>
            ))}
          </Card>

          {/* Materials */}
          <Card className="p-md mb-md rounded-2xl shadow-sm">
            <Text className="text-lg font-semibold text-textPrimary mb-sm">
              Session Materials
            </Text>
            {liveClass.materials.map((material, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center justify-between py-xs"
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name={
                      material.type === "pdf"
                        ? "document-text"
                        : material.type === "zip"
                        ? "archive"
                        : "link"
                    }
                    size={16}
                    color={COLORS.primary}
                  />
                  <Text className="ml-xs text-sm text-textSecondary">
                    {material.name}
                  </Text>
                </View>
                <Ionicons
                  name="download-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </Card>

          {/* Join Button */}
          <TouchableOpacity
            className={`flex-row items-center justify-center py-md px-lg rounded-xl ${
              isJoined ? "bg-success" : "bg-primary"
            }`}
            onPress={handleJoinClass}
            disabled={isJoined}
          >
            <Ionicons
              name={isJoined ? "checkmark-circle" : "videocam"}
              size={20}
              color={COLORS.white}
            />
            <Text className="ml-xs text-white font-semibold text-base">
              {isJoined ? "Joined" : "Join Class"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Classes */}
        <View className="mt-lg mb-xl">
          <Text className="text-lg font-semibold text-textPrimary mb-sm">
            Upcoming Classes
          </Text>
          <FlatList
            data={upcomingClasses}
            renderItem={renderUpcomingClass}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   content: {
//     flex: 1,
//     padding: SPACING.md,
//   },
//   classCard: {
//     marginBottom: SPACING.lg,
//   },
//   classHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: SPACING.sm,
//   },
//   classTitle: {
//     ...FONTS.bold,
//     fontSize: SIZES.lg,
//     color: COLORS.textPrimary,
//     flex: 1,
//     marginRight: SPACING.sm,
//   },
//   classStatus: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   statusText: {
//     ...FONTS.medium,
//     fontSize: SIZES.sm,
//     color: COLORS.success,
//     marginLeft: SPACING.xs,
//   },
//   classDescription: {
//     ...FONTS.regular,
//     fontSize: SIZES.md,
//     color: COLORS.textSecondary,
//     lineHeight: 22,
//     marginBottom: SPACING.md,
//   },
//   classInfo: {
//     marginBottom: SPACING.sm,
//   },
//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: SPACING.xs,
//   },
//   infoText: {
//     ...FONTS.medium,
//     fontSize: SIZES.sm,
//     color: COLORS.textSecondary,
//     marginLeft: SPACING.xs,
//   },
//   topicsCard: {
//     marginBottom: SPACING.lg,
//   },
//   sectionTitle: {
//     ...FONTS.bold,
//     fontSize: SIZES.md,
//     color: COLORS.textPrimary,
//     marginBottom: SPACING.md,
//   },
//   topicItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: SPACING.sm,
//   },
//   topicText: {
//     ...FONTS.regular,
//     fontSize: SIZES.sm,
//     color: COLORS.textPrimary,
//     marginLeft: SPACING.sm,
//   },
//   materialsCard: {
//     marginBottom: SPACING.lg,
//   },
//   materialItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: SPACING.sm,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   materialText: {
//     ...FONTS.medium,
//     fontSize: SIZES.sm,
//     color: COLORS.primary,
//     flex: 1,
//     marginLeft: SPACING.sm,
//   },
//   joinButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: COLORS.primary,
//     paddingVertical: SPACING.md,
//     borderRadius: SIZES.radius,
//     marginBottom: SPACING.lg,
//   },
//   joinedButton: {
//     backgroundColor: COLORS.success,
//   },
//   joinButtonText: {
//     ...FONTS.bold,
//     fontSize: SIZES.md,
//     color: COLORS.white,
//     marginLeft: SPACING.sm,
//   },
//   upcomingSection: {
//     marginBottom: SPACING.lg,
//   },
//   upcomingList: {
//     paddingRight: SPACING.md,
//   },
//   upcomingClassCard: {
//     backgroundColor: COLORS.white,
//     borderRadius: SIZES.radius,
//     padding: SPACING.md,
//     marginRight: SPACING.md,
//     width: 200,
//     elevation: 2,
//     shadowColor: COLORS.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   classMeta: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: SPACING.sm,
//   },
//   classInstructor: {
//     ...FONTS.medium,
//     fontSize: SIZES.xs,
//     color: COLORS.primary,
//   },
//   classDate: {
//     ...FONTS.medium,
//     fontSize: SIZES.xs,
//     color: COLORS.textSecondary,
//   },
//   classStats: {
//     flexDirection: "row",
//   },
//   statItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: SPACING.md,
//   },
//   statText: {
//     ...FONTS.regular,
//     fontSize: SIZES.xs,
//     color: COLORS.textSecondary,
//     marginLeft: SPACING.xs,
//   },
//   classTime: {
//     ...FONTS.medium,
//     fontSize: SIZES.xs,
//     color: COLORS.primary,
//     marginLeft: SPACING.xs,
//   },
// });

export default LiveClassScreen;
