import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import Papa from 'papaparse';
import { Activity, Zap, Shield, Grid } from 'lucide-react';

export default function App() {
  const [readings, setReadings] = useState([]);
  const [allData, setAllData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    Papa.parse("/ohio_data.csv", {
      download: true, header: true, dynamicTyping: true, skipEmptyLines: true,
      complete: (results) => {
        const processed = results.data.filter(row => row.cbg).map((row, i) => {
          const actual = parseFloat((row.cbg / 18.018).toFixed(1));
          const insulinImpact = Math.min(i * 0.015, 1.3);
          return {
            time: new Date(2026, 2, 19, 21, i * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            glucose: actual,
            predicted: parseFloat((actual - insulinImpact + (Math.sin(i / 5) * 0.2)).toFixed(1)),
            iob: row.basal || 0.4,
            cob: row.carbInput || 0
          };
        });
        setAllData(processed);
      }
    });
  }, []);

  useEffect(() => {
    if (allData.length === 0) return;
    const ticker = setInterval(() => {
      setReadings(prev => [...prev.slice(-28), allData[index % allData.length]]);
      setIndex(prev => prev + 1);
    }, 1000);
    return () => clearInterval(ticker);
  }, [allData, index]);

  const stats = useMemo(() => {
    if (readings.length === 0) return { avg: "0.0", tir: "0" };
    const sum = readings.reduce((acc, curr) => acc + curr.glucose, 0);
    const inRange = readings.filter(r => r.glucose >= 3.9 && r.glucose <= 10.0).length;
    return { avg: (sum / readings.length).toFixed(1), tir: Math.round((inRange / readings.length) * 100) };
  }, [readings]);

  const current = readings.length > 0 ? readings[readings.length - 1] : { glucose: 0.0, iob: 0.4, cob: 0 };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black border-2 border-blue-500 p-3 shadow-[0_0_20px_rgba(59,130,246,0.6)] rounded-lg">
          <p className="text-[10px] font-black text-zinc-500 mb-2 border-b border-zinc-800 pb-1">{label}</p>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-4 items-center">
              <span className="text-[9px] font-black text-blue-500 uppercase">Actual Glucose</span>
              <span className="text-sm font-[1000] text-white">{payload[1].value}</span>
            </div>
            <div className="flex justify-between gap-4 items-center">
              <span className="text-[9px] font-black text-zinc-400 uppercase">Predicted Glucose</span>
              <span className="text-sm font-[1000] text-blue-900">{payload[0].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-screen w-full bg-black text-white font-sans p-6 flex flex-col gap-5 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-2 border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <Activity className="text-blue-500 shadow-blue-500/50" size={22} />
          <h1 className="text-lg font-[1000] uppercase tracking-tighter">CGM Telemetry</h1>
        </div>
        <div className="flex items-center gap-5 text-[9px] font-black tracking-[0.3em] text-zinc-700">
          <span className="flex items-center gap-1.5 font-mono"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" /> SYSTEM_LIVE</span>
          <Shield size={14} />
        </div>
      </div>

      {/* METRICS SECTION: 35% HEIGHT */}
      <div className="flex gap-5 h-[35%] min-h-[220px]">
        {/* GLUCOSE LEVEL CARD */}
        <div className="w-1/3 bg-[#0a0a0a] border-[3px] border-zinc-700 rounded-[24px] p-6 flex flex-col justify-center items-center transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] group cursor-default shadow-xl">
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 font-black uppercase mb-1 group-hover:text-blue-500">Glucose Level</p>
          <div className="text-8xl font-[1000] leading-none tracking-tighter tabular-nums text-white">
            {current.glucose}
          </div>
          <p className="text-[10px] font-black text-blue-900 mt-2 tracking-[0.4em] uppercase">MMOL/L</p>
        </div>

        {/* METRIC GRID (TIR, AVG, INSULIN, COB) */}
        <div className="w-2/3 grid grid-cols-2 gap-4">
          {[
            { label: 'Time In Stability', val: stats.tir, unit: '%', color: 'text-blue-500' },
            { label: 'Estimated Average', val: stats.avg, unit: 'mmol', color: 'text-blue-500' },
            { label: 'Insulin Dosage', val: current.iob, unit: 'U', color: 'text-white' },
            { label: 'COB Reading', val: current.cob, unit: 'G', color: 'text-white' }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border-[3px] border-zinc-700 rounded-[20px] px-8 flex flex-col justify-center transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] group cursor-default">
              <p className="text-[8px] text-zinc-500 font-black tracking-widest uppercase mb-1 group-hover:text-zinc-300">{item.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-[1000] tabular-nums ${item.color}`}>{item.val}</span>
                <span className="text-[9px] font-black text-zinc-700 group-hover:text-zinc-500 uppercase">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRAPH SECTION: 65% HEIGHT */}
      <div className="flex-1 bg-[#050505] border-[3px] border-zinc-800 rounded-[32px] p-8 flex flex-col relative overflow-hidden group transition-all duration-500 hover:border-zinc-600">
        
        {/* GRID OVERLAY */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="flex justify-between items-center mb-6 relative z-10 px-2">
          <div className="flex items-center gap-2">
            <Grid size={14} className="text-blue-600" />
            <span className="text-[9px] font-black tracking-[0.4em] text-zinc-600 uppercase">Telemetry_Matrix_Flux</span>
          </div>
          <div className="flex gap-8 text-[8px] font-black tracking-widest text-zinc-700 uppercase">
            <span className="text-blue-600 border-b border-blue-900/50 pb-1">Live_Sensor_Link</span>
            <span className="pb-1">Predictive_Sync_V2</span>
          </div>
        </div>

        <div className="flex-1 w-full min-h-0 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={readings} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="gloryGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#151515" strokeDasharray="0" />
              <XAxis dataKey="time" tick={{fontSize: 9, fill: '#444', fontWeight: '900'}} axisLine={false} tickLine={false} />
              <YAxis domain={[2, 16]} tick={{fontSize: 9, fill: '#444', fontWeight: '900'}} axisLine={false} tickLine={false} />
              
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2563eb', strokeWidth: 2 }} />

              <Area type="monotone" dataKey="predicted" stroke="#1e3a8a" strokeWidth={2} strokeDasharray="6 6" fill="transparent" />
              <Area type="monotone" dataKey="glucose" stroke="#2563eb" strokeWidth={5} fill="url(#gloryGlow)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


