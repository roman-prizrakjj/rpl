
import React from 'react';
import { User } from '../types';
import { RPL_LOGO } from '../constants';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const progressPercent = (user.xp / user.nextLevelXp) * 100;

  return (
    <div className="bg-rpl-dark p-6 rounded-b-3xl shadow-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900/50 p-2 rounded-xl border border-blue-500/30">
            {RPL_LOGO}
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Паспорт Болельщика</h1>
            <p className="text-xs text-gray-400 font-medium">СЕЗОН 2024/25</p>
          </div>
        </div>
        <div className="bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gray-900/40 p-3 rounded-2xl border border-gray-800">
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/alex/100/100" 
            className="w-14 h-14 rounded-2xl border-2 border-blue-500 shadow-lg shadow-blue-500/20" 
            alt="Avatar"
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-rpl-dark">
            УР. {user.level}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h2 className="font-bold text-gray-100">{user.name}</h2>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{user.rank}</p>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">{user.xp} / {user.nextLevelXp} XP</span>
          </div>
          <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
