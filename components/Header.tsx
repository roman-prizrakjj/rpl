
import React from 'react';
import { User } from '../types';
import { SPARTAK_LOGO } from '../constants';
import { LucideZap, LucideShieldCheck } from 'lucide-react';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const progressPercent = (user.xp / user.nextLevelXp) * 100;

  return (
    <div className="bg-[#0b0f19] p-6 pb-8 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden border-b border-white/5 sticky top-0 z-50">
      {/* Rhombus Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rotate-45 -mr-32 -mt-32 pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
            {SPARTAK_LOGO}
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white uppercase italic">Spartak Pass</h1>
            <div className="flex items-center gap-1.5">
               <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Сезон 2024</span>
               <div className="w-1 h-1 bg-red-500 rounded-full"></div>
               <span className="text-[10px] text-red-500 font-bold uppercase">Вперёд, Красно-Белые!</span>
            </div>
          </div>
        </div>
        
        {user.isPremium && (
          <div className="bg-gradient-to-r from-red-600 to-red-800 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg shadow-red-600/20">
            <LucideZap className="w-3.5 h-3.5 text-white fill-white" />
            <span className="text-[10px] font-black text-white uppercase">x{user.xpMultiplier} XP</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-white/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>
          <div className="relative">
            <div className="w-16 h-16 p-2 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
              {SPARTAK_LOGO}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#E30613] text-white text-[10px] font-black px-2 py-0.5 rounded-lg border border-white/20 shadow-xl">
              Lvl {user.level}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-white text-lg tracking-tight italic">{user.name}</h2>
                <LucideShieldCheck className="w-4 h-4 text-red-500" />
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{user.rank}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-white">{user.xp}</span>
              <span className="text-[10px] text-gray-500 font-bold"> / {user.nextLevelXp} XP</span>
            </div>
          </div>
          
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-full transition-all duration-1000 relative shadow-[0_0_15px_rgba(227,6,19,0.4)]"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-12 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
