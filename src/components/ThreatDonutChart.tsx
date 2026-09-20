import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ThreatCategory } from '../types/ids';

interface ThreatDonutChartProps {
  data: ThreatCategory[];
}

export const ThreatDonutChart: React.FC<ThreatDonutChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Detected Traffic Categories
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown across CICIDS2017 attack taxonomy
            </p>
          </div>
          <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
            Demo Data
          </span>
        </div>

        <div className="h-48 w-full mt-2 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(val: number) => [`${val} flows`, 'Count']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-400 font-medium">Total Flows</span>
            <span className="text-lg font-bold text-slate-800">1,284</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-slate-50">
            <div className="flex items-center space-x-2 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 font-medium truncate">{item.name}</span>
            </div>
            <span className="font-semibold text-slate-800 ml-1">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
