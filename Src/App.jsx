import React, { useState, useMemo } from 'react';
import { 
  Landmark, Calculator, ArrowRight, Check, 
  Download, FileText, Clock, Shield, BadgeCheck,
  Factory, Briefcase, Users, Menu, X
} from 'lucide-react';

const fmt = (v) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmt2 = (v) => v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

function pmt(rate, nper, pv) {
  if (rate === 0) return pv / nper;
  return (rate * pv * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

export default function App() {
  const [page, setPage] = useState('home');
  const [amount, setAmount] = useState("450000");
  const [rate, setRate] = useState("10.5");
  const [years, setYears] = useState("10");
  const [isWaiver, setIsWaiver] = useState(false);

  const principal = parseFloat(amount.replace(/,/g, "")) || 0;
  const n = parseInt(years) * 12;
  const mr = (parseFloat(rate) / 100) / 12;
  
  const monthly = useMemo(() => principal > 0 && n > 0 ? pmt(mr, n, principal) : 0, [principal, mr, n]);
  const sbaFee = isWaiver ? 0 : principal * 0.0275;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100">
      <header className="bg-slate-900 h-16 flex items-center px-6 justify-between border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-slate-900 shadow-sm"><Landmark size={18}/></div>
          <span className="text-white font-bold text-xl font-serif tracking-tight">ClearPath SBA</span>
        </div>
        <nav className="hidden md:flex gap-2">
          <button onClick={() => setPage('home')} className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${page === 'home' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white'}`}>Overview</button>
          <button onClick={() => setPage('calculator')} className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${page === 'calculator' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white'}`}>Pricing Engine</button>
        </nav>
      </header>

      <div className="bg-white border-b border-slate-200 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-center gap-12 shadow-sm">
        <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-emerald-600" /> B2B Utility</span>
        <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-slate-900" /> SOP 50 10 7 Ready</span>
        <span className="flex items-center gap-2"><Calculator className="w-4 h-4 text-slate-900" /> FY26 Waiver Logic</span>
      </div>

      <main className="max-w-7xl mx-auto p-6 py-12 lg:py-16">
        {page === 'home' ? (
          <div className="space-y-16">
            <section className="bg-slate-900 p-12 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-60"></div>
              <div className="relative z-10">
                <h1 className="text-6xl lg:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight">Structure SBA.<br />Close Faster.</h1>
                <p className="text-slate-400 text-xl mb-12 leading-relaxed max-w-2xl font-light">The institutional utility for the commercial finance ecosystem. Model amortization, extract NLP parameters, and calculate fee waivers instantly.</p>
                <button onClick={() => setPage('calculator')} className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold flex items-center gap-3 text-lg transition-all shadow-xl shadow-emerald-600/20">Launch Pricing Engine <ArrowRight className="w-5 h-5" /></button>
              </div>
            </section>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-10">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-5 mb-8">Loan Parameters</h2>
                <div className="space-y-8">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Capital Request</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xl">$</span>
                      <input 
                        type="text" 
                        value={Number(amount.replace(/,/g, "")).toLocaleString()} 
                        onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ""))} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-5 text-2xl font-bold tabular-nums outline-none focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="flex justify-between items-center mb-3"><label className="text-[10px] font-bold text-slate-500 uppercase">Rate</label><span className="text-sm font-bold tabular-nums">{rate}%</span></div>
                      <input type="range" min="4" max="15" step="0.25" value={rate} onChange={e => setRate(e.target.value)} className="w-full" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-3"><label className="text-[10px] font-bold text-slate-500 uppercase">Term</label><span className="text-sm font-bold tabular-nums">{years} yrs</span></div>
                      <input type="range" min="1" max="25" value={years} onChange={e => setYears(e.target.value)} className="w-full" />
                    </div>
                  </div>
                  <div className="pt-8 border-t border-slate-100">
                    <label className="flex items-start gap-5 cursor-pointer group">
                      <div className={`w-7 h-7 mt-0.5 border-2 rounded-xl flex items-center justify-center transition-all ${isWaiver ? 'bg-slate-900 border-slate-900 shadow-xl' : 'bg-white border-slate-300'}`}>
                        <input type="checkbox" className="sr-only" checked={isWaiver} onChange={e => setIsWaiver(e.target.checked)} />
                        {isWaiver && <Check size={18} className="text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-tight text-slate-900">Apply FY26 Manufacturer Waiver</div>
                        <div className="text-xs text-slate-500 mt-1 leading-relaxed">NAICS 31-33 Exemption Logic. <span className="text-emerald-600 font-bold tracking-tight">Expires Sept 30, 2026.</span></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-[48px] p-12 lg:p-16 shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col justify-center min-h-[450px]">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none opacity-60"></div>
                <div className="relative z-10 text-white">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em]">Monthly Debt Service</div>
                    {isWaiver && <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">Waiver Applied</div>}
                  </div>
                  <div className="text-8xl lg:text-9xl font-bold tabular-nums tracking-tighter mb-8">{fmt2(monthly)}</div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="bg-slate-800/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Total Interest</div>
                      <div className="text-4xl font-bold tabular-nums">{fmt(monthly * n - principal)}</div>
                    </div>
                    <div className="bg-slate-800/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Guaranty Fee</div>
                      <div className="text-4xl font-bold tabular-nums">{fmt(sbaFee)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="max-w-7xl mx-auto p-6 py-12 border-t border-slate-200 mt-20 text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold text-center">
        &copy; {new Date().getFullYear()} ClearPath SBA Software. All Rights Reserved.
      </footer>
    </div>
  );
}