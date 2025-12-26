
import React from 'react';
import { Reward, RewardTier, Task, Partner, User } from './types';

// Официальный логотип ФК Спартак Москва (Ромб)
export const SPARTAK_LOGO = (
  <svg viewBox="0 0 100 120" className="w-full h-full">
    <path d="M50 5 L95 60 L50 115 L5 60 Z" fill="#E30613" />
    <path d="M50 15 L85 60 L50 105 L15 60 Z" fill="none" stroke="white" strokeWidth="6" />
    <path d="M65 45 C65 35 55 30 45 30 C35 30 30 35 30 45 C30 55 35 60 45 60 L55 60 C65 60 70 65 70 75 C70 85 65 90 55 90 C45 90 35 85 35 75" 
          fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export const INITIAL_USER: User = {
  name: "Александр П.",
  level: 27,
  xp: 1250,
  nextLevelXp: 2000,
  isPremium: true,
  xpMultiplier: 1.5,
  rank: "Ветеран Трибун",
  fanId: "RPL-882-991",
  favClubLogo: "https://upload.wikimedia.org/wikipedia/ru/d/d4/FC_Spartak_Moscow_logo.svg",
  totalTasksDone: 142,
  matchesVisited: 12,
  checkins: 156,
  totalXpEarned: 42500
};

export const MOCK_REWARDS: Reward[] = Array.from({ length: 50 }, (_, i) => ({
  id: `reward-${i + 1}`,
  level: i + 1,
  name: i % 10 === 0 ? "Сверхсекретный Мерч" : i % 5 === 0 ? "Билет на VIP-ложу" : "Скидка на атрибутику",
  type: i % 10 === 0 ? 'merch' : i % 5 === 0 ? 'experience' : 'discount',
  tier: i % 2 === 0 ? RewardTier.FREE : RewardTier.PREMIUM,
  rarity: i % 10 === 0 ? 'legendary' : i % 5 === 0 ? 'epic' : 'common',
  claimed: i < 27,
  image: `https://picsum.photos/seed/rpl-${i + 1}/400/400`
}));

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Верность Клубу',
    description: 'Посети домашний матч Спартака на Лукойл Арене',
    xpReward: 1000,
    category: 'match',
    difficulty: 'hard',
    period: 'weekly',
    completed: false
  },
  {
    id: '2',
    title: 'Знаток Истории',
    description: 'Кто был основателем клуба? Пройди квиз.',
    xpReward: 250,
    category: 'stream',
    difficulty: 'easy',
    period: 'daily',
    completed: true,
    progress: 5,
    total: 5
  },
  {
    id: '3',
    title: 'Пророк',
    description: 'Угадай точный счет в матче с Динамо',
    xpReward: 1500,
    category: 'prediction',
    difficulty: 'hard',
    period: 'season',
    completed: false,
    progress: 1,
    total: 3
  }
];

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'Winline',
    offer: 'Бонусные XP за ставку на Спартак',
    xpBonus: 200,
    logo: 'https://picsum.photos/seed/winline/100/100'
  },
  {
    id: 'p2',
    name: 'Лукойл',
    offer: 'Заправься на 30л и получи бонус',
    xpBonus: 150,
    logo: 'https://picsum.photos/seed/lukoil/100/100'
  }
];

export const RPL_LOGO = (
  <svg viewBox="0 0 100 100" className="w-10 h-10 fill-current">
    <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="30" className="text-red-600" fill="currentColor" />
    <path d="M40 50 L45 55 L60 40" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
  </svg>
);
