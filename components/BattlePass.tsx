
import React from 'react';
import { Reward, RewardTier } from '../types';
import { LucideLock, LucideUnlock, LucidePlayCircle, LucideTicket, LucideAward } from 'lucide-react';

interface BattlePassProps {
  rewards: Reward[];
  currentLevel: number;
  isPremium: boolean;
}

const BattlePass: React.FC<BattlePassProps> = ({ rewards, currentLevel, isPremium }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <LucidePlayCircle className="w-5 h-5" />;
      case 'discount': return <LucideTicket className="w-5 h-5" />;
      default: return <LucideAward className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Награды Сезона</h3>
        <button className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-lg">
          Все уровни
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar snap-x">
        {rewards.map((reward) => (
          <div 
            key={reward.id} 
            className={`flex-shrink-0 w-40 snap-center rounded-3xl overflow-hidden border-2 transition-all ${
              reward.level <= currentLevel 
                ? 'border-blue-500/50 bg-gray-800/40' 
                : 'border-gray-800 bg-gray-900/20 grayscale'
            }`}
          >
            <div className="relative h-28">
              <img src={reward.image} alt={reward.name} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute top-2 right-2">
                {reward.tier === RewardTier.PREMIUM ? (
                  <div className={`p-1.5 rounded-xl ${isPremium ? 'bg-yellow-500' : 'bg-gray-700'}`}>
                    {isPremium ? <LucideUnlock className="w-3 h-3 text-black" /> : <LucideLock className="w-3 h-3 text-white/50" />}
                  </div>
                ) : (
                  <div className="p-1.5 rounded-xl bg-blue-600">
                    <LucideUnlock className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 left-3">
                <span className="text-[10px] font-black bg-black/60 px-2 py-0.5 rounded-md border border-white/10 uppercase">
                  УР. {reward.level}
                </span>
              </div>
            </div>
            
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1 text-blue-400">
                {getIcon(reward.type)}
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  {reward.tier === RewardTier.PREMIUM ? 'Premium' : 'Бесплатно'}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-100 leading-tight line-clamp-2 min-h-[2rem]">
                {reward.name}
              </p>
              
              <button 
                disabled={reward.level > currentLevel || (reward.tier === RewardTier.PREMIUM && !isPremium)}
                className={`mt-3 w-full py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                  reward.level <= currentLevel && (reward.tier === RewardTier.FREE || isPremium)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 active:scale-95'
                    : 'bg-gray-800 text-gray-500'
                }`}
              >
                {reward.claimed ? 'Получено' : 'Забрать'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattlePass;
