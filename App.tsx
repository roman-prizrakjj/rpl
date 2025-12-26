
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BattlePass from './components/BattlePass';
import Tasks from './components/Tasks';
import Partners from './components/Partners';
import Profile from './components/Profile';
import { INITIAL_USER, MOCK_REWARDS, MOCK_TASKS, MOCK_PARTNERS } from './constants';
import { LucideLayoutDashboard, LucideAward, LucideUser, LucideGift, LucidePlus } from 'lucide-react';
import { generateDailyFanTask } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(INITIAL_USER);
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [isLoadingDaily, setIsLoadingDaily] = useState(false);

  const fetchDailyChallenge = async () => {
    setIsLoadingDaily(true);
    const daily = await generateDailyFanTask(user.name, user.level);
    if (daily) {
      const newTask = {
        id: `daily-${Date.now()}`,
        title: `AI: ${daily.title}`,
        description: daily.description,
        xpReward: daily.xpReward,
        category: 'social' as const,
        completed: false
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setIsLoadingDaily(false);
  };

  useEffect(() => {
    // In a real app, check for existing daily challenge or fetch once
  }, []);

  return (
    <div className="min-h-screen max-w-md mx-auto relative flex flex-col bg-rpl-dark">
      <Header user={user} />

      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BattlePass 
              rewards={MOCK_REWARDS} 
              currentLevel={user.level} 
              isPremium={user.isPremium} 
            />
            
            <div className="px-4 mb-4">
                <div className="bg-gradient-to-br from-blue-900/60 to-purple-900/40 p-5 rounded-3xl border border-blue-500/30 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <LucideAward className="w-24 h-24 rotate-12" />
                    </div>
                    <h3 className="text-xl font-black mb-1">Получи Premium!</h3>
                    <p className="text-xs text-gray-300 mb-4 max-w-[70%]">Открой все награды сезона и получи уникальную карточку болельщика.</p>
                    <button className="bg-white text-blue-900 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-white/10 active:scale-95 transition-transform">
                        Купить за 499 ₽
                    </button>
                </div>
            </div>

            <Partners partners={MOCK_PARTNERS} />
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="p-4 pt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black">Задания</h2>
                    <button 
                      onClick={fetchDailyChallenge}
                      disabled={isLoadingDaily}
                      className="bg-blue-600/20 text-blue-400 p-2 rounded-xl border border-blue-500/30 active:scale-95 disabled:opacity-50"
                    >
                      <LucidePlus className={`w-5 h-5 ${isLoadingDaily ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                <Tasks tasks={tasks} />
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="p-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <h2 className="text-2xl font-black mb-6">Магазин Очков</h2>
            <div className="grid grid-cols-2 gap-4">
                {MOCK_REWARDS.slice(0, 10).map(r => (
                    <div key={r.id} className="bg-gray-800/40 border border-gray-700 rounded-3xl p-4 flex flex-col gap-3">
                        <img src={r.image} className="w-full aspect-square rounded-2xl object-cover grayscale opacity-50" />
                        <h4 className="text-xs font-bold">{r.name}</h4>
                        <button className="w-full py-2 bg-blue-600/20 text-blue-400 rounded-xl text-[10px] font-black uppercase border border-blue-500/20">
                            250 XP
                        </button>
                    </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <Profile user={user} />
        )}
      </main>

      {/* Persistent Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-rpl-dark/95 backdrop-blur-xl border-t border-gray-800 px-6 pt-3 pb-8 flex justify-between items-center z-50 safe-bottom">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'tasks' ? 'text-blue-500 scale-110' : 'text-gray-500'}`}
        >
          <LucideLayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Задания</span>
        </button>
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-110' : 'text-gray-500'}`}
        >
          <LucideAward className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Пропуск</span>
        </button>
        <button 
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'rewards' ? 'text-blue-500 scale-110' : 'text-gray-500'}`}
        >
          <LucideGift className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Награды</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'profile' ? 'text-blue-500 scale-110' : 'text-gray-500'}`}
        >
          <div className="relative">
            <LucideUser className="w-6 h-6" />
            {activeTab !== 'profile' && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-rpl-dark rounded-full"></div>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Профиль</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
