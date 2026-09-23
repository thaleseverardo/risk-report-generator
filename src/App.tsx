/**
 * Master Application Shell (Refactored).
 *
 * Deconstructs the 580-line God Component into an ultra-lean presentation layer.
 * All state orchestration is delegated into CreditReportProvider.
 */

import React, { useState } from "react";
import { Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { CreditReportProvider } from "./state/CreditReportContext";
import Sidebar from "./components/organisms/Sidebar";
import A4Pages from "./components/A4Pages";
import DashboardAnalytics from "./components/organisms/DashboardAnalytics";

const AppContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"A4" | "DASH">("A4");

  return (
    <div
      id="app-root"
      className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#F1F2F6] text-slate-900 font-sans transition-colors duration-300"
    >
      {/* 1. Left controls & simulation panel */}
      <Sidebar />

      {/* 2. Document preview viewport */}
      <main className="flex-1 flex flex-col h-full overflow-hidden print:overflow-visible">
        {/* Top Control Bar (Screen only, hidden on PDF print) */}
        <header className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-display font-bold tracking-tight text-slate-800">
              Visualização de Relatório de Perícia
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-0.5 rounded-none border border-gray-200 bg-slate-100 flex text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setActiveTab("A4")}
                className={`py-1 px-3 rounded-none transition-all cursor-pointer ${
                  activeTab === "A4"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Simulação Folha A4 (Impressão)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("DASH")}
                className={`py-1 px-3 rounded-none transition-all cursor-pointer ${
                  activeTab === "DASH"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Dashboard Analytics (Métricas)
              </button>
            </div>
          </div>
        </header>

        {/* 3. Screen content area with smooth motion transitions */}
        <div className="flex-1 overflow-y-auto print:overflow-visible">
          <AnimatePresence mode="wait">
            {activeTab === "A4" ? (
              <motion.div
                key="a4-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full print:h-auto"
              >
                <A4Pages />
              </motion.div>
            ) : (
              <motion.div
                key="dash-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 max-w-6xl mx-auto space-y-6"
              >
                <DashboardAnalytics />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  // Wrap entire application on Provider boundary for provide context to all levels
  return (
    <CreditReportProvider>
      <AppContainer />
    </CreditReportProvider>
  );
}
