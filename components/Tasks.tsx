
import React, { useState } from 'react';
import { Task, TaskDifficulty, TaskPeriod } from '../types';
import { LucideCheckCircle2, LucideTrophy, LucideCalendar, LucideZap, LucideLoader2, LucideArrowRight } from 'lucide-react';

interface TasksProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onComplete }) => {
  const [activeFilter, setActiveFilter] = useState<TaskPeriod>('daily');
  const [loadingTasks, setLoadingTasks] = useState<Record<string, boolean>>({});

  const filteredTasks = tasks.filter(t => t.period === activeFilter);

  const handleTaskAction = async (taskId: string) => {
    setLoadingTasks(prev => ({ ...prev, [taskId]: true }));
    await new Promise(resolve => setTimeout(resolve, 1500));
    onComplete(taskId);
    setLoadingTasks(prev => ({ ...prev, [taskId]: false }));
  };

  const getDiffLabel = (diff: TaskDifficulty) => {
    switch(diff) {
      case 'easy': return { label: 'Легко', color: 'text-green-400 bg-green-400/10 border-green-400/20' };
      case 'medium': return { label: 'Средне', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' };
      case 'hard': return { label: 'Хардкор', color: 'text-red-400 bg-red-400/10 border-red-400/20' };
    }
  };

  return (
    <div className="px-6 pb-28">
      {/* Filter Tabs */}
      <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
        {(['daily', 'weekly', 'season'] as TaskPeriod[]).map(p => (
          <button
            key={p}
            onClick={() => setActiveFilter(p)}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              activeFilter === p ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {p === 'daily' ? 'Дневные' : p === 'weekly' ? 'Неделя' : 'Сезон'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? filteredTasks.map((task) => {
          const diff = getDiffLabel(task.difficulty);
          return (
            <div
              key={task.id}
              className={`group relative p-5 rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                task.completed
                  ? 'bg-white/5 border-white/5 opacity-60'
                  : 'bg-[#0f172a] border-white/10 hover:border-red-500/30'
              }`}
            >
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-full ${
                task.difficulty === 'hard' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${task.completed ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-300'}`}>
                  {task.period === 'daily' ? <LucideZap className="w-5 h-5" /> : task.period === 'weekly' ? <LucideCalendar className="w-5 h-5" /> : <LucideTrophy className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className={`text-sm font-black tracking-tight mb-1 ${task.completed ? 'text-gray-400' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <div className={`inline-block px-2 py-0.5 rounded-md text-[8px] font-black uppercase border ${diff.color}`}>
                        {diff.label}
                      </div>
                    </div>
                    {!task.completed && (
                      <div className="text-right">
                        <div className="text-red-500 text-[11px] font-black">+{task.xpReward} XP</div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{task.description}</p>

                  {task.total && (
                    <div className="mb-4">
                      <div className="flex justify-between text-[9px] font-black text-gray-500 mb-1.5 uppercase">
                        <span>Прогресс</span>
                        <span>{task.progress} / {task.total}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ${task.completed ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}
                          style={{ width: `${(task.progress || 0) / (task.total || 1) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {!task.completed ? (
                    <button
                      onClick={() => handleTaskAction(task.id)}
                      disabled={loadingTasks[task.id]}
                      className="w-full py-3 bg-white/5 group-hover:bg-red-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/5 group-hover:border-red-500"
                    >
                      {loadingTasks[task.id] ? <LucideLoader2 className="w-4 h-4 animate-spin" /> : 'Выполнить'}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                      <LucideCheckCircle2 className="w-4 h-4" /> Завершено
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }) : (
            <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
               <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Все задания выполнены!</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Tasks;
