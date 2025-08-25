import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const CourseDetailsScreen = ({ navigation, route }) => {
  const { courseId } = route.params;
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'lessons', 'quizzes'

  // Mock course data
  const course = {
    id: courseId,
    title: "React Native Basics",
    description:
      "Learn the fundamentals of React Native development from scratch. This comprehensive course covers everything you need to know to build mobile applications using React Native.",
    instructor: "Jane Smith",
    thumbnail:
      "https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=React+Native+Course",
    category: "Programming",
    duration: "8 weeks",
    lessons: 12,
    students: 45,
    price: "$99",
    rating: 4.8,
    progress: 75,
    lessons: [
      {
        id: 1,
        title: "Introduction to React Native",
        duration: "15 min",
        type: "video",
        completed: true,
        description: "Overview of React Native and its benefits",
      },
      {
        id: 2,
        title: "Setting up Development Environment",
        duration: "20 min",
        type: "video",
        completed: true,
        description: "Install and configure React Native development tools",
      },
      {
        id: 3,
        title: "Basic Components",
        duration: "25 min",
        type: "video",
        completed: true,
        description: "Learn about View, Text, and other basic components",
      },
      {
        id: 4,
        title: "Styling and Layout",
        duration: "30 min",
        type: "video",
        completed: false,
        description: "Understanding Flexbox and styling in React Native",
      },
      {
        id: 5,
        title: "Navigation Basics",
        duration: "35 min",
        type: "video",
        completed: false,
        description: "Implement navigation between screens",
      },
      {
        id: 6,
        title: "State Management",
        duration: "40 min",
        type: "video",
        completed: false,
        description: "Managing component state and props",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "React Native Fundamentals",
        questions: 10,
        timeLimit: 15,
        completed: true,
        score: 85,
      },
      {
        id: 2,
        title: "Component Basics Quiz",
        questions: 8,
        timeLimit: 12,
        completed: false,
        score: null,
      },
      {
        id: 3,
        title: "Styling and Layout Quiz",
        questions: 12,
        timeLimit: 18,
        completed: false,
        score: null,
      },
    ],
  };

  // const renderOverview = () => (
  //   <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
  //     <Image source={{ uri: course.thumbnail }} style={styles.courseImage} />

  //     <View style={styles.courseInfo}>
  //       <Text style={styles.courseTitle}>{course.title}</Text>
  //       <Text style={styles.courseDescription}>{course.description}</Text>

  //       <View style={styles.courseMeta}>
  //         <View style={styles.metaItem}>
  //           <Ionicons
  //             name="person-outline"
  //             size={16}
  //             color={COLORS.textSecondary}
  //           />
  //           <Text style={styles.metaText}>by {course.instructor}</Text>
  //         </View>
  //         <View style={styles.metaItem}>
  //           <Ionicons
  //             name="time-outline"
  //             size={16}
  //             color={COLORS.textSecondary}
  //           />
  //           <Text style={styles.metaText}>{course.duration}</Text>
  //         </View>
  //         <View style={styles.metaItem}>
  //           <Ionicons
  //             name="library-outline"
  //             size={16}
  //             color={COLORS.textSecondary}
  //           />
  //           <Text style={styles.metaText}>{course.lessons.length} lessons</Text>
  //         </View>
  //       </View>

  //       <View style={styles.progressSection}>
  //         <Text style={styles.progressTitle}>Your Progress</Text>
  //         <View style={styles.progressBar}>
  //           <View
  //             style={[styles.progressFill, { width: `${course.progress}%` }]}
  //           />
  //         </View>
  //         <Text style={styles.progressText}>{course.progress}% Complete</Text>
  //       </View>

  //       <View style={styles.statsGrid}>
  //         <Card style={styles.statCard}>
  //           <Text style={styles.statNumber}>
  //             {course.lessons.filter((l) => l.completed).length}
  //           </Text>
  //           <Text style={styles.statLabel}>Lessons Completed</Text>
  //         </Card>
  //         <Card style={styles.statCard}>
  //           <Text style={styles.statNumber}>
  //             {course.quizzes.filter((q) => q.completed).length}
  //           </Text>
  //           <Text style={styles.statLabel}>Quizzes Taken</Text>
  //         </Card>
  //         <Card style={styles.statCard}>
  //           <Text style={styles.statNumber}>{course.rating}</Text>
  //           <Text style={styles.statLabel}>Course Rating</Text>
  //         </Card>
  //       </View>
  //     </View>
  //   </ScrollView>
  // );

  const renderOverview = () => (
    <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: course.thumbnail }}
        className="w-full h-[70%] rounded-lg mb-xxl"
      />

      <View className="space-y-lg">
        {/* Title + Description */}
        <View>
          <Text className="text-xxl font-bold text-textPrimary mb-xs">
            {course.title}
          </Text>
          <Text className="text-md text-textSecondary">
            {course.description}
          </Text>
        </View>

        {/* Meta Info */}
        <View className="flex-row flex-wrap gap-md">
          <View className="flex-row items-center gap-xs">
            <Ionicons
              name="person-outline"
              size={16}
              color={COLORS.textSecondary}
            />
            <Text className="text-sm text-textSecondary">
              by {course.instructor}
            </Text>
          </View>
          <View className="flex-row items-center gap-xs">
            <Ionicons
              name="time-outline"
              size={16}
              color={COLORS.textSecondary}
            />
            <Text className="text-sm text-textSecondary">
              {course.duration}
            </Text>
          </View>
          <View className="flex-row items-center gap-xs">
            <Ionicons
              name="library-outline"
              size={16}
              color={COLORS.textSecondary}
            />
            <Text className="text-sm text-textSecondary">
              {course.lessons.length} lessons
            </Text>
          </View>
        </View>

        {/* Progress Section */}
        <View className="mt-md">
          <Text className="text-lg font-semibold text-textPrimary mb-sm">
            Your Progress
          </Text>
          <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-2 bg-primary"
              style={{ width: `${course.progress}%` }}
            />
          </View>
          <Text className="text-sm text-textSecondary mt-xs">
            {course.progress}% Complete
          </Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row justify-between mt-lg">
          <Card
            style={styles.statCard}
            className="flex-1 bg-card p-md rounded-lg items-center mx-1 shadow-md"
          >
            <Text className="text-xl font-bold text-textPrimary">
              {course.lessons.filter((l) => l.completed).length}
            </Text>
            <Text className="text-sm text-textSecondary">
              Lessons Completed
            </Text>
          </Card>
          <Card
            style={styles.statCard}
            className="flex-1 bg-card p-md rounded-lg items-center mx-1 shadow-md"
          >
            <Text className="text-xl font-bold text-textPrimary">
              {course.quizzes.filter((q) => q.completed).length}
            </Text>
            <Text className="text-sm text-textSecondary">Quizzes Taken</Text>
          </Card>
          <Card
            style={styles.statCard}
            className="flex-1 bg-card p-md rounded-lg items-center mx-1 shadow-md"
          >
            <Text className="text-xl font-bold text-textPrimary">
              {course.rating}
            </Text>
            <Text className="text-sm text-textSecondary">Course Rating</Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );

  // const renderLessons = () => (
  //   <FlatList
  //     data={course.lessons}
  //     renderItem={({ item, index }) => (
  //       <TouchableOpacity
  //         style={styles.lessonItem}
  //         onPress={() =>
  //           navigation.navigate("LessonPlayer", {
  //             lessonId: item.id,
  //             courseId: course.id,
  //           })
  //         }
  //       >
  //         <View style={styles.lessonHeader}>
  //           <View style={styles.lessonNumber}>
  //             <Text style={styles.lessonNumberText}>{index + 1}</Text>
  //           </View>
  //           <View style={styles.lessonContent}>
  //             <Text style={styles.lessonTitle}>{item.title}</Text>
  //             <Text style={styles.lessonDescription}>{item.description}</Text>
  //             <View style={styles.lessonMeta}>
  //               <View style={styles.lessonMetaItem}>
  //                 <Ionicons
  //                   name="time-outline"
  //                   size={14}
  //                   color={COLORS.textSecondary}
  //                 />
  //                 <Text style={styles.lessonMetaText}>{item.duration}</Text>
  //               </View>
  //               <View style={styles.lessonMetaItem}>
  //                 <Ionicons
  //                   name="videocam-outline"
  //                   size={14}
  //                   color={COLORS.textSecondary}
  //                 />
  //                 <Text style={styles.lessonMetaText}>Video</Text>
  //               </View>
  //             </View>
  //           </View>
  //           <View style={styles.lessonStatus}>
  //             {item.completed ? (
  //               <Ionicons
  //                 name="checkmark-circle"
  //                 size={24}
  //                 color={COLORS.success}
  //               />
  //             ) : (
  //               <Ionicons
  //                 name="play-circle-outline"
  //                 size={24}
  //                 color={COLORS.primary}
  //               />
  //             )}
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     )}
  //     keyExtractor={(item) => item.id.toString()}
  //     showsVerticalScrollIndicator={false}
  //     contentContainerStyle={styles.listContainer}
  //   />
  // );

  const renderLessons = () => (
    <FlatList
      data={course.lessons}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          className="bg-white border-border rounded-lg mr-md ml-md mb-sm p-md shadow-md"
          onPress={() =>
            navigation.navigate("LessonPlayer", {
              lessonId: item.id,
              courseId: course.id,
            })
          }
        >
          <View className="flex-row items-center">
            {/* Lesson Number */}
            <View className="w-14 h-14 rounded-full bg-primary/10 justify-center items-center mr-md">
              <Text className="text-primary font-bold">{index + 1}</Text>
            </View>

            {/* Lesson Content */}
            <View className="flex-1">
              <Text className="text-base text-md font-bold text-textPrimary">
                {item.title}
              </Text>
              <Text className="text-sm text-textSecondary mt-xs">
                {item.description}
              </Text>

              {/* Meta Info */}
              <View className="flex-row mt-xs">
                <View className="flex-row items-center mr-md">
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
                    name="videocam-outline"
                    size={14}
                    color={COLORS.textSecondary}
                  />
                  <Text className="ml-xs text-xs text-textSecondary">
                    Video
                  </Text>
                </View>
              </View>
            </View>

            {/* Lesson Status */}
            <View>
              {item.completed ? (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={COLORS.success}
                />
              ) : (
                <Ionicons
                  name="play-circle-outline"
                  size={24}
                  color={COLORS.primary}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );

  // const renderQuizzes = () => (
  //   <FlatList
  //     data={course.quizzes}
  //     renderItem={({ item }) => (
  //       <TouchableOpacity
  //         style={styles.quizItem}
  //         onPress={() =>
  //           navigation.navigate("QuizScreen", {
  //             quizId: item.id,
  //             courseId: course.id,
  //           })
  //         }
  //       >
  //         <View style={styles.quizHeader}>
  //           <Text style={styles.quizTitle}>{item.title}</Text>
  //           <View style={styles.quizStatus}>
  //             {item.completed ? (
  //               <View style={styles.completedBadge}>
  //                 <Text style={styles.completedText}>Completed</Text>
  //               </View>
  //             ) : (
  //               <View style={styles.pendingBadge}>
  //                 <Text style={styles.pendingText}>Pending</Text>
  //               </View>
  //             )}
  //           </View>
  //         </View>

  //         <View style={styles.quizMeta}>
  //           <View style={styles.quizMetaItem}>
  //             <Ionicons
  //               name="help-circle-outline"
  //               size={14}
  //               color={COLORS.textSecondary}
  //             />
  //             <Text style={styles.quizMetaText}>
  //               {item.questions} questions
  //             </Text>
  //           </View>
  //           <View style={styles.quizMetaItem}>
  //             <Ionicons
  //               name="time-outline"
  //               size={14}
  //               color={COLORS.textSecondary}
  //             />
  //             <Text style={styles.quizMetaText}>{item.timeLimit} min</Text>
  //           </View>
  //           {item.completed && (
  //             <View style={styles.quizMetaItem}>
  //               <Ionicons
  //                 name="trophy-outline"
  //                 size={14}
  //                 color={COLORS.success}
  //               />
  //               <Text style={[styles.quizMetaText, { color: COLORS.success }]}>
  //                 {item.score}%
  //               </Text>
  //             </View>
  //           )}
  //         </View>
  //       </TouchableOpacity>
  //     )}
  //     keyExtractor={(item) => item.id.toString()}
  //     showsVerticalScrollIndicator={false}
  //     contentContainerStyle={styles.listContainer}
  //   />
  // );

  const renderQuizzes = () => (
    <FlatList
      data={course.quizzes}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="bg-white border-border mx-sm my-0 rounded-xl p-md mb-4 shadow-md"
          onPress={() =>
            navigation.navigate("QuizScreen", {
              quizId: item.id,
              courseId: course.id,
            })
          }
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base text-md font-semibold text-textPrimary">
              {item.title}
            </Text>

            <View>
              {item.completed ? (
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-green-600 text-xs font-medium">
                    Completed
                  </Text>
                </View>
              ) : (
                <View className="bg-yellow-100 px-2 py-1 rounded-full">
                  <Text className="text-yellow-600 text-xs font-medium">
                    Pending
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Meta Info */}
          <View className="flex-row flex-wrap gap-4">
            <View className="flex-row items-center gap-1">
              <Ionicons
                name="help-circle-outline"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text className="text-sm text-textSecondary">
                {item.questions} questions
              </Text>
            </View>

            <View className="flex-row items-center gap-1">
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text className="text-sm text-textSecondary">
                {item.timeLimit} min
              </Text>
            </View>

            {item.completed && (
              <View className="flex-row items-center gap-1">
                <Ionicons
                  name="trophy-outline"
                  size={14}
                  color={COLORS.success}
                />
                <Text className="text-sm font-medium text-green-600">
                  {item.score}%
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );

  return (
    // <View style={styles.container}>
    //   <Header
    //     title="Course Details"
    //     subtitle={course.title}
    //     showBack={true}
    //     onBackPress={() => navigation.goBack()}
    //     rightIcon="bookmark-outline"
    //     onRightPress={() => console.log('Bookmark course')}
    //   />

    //   {/* Tab Navigation */}
    //   <View style={styles.tabContainer}>
    //     <TouchableOpacity
    //       style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
    //       onPress={() => setActiveTab('overview')}
    //     >
    //       <Text style={[styles.tabButtonText, activeTab === 'overview' && styles.activeTabButtonText]}>Overview</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={[styles.tabButton, activeTab === 'lessons' && styles.activeTabButton]}
    //       onPress={() => setActiveTab('lessons')}
    //     >
    //       <Text style={[styles.tabButtonText, activeTab === 'lessons' && styles.activeTabButtonText]}>Lessons</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={[styles.tabButton, activeTab === 'quizzes' && styles.activeTabButton]}
    //       onPress={() => setActiveTab('quizzes')}
    //     >
    //       <Text style={[styles.tabButtonText, activeTab === 'quizzes' && styles.activeTabButtonText]}>Quizzes</Text>
    //     </TouchableOpacity>
    //   </View>

    //   {/* Tab Content */}
    //   {activeTab === 'overview' && renderOverview()}
    //   {activeTab === 'lessons' && renderLessons()}
    //   {activeTab === 'quizzes' && renderQuizzes()}
    // </View>
    <View className="flex-1 bg-background">
      <Header
        title="Course Details"
        subtitle={course.title}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="bookmark-outline"
        onRightPress={() => console.log("Bookmark course")}
      />

      {/* Tab Navigation */}
      <View className="flex-row bg-white border-b border-border">
        <TouchableOpacity
          className={`flex-1 py-md items-center ${
            activeTab === "overview" ? "border-b-2 border-primary" : ""
          }`}
          onPress={() => setActiveTab("overview")}
        >
          <Text
            className={`font-medium ${
              activeTab === "overview" ? "text-primary" : "text-textSecondary"
            }`}
          >
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-md items-center ${
            activeTab === "lessons" ? "border-b-2 border-primary" : ""
          }`}
          onPress={() => setActiveTab("lessons")}
        >
          <Text
            className={`font-medium ${
              activeTab === "lessons" ? "text-primary" : "text-textSecondary"
            }`}
          >
            Lessons
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-md items-center ${
            activeTab === "quizzes" ? "border-b-2 border-primary" : ""
          }`}
          onPress={() => setActiveTab("quizzes")}
        >
          <Text
            className={`font-medium ${
              activeTab === "quizzes" ? "text-primary" : "text-textSecondary"
            }`}
          >
            Quizzes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === "overview" && renderOverview()}
      <View className="mb-lg mt-lg">
        {activeTab === "lessons" && renderLessons()}
      </View>
      {activeTab === "quizzes" && renderQuizzes()}
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: COLORS.background,
  // },
  // tabContainer: {
  //   flexDirection: "row",
  //   backgroundColor: COLORS.white,
  //   borderBottomWidth: 1,
  //   borderBottomColor: COLORS.border,
  // },
  // tabButton: {
  //   flex: 1,
  //   paddingVertical: SPACING.md,
  //   alignItems: "center",
  // },
  // activeTabButton: {
  //   borderBottomWidth: 2,
  //   borderBottomColor: COLORS.primary,
  // },
  // tabButtonText: {
  //   ...FONTS.medium,
  //   color: COLORS.textSecondary,
  // },
  // activeTabButtonText: {
  //   color: COLORS.primary,
  // },
  // tabContent: {
  //   flex: 1,
  // },
  // courseImage: {
  //   width: "100%",
  //   height: 200,
  // },
  // courseInfo: {
  //   padding: SPACING.md,
  // },
  // courseTitle: {
  //   ...FONTS.bold,
  //   fontSize: SIZES.xl,
  //   color: COLORS.textPrimary,
  //   marginBottom: SPACING.sm,
  // },
  // courseDescription: {
  //   ...FONTS.regular,
  //   fontSize: SIZES.md,
  //   color: COLORS.textSecondary,
  //   lineHeight: 22,
  //   marginBottom: SPACING.lg,
  // },
  // courseMeta: {
  //   marginBottom: SPACING.lg,
  // },
  // metaItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: SPACING.xs,
  // },
  // metaText: {
  //   ...FONTS.medium,
  //   fontSize: SIZES.sm,
  //   color: COLORS.textSecondary,
  //   marginLeft: SPACING.xs,
  // },
  // progressSection: {
  //   marginBottom: SPACING.lg,
  // },
  // progressTitle: {
  //   ...FONTS.bold,
  //   fontSize: SIZES.md,
  //   color: COLORS.textPrimary,
  //   marginBottom: SPACING.sm,
  // },
  // progressBar: {
  //   height: 8,
  //   backgroundColor: COLORS.border,
  //   borderRadius: 4,
  //   marginBottom: SPACING.xs,
  // },
  // progressFill: {
  //   height: "100%",
  //   backgroundColor: COLORS.primary,
  //   borderRadius: 4,
  // },
  // progressText: {
  //   ...FONTS.medium,
  //   fontSize: SIZES.sm,
  //   color: COLORS.primary,
  // },
  // statsGrid: {
  //   flexDirection: "row",
  // },
  statCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    alignItems: "center",
    padding: SPACING.md,
  },
  // statNumber: {
  //   ...FONTS.bold,
  //   fontSize: SIZES.lg,
  //   color: COLORS.primary,
  // },
  // statLabel: {
  //   ...FONTS.medium,
  //   fontSize: SIZES.xs,
  //   color: COLORS.textSecondary,
  //   marginTop: SPACING.xs,
  //   textAlign: "center",
  // },
  // listContainer: {
  //   padding: SPACING.md,
  // },
  // lessonItem: {
  //   backgroundColor: COLORS.white,
  //   borderRadius: SIZES.radius,
  //   marginBottom: SPACING.md,
  //   padding: SPACING.md,
  //   elevation: 1,
  //   shadowColor: COLORS.black,
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  // },
  // lessonHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // lessonNumber: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: COLORS.primary,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginRight: SPACING.md,
  // },
  // lessonNumberText: {
  //   ...FONTS.bold,
  //   color: COLORS.white,
  // },
  // lessonContent: {
  //   flex: 1,
  // },
  // lessonTitle: {
  //   ...FONTS.bold,
  //   fontSize: SIZES.md,
  //   color: COLORS.textPrimary,
  //   marginBottom: SPACING.xs,
  // },
  // lessonDescription: {
  //   ...FONTS.regular,
  //   fontSize: SIZES.sm,
  //   color: COLORS.textSecondary,
  //   marginBottom: SPACING.xs,
  // },
  // lessonMeta: {
  //   flexDirection: "row",
  // },
  // lessonMetaItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginRight: SPACING.md,
  // },
  // lessonMetaText: {
  //   ...FONTS.regular,
  //   fontSize: SIZES.xs,
  //   color: COLORS.textSecondary,
  //   marginLeft: SPACING.xs,
  // },
  // lessonStatus: {
  //   marginLeft: SPACING.sm,
  // },
  // quizItem: {
  //   backgroundColor: COLORS.white,
  //   borderRadius: SIZES.radius,
  //   marginBottom: SPACING.md,
  //   padding: SPACING.md,
  //   elevation: 1,
  //   shadowColor: COLORS.black,
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  // },
  // quizHeader: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: SPACING.sm,
  // },
  // quizTitle: {
  //   ...FONTS.bold,
  //   fontSize: SIZES.md,
  //   color: COLORS.textPrimary,
  //   flex: 1,
  // },
  // quizStatus: {
  //   marginLeft: SPACING.sm,
  // },
  // completedBadge: {
  //   backgroundColor: COLORS.success,
  //   paddingHorizontal: SPACING.sm,
  //   paddingVertical: SPACING.xs,
  //   borderRadius: SIZES.radius,
  // },
  // completedText: {
  //   ...FONTS.medium,
  //   fontSize: SIZES.xs,
  //   color: COLORS.white,
  // },
  // pendingBadge: {
  //   backgroundColor: COLORS.warning,
  //   paddingHorizontal: SPACING.sm,
  //   paddingVertical: SPACING.xs,
  //   borderRadius: SIZES.radius,
  // },
  // pendingText: {
  //   ...FONTS.medium,
  //   fontSize: SIZES.xs,
  //   color: COLORS.white,
  // },
  // quizMeta: {
  //   flexDirection: "row",
  // },
  // quizMetaItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginRight: SPACING.md,
  // },
  // quizMetaText: {
  //   ...FONTS.regular,
  //   fontSize: SIZES.xs,
  //   color: COLORS.textSecondary,
  //   marginLeft: SPACING.xs,
  // },
});

export default CourseDetailsScreen;
