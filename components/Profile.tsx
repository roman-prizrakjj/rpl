
import React from 'react';
import { User } from '../types';
import { LucideQrCode, LucideSettings, LucideMapPin, LucideTrophy, LucideCalendar, LucideLogOut, LucideChevronRight } from 'lucide-react';
import { RPL_LOGO } from '../constants';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="p-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black">Профиль</h2>
        <button className="p-2 bg-gray-800 rounded-xl border border-gray-700">
          <LucideSettings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Digital Fan ID Card */}
      <div className="relative mb-8 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-rpl-dark border border-gray-800 rounded-[2rem] overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-md">
                {RPL_LOGO}
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-white/80">Digital Fan ID</span>
            </div>
            <div className="text-[10px] font-bold text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded-md uppercase">
              RPL Season 24/25
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 flex gap-6">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/alex/200/200" 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-700 shadow-xl" 
                alt="Avatar"
              />
              <div className="absolute -bottom-2 -left-2 bg-green-500 text-black text-[8px] font-black px-2 py-0.5 rounded-md border-2 border-rpl-dark">
                VERIFIED
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-black leading-tight mb-1">{user.name}</h3>
              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-3">{user.rank}</p>
              <div className="flex items-center gap-2 text-gray-400">
                <LucideQrCode className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-tighter uppercase">{user.fanId}</span>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 border-t border-gray-800/50 bg-gray-900/30 flex justify-between items-center">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-rpl-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/club${i}/40/40`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full border-2 border-rpl-dark bg-blue-600 text-[8px] flex items-center justify-center font-bold">
                  +12
                </div>
             </div>
             <button className="flex items-center gap-1.5 text-blue-400 font-bold text-[10px] uppercase tracking-wider">
               Показать QR <LucideChevronRight className="w-3 h-3" />
             </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-gray-800/40 border border-gray-700 p-4 rounded-3xl">
          <LucideMapPin className="w-5 h-5 text-red-400 mb-2" />
          <div className="text-xl font-black">12</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Матчей посещено</div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700 p-4 rounded-3xl">
          <LucideTrophy className="w-5 h-5 text-yellow-400 mb-2" />
          <div className="text-xl font-black">4500</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Всего XP</div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700 p-4 rounded-3xl">
          <LucideCalendar className="w-5 h-5 text-green-400 mb-2" />
          <div className="text-xl font-black">8</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Турниров</div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700 p-4 rounded-3xl">
          <LucideQrCode className="w-5 h-5 text-blue-400 mb-2" />
          <div className="text-xl font-black">156</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Чекинов</div>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-2 mb-8">
        {['Мои билеты', 'История наград', 'Настройки уведомлений', 'Помощь'].map((item, i) => (
          <button key={i} className="w-full flex justify-between items-center p-4 bg-gray-800/20 hover:bg-gray-800/40 rounded-2xl border border-gray-800 transition-colors">
            <span className="text-sm font-bold text-gray-300">{item}</span>
            <LucideChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        ))}
      </div>

      <button className="w-full py-4 flex items-center justify-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
        <LucideLogOut className="w-4 h-4" /> Выйти из аккаунта
      </button>
    </div>
  );
};

export default Profile;
