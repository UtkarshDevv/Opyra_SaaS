import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const { width } = Dimensions.get("window");

const LessonPlayerScreen = ({ navigation, route }) => {
  const { lessonId, courseId } = route.params;
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(900); // 15 minutes in seconds

  // Mock lesson data
  const lesson = {
    id: lessonId,
    title: "Introduction to React Native",
    description:
      "In this lesson, we will explore the fundamentals of React Native, understand its architecture, and learn why it has become one of the most popular frameworks for mobile app development.",
    duration: "15 min",
    videoUrl: "https://example.com/video.mp4", // Placeholder
    content: [
      {
        type: "text",
        content:
          "React Native is a JavaScript framework for building native mobile applications. It allows you to use React to build mobile apps that run on both iOS and Android platforms.",
      },
      {
        type: "text",
        content:
          "Key benefits of React Native include:\n• Cross-platform development\n• Hot reloading\n• Native performance\n• Large community support",
      },
      {
        type: "text",
        content:
          "In this course, you will learn how to set up your development environment, create your first React Native app, and understand the core concepts that make React Native powerful.",
      },
    ],
    resources: [
      { name: "React Native Documentation", url: "https://reactnative.dev" },
      {
        name: "Getting Started Guide",
        url: "https://reactnative.dev/docs/getting-started",
      },
      { name: "Sample Code", url: "https://github.com/react-native-community" },
    ],
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
    // Here you would typically update the backend
    console.log("Lesson marked as", isCompleted ? "incomplete" : "complete");
  };

  const handleNextLesson = () => {
    // Navigate to next lesson
    navigation.navigate("LessonPlayer", { lessonId: lessonId + 1, courseId });
  };

  const handlePreviousLesson = () => {
    if (lessonId > 1) {
      navigation.navigate("LessonPlayer", { lessonId: lessonId - 1, courseId });
    }
  };

  return (
    // <View style={styles.container}>
    //   <Header
    //     title="Lesson Player"
    //     subtitle={lesson.title}
    //     showBack={true}
    //     onBackPress={() => navigation.goBack()}
    //     rightIcon="bookmark-outline"
    //     onRightPress={() => console.log('Bookmark lesson')}
    //   />

    //   <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
    //     {/* Video Player Placeholder */}
    //     <View style={styles.videoContainer}>
    //       <View style={styles.videoPlaceholder}>
    //         <Ionicons name="play-circle" size={64} color={COLORS.white} />
    //         <Text style={styles.videoPlaceholderText}>Video Player</Text>
    //         <Text style={styles.videoPlaceholderSubtext}>Click to play</Text>
    //       </View>

    //       {/* Video Controls */}
    //       <View style={styles.videoControls}>
    //         <TouchableOpacity style={styles.controlButton}>
    //           <Ionicons name="play" size={20} color={COLORS.white} />
    //         </TouchableOpacity>

    //         <View style={styles.progressContainer}>
    //           <View style={styles.progressBar}>
    //             <View style={[styles.progressFill, { width: `${(currentTime / duration) * 100}%` }]} />
    //           </View>
    //           <Text style={styles.timeText}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
    //         </View>

    //         <TouchableOpacity style={styles.controlButton}>
    //           <Ionicons name="volume-high" size={20} color={COLORS.white} />
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     {/* Lesson Content */}
    //     <View style={styles.lessonContent}>
    //       <Text style={styles.lessonTitle}>{lesson.title}</Text>
    //       <Text style={styles.lessonDescription}>{lesson.description}</Text>

    //       {/* Content Sections */}
    //       {lesson.content.map((section, index) => (
    //         <View key={index} style={styles.contentSection}>
    //           <Text style={styles.contentText}>{section.content}</Text>
    //         </View>
    //       ))}

    //       {/* Resources */}
    //       <Card style={styles.resourcesCard}>
    //         <Text style={styles.resourcesTitle}>Additional Resources</Text>
    //         {lesson.resources.map((resource, index) => (
    //           <TouchableOpacity key={index} style={styles.resourceItem}>
    //             <Ionicons name="link-outline" size={16} color={COLORS.primary} />
    //             <Text style={styles.resourceText}>{resource.name}</Text>
    //             <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
    //           </TouchableOpacity>
    //         ))}
    //       </Card>
    //     </View>
    //   </ScrollView>

    //   {/* Bottom Navigation */}
    //   <View style={styles.bottomNavigation}>
    //     <TouchableOpacity
    //       style={[styles.navButton, lessonId <= 1 && styles.disabledButton]}
    //       onPress={handlePreviousLesson}
    //       disabled={lessonId <= 1}
    //     >
    //       <Ionicons name="chevron-back" size={20} color={lessonId <= 1 ? COLORS.textSecondary : COLORS.primary} />
    //       <Text style={[styles.navButtonText, lessonId <= 1 && styles.disabledButtonText]}>Previous</Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //       style={[styles.completeButton, isCompleted && styles.completedButton]}
    //       onPress={handleMarkComplete}
    //     >
    //       <Ionicons
    //         name={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"}
    //         size={20}
    //         color={isCompleted ? COLORS.white : COLORS.primary}
    //       />
    //       <Text style={[styles.completeButtonText, isCompleted && styles.completedButtonTextActive]}>
    //         {isCompleted ? 'Completed' : 'Mark Complete'}
    //       </Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity style={styles.navButton} onPress={handleNextLesson}>
    //       <Text style={styles.navButtonText}>Next</Text>
    //       <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View className="flex-1 bg-background">
      <Header
        title="Lesson Player"
        subtitle={lesson.title}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="bookmark-outline"
        onRightPress={() => console.log("Bookmark lesson")}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Video Player Placeholder */}
        <View className="bg-black h-[250px] relative">
          <View className="flex-1 items-center justify-center bg-black">
            <Ionicons name="play-circle" size={64} color={COLORS.white} />
            <Text className="font-bold text-lg text-white mt-sm">
              Video Player
            </Text>
            <Text className="font-regular text-sm text-white/50 mt-xs">
              Click to play
            </Text>
          </View>

          {/* Video Controls */}
          <View className="absolute bottom-0 left-0 right-0 flex-row items-center p-md bg-black/70">
            <TouchableOpacity className="p-xs">
              <Ionicons name="play" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <View className="flex-1 mx-md">
              <View className="h-1 bg-white/25 rounded-sm mb-xs">
                <View
                  className="h-full bg-primary rounded-sm"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </View>
              <Text className="font-regular text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </View>

            <TouchableOpacity className="p-xs">
              <Ionicons name="volume-high" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Lesson Content */}
        <View className="p-md">
          <Text className="font-bold text-xl text-textPrimary mb-sm">
            {lesson.title}
          </Text>
          <Text className="font-regular text-md text-textSecondary leading-[22px] mb-lg">
            {lesson.description}
          </Text>

          {/* Content Sections */}
          {lesson.content.map((section, index) => (
            <View key={index} className="mb-lg">
              <Text className="font-regular text-md text-textPrimary leading-[24px]">
                {section.content}
              </Text>
            </View>
          ))}

          {/* Resources */}
          <Card className="mb-lg">
            <Text className="font-bold text-lg text-textPrimary mb-md">
              Additional Resources
            </Text>
            {lesson.resources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center py-sm border-b border-border"
              >
                <Ionicons
                  name="link-outline"
                  size={16}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-primary flex-1 ml-sm">
                  {resource.name}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row items-center justify-between p-md bg-white border-t border-border">
        <TouchableOpacity
          className={`flex-row items-center px-md py-sm ${
            lessonId <= 1 ? "opacity-50" : ""
          }`}
          onPress={handlePreviousLesson}
          disabled={lessonId <= 1}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={lessonId <= 1 ? COLORS.textSecondary : COLORS.primary}
          />
          <Text
            className={`font-medium text-sm mx-xs ${
              lessonId <= 1 ? "text-textSecondary" : "text-primary"
            }`}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center bg-background border px-md py-sm rounded-sm border-primary ${
            isCompleted ? "bg-success border-success" : ""
          }`}
          onPress={handleMarkComplete}
        >
          <Ionicons
            name={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"}
            size={20}
            color={isCompleted ? COLORS.white : COLORS.primary}
          />
          <Text
            className={`font-medium text-sm ml-xs ${
              isCompleted ? "text-white" : "text-primary"
            }`}
          >
            {isCompleted ? "Completed" : "Mark Complete"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center px-md py-sm"
          onPress={handleNextLesson}
        >
          <Text className="font-medium text-sm text-primary mx-xs">Next</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
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
//   },
//   videoContainer: {
//     backgroundColor: COLORS.black,
//     height: 250,
//     position: "relative",
//   },
//   videoPlaceholder: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: COLORS.black,
//   },
//   videoPlaceholderText: {
//     ...FONTS.bold,
//     fontSize: SIZES.lg,
//     color: COLORS.white,
//     marginTop: SPACING.sm,
//   },
//   videoPlaceholderSubtext: {
//     ...FONTS.regular,
//     fontSize: SIZES.sm,
//     color: COLORS.white + "80",
//     marginTop: SPACING.xs,
//   },
//   videoControls: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     padding: SPACING.md,
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },
//   controlButton: {
//     padding: SPACING.xs,
//   },
//   progressContainer: {
//     flex: 1,
//     marginHorizontal: SPACING.md,
//   },
//   progressBar: {
//     height: 4,
//     backgroundColor: COLORS.white + "40",
//     borderRadius: 2,
//     marginBottom: SPACING.xs,
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: COLORS.primary,
//     borderRadius: 2,
//   },
//   timeText: {
//     ...FONTS.regular,
//     fontSize: SIZES.xs,
//     color: COLORS.white,
//   },
//   lessonContent: {
//     padding: SPACING.md,
//   },
//   lessonTitle: {
//     ...FONTS.bold,
//     fontSize: SIZES.xl,
//     color: COLORS.textPrimary,
//     marginBottom: SPACING.sm,
//   },
//   lessonDescription: {
//     ...FONTS.regular,
//     fontSize: SIZES.md,
//     color: COLORS.textSecondary,
//     lineHeight: 22,
//     marginBottom: SPACING.lg,
//   },
//   contentSection: {
//     marginBottom: SPACING.lg,
//   },
//   contentText: {
//     ...FONTS.regular,
//     fontSize: SIZES.md,
//     color: COLORS.textPrimary,
//     lineHeight: 24,
//   },
//   resourcesCard: {
//     marginBottom: SPACING.lg,
//   },
//   resourcesTitle: {
//     ...FONTS.bold,
//     fontSize: SIZES.lg,
//     color: COLORS.textPrimary,
//     marginBottom: SPACING.md,
//   },
//   resourceItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: SPACING.sm,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   resourceText: {
//     ...FONTS.medium,
//     fontSize: SIZES.sm,
//     color: COLORS.primary,
//     flex: 1,
//     marginLeft: SPACING.sm,
//   },
//   bottomNavigation: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: SPACING.md,
//     backgroundColor: COLORS.white,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//   },
//   navButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: SPACING.md,
//     paddingVertical: SPACING.sm,
//   },
//   navButtonText: {
//     ...FONTS.medium,
//     fontSize: SIZES.sm,
//     color: COLORS.primary,
//     marginHorizontal: SPACING.xs,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   disabledButtonText: {
//     color: COLORS.textSecondary,
//   },
//   completeButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.background,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     paddingHorizontal: SPACING.md,
//     paddingVertical: SPACING.sm,
//     borderRadius: SIZES.radius,
//   },
//   completedButton: {
//     backgroundColor: COLORS.success,
//     borderColor: COLORS.success,
//   },
//   completeButtonText: {
//     ...FONTS.medium,
//     fontSize: SIZES.sm,
//     color: COLORS.primary,
//     marginLeft: SPACING.xs,
//   },
//   completedButtonTextActive: {
//     color: COLORS.white,
//   },
// });

export default LessonPlayerScreen;
