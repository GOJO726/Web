import { Project, LearningStage, LeaderboardUser, QuizQuestion } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Learn', path: '/learn' },
  { name: 'Projects', path: '/projects' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Design Lab', path: '/design' },
  { name: 'Code Editor', path: '/code' },
  { name: 'Publish', path: '/publish' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Arduino Line Follower Robot',
    description: 'A classic beginner project to build a robot that follows a black line on a white surface using IR sensors.',
    image: 'https://picsum.photos/seed/robot1/400/300',
    category: 'Arduino',
    difficulty: 'Beginner',
    tags: ['Arduino', 'Sensors', 'Motors'],
    url: 'https://www.youtube.com/watch?v=1-4_g3n65ks'
  },
  {
    id: 2,
    name: 'Raspberry Pi Weather Station',
    description: 'Create a weather station that collects temperature, humidity, and pressure data and displays it on a web server.',
    image: 'https://picsum.photos/seed/robot2/400/300',
    category: 'Raspberry Pi',
    difficulty: 'Intermediate',
    tags: ['Raspberry Pi', 'Python', 'Sensors', 'Web Dev'],
    url: 'https://www.youtube.com/watch?v=p-a-iF-jI6E'
  },
  {
    id: 3,
    name: 'Self-Balancing Robot',
    description: 'An advanced project to build a two-wheeled robot that balances itself using an MPU-6050 gyroscope and accelerometer.',
    image: 'https://picsum.photos/seed/robot3/400/300',
    category: 'Robotics',
    difficulty: 'Advanced',
    tags: ['Arduino', 'IMU', 'PID Control'],
    url: 'https://www.youtube.com/watch?v=o-p_v6s2s1A'
  },
  {
    id: 4,
    name: 'AI Object Detection Car',
    description: 'A Raspberry Pi-powered car that uses a camera and a machine learning model to detect and follow objects.',
    image: 'https://picsum.photos/seed/robot4/400/300',
    category: 'AI Generated',
    difficulty: 'Advanced',
    tags: ['Raspberry Pi', 'AI', 'OpenCV', 'Python'],
    url: 'https://www.youtube.com/watch?v=aI-a-1a-L0U'
  },
];

export const LEARNING_STAGES: LearningStage[] = [
  {
    id: 1,
    level: 'BEGINNER',
    title: 'Fundamentals',
    description: 'Learn basic electronics, circuits, and programming concepts',
    subtopics: [
      { id: 'b1', name: 'Basic Electronics', videoId: 'g2yD-S3_1K4' },
      { id: 'b2', name: "Ohm's Law", videoId: 'F_v_25g_2sM' },
      { id: 'b3', name: 'Circuit Components', videoId: 'Q-M_j0B0Lso' },
      { id: 'b4', name: 'Intro to Arduino', videoId: 'fJWR7dBuc18' },
    ],
  },
  {
    id: 2,
    level: 'INTERMEDIATE',
    title: 'Hardware & Code',
    description: 'Master Arduino programming and sensor integration',
    subtopics: [
        { id: 'i1', name: 'C/C++ Programming for Arduino', videoId: 'mC_pUkDKEPI' },
        { id: 'i2', name: 'Sensor Integration', videoId: '5-OUJz_k-s4' },
        { id: 'i3', name: 'Motor Control (DC, Servo, Stepper)', videoId: '3d9zq6f_I3Y' },
        { id: 'i4', name: 'Serial Communication (UART, I2C, SPI)', videoId: 'fAppJ-9t3-s' },
    ],
  },
  {
    id: 3,
    level: 'ADVANCED',
    title: 'Complex Systems',
    description: 'Build autonomous robots with AI and advanced control',
    subtopics: [
        { id: 'a1', name: 'PID Control Theory', videoId: 'zggC2dGA-cI' },
        { id: 'a2', name: 'Intro to ROS (Robot Operating System)', videoId: '0h3hKwWy_2A' },
        { id: 'a3', name: 'Computer Vision Basics', videoId: 'W-S42cmkgeA' },
        { id: 'a4', name: 'SLAM Algorithms Explained', videoId: 'pW-P2wbnlqE' },
    ],
  },
   {
    id: 4,
    level: 'ADVANCED',
    title: 'Machine Learning for Robotics',
    description: 'Integrate intelligence into your robots with ML models.',
    subtopics: [
        { id: 'm1', name: 'Intro to ML for Robotics', videoId: 'k2_i84k-GOA' },
        { id: 'm2', name: 'Using TensorFlow Lite on Raspberry Pi', videoId: 'm_m-IzvGN4E' },
        { id: 'm3', name: 'Reinforcement Learning Basics', videoId: 'H-g1-Lyl7sM' },
        { id: 'm4', name: 'Building an Object Detection Robot', videoId: 'aI-a-1a-L0U' },
    ],
  },
];


export const LEADERBOARD_DATA: LeaderboardUser[] = [
    { rank: 1, name: 'CircuitWizard', points: 12500, avatar: 'https://i.pravatar.cc/48?u=1' },
    { rank: 2, name: 'CodeNinja', points: 11800, avatar: 'https://i.pravatar.cc/48?u=2' },
    { rank: 3, name: 'RoboBuilder', points: 10500, avatar: 'https://i.pravatar.cc/48?u=3' },
    { rank: 4, name: 'PiMaster', points: 9800, avatar: 'https://i.pravatar.cc/48?u=4' },
    { rank: 5, name: 'ArduinoGuru', points: 9250, avatar: 'https://i.pravatar.cc/48?u=5' },
];

export const QUIZ_DATA: QuizQuestion[] = [
    {
        id: 1,
        question: "What does LED stand for?",
        options: ["Light Emitting Diode", "Low Energy Display", "Light Emitting Device", "Laser Emitting Diode"],
        correctAnswer: "Light Emitting Diode",
        points: 10,
    },
    {
        id: 2,
        question: "What is the function of a resistor in a circuit?",
        options: ["To store electrical charge", "To limit the flow of current", "To amplify the current", "To act as a one-way gate"],
        correctAnswer: "To limit the flow of current",
        points: 10,
    },
    {
        id: 3,
        question: "Which of these is a popular microcontroller board for beginners?",
        options: ["Raspberry Pi", "Intel Core i9", "Arduino Uno", "NVIDIA GeForce RTX"],
        correctAnswer: "Arduino Uno",
        points: 10,
    },
    {
        id: 4,
        question: "What does PWM stand for in the context of microcontrollers?",
        options: ["Power Width Modulation", "Pulse Width Modulation", "Pulse Wave Measurement", "Power Wave Mode"],
        correctAnswer: "Pulse Width Modulation",
        points: 15,
    },
    {
        id: 5,
        question: "Which pin on an Arduino Uno provides 5V power?",
        options: ["GND", "VIN", "5V", "3.3V"],
        correctAnswer: "5V",
        points: 10,
    },
    {
        id: 6,
        question: "What programming language is primarily used for the standard Arduino IDE?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correctAnswer: "C++",
        points: 15,
    },
    {
        id: 7,
        question: "In electronics, what is a 'breadboard' used for?",
        options: ["Slicing bread", "Cutting wires", "Prototyping circuits without soldering", "Measuring voltage"],
        correctAnswer: "Prototyping circuits without soldering",
        points: 10,
    },
    {
        id: 8,
        question: "A servo motor is known for its ability to...",
        options: ["Rotate continuously at high speeds", "Move to a precise angular position", "Vibrate intensely", "Generate AC power"],
        correctAnswer: "Move to a precise angular position",
        points: 15,
    },
];
