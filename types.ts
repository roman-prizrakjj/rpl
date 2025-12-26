
export enum RewardTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export interface Reward {
  id: string;
  level: number;
  name: string;
  type: 'video' | 'badge' | 'discount' | 'merch' | 'experience';
  tier: RewardTier;
  claimed: boolean;
  image: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: 'match' | 'stream' | 'prediction' | 'social' | 'partner';
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
  rank: string;
  fanId: string;
}

export interface Partner {
  id: string;
  name: string;
  offer: string;
  xpBonus: number;
  logo: string;
}
