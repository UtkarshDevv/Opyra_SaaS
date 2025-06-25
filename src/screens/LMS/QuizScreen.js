import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';

const QuizScreen = ({ navigation, route }) => {
  const { quizId, courseId } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock quiz data
  const quiz = {
    id: quizId,
    title: 'React Native Fundamentals Quiz',
    description: 'Test your knowledge of React Native basics',
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: 'What is React Native?',
        options: [
          'A JavaScript library for building user interfaces',
          'A framework for building native mobile applications',
          'A database management system',
          'A web development framework'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which of the following is NOT a core component in React Native?',
        options: [
          'View',
          'Text',
          'Button',
          'div'
        ],
        correctAnswer: 3
      },
      {
        id: 3,
        question: 'What is the purpose of the Metro bundler in React Native?',
        options: [
          'To compile JavaScript code to native code',
          'To bundle JavaScript code and assets',
          'To manage app state',
          'To handle navigation'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'How do you create a new React Native project?',
        options: [
          'npx react-native init MyApp',
          'npx create-react-native-app MyApp',
          'npx expo init MyApp',
          'All of the above'
        ],
        correctAnswer: 3
      },
      {
        id: 5,
        question: 'What is the main advantage of React Native?',
        options: [
          'It uses native components',
          'It allows cross-platform development',
          'It has better performance than web apps',
          'All of the above'
        ],
        correctAnswer: 3
      }
    ]
  };

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (!isSubmitted) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    Alert.alert(
      'Submit Quiz',
      'Are you sure you want to submit your answers?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Submit', onPress: () => {
          setIsSubmitted(true);
          setShowResults(true);
        }}
      ]
    );
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const renderQuestion = () => {
    const question = quiz.questions[currentQuestion];
    const selectedAnswer = selectedAnswers[question.id];

    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>Question {currentQuestion + 1} of {quiz.questions.length}</Text>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>

        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                isSubmitted && index === question.correctAnswer && styles.correctOption,
                isSubmitted && selectedAnswer === index && index !== question.correctAnswer && styles.incorrectOption
              ]}
              onPress={() => handleAnswerSelect(question.id, index)}
              disabled={isSubmitted}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionLetter}>{String.fromCharCode(65 + index)}</Text>
                <Text style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
                  isSubmitted && index === question.correctAnswer && styles.correctOptionText,
                  isSubmitted && selectedAnswer === index && index !== question.correctAnswer && styles.incorrectOptionText
                ]}>
                  {option}
                </Text>
              </View>
              {isSubmitted && index === question.correctAnswer && (
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              )}
              {isSubmitted && selectedAnswer === index && index !== question.correctAnswer && (
                <Ionicons name="close-circle" size={20} color={COLORS.error} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderResults = () => {
    const score = calculateScore();
    const correctAnswers = quiz.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;

    return (
      <View style={styles.resultsContainer}>
        <Card style={styles.scoreCard}>
          <Text style={styles.resultsTitle}>Quiz Results</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{score}%</Text>
          </View>
          <Text style={styles.scoreLabel}>Your Score</Text>
          
          <View style={styles.resultsStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{correctAnswers}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{quiz.questions.length - correctAnswers}</Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{quiz.questions.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </Card>

        <View style={styles.resultsActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('CourseDetails', { courseId })}
          >
            <Text style={styles.actionButtonText}>Back to Course</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.retakeButton]} 
            onPress={() => {
              setCurrentQuestion(0);
              setSelectedAnswers({});
              setTimeLeft(900);
              setIsSubmitted(false);
              setShowResults(false);
            }}
          >
            <Text style={styles.retakeButtonText}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Quiz"
        subtitle={quiz.title}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="time-outline"
        onRightPress={() => console.log('Timer info')}
      />
      
      <View style={styles.content}>
        {!showResults ? (
          <>
            {renderQuestion()}
            
            {/* Navigation */}
            <View style={styles.navigation}>
              <TouchableOpacity 
                style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]} 
                onPress={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <Ionicons name="chevron-back" size={20} color={currentQuestion === 0 ? COLORS.textSecondary : COLORS.primary} />
                <Text style={[styles.navButtonText, currentQuestion === 0 && styles.disabledButtonText]}>Previous</Text>
              </TouchableOpacity>

              {currentQuestion === quiz.questions.length - 1 ? (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitQuiz}>
                  <Text style={styles.submitButtonText}>Submit Quiz</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion}>
                  <Text style={styles.navButtonText}>Next</Text>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          renderResults()
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
  questionContainer: {
    flex: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  questionNumber: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  timerText: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.primary,
  },
  questionText: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    lineHeight: 26,
    marginBottom: SPACING.xl,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  correctOption: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '10',
  },
  incorrectOption: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.error + '10',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionLetter: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.primary,
    width: 30,
    textAlign: 'center',
  },
  optionText: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  selectedOptionText: {
    color: COLORS.primary,
  },
  correctOptionText: {
    color: COLORS.success,
  },
  incorrectOptionText: {
    color: COLORS.error,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.lg,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  navButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
    marginHorizontal: SPACING.xs,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: COLORS.textSecondary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius,
  },
  submitButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scoreCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  resultsTitle: {
    ...FONTS.bold,
    fontSize: SIZES.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  scoreText: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.white,
  },
  scoreLabel: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  resultsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
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
  resultsActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  actionButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
  },
  retakeButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  retakeButtonText: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
});

export default QuizScreen; 