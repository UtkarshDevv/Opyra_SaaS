import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const UserManagementScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "instructor",
      status: "active",
      joinDate: "2024-01-02",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "student",
      status: "inactive",
      joinDate: "2024-01-03",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "instructor",
      status: "active",
      joinDate: "2024-01-04",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-01-05",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-01-06",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // const renderUserItem = ({ item }) => (
  //   <Card style={styles.userCard}>
  //     <View style={styles.userHeader}>
  //       <View style={styles.userInfo}>
  //         <View style={styles.avatar}>
  //           <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
  //         </View>
  //         <View style={styles.userDetails}>
  //           <Text style={styles.userName}>{item.name}</Text>
  //           <Text style={styles.userEmail}>{item.email}</Text>
  //           <Text style={styles.joinDate}>Joined: {item.joinDate}</Text>
  //         </View>
  //       </View>
  //       <View style={styles.userActions}>
  //         <View
  //           style={[
  //             styles.roleBadge,
  //             {
  //               backgroundColor:
  //                 item.role === "instructor" ? COLORS.primary : COLORS.success,
  //             },
  //           ]}
  //         >
  //           <Text style={styles.roleText}>{item.role}</Text>
  //         </View>
  //         <View
  //           style={[
  //             styles.statusBadge,
  //             {
  //               backgroundColor:
  //                 item.status === "active" ? COLORS.success : COLORS.error,
  //             },
  //           ]}
  //         >
  //           <Text style={styles.statusText}>{item.status}</Text>
  //         </View>
  //       </View>
  //     </View>

  //     <View style={styles.actionButtons}>
  //       <TouchableOpacity
  //         style={styles.actionButton}
  //         onPress={() => navigation.navigate("EditUser", { userId: item.id })}
  //       >
  //         <Ionicons name="create-outline" size={16} color={COLORS.primary} />
  //         <Text style={styles.actionButtonText}>Edit</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={[styles.actionButton, styles.deleteButton]}
  //         onPress={() => handleDeleteUser(item.id)}
  //       >
  //         <Ionicons name="trash-outline" size={16} color={COLORS.error} />
  //         <Text style={[styles.actionButtonText, { color: COLORS.error }]}>
  //           Delete
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   </Card>
  // );

  const renderUserItem = ({ item }) => (
    <View className="mb-md">
      <Card className="mb-md">
        {/* User Header */}
        <View className="flex-row justify-between items-start mb-sm">
          {/* User Info */}
          <View className="flex-row flex-1">
            {/* Avatar */}
            <View className="w-[50px] h-[50px] rounded-[25px] bg-primary items-center justify-center mr-sm">
              <Text className="font-bold text-lg text-white">
                {item.name.charAt(0)}
              </Text>
            </View>

            {/* User Details */}
            <View className="flex-1">
              <Text className="font-bold text-md text-textPrimary mb-xs">
                {item.name}
              </Text>
              <Text className="font-regular text-sm text-textSecondary mb-xs">
                {item.email}
              </Text>
              <Text className="font-regular text-xs text-textSecondary">
                Joined: {item.joinDate}
              </Text>
            </View>
          </View>

          {/* User Actions (Badges) */}
          <View className="items-end">
            <View
              className={`px-sm py-xs rounded-sm mb-xs ${
                item.role === "instructor" ? "bg-primary" : "bg-success"
              }`}
            >
              <Text className="font-medium text-xs text-white">
                {item.role}
              </Text>
            </View>
            <View
              className={`px-sm py-xs rounded-sm ${
                item.status === "active" ? "bg-success" : "bg-error"
              }`}
            >
              <Text className="font-medium text-xs text-white">
                {item.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="flex-row items-center px-md py-sm ml-sm rounded-sm bg-background"
            onPress={() => navigation.navigate("EditUser", { userId: item.id })}
          >
            <Ionicons name="create-outline" size={16} color={COLORS.primary} />
            <Text className="font-medium text-sm text-primary ml-xs">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-md py-sm ml-sm rounded-sm bg-error/20"
            onPress={() => handleDeleteUser(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color={COLORS.error} />
            <Text className="font-medium text-sm ml-xs text-error">Delete</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );

  const handleDeleteUser = (userId) => {
    // Mock delete functionality
    console.log("Delete user:", userId);
  };

  return (
    // <View style={styles.container}>
    //   <Header
    //     title="User Management"
    //     subtitle="Manage platform users"
    //     showBack={true}
    //     onBackPress={() => navigation.goBack()}
    //     rightIcon="add-outline"
    //     onRightPress={() => navigation.navigate('AddUser')}
    //   />

    //   <View style={styles.content}>
    //     {/* Search and Filter */}
    //     <Card style={styles.filterCard}>
    //       <TextInput
    //         style={styles.searchInput}
    //         placeholder="Search users..."
    //         value={searchQuery}
    //         onChangeText={setSearchQuery}
    //       />

    //       <View style={styles.roleFilter}>
    //         <TouchableOpacity
    //           style={[styles.filterButton, selectedRole === 'all' && styles.activeFilterButton]}
    //           onPress={() => setSelectedRole('all')}
    //         >
    //           <Text style={[styles.filterButtonText, selectedRole === 'all' && styles.activeFilterButtonText]}>All</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={[styles.filterButton, selectedRole === 'student' && styles.activeFilterButton]}
    //           onPress={() => setSelectedRole('student')}
    //         >
    //           <Text style={[styles.filterButtonText, selectedRole === 'student' && styles.activeFilterButtonText]}>Students</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={[styles.filterButton, selectedRole === 'instructor' && styles.activeFilterButton]}
    //           onPress={() => setSelectedRole('instructor')}
    //         >
    //           <Text style={[styles.filterButtonText, selectedRole === 'instructor' && styles.activeFilterButtonText]}>Instructors</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </Card>

    //     {/* Stats */}
    //     <View style={styles.statsRow}>
    //       <Card style={styles.statCard}>
    //         <Text style={styles.statNumber}>{users.filter(u => u.role === 'student').length}</Text>
    //         <Text style={styles.statLabel}>Students</Text>
    //       </Card>
    //       <Card style={styles.statCard}>
    //         <Text style={styles.statNumber}>{users.filter(u => u.role === 'instructor').length}</Text>
    //         <Text style={styles.statLabel}>Instructors</Text>
    //       </Card>
    //       <Card style={styles.statCard}>
    //         <Text style={styles.statNumber}>{users.filter(u => u.status === 'active').length}</Text>
    //         <Text style={styles.statLabel}>Active</Text>
    //       </Card>
    //     </View>

    //     {/* Users List */}
    //     <FlatList
    //       data={filteredUsers}
    //       renderItem={renderUserItem}
    //       keyExtractor={item => item.id.toString()}
    //       showsVerticalScrollIndicator={false}
    //       contentContainerStyle={styles.listContainer}
    //     />
    //   </View>
    // </View>

    <View className="flex-1 bg-background">
      <Header
        title="User Management"
        subtitle="Manage platform users"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="add-outline"
        onRightPress={() => navigation.navigate("AddUser")}
      />

      <View className="flex-1 p-md">
        <View className="mb-lg">
          {/* Search and Filter */}
          <Card className="mb-lg">
            <TextInput
              className="border border-border rounded-sm p-sm mb-md font-regular"
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 py-sm px-md mx-xs rounded-sm items-center ${
                  selectedRole === "all" ? "bg-primary" : "bg-background"
                }`}
                onPress={() => setSelectedRole("all")}
              >
                <Text
                  className={`font-medium text-textSecondary ${
                    selectedRole === "all" ? "text-white" : ""
                  }`}
                >
                  All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-sm px-md mx-xs rounded-sm items-center ${
                  selectedRole === "student" ? "bg-primary" : "bg-background"
                }`}
                onPress={() => setSelectedRole("student")}
              >
                <Text
                  className={`font-medium text-textSecondary ${
                    selectedRole === "student" ? "text-white" : ""
                  }`}
                >
                  Students
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-sm px-md mx-xs rounded-sm items-center ${
                  selectedRole === "instructor" ? "bg-primary" : "bg-background"
                }`}
                onPress={() => setSelectedRole("instructor")}
              >
                <Text
                  className={`font-medium text-textSecondary ${
                    selectedRole === "instructor" ? "text-white" : ""
                  }`}
                >
                  Instructors
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Stats */}
        <View className="flex-row mb-lg">
          <Card style={styles.statCard}>
            <Text className="font-bold text-xl text-primary">
              {users.filter((u) => u.role === "student").length}
            </Text>
            <Text className="font-medium text-sm text-textSecondary mt-xs">
              Students
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text className="font-bold text-xl text-primary">
              {users.filter((u) => u.role === "instructor").length}
            </Text>
            <Text className="font-medium text-sm text-textSecondary mt-xs">
              Instructors
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text className="font-bold text-xl text-primary">
              {users.filter((u) => u.status === "active").length}
            </Text>
            <Text className="font-medium text-sm text-textSecondary mt-xs">
              Active
            </Text>
          </Card>
        </View>

        {/* Users List */}
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-lg"
        />
      </View>
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
  filterCard: {
    marginBottom: SPACING.lg,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    ...FONTS.regular,
  },
  roleFilter: {
    flexDirection: "row",
  },
  filterButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: SIZES.radius,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  activeFilterButtonText: {
    color: COLORS.white,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    alignItems: "center",
    padding: SPACING.md,
  },
  statNumber: {
    ...FONTS.bold,
    fontSize: SIZES.xl,
    color: COLORS.primary,
  },
  statLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  listContainer: {
    paddingBottom: SPACING.lg,
  },
  userCard: {
    marginBottom: SPACING.md,
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  userInfo: {
    flexDirection: "row",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  avatarText: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.white,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  joinDate: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  userActions: {
    alignItems: "flex-end",
  },
  roleBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.xs,
  },
  roleText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginLeft: SPACING.sm,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.background,
  },
  deleteButton: {
    backgroundColor: COLORS.error + "20",
  },
  actionButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
});

export default UserManagementScreen;
