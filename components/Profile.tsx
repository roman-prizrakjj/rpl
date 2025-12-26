
import React from 'react';
import { User } from '../types';
import { LucideQrCode, LucideSettings, LucideMapPin, LucideTrophy, LucideLogOut, LucideChevronRight, LucideCheckCircle } from 'lucide-react';
import { SPARTAK_LOGO } from '../constants';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="p-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-black text-white uppercase italic">Мой Стадион</h2>
        <button className="p-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
          <LucideSettings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Spartak Fan Card */}
      <div className="relative mb-8 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-white rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-[#0b0f19] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-red-700 to-red-600 p-5 flex justify-between items-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 -mr-16 -mt-16 pointer-events-none"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white p-1 rounded-lg shadow-lg">
                {SPARTAK_LOGO}
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-white">Spartak Supporter</span>
            </div>
            <div className="text-[10px] font-black text-white border border-white/30 px-2 py-0.5 rounded-md uppercase backdrop-blur-md">
              Diamond Member
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 flex gap-6">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/fan/200/200" 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-red-600 shadow-xl" 
                alt="Avatar"
              />
              <div className="absolute -bottom-2 -left-2 bg-white text-red-600 text-[8px] font-black px-2 py-1 rounded-md border-2 border-[#0b0f19] shadow-lg">
                КРАСНО-БЕЛЫЙ
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-black leading-tight mb-1 text-white italic">{user.name}</h3>
              <p className="text-xs text-red-500 font-bold uppercase tracking-widest mb-3">{user.rank}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <LucideQrCode className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-tighter uppercase font-bold">{user.fanId}</span>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 border-t border-white/5 bg-white/5 flex justify-between items-center">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0b0f19] bg-white flex items-center justify-center overflow-hidden p-0.5 shadow-md">
                    {SPARTAK_LOGO}
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full border-2 border-[#0b0f19] bg-red-600 text-[8px] flex items-center justify-center font-bold text-white shadow-md">
                  +12
                </div>
             </div>
             <button className="flex items-center gap-1.5 text-white font-bold text-[10px] uppercase tracking-wider bg-red-600 px-3 py-1.5 rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition-transform">
               Мой QR <LucideChevronRight className="w-3 h-3" />
             </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl transition-all hover:border-red-500/30 group">
          <LucideMapPin className="w-5 h-5 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xl font-black text-white">{user.matchesVisited}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Стадионов</div>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl transition-all hover:border-red-500/30 group">
          <LucideTrophy className="w-5 h-5 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xl font-black text-white">{user.totalXpEarned.toLocaleString()}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Очки славы</div>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl transition-all hover:border-red-500/30 group">
          <LucideCheckCircle className="w-5 h-5 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xl font-black text-white">{user.totalTasksDone}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Достижения</div>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl transition-all hover:border-red-500/30 group">
          <LucideQrCode className="w-5 h-5 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xl font-black text-white">{user.checkins}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Чекины</div>
        </div>
      </div>

      <button className="w-full py-4 flex items-center justify-center gap-2 text-gray-600 font-black uppercase tracking-widest text-[10px] hover:text-red-500 transition-colors bg-white/5 rounded-2xl border border-white/5">
        <LucideLogOut className="w-4 h-4" /> Покинуть трибуну
      </button>
    </div>
  );
};

export default Profile;
