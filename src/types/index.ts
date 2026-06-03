export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  global_score: number;
  total_simulations: number;
  created_at: string;
  updated_at: string;
}

export type CourseLevel = "débutant" | "intermédiaire" | "avancé";
export type CourseCategory = "parole" | "entretien" | "pitch" | "leadership" | "vente";

export interface Lesson {
  id: string;
  title: string;
  duration_minutes: number;
  video_url?: string;
  content: string;
  has_exercise: boolean;
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  order: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  duration_hours: number;
  lesson_count: number;
  price: number;
  stripe_price_id: string;
  thumbnail: string;
  color: string;
  icon: string;
  modules: CourseModule[];
  tags: string[];
  is_featured: boolean;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  stripe_session_id: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  plan: "starter" | "pro" | "expert" | "monthly";
  status: "active" | "canceled" | "past_due";
  current_period_end: string;
  created_at: string;
}

export interface CourseProgress {
  course_id: string;
  user_id: string;
  completed_lessons: string[];
  score: number;
  last_lesson_id?: string;
  started_at: string;
  completed_at?: string;
}

export type SimulationScenario =
  | "entretien"
  | "presentation"
  | "pitch"
  | "reunion"
  | "trac"
  | "prise_de_parole";

export interface AISimulation {
  id: string;
  user_id: string;
  scenario: SimulationScenario;
  user_input: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  correction: string;
  next_exercise: string;
  analysis: SimulationAnalysis;
  created_at: string;
}

export interface SimulationAnalysis {
  clarte: number;
  structure: number;
  conviction: number;
  gestion_temps: number;
  mots_parasites: number;
  impact: number;
  confiance: number;
}

export type CertificateLevel = "bronze" | "argent" | "or";

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  user_name: string;
  certification_name: string;
  score: number;
  level: CertificateLevel;
  qr_code: string;
  issued_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned_at?: string;
  is_earned: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  score: number;
  validated_at?: string;
  badge?: Badge;
  is_validated: boolean;
}

export interface SkillPassport {
  user_id: string;
  skills: Skill[];
  updated_at: string;
}

export interface DashboardStats {
  global_score: number;
  courses_started: number;
  courses_completed: number;
  badges_earned: number;
  simulations_done: number;
  last_simulation_score: number;
  progress_percent: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type PricingPlanId = "gratuit" | "starter" | "pro" | "expert" | "mensuel";

export interface PricingPlan {
  id: PricingPlanId;
  name: string;
  price: number;
  period?: string;
  description: string;
  features: string[];
  is_popular?: boolean;
  stripe_price_id?: string;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  score: number;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
