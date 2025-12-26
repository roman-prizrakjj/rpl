
import React from 'react';
import { Task } from '../types';
import { LucideCheckCircle2, LucideCircle, LucideTv, LucideMapPin, LucideTrophy, LucideUsers } from 'lucide-react';

interface TasksProps {
  tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'match': return <LucideMapPin className="w-5 h-5" />;
      case 'stream': return <LucideTv className="w-5 h-5" />;
      case 'prediction': return <LucideTrophy className="w-5 h-5" />;
      case 'social': return <LucideUsers className="w-5 h-5" />;
      default: return <LucideCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Активные Задания</h3>
        <span className="text-xs text-gray-500 font-bold bg-gray-800 px-2 py-1 rounded-lg">4 до конца тура</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`p-4 rounded-2xl border transition-all ${
              task.completed 
                ? 'bg-green-500/5 border-green-500/20 opacity-70' 
                : 'bg-gray-800/40 border-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2.5 rounded-xl ${task.completed ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                {getCategoryIcon(task.category)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-bold ${task.completed ? 'text-gray-400' : 'text-gray-100'}`}>
                    {task.title}
                  </h4>
                  {task.completed ? (
                    <LucideCheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <div className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-2 py-0.5 rounded-md border border-blue-500/20 shrink-0">
                      +{task.xpReward} XP
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{task.description}</p>
                
                {task.total && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                      <span>Прогресс</span>
                      <span>{task.progress} / {task.total}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(task.progress || 0) / (task.total || 1) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {!task.completed && (
              <button className="w-full mt-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors active:scale-95">
                Выполнить
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
