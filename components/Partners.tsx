
import React from 'react';
import { Partner } from '../types';
import { LucideArrowRight } from 'lucide-react';

interface PartnersProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  return (
    <div className="p-4 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Бонусы Партнеров</h3>
        <button className="text-xs font-bold text-blue-400 uppercase tracking-widest">Все</button>
      </div>

      <div className="space-y-4">
        {partners.map((partner) => (
          <div key={partner.id} className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent group-hover:from-blue-600/20 transition-all duration-300 pointer-events-none" />
            <div className="flex items-center gap-4 bg-gray-800/40 p-4 rounded-3xl border border-gray-700/50 hover:border-blue-500/30 transition-all">
              <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded-2xl object-cover border border-gray-700" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-100">{partner.name}</h4>
                <p className="text-[11px] text-gray-400 font-medium">{partner.offer}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="text-blue-400 text-[10px] font-black uppercase tracking-wider">
                  +{partner.xpBonus} XP
                </div>
                <LucideArrowRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
