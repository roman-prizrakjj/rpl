
import React, { useRef } from 'react';
import { Reward, RewardTier } from '../types';
import { LucideLock, LucideUnlock, LucideCrown, LucideArrowRight, LucideInfo } from 'lucide-react';

interface BattlePassProps {
  rewards: Reward[];
  currentLevel: number;
  isPremium: boolean;
}

const BattlePass: React.FC<BattlePassProps> = ({ rewards, currentLevel, isPremium }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500 to-orange-600';
      case 'epic': return 'from-purple-500 to-blue-600';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <div className="py-6">
      <div className="px-6 flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Путь Чемпиона</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Сезонные награды</p>
        </div>
        <button className="flex items-center gap-1.5 text-[10px] font-black text-red-500 uppercase bg-red-500/5 px-3 py-1.5 rounded-full border border-red-500/20">
          Списки <LucideArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 pb-8 custom-scrollbar snap-x"
      >
        {rewards.map((reward) => {
          const isUnlocked = reward.level <= currentLevel;
          const isClaimable = isUnlocked && (reward.tier === RewardTier.FREE || isPremium);
          
          return (
            <div 
              key={reward.id} 
              className={`flex-shrink-0 w-44 snap-center transition-all duration-500 ${
                isUnlocked ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
              }`}
            >
              {/* Reward Card */}
              <div className={`relative rounded-[2rem] overflow-hidden border-2 p-1 bg-[#0f172a] ${
                isClaimable ? 'border-red-500/50' : 'border-white/5'
              }`}>
                {/* Image Section */}
                <div className="relative h-48 rounded-[1.7rem] overflow-hidden">
                  <img 
                    src={reward.image} 
                    alt={reward.name} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${!isUnlocked && 'grayscale'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                  
                  {/* Badge & Lock */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <div className={`px-2.5 py-1 rounded-xl backdrop-blur-md text-[9px] font-black uppercase border border-white/10 ${
                      reward.tier === RewardTier.PREMIUM ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white'
                    }`}>
                      {reward.tier === RewardTier.PREMIUM ? 'Premium' : 'Free'}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    {reward.tier === RewardTier.PREMIUM && !isPremium ? (
                      <div className="p-2 rounded-xl bg-black/60 border border-white/10">
                        <LucideLock className="w-3.5 h-3.5 text-yellow-500" />
                      </div>
                    ) : isUnlocked ? (
                      <div className="p-2 rounded-xl bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                        <LucideUnlock className="w-3.5 h-3.5 text-white" />
                      </div>
                    ) : null}
                  </div>

                  {/* Level Indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                     <div className="text-[10px] font-black text-white/50 mb-1 uppercase tracking-widest">Уровень {reward.level}</div>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-red-600 transition-all duration-700`}
                          style={{ width: isUnlocked ? '100%' : '0%' }}
                        />
                     </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 pt-2 text-center">
                  <h4 className="text-[11px] font-bold text-white line-clamp-1 mb-3">{reward.name}</h4>
                  
                  <button 
                    disabled={!isClaimable || reward.claimed}
                    className={`w-full py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                      reward.claimed 
                        ? 'bg-white/5 text-gray-500' 
                        : isClaimable 
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/20' 
                          : 'bg-white/5 text-gray-600 border border-white/5'
                    }`}
                  >
                    {reward.claimed ? 'Получено' : isClaimable ? 'Забрать' : 'Заблокировано'}
                  </button>
                </div>
              </div>

              {/* Connector (if needed) */}
              {reward.level % 5 === 0 && (
                <div className="mt-4 flex justify-center">
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                    getRarityColor(reward.rarity).includes('yellow') ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' : 'border-blue-500/30 text-blue-400 bg-blue-500/5'
                  }`}>
                    Milestone Reward
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BattlePass;
