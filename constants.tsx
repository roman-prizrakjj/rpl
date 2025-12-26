
import React from 'react';
import { Reward, RewardTier, Task, Partner } from './types';

export const INITIAL_USER = {
  name: "Александр П.",
  level: 27,
  xp: 1250,
  nextLevelXp: 1500,
  isPremium: true,
  rank: "Ветеран Трибун",
  fanId: "RPL-882-991"
};

export const MOCK_REWARDS: Reward[] = Array.from({ length: 50 }, (_, i) => ({
  id: `reward-${i + 1}`,
  level: i + 1,
  name: i % 5 === 0 ? "Эксклюзивное видео" : i % 3 === 0 ? "Скидка 20% на мерч" : "Уникальный бейдж",
  type: i % 5 === 0 ? 'video' : i % 3 === 0 ? 'discount' : 'badge',
  tier: i % 2 === 0 ? RewardTier.FREE : RewardTier.PREMIUM,
  claimed: i < 27,
  image: `https://picsum.photos/seed/${i + 1}/200/200`
}));

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Сканирование Fan ID',
    description: 'Отметьтесь на стадионе через Fan ID',
    xpReward: 500,
    category: 'match',
    completed: false
  },
  {
    id: '2',
    title: 'Участие в квизе',
    description: 'Ответьте на 5 вопросов во время трансляции',
    xpReward: 300,
    category: 'stream',
    completed: true,
    progress: 5,
    total: 5
  },
  {
    id: '3',
    title: 'Прогноз результата',
    description: 'Угадайте счет матча Зенит - Спартак',
    xpReward: 250,
    category: 'prediction',
    completed: false
  },
  {
    id: '4',
    title: 'Пост с хештегом #РПЛ',
    description: 'Опубликуйте фото со стадиона в соцсетях',
    xpReward: 150,
    category: 'social',
    completed: false
  }
];

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'Кофейня',
    offer: '50 XP за кофе перед матчем',
    xpBonus: 50,
    logo: 'https://picsum.photos/seed/coffee/100/100'
  },
  {
    id: 'p2',
    name: 'Лукойл',
    offer: '+100 XP за каждую заправку',
    xpBonus: 100,
    logo: 'https://picsum.photos/seed/fuel/100/100'
  },
  {
    id: 'p3',
    name: 'Такси',
    offer: '30 XP за поездку на стадион',
    xpBonus: 30,
    logo: 'https://picsum.photos/seed/taxi/100/100'
  }
];

export const RPL_LOGO = (
  <svg viewBox="0 0 100 100" className="w-10 h-10 fill-current text-white">
    <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="45" r="15" fill="white" />
    <path d="M42 45 Q50 60 58 45" stroke="black" strokeWidth="3" fill="none" />
    <circle cx="45" cy="40" r="2" fill="black" />
    <circle cx="55" cy="40" r="2" fill="black" />
  </svg>
);
