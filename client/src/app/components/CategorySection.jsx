'use client';
import { HeartHandshake, Users, Building2, Briefcase, TrendingUp, ShieldCheck } from 'lucide-react';

export default function CategorySection({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { name: 'Registered Nurses (RN)', icon: HeartHandshake, count: 'Healthcare' },
    { name: 'Personal Support Workers (PSW)', icon: Users, count: 'Healthcare' },
    { name: 'Wait Staff', icon: Building2, count: 'Hospitality' },
    { name: 'Servers', icon: Briefcase, count: 'Hospitality' },
    { name: 'Bartenders', icon: TrendingUp, count: 'Hospitality' },
    { name: 'Housekeeping Staff', icon: ShieldCheck, count: 'Hospitality' },
  ];

  return (
    <section className="py-[clamp(3rem,6vw,5rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold text-[#0B192C] dark:text-white">Search by Category</h2>
          <p className="text-gray-500 text-sm mt-1">Explore career opportunities within our specialized sectors.</p>
        </div>
        <button 
          onClick={() => setSelectedCategory('')}
          className="text-blue-600 text-sm font-bold hover:underline"
        >
          All Categories →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name;
          return (
            <div 
              key={idx}
              onClick={() => setSelectedCategory(isSelected ? '' : cat.name)}
              className={`backdrop-blur-md bg-white/70 dark:bg-gray-900/70 p-6 rounded-2xl shadow-sm border cursor-pointer transition text-center flex flex-col items-center justify-center gap-3 ${isSelected ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-600/20' : 'border-gray-200 dark:border-gray-800 hover:border-blue-400'}`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
                <Icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0B192C] dark:text-white">{cat.name}</h4>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{cat.count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}