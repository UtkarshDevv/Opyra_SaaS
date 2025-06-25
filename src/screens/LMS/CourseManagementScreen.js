import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';

const CourseManagementScreen = ({ navigation, route }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'React Native Basics',
      description: 'Learn the fundamentals of React Native development',
      instructor: 'Jane Smith',
      thumbnail: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=React+Native',
      category: 'Programming',
      duration: '8 weeks',
      lessons: 12,
      students: 45,
      price: '$99',
      status: 'published'
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Master advanced JavaScript concepts and patterns',
      instructor: 'John Wilson',
      thumbnail: 'https://via.placeholder.com/300x200/F39C12/FFFFFF?text=JavaScript',
      category: 'Programming',
      duration: '6 weeks',
      lessons: 15,
      students: 32,
      price: '$79',
      status: 'draft'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      description: 'Learn modern UI/UX design principles and tools',
      instructor: 'Sarah Brown',
      thumbnail: 'https://via.placeholder.com/300x200/E74C3C/FFFFFF?text=UI+UX',
      category: 'Design',
      duration: '10 weeks',
      lessons: 10,
      students: 28,
      price: '$129',
      status: 'published'
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Image picker function
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9], // Course thumbnail aspect ratio
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setUploadedImage(result.assets[0].uri);
        // Automatically update the course thumbnail
        setSelectedCourse(prev => ({
          ...prev,
          thumbnail: result.assets[0].uri
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  // Camera capture function
  const takePhoto = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setUploadedImage(result.assets[0].uri);
        // Automatically update the course thumbnail
        setSelectedCourse(prev => ({
          ...prev,
          thumbnail: result.assets[0].uri
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  // Show image picker options
  const showImagePickerOptions = () => {
    Alert.alert(
      'Choose Image Source',
      'Select how you want to add a course thumbnail',
      [
        {
          text: 'Camera',
          onPress: takePhoto,
        },
        {
          text: 'Photo Library',
          onPress: pickImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.courseCard} 
      onPress={() => setSelectedCourse(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.courseThumbnail} />
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: item.status === 'published' ? COLORS.success : COLORS.warning }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <Text style={styles.courseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.courseMeta}>
          <Text style={styles.courseInstructor}>by {item.instructor}</Text>
          <Text style={styles.courseCategory}>{item.category}</Text>
        </View>
        
        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="library-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.statText}>{item.lessons} lessons</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.statText}>{item.students} students</Text>
          </View>
        </View>
        
        <View style={styles.courseFooter}>
          <Text style={styles.coursePrice}>{item.price}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleEditCourse(item)}
            >
              <Ionicons name="create-outline" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleDeleteCourse(item.id)}
            >
              <Ionicons name="trash-outline" size={16} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditing(true);
    setUploadedImage(course.thumbnail);
  };

  const handleDeleteCourse = (courseId) => {
    Alert.alert(
      'Delete Course',
      'Are you sure you want to delete this course?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCourses(courses.filter(course => course.id !== courseId));
            if (selectedCourse?.id === courseId) {
              setSelectedCourse(null);
              setUploadedImage(null);
            }
          }
        }
      ]
    );
  };

  const handleSaveCourse = () => {
    if (!selectedCourse?.title || !selectedCourse?.description) {
      Alert.alert('Error', 'Please fill in the course title and description.');
      return;
    }

    if (isEditing) {
      // Update existing course
      setCourses(courses.map(course => 
        course.id === selectedCourse.id ? selectedCourse : course
      ));
    } else {
      // Add new course
      const newCourse = {
        ...selectedCourse,
        id: Date.now(),
        status: 'draft',
        lessons: 0,
        students: 0,
        thumbnail: uploadedImage || 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Course'
      };
      setCourses([...courses, newCourse]);
    }

    setSelectedCourse(null);
    setUploadedImage(null);
    setIsEditing(false);
    Alert.alert('Success', isEditing ? 'Course updated successfully!' : 'Course created successfully!');
  };

  const renderCourseForm = () => (
    <Card style={styles.formCard}>
      <Text style={styles.formTitle}>{isEditing ? 'Edit Course' : 'Add New Course'}</Text>
      
      {/* Image Upload Section */}
      <View style={styles.imageSection}>
        <Text style={styles.sectionLabel}>Course Thumbnail</Text>
        
        {uploadedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: uploadedImage }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={styles.changeImageButton}
              onPress={showImagePickerOptions}
            >
              <Ionicons name="camera-outline" size={20} color={COLORS.white} />
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={showImagePickerOptions}
          >
            <Ionicons name="camera-outline" size={32} color={COLORS.primary} />
            <Text style={styles.uploadText}>Upload Course Thumbnail</Text>
            <Text style={styles.uploadSubtext}>Tap to select from camera or gallery</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Course Title"
        value={selectedCourse?.title || ''}
        onChangeText={(text) => setSelectedCourse({...selectedCourse, title: text})}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Course Description"
        value={selectedCourse?.description || ''}
        onChangeText={(text) => setSelectedCourse({...selectedCourse, description: text})}
        multiline
        numberOfLines={4}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Instructor Name"
        value={selectedCourse?.instructor || ''}
        onChangeText={(text) => setSelectedCourse({...selectedCourse, instructor: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={selectedCourse?.category || ''}
        onChangeText={(text) => setSelectedCourse({...selectedCourse, category: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Duration (e.g., 8 weeks)"
        value={selectedCourse?.duration || ''}
        onChangeText={(text) => setSelectedCourse({...selectedCourse, duration: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={selectedCourse?.price || ''}
        onChangeText={(text) => setSelectedCourse({...selectedCourse, price: text})}
      />
      
      <View style={styles.formButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCourse}>
          <Text style={styles.saveButtonText}>Save Course</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => {
            setSelectedCourse(null);
            setUploadedImage(null);
            setIsEditing(false);
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Course Management"
        subtitle="Manage your courses"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="add-outline"
        onRightPress={() => {
          setSelectedCourse({});
          setIsEditing(false);
          setUploadedImage(null);
        }}
      />
      
      <View style={styles.content}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{courses.length}</Text>
            <Text style={styles.statLabel}>Total Courses</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>
              {courses.filter(c => c.status === 'published').length}
            </Text>
            <Text style={styles.statLabel}>Published</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>
              {courses.reduce((sum, course) => sum + course.students, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </Card>
        </View>

        {/* Course Form or Course List */}
        {selectedCourse ? (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {renderCourseForm()}
          </ScrollView>
        ) : (
          <FlatList
            data={courses}
            renderItem={renderCourseItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
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
  statsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
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
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseThumbnail: {
    width: '100%',
    height: 150,
  },
  courseContent: {
    padding: SPACING.md,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  courseTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
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
  courseDescription: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  courseInstructor: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  courseCategory: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  courseStats: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  statText: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  formCard: {
    marginBottom: SPACING.lg,
  },
  formTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  imageSection: {
    marginBottom: SPACING.md,
  },
  sectionLabel: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: SIZES.radius,
    padding: SPACING.xl,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  uploadText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  uploadSubtext: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  changeImageButton: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  changeImageText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    ...FONTS.regular,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    marginTop: SPACING.md,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  saveButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
});

export default CourseManagementScreen; 