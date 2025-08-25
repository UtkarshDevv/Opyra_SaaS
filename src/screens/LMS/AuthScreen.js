import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";
import { authApi } from "../../api/lmsApi";
import {
  testBackendConnection,
  getBackendStatus,
} from "../../utils/testBackendConnection";

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [backendStatus, setBackendStatus] = useState({
    status: "checking",
    message: "Checking backend...",
  });

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      setBackendStatus({
        status: "checking",
        message: "Checking backend connection...",
      });
      const status = await getBackendStatus();
      setBackendStatus(status);
      setIsBackendConnected(status.status === "connected");

      if (status.status === "disconnected") {
        Alert.alert(
          "Backend Connection Failed",
          "Cannot connect to the backend server. Please make sure the server is running on http://localhost:4000",
          [
            {
              text: "Use Demo Mode",
              onPress: () => console.log("Using demo mode"),
              style: "default",
            },
            {
              text: "Retry",
              onPress: checkBackendStatus,
            },
          ]
        );
      }
    } catch (error) {
      console.error("Backend check failed:", error);
      setBackendStatus({
        status: "error",
        message: "Failed to check backend connection",
      });
      setIsBackendConnected(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      if (isBackendConnected) {
        // Real backend login
        const response = await authApi.login({ email, password });
        const { user, token } = response.data;

        // Navigate to LMS with real user data
        navigation.replace("LMSDashboard", {
          userRole: user.role,
          userData: user,
          token: token,
        });
      } else {
        // Fallback to demo mode
        const user = authenticateUser(email, password);
        if (user) {
          navigation.replace("LMSDashboard", {
            userRole: user.role,
            userData: user,
            isDemoMode: true,
          });
        } else {
          Alert.alert(
            "Login Failed",
            "Invalid email or password. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        error.message || "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Demo authentication (fallback when backend is not available)
  const authenticateUser = (email, password) => {
    const credentials = {
      admin: {
        email: "admin@lms.com",
        password: "admin123",
        name: "Admin User",
      },
      instructor: {
        email: "instructor@lms.com",
        password: "instructor123",
        name: "Test Instructor",
      },
      student: {
        email: "student@lms.com",
        password: "student123",
        name: "Test Student",
      },
    };

    for (const [role, cred] of Object.entries(credentials)) {
      if (cred.email === email && cred.password === password) {
        return { ...cred, role };
      }
    }
    return null;
  };

  const handleQuickLogin = (role) => {
    const credentials = {
      admin: { email: "admin@lms.com", password: "admin123" },
      instructor: { email: "instructor@lms.com", password: "instructor123" },
      student: { email: "student@lms.com", password: "student123" },
    };

    const cred = credentials[role];
    setEmail(cred.email);
    setPassword(cred.password);

    // Auto-login after a short delay
    setTimeout(() => {
      handleLogin();
    }, 500);
  };

  const handleRegister = () => {
    Alert.alert(
      "Registration",
      "Registration feature is available. You can register through the API or use the demo credentials below.",
      [
        { text: "OK" },
        { text: "Use Demo", onPress: () => handleQuickLogin("student") },
      ]
    );
  };

  const handleBackToDashboard = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <LinearGradient colors={["#9C27B0", "#BA68C8"]} style={styles.gradient}>
          <View style={styles.content}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToDashboard}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>

            {/* Backend Status Indicator */}
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      backendStatus.status === "connected"
                        ? "#4CAF50"
                        : backendStatus.status === "checking"
                        ? "#FF9800"
                        : "#FF5722",
                  },
                ]}
              />
              <Text style={styles.statusText}>
                {backendStatus.status === "connected"
                  ? "Backend Connected"
                  : backendStatus.status === "checking"
                  ? "Checking Backend..."
                  : "Demo Mode"}
              </Text>
              {backendStatus.status === "disconnected" && (
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={checkBackendStatus}
                >
                  <Ionicons name="refresh" size={16} color={COLORS.white} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Ionicons name="school" size={48} color={COLORS.white} />
              </View>
              <Text style={styles.title}>LMS Authentication</Text>
              <Text style={styles.subtitle}>
                {isBackendConnected
                  ? "Sign in to access learning platform"
                  : "Demo mode - using local data"}
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={COLORS.textSecondary}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLoading && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.quickLoginContainer}>
              <Text style={styles.quickLoginTitle}>Quick Login (Demo)</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[styles.roleButton, { backgroundColor: COLORS.error }]}
                  onPress={() => handleQuickLogin("admin")}
                >
                  <Ionicons
                    name="shield-outline"
                    size={15}
                    color={COLORS.white}
                  />
                  <Text style={styles.roleButtonText}>Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    { backgroundColor: COLORS.primary },
                  ]}
                  onPress={() => handleQuickLogin("instructor")}
                >
                  <Ionicons
                    name="person-outline"
                    size={15}
                    color={COLORS.white}
                  />
                  <Text style={styles.roleButtonText}>Instructor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    { backgroundColor: COLORS.success },
                  ]}
                  onPress={() => handleQuickLogin("student")}
                >
                  <Ionicons
                    name="school-outline"
                    size={15}
                    color={COLORS.white}
                  />
                  <Text style={styles.roleButtonText}>Student</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.credentialsContainer}>
              <Text style={styles.credentialsTitle}>Demo Credentials:</Text>
              <Text style={styles.credentialItem}>
                <Text style={styles.credentialLabel}>Admin:</Text> admin@lms.com
                / admin123
              </Text>
              <Text style={styles.credentialItem}>
                <Text style={styles.credentialLabel}>Instructor:</Text>{" "}
                instructor@lms.com / instructor123
              </Text>
              <Text style={styles.credentialItem}>
                <Text style={styles.credentialLabel}>Student:</Text>{" "}
                student@lms.com / student123
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: SPACING.lg,
    zIndex: 1,
    padding: SPACING.sm,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  statusText: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.white,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.white + "CC",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius * 2,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SPACING.md,
    alignItems: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  loginButtonText: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SPACING.md,
    alignItems: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  registerButtonText: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
  forgotPassword: {
    alignItems: "center",
  },
  forgotPasswordText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  quickLoginContainer: {
    // overflow:"hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  quickLoginTitle: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  roleButtons: {
    flexDirection: "row",
    gap: "5",
    justifyContent: "space-around",
  },
  roleButton: {
    flexDirection: "row",

    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius,
    justifyContent: "center",
  },
  roleButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  credentialsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: SIZES.radius,
    padding: SPACING.md,
  },
  credentialsTitle: {
    ...FONTS.bold,
    fontSize: SIZES.sm,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  credentialItem: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.white + "CC",
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  credentialLabel: {
    ...FONTS.bold,
    color: COLORS.white,
  },
  retryButton: {
    padding: SPACING.sm,
  },
});

export default AuthScreen;
