
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BattlePass from './components/BattlePass';
import Tasks from './components/Tasks';
import Partners from './components/Partners';
import Profile from './components/Profile';
import { INITIAL_USER, MOCK_REWARDS, MOCK_TASKS, MOCK_PARTNERS } from './constants';
import { LucideTrophy, LucideGamepad2, LucideUser, LucideShoppingBag, LucideZap, LucideSparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pass');
  const [user, setUser] = useState(INITIAL_USER);
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: true, progress: t.total } : t
    ));

    setUser(prev => {
      const earnedXp = Math.floor(task.xpReward * (prev.isPremium ? prev.xpMultiplier : 1));
      let newXp = prev.xp + earnedXp;
      let newLevel = prev.level;
      let newNextXp = prev.nextLevelXp;

      if (newXp >= newNextXp) {
        newLevel += 1;
        newXp -= newNextXp;
        newNextXp = Math.floor(newNextXp * 1.2);
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        nextLevelXp: newNextXp,
        totalTasksDone: prev.totalTasksDone + 1,
        totalXpEarned: prev.totalXpEarned + earnedXp,
      };
    });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative flex flex-col bg-[#0b0f19] text-[#f8fafc] overflow-hidden">
      <Header user={user} />

      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'pass' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <BattlePass 
              rewards={MOCK_REWARDS} 
              currentLevel={user.level} 
              isPremium={user.isPremium} 
            />
            
            {!user.isPremium && (
              <div className="px-6 mb-8">
                <div className="relative group p-[2px] rounded-[2.5rem] bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 shadow-2xl">
                  <div className="bg-[#0b0f19] p-6 rounded-[2.4rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <LucideSparkles className="w-24 h-24 text-yellow-500 rotate-12" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                       <LucideZap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                       <h3 className="text-xl font-black text-white uppercase italic">Elite Pass</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-6 max-w-[75%] leading-relaxed font-bold">
                      Открой x1.5 бонус к опыту, эксклюзивные скины и доступ к VIP-сообществу.
                    </p>
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-transform">
                        Активировать — 499 ₽
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Partners partners={MOCK_PARTNERS} />
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="animate-in fade-in slide-in-from-right-6 duration-700">
            <div className="p-6">
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight italic">Арена Заданий</h2>
                <Tasks tasks={tasks} onComplete={handleCompleteTask} />
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="p-6 animate-in fade-in slide-in-from-left-6 duration-700">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight italic">Фан-Маркет</h2>
            <div className="grid grid-cols-2 gap-4 pb-28">
                {MOCK_REWARDS.filter(r => r.rarity === 'epic' || r.rarity === 'legendary').slice(0, 8).map(r => (
                    <div key={r.id} className="group bg-[#0f172a] border border-white/5 rounded-[2rem] p-4 flex flex-col gap-4 hover:border-red-500/30 transition-all">
                        <div className="relative aspect-square rounded-[1.5rem] overflow-hidden">
                          <img src={r.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                          <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded-lg text-[8px] font-black text-white uppercase border border-white/10">
                            {r.rarity}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-white uppercase mb-1">{r.name}</h4>
                          <button className="w-full py-2.5 bg-red-600/10 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 active:scale-95 transition-transform">
                              1500 XP
                          </button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <Profile user={user} />
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0b0f19]/80 backdrop-blur-2xl border-t border-white/5 px-8 pt-4 pb-10 flex justify-between items-center z-50 safe-bottom">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-2 transition-all ${activeTab === 'tasks' ? 'text-red-500 scale-110' : 'text-gray-600'}`}
        >
          <LucideGamepad2 className={`w-6 h-6 ${activeTab === 'tasks' ? 'fill-red-500/20' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-widest">Арена</span>
        </button>
        <button 
          onClick={() => setActiveTab('pass')}
          className={`flex flex-col items-center gap-2 transition-all ${activeTab === 'pass' ? 'text-red-500 scale-110' : 'text-gray-600'}`}
        >
          <LucideTrophy className={`w-6 h-6 ${activeTab === 'pass' ? 'fill-red-500/20' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-widest">Пропуск</span>
        </button>
        <button 
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center gap-2 transition-all ${activeTab === 'shop' ? 'text-red-500 scale-110' : 'text-gray-600'}`}
        >
          <LucideShoppingBag className={`w-6 h-6 ${activeTab === 'shop' ? 'fill-red-500/20' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-widest">Маркет</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-2 transition-all ${activeTab === 'profile' ? 'text-red-500 scale-110' : 'text-gray-600'}`}
        >
          <LucideUser className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-red-500/20' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-widest">Профиль</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
