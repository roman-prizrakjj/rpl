
export enum RewardTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export type TaskDifficulty = 'easy' | 'medium' | 'hard';
export type TaskPeriod = 'daily' | 'weekly' | 'season';

export interface Reward {
  id: string;
  level: number;
  name: string;
  type: 'video' | 'badge' | 'discount' | 'merch' | 'experience' | 'currency';
  tier: RewardTier;
  claimed: boolean;
  image: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: 'match' | 'stream' | 'prediction' | 'social' | 'partner';
  difficulty: TaskDifficulty;
  period: TaskPeriod;
  completed: boolean;
  progress?: number;
  total?: number;
}

export interface User {
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  isPremium: boolean;
  xpMultiplier: number;
  rank: string;
  fanId: string;
  favClubLogo: string;
  // Stats
  totalTasksDone: number;
  matchesVisited: number;
  checkins: number;
  totalXpEarned: number;
}

export interface Partner {
  id: string;
  name: string;
  offer: string;
  xpBonus: number;
  logo: string;
}
