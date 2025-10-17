export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  category: 'Arduino' | 'Raspberry Pi' | 'Robotics' | 'AI Generated' | 'User Submitted';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  url?: string;
}

export interface Subtopic {
  id: string;
  name: string;
  videoId: string;
}

export interface LearningStage {
  id: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  title: string;
  description: string;
  subtopics: Subtopic[];
}


export interface GeneratedCircuit {
  components: { name: string; quantity: number }[];
  connections: { from: string; to: string; detail: string }[];
  explanation: string;
}

export interface GeneratedCode {
    language: string;
    code: string;
}

export interface AIGeneratedDesign {
    circuit: GeneratedCircuit;
    code: GeneratedCode;
}

export interface LeaderboardUser {
    rank: number;
    name: string;
    points: number;
    avatar: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}
