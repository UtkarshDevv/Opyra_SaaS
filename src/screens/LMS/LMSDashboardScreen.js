import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const LMSDashboardScreen = ({ navigation, route }) => {
  const [userRole, setUserRole] = useState("student");
  const [userData, setUserData] = useState(null);

  // Get user role and data from route params (set by authentication)
  useEffect(() => {
    if (route.params?.userRole) {
      setUserRole(route.params.userRole);
      setUserData(route.params.userData);
    }
  }, [route.params]);

  // Mock data
  const mockData = {
    admin: {
      stats: {
        totalUsers: 1250,
        totalCourses: 45,
        liveSessions: 12,
        quizStats: 89,
      },
      recentUsers: [
        { id: 1, name: "John Doe", role: "student", email: "john@example.com" },
        {
          id: 2,
          name: "Jane Smith",
          role: "instructor",
          email: "jane@example.com",
        },
        {
          id: 3,
          name: "Mike Johnson",
          role: "student",
          email: "mike@example.com",
        },
      ],
      recentCourses: [
        {
          id: 1,
          title: "React Native Basics",
          instructor: "Jane Smith",
          students: 45,
        },
        {
          id: 2,
          title: "Advanced JavaScript",
          instructor: "John Wilson",
          students: 32,
        },
        {
          id: 3,
          title: "UI/UX Design",
          instructor: "Sarah Brown",
          students: 28,
        },
      ],
    },
    student: {
      enrolledCourses: [
        {
          id: 1,
          title: "React Native Basics",
          instructor: "Jane Smith",
          progress: 75,
          thumbnail:
            "https://via.placeholder.com/150x100/4A90E2/FFFFFF?text=RN",
          lessons: 12,
          completedLessons: 9,
        },
        {
          id: 2,
          title: "Advanced JavaScript",
          instructor: "John Wilson",
          progress: 45,
          thumbnail:
            "https://via.placeholder.com/150x100/F39C12/FFFFFF?text=JS",
          lessons: 15,
          completedLessons: 7,
        },
        {
          id: 3,
          title: "UI/UX Design",
          instructor: "Sarah Brown",
          progress: 20,
          thumbnail:
            "https://via.placeholder.com/150x100/E74C3C/FFFFFF?text=UX",
          lessons: 10,
          completedLessons: 2,
        },
      ],
      upcomingClasses: [
        {
          id: 1,
          title: "React Native Live Q&A",
          date: "2024-01-15",
          time: "14:00",
        },
        {
          id: 2,
          title: "JavaScript Workshop",
          date: "2024-01-17",
          time: "16:00",
        },
      ],
    },
    instructor: {
      createdCourses: [
        { id: 1, title: "React Native Basics", students: 45, lessons: 12 },
        { id: 2, title: "Mobile App Development", students: 32, lessons: 18 },
        { id: 3, title: "Flutter Fundamentals", students: 28, lessons: 15 },
      ],
      upcomingClasses: [
        {
          id: 1,
          title: "React Native Live Q&A",
          date: "2024-01-15",
          time: "14:00",
          students: 25,
        },
        {
          id: 2,
          title: "Mobile Development Workshop",
          date: "2024-01-17",
          time: "16:00",
          students: 18,
        },
      ],
    },
  };

  const handleLogout = () => {
    // Show confirmation dialog
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {
          // User canceled logout
        },
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          // Clear any stored authentication data
          setUserRole("student");
          setUserData(null);

          // Navigate back to LMS authentication screen
          navigation.navigate("LMSAuth");
        },
        style: "destructive",
      },
    ]);
  };

  // const renderAdminDashboard = () => (
  //   <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
  //     <View style={styles.welcomeSection}>
  //       <Text style={styles.welcomeTitle}>Admin Dashboard</Text>
  //       <Text style={styles.welcomeSubtitle}>
  //         Welcome back, {userData?.name || "Admin"}!
  //       </Text>
  //     </View>

  //     {/* Stats Cards */}
  //     <View style={styles.statsGrid}>
  //       <Card style={styles.statCard}>
  //         <View style={styles.statContent}>
  //           <Ionicons name="people-outline" size={24} color={COLORS.primary} />
  //           <Text style={styles.statNumber}>
  //             {mockData.admin.stats.totalUsers}
  //           </Text>
  //           <Text style={styles.statLabel}>Total Users</Text>
  //         </View>
  //       </Card>
  //       <Card style={styles.statCard}>
  //         <View style={styles.statContent}>
  //           <Ionicons name="library-outline" size={24} color={COLORS.primary} />
  //           <Text style={styles.statNumber}>
  //             {mockData.admin.stats.totalCourses}
  //           </Text>
  //           <Text style={styles.statLabel}>Total Courses</Text>
  //         </View>
  //       </Card>
  //       <Card style={styles.statCard}>
  //         <View style={styles.statContent}>
  //           <Ionicons
  //             name="videocam-outline"
  //             size={24}
  //             color={COLORS.primary}
  //           />
  //           <Text style={styles.statNumber}>
  //             {mockData.admin.stats.liveSessions}
  //           </Text>
  //           <Text style={styles.statLabel}>Live Sessions</Text>
  //         </View>
  //       </Card>
  //       <Card style={styles.statCard}>
  //         <View style={styles.statContent}>
  //           <Ionicons
  //             name="help-circle-outline"
  //             size={24}
  //             color={COLORS.primary}
  //           />
  //           <Text style={styles.statNumber}>
  //             {mockData.admin.stats.quizStats}%
  //           </Text>
  //           <Text style={styles.statLabel}>Quiz Avg</Text>
  //         </View>
  //       </Card>
  //     </View>

  //     {/* Quick Actions */}
  //     <Card style={styles.actionsCard}>
  //       <Text style={styles.sectionTitle}>Quick Actions</Text>
  //       <View style={styles.actionButtons}>
  //         <TouchableOpacity
  //           style={styles.actionButton}
  //           onPress={() => navigation.navigate("UserManagement")}
  //         >
  //           <Ionicons name="people-outline" size={20} color={COLORS.white} />
  //           <Text style={styles.actionButtonText}>Manage Users</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.actionButton}
  //           onPress={() => navigation.navigate("CourseManagement")}
  //         >
  //           <Ionicons name="library-outline" size={20} color={COLORS.white} />
  //           <Text style={styles.actionButtonText}>Manage Courses</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.actionButton}
  //           onPress={() => navigation.navigate("Analytics")}
  //         >
  //           <Ionicons name="analytics-outline" size={20} color={COLORS.white} />
  //           <Text style={styles.actionButtonText}>Analytics</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Card>

  //     {/* Recent Users */}
  //     <Card style={styles.listCard}>
  //       <Text style={styles.sectionTitle}>Recent Users</Text>
  //       {mockData.admin.recentUsers.map((user) => (
  //         <View key={user.id} style={styles.listItem}>
  //           <View style={styles.listItemContent}>
  //             <Text style={styles.listItemTitle}>{user.name}</Text>
  //             <Text style={styles.listItemSubtitle}>{user.email}</Text>
  //           </View>
  //           <View
  //             style={[
  //               styles.roleBadge,
  //               {
  //                 backgroundColor:
  //                   user.role === "instructor"
  //                     ? COLORS.primary
  //                     : COLORS.success,
  //               },
  //             ]}
  //           >
  //             <Text style={styles.roleText}>{user.role}</Text>
  //           </View>
  //         </View>
  //       ))}
  //     </Card>
  //   </ScrollView>
  // );

  const renderAdminDashboard = () => (
    <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View className="mb-lg">
        <Text className="font-bold text-xxl text-textPrimary mb-xs">
          Admin Dashboard
        </Text>
        <Text className="font-regular text-md text-textSecondary">
          Welcome back, {userData?.name || "Admin"}!
        </Text>
      </View>

      <View className="flex-col gap-md mb-xl">
        {/* Stats Cards */}
        <View className="flex-row flex-wrap mb-lg">
          <Card style={styles.statCard} className="aspect-square">
            <View className="items-center p-md">
              <Ionicons
                name="people-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text className="font-bold text-xxl text-textPrimary mt-xs">
                {mockData.admin.stats.totalUsers}
              </Text>
              <Text className="font-medium text-sm text-textSecondary mt-xs">
                Total Users
              </Text>
            </View>
          </Card>

          <Card style={styles.statCard} className="aspect-square">
            <View className="items-center p-md">
              <Ionicons
                name="library-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text className="font-bold text-xxl text-textPrimary mt-xs">
                {mockData.admin.stats.totalCourses}
              </Text>
              <Text className="font-medium text-sm text-textSecondary mt-xs">
                Total Courses
              </Text>
            </View>
          </Card>

          <Card style={styles.statCard} className="aspect-square">
            <View className="items-center p-md">
              <Ionicons
                name="videocam-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text className="font-bold text-xxl text-textPrimary mt-xs">
                {mockData.admin.stats.liveSessions}
              </Text>
              <Text className="font-medium text-sm text-textSecondary mt-xs">
                Live Sessions
              </Text>
            </View>
          </Card>

          <Card style={styles.statCard} className="aspect-square">
            <View className="items-center p-md">
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text className="font-bold text-xxl text-textPrimary mt-xs">
                {mockData.admin.stats.quizStats}%
              </Text>
              <Text className="font-medium text-sm text-textSecondary mt-xs">
                Quiz Avg
              </Text>
            </View>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card className="mb-lg">
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity
              className="flex-row items-center bg-primary py-sm px-md rounded-sm mr-sm mb-sm"
              onPress={() => navigation.navigate("UserManagement")}
            >
              <Ionicons name="people-outline" size={20} color={COLORS.white} />
              <Text className="font-medium text-white ml-xs">Manage Users</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-primary py-sm px-md rounded-sm mr-sm mb-sm"
              onPress={() => navigation.navigate("CourseManagement")}
            >
              <Ionicons name="library-outline" size={20} color={COLORS.white} />
              <Text className="font-medium text-white ml-xs">
                Manage Courses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-primary py-sm px-md rounded-sm mr-sm mb-sm"
              onPress={() => navigation.navigate("Analytics")}
            >
              <Ionicons
                name="analytics-outline"
                size={20}
                color={COLORS.white}
              />
              <Text className="font-medium text-white ml-xs">Analytics</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Recent Users */}
        <Card className="mb-lg">
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Recent Users
          </Text>
          {mockData.admin.recentUsers.map((user) => (
            <View
              key={user.id}
              className="flex-row items-center py-sm border-b border-border"
            >
              <View className="flex-1">
                <Text className="font-medium text-md text-textPrimary">
                  {user.name}
                </Text>
                <Text className="font-regular text-sm text-textSecondary">
                  {user.email}
                </Text>
              </View>
              <View
                className="px-sm py-xs rounded-sm"
                style={{
                  backgroundColor:
                    user.role === "instructor"
                      ? COLORS.primary
                      : COLORS.success,
                }}
              >
                <Text className="font-medium text-xs text-white">
                  {user.role}
                </Text>
              </View>
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );

  // const renderStudentDashboard = () => (
  //   <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
  //     <View style={styles.welcomeSection}>
  //       <Text style={styles.welcomeTitle}>
  //         Welcome back, {userData?.name || "Student"}!
  //       </Text>
  //       <Text style={styles.welcomeSubtitle}>
  //         Continue your learning journey
  //       </Text>
  //     </View>

  //     {/* Enrolled Courses */}
  //     <Text style={styles.sectionTitle}>My Courses</Text>
  //     {mockData.student.enrolledCourses.map((course) => (
  //       <TouchableOpacity
  //         key={course.id}
  //         style={styles.courseCard}
  //         onPress={() =>
  //           navigation.navigate("CourseDetails", { courseId: course.id })
  //         }
  //       >
  //         <Image
  //           source={{ uri: course.thumbnail }}
  //           style={styles.courseThumbnail}
  //         />
  //         <View style={styles.courseContent}>
  //           <Text style={styles.courseTitle}>{course.title}</Text>
  //           <Text style={styles.courseInstructor}>by {course.instructor}</Text>
  //           <View style={styles.progressContainer}>
  //             <View style={styles.progressBar}>
  //               <View
  //                 style={[
  //                   styles.progressFill,
  //                   { width: `${course.progress}%` },
  //                 ]}
  //               />
  //             </View>
  //             <Text style={styles.progressText}>
  //               {course.progress}% Complete
  //             </Text>
  //           </View>
  //           <Text style={styles.lessonCount}>
  //             {course.completedLessons}/{course.lessons} lessons completed
  //           </Text>
  //         </View>
  //       </TouchableOpacity>
  //     ))}

  //     {/* Upcoming Classes */}
  //     <Card style={styles.listCard}>
  //       <Text style={styles.sectionTitle}>Upcoming Live Classes</Text>
  //       {mockData.student.upcomingClasses.map((cls) => (
  //         <TouchableOpacity
  //           key={cls.id}
  //           style={styles.classItem}
  //           onPress={() =>
  //             navigation.navigate("LiveClass", { classId: cls.id })
  //           }
  //         >
  //           <View style={styles.classContent}>
  //             <Text style={styles.classTitle}>{cls.title}</Text>
  //             <Text style={styles.classDateTime}>
  //               {cls.date} at {cls.time}
  //             </Text>
  //           </View>
  //           <TouchableOpacity style={styles.joinButton}>
  //             <Text style={styles.joinButtonText}>Join</Text>
  //           </TouchableOpacity>
  //         </TouchableOpacity>
  //       ))}
  //     </Card>
  //   </ScrollView>
  // );

  const renderStudentDashboard = () => (
    <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View className="mb-lg">
        <Text className="font-bold text-xxl text-textPrimary mb-xs">
          Welcome back, {userData?.name || "Student"}!
        </Text>
        <Text className="font-regular text-md text-textSecondary">
          Continue your learning journey
        </Text>
      </View>

      <View className="mb-xl">
        {/* Enrolled Courses */}
        <Text className="font-bold text-lg text-textPrimary mb-md">
          My Courses
        </Text>
        {mockData.student.enrolledCourses.map((course) => (
          <TouchableOpacity
            key={course.id}
            className="bg-white rounded-sm mb-md overflow-hidden shadow-custom"
            onPress={() =>
              navigation.navigate("CourseDetails", { courseId: course.id })
            }
          >
            <Image
              source={{ uri: course.thumbnail }}
              className="w-full h-[120px]"
            />
            <View className="p-md">
              <Text className="font-bold text-lg text-textPrimary mb-xs">
                {course.title}
              </Text>
              <Text className="font-regular text-sm text-textSecondary mb-sm">
                by {course.instructor}
              </Text>

              {/* Progress Bar */}
              <View className="mb-sm">
                <View className="h-[6px] bg-border rounded-[3px] mb-xs">
                  <View
                    className="h-full bg-primary rounded-[3px]"
                    style={{ width: `${course.progress}%` }}
                  />
                </View>
                <Text className="font-medium text-sm text-primary">
                  {course.progress}% Complete
                </Text>
              </View>

              <Text className="font-regular text-sm text-textSecondary">
                {course.completedLessons}/{course.lessons} lessons completed
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Upcoming Classes */}
        <Card className="mb-lg">
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Upcoming Live Classes
          </Text>
          {mockData.student.upcomingClasses.map((cls) => (
            <TouchableOpacity
              key={cls.id}
              className="flex-row items-center py-sm border-b border-border"
              onPress={() =>
                navigation.navigate("LiveClass", { classId: cls.id })
              }
            >
              <View className="flex-1">
                <Text className="font-medium text-md text-textPrimary">
                  {cls.title}
                </Text>
                <Text className="font-regular text-sm text-textSecondary">
                  {cls.date} at {cls.time}
                </Text>
              </View>
              <TouchableOpacity className="bg-success px-md py-xs rounded-sm">
                <Text className="font-medium text-white">Join</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </Card>
      </View>
    </ScrollView>
  );

  // const renderInstructorDashboard = () => (
  //   <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
  //     <View style={styles.welcomeSection}>
  //       <Text style={styles.welcomeTitle}>Instructor Dashboard</Text>
  //       <Text style={styles.welcomeSubtitle}>
  //         Welcome back, {userData?.name || "Instructor"}!
  //       </Text>
  //     </View>

  //     {/* Course Stats */}
  //     <View style={styles.statsGrid}>
  //       <Card style={styles.statCard}>
  //         <View style={styles.statContent}>
  //           <Ionicons name="library-outline" size={24} color={COLORS.primary} />
  //           <Text style={styles.statNumber}>
  //             {mockData.instructor.createdCourses.length}
  //           </Text>
  //           <Text style={styles.statLabel}>My Courses</Text>
  //         </View>
  //       </Card>
  //       <Card style={styles.statCard}>
  //         <View style={styles.statContent}>
  //           <Ionicons name="people-outline" size={24} color={COLORS.primary} />
  //           <Text style={styles.statNumber}>
  //             {mockData.instructor.createdCourses.reduce(
  //               (sum, course) => sum + course.students,
  //               0
  //             )}
  //           </Text>
  //           <Text style={styles.statLabel}>Total Students</Text>
  //         </View>
  //       </Card>
  //     </View>

  //     {/* My Courses */}
  //     <Text style={styles.sectionTitle}>My Courses</Text>
  //     {mockData.instructor.createdCourses.map((course) => (
  //       <TouchableOpacity
  //         key={course.id}
  //         style={styles.courseCard}
  //         onPress={() =>
  //           navigation.navigate("CourseManagement", { courseId: course.id })
  //         }
  //       >
  //         <View style={styles.courseContent}>
  //           <Text style={styles.courseTitle}>{course.title}</Text>
  //           <View style={styles.courseStats}>
  //             <Text style={styles.courseStat}>{course.students} students</Text>
  //             <Text style={styles.courseStat}>{course.lessons} lessons</Text>
  //           </View>
  //         </View>
  //         <Ionicons
  //           name="chevron-forward"
  //           size={20}
  //           color={COLORS.textSecondary}
  //         />
  //       </TouchableOpacity>
  //     ))}

  //     {/* Quick Actions */}
  //     <Card style={styles.actionsCard}>
  //       <Text style={styles.sectionTitle}>Quick Actions</Text>
  //       <View style={styles.actionButtons}>
  //         <TouchableOpacity
  //           style={styles.actionButton}
  //           onPress={() => navigation.navigate("CreateCourse")}
  //         >
  //           <Ionicons name="add-outline" size={20} color={COLORS.white} />
  //           <Text style={styles.actionButtonText}>Create Course</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.actionButton}
  //           onPress={() => navigation.navigate("ScheduleClass")}
  //         >
  //           <Ionicons name="videocam-outline" size={20} color={COLORS.white} />
  //           <Text style={styles.actionButtonText}>Schedule Class</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.actionButton}
  //           onPress={() => navigation.navigate("StudentPerformance")}
  //         >
  //           <Ionicons name="analytics-outline" size={20} color={COLORS.white} />
  //           <Text style={styles.actionButtonText}>Performance</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Card>
  //   </ScrollView>
  // );

  const renderInstructorDashboard = () => (
    <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View className="mb-lg">
        <Text className="text-xl font-bold text-gray-900">
          Instructor Dashboard
        </Text>
        <Text className="text-base text-gray-600">
          Welcome back, {userData?.name || "Instructor"}!
        </Text>
      </View>

      {/* Course Stats */}
      <View style={styles.statsGrid} >
        <Card style={styles.statCard}>
          <View className="items-center">
            <Ionicons name="library-outline" size={24} color={COLORS.primary} />
            <Text className="text-2xl font-bold text-gray-900 mt-sm">
              {mockData.instructor.createdCourses.length}
            </Text>
            <Text className="text-sm text-gray-500">My Courses</Text>
          </View>
        </Card>

        <Card style={styles.statCard}>
          <View className="items-center">
            <Ionicons name="people-outline" size={24} color={COLORS.primary} />
            <Text className="text-2xl font-bold text-gray-900 mt-sm">
              {mockData.instructor.createdCourses.reduce(
                (sum, course) => sum + course.students,
                0
              )}
            </Text>
            <Text className="text-sm text-gray-500">Total Students</Text>
          </View>
        </Card>
      </View>

      {/* My Courses */}
      <Text className="text-lg font-semibold text-gray-900 mb-md">
        My Courses
      </Text>
      <View className="mb-xl">
      {mockData.instructor.createdCourses.map((course) => (
        <TouchableOpacity
          key={course.id}
          className="flex-row items-center justify-between bg-white p-md rounded-lg shadow mb-sm"
          onPress={() =>
            navigation.navigate("CourseManagement", { courseId: course.id })
          }
        >
          <View>
            <Text className="text-base text-textPrimary font-medium text-gray-900">
              {course.title}
            </Text>
            <View className="flex-row gap-md mt-sm">
              <Text className="text-sm text-gray-500">
                {course.students} students
              </Text>
              <Text className="text-sm text-gray-500">
                {course.lessons} lessons
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      ))}
      </View>
      {/* Quick Actions */}
      <Card className="bg-white p-md rounded-lg shadow mt-lg">
        <Text className="text-lg font-semibold text-gray-900 mb-md">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity
            className="flex-col items-center justify-center bg-primary px-sm py-sm rounded-lg"
            onPress={() => navigation.navigate("CreateCourse")}
          >
            <Ionicons name="add-outline" size={20} color={COLORS.white} />
            <Text className="text-white text-sm mt-xs">Create Course</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-col items-center justify-center bg-primary px-sm py-sm rounded-lg"
            onPress={() => navigation.navigate("ScheduleClass")}
          >
            <Ionicons name="videocam-outline" size={20} color={COLORS.white} />
            <Text className="text-white text-sm mt-xs">Schedule Class</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-col items-center justify-center bg-primary px-sm py-sm rounded-lg"
            onPress={() => navigation.navigate("StudentPerformance")}
          >
            <Ionicons name="analytics-outline" size={20} color={COLORS.white} />
            <Text className="text-white text-sm mt-xs">Performance</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );

  return (
    // <View style={styles.container}>
    //   <Header
    //     title="Learning Management System"
    //     subtitle={`Logged in as ${userRole}`}
    //     showDrawer={true}
    //     onDrawerPress={() => navigation.openDrawer()}
    //     rightIcon="log-out-outline"
    //     onRightPress={handleLogout}
    //     rightIconStyle={{ color: COLORS.error || '#DC3545' }}
    //   />

    //   {/* User Info */}
    //   {userData && (
    //     <View style={styles.userInfo}>
    //       <View style={styles.userBadge}>
    //         <Ionicons
    //           name={userRole === 'admin' ? 'shield' : userRole === 'instructor' ? 'person' : 'school'}
    //           size={16}
    //           color={COLORS.white}
    //         />
    //         <Text style={styles.userBadgeText}>{userData.name}</Text>
    //       </View>
    //     </View>
    //   )}

    //   {userRole === 'admin' && renderAdminDashboard()}
    //   {userRole === 'student' && renderStudentDashboard()}
    //   {userRole === 'instructor' && renderInstructorDashboard()}
    // </View>
    <View className="flex-1 bg-background">
      <Header
        title="Learning Management System"
        subtitle={`Logged in as ${userRole}`}
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        rightIcon="log-out-outline"
        onRightPress={handleLogout}
        rightIconStyle={{ color: "#DC3545" }} // ✅ Tailwind doesn’t cover Ionicons color prop
      />

      {/* User Info */}
      {userData && (
        <View className="bg-white px-md py-sm border-b border-border">
          <View className="flex-row items-center self-start bg-primary px-sm py-xs rounded-sm">
            <Ionicons
              name={
                userRole === "admin"
                  ? "shield"
                  : userRole === "instructor"
                  ? "person"
                  : "school"
              }
              size={16}
              color="#FFFFFF"
            />
            <Text className="font-medium text-xs text-white ml-xs">
              {userData.name}
            </Text>
          </View>
        </View>
      )}

      {userRole === "admin" && renderAdminDashboard()}
      {userRole === "student" && renderStudentDashboard()}
      {userRole === "instructor" && renderInstructorDashboard()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  userInfo: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  userBadgeText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  welcomeSection: {
    marginBottom: SPACING.lg,
  },
  welcomeTitle: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: "48%",
    marginBottom: SPACING.sm,
    marginHorizontal: "1%",
  },
  statContent: {
    alignItems: "center",
    padding: SPACING.md,
  },
  statNumber: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  statLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  actionsCard: {
    marginBottom: SPACING.lg,
  },
  actionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.radius,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  actionButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  listCard: {
    marginBottom: SPACING.lg,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  listItemSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  roleBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  roleText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
    overflow: "hidden",
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseThumbnail: {
    width: "100%",
    height: 120,
  },
  courseContent: {
    padding: SPACING.md,
  },
  courseTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  courseInstructor: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  progressContainer: {
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  lessonCount: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  courseStats: {
    flexDirection: "row",
  },
  courseStat: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginRight: SPACING.md,
  },
  classItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  classContent: {
    flex: 1,
  },
  classTitle: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  classDateTime: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  joinButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  joinButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
  },
});

export default LMSDashboardScreen;
