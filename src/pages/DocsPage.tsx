import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { ArrowLeft, Book, Code, TerminalSquare, Settings, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function DocContent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="max-w-3xl space-y-8"
    >
      <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
        {title}
      </h1>
      <div className="prose prose-slate prose-lg pb-32 text-slate-600 leading-relaxed max-w-none">
        {children}
      </div>
    </motion.div>
  );
}

export default function DocsPage() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Introduction", path: "/docs", icon: <Book className="w-4 h-4" /> },
    {
      name: "Installation",
      path: "/docs/installation",
      icon: <TerminalSquare className="w-4 h-4" />,
    },
    {
      name: "Getting Started",
      path: "/docs/getting-started",
      icon: <Code className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mini Header */}
      <motion.header 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="px-6 md:px-12 py-6 flex justify-between items-center border-b border-slate-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <motion.div whileHover={{ x: -2 }} transition={{ type: "spring", stiffness: 400 }} className="text-slate-400 group-hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </motion.div>
          <img src="/logo.png" className="w-8 h-8 object-contain" alt="Antimatter Logo" />
          <span className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors hidden sm:block tracking-tight">
            ɅNTIMɅTTΞR
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
            Documentation
          </span>
          <button 
            className="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 overflow-hidden absolute top-[73px] w-full z-40 shadow-lg"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-500 font-medium hover:text-slate-900 hover:bg-slate-100/80"
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow flex relative">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-64 border-r border-slate-200/80 hidden md:block shrink-0 px-6 py-12 bg-white/50 backdrop-blur-sm z-10"
        >
          <nav className="flex flex-col gap-2 relative">
            <div className="absolute -left-[50px] -top-[50px] w-[150px] h-[150px] bg-blue-400/10 rounded-full blur-[60px] pointer-events-none" />
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-bold shadow-sm shadow-blue-100"
                        : "text-slate-500 font-medium hover:text-slate-900 hover:bg-slate-100/80"
                    }`}
                  >
                    <motion.div animate={isActive ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.5 }}>
                      {link.icon}
                    </motion.div>
                    {link.name}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </motion.aside>

        {/* Content */}
        <main className="flex-grow px-6 md:px-16 py-16 overflow-y-auto bg-slate-50 relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <DocContent title="Introduction">
                    <p className="text-slate-600 font-medium text-lg mb-6">
                      Welcome to the official documentation for{" "}
                      <strong className="text-slate-900">ɅNTIMɅTTΞR</strong>.
                    </p>
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="bg-white border border-slate-200/80 p-8 rounded-3xl mb-12 shadow-xl shadow-slate-200/50 relative overflow-hidden"
                    >
                      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl" />
                      <h3 className="font-bold text-slate-900 text-xl mb-3 relative z-10">
                        What is ɅNTIMɅTTΞR?
                      </h3>
                      <p className="text-slate-600 text-base relative z-10 font-medium">
                        ɅNTIMɅTTΞR is a <em className="text-blue-600 font-bold not-italic">local-first, no-signup, BYOK agentic IDE</em> for
                        developers who want control over their workspace, model providers, and execution surface.
                      </p>
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex justify-center items-center">
                        <TerminalSquare className="w-4 h-4" />
                      </div>
                      Product Principles
                    </h2>
                    <ul className="pl-0 space-y-4 text-slate-600">
                      {[
                        { title: "Local-first:", desc: "Your workspace stays on your machine." },
                        { title: "BYOK & No Cloud Lock-in:", desc: "Bring your own provider credentials. Supports hosted APIs (OpenAI, Anthropic, Gemini, Groq) and local model endpoints." },
                        { title: "Safe-by-default:", desc: "Agent UX includes previews, logs, and approvals before risky actions." }
                      ].map((item, i) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                          key={i} 
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-slate-200 shadow-sm hover:shadow-md"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                          <div>
                            <strong className="text-slate-900 block mb-1">{item.title}</strong> 
                            <span className="font-medium text-slate-500">{item.desc}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </DocContent>
                }
              />

              <Route
                path="/installation"
                element={
                  <DocContent title="Installation">
                    <p className="text-slate-600 font-medium text-lg mb-6">
                      This repository ships a production-grade starter for a desktop-first IDE.
                    </p>
                    <div className="space-y-10 mt-10">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-3">
                          <Settings className="w-5 h-5 text-blue-500" /> Prerequisites
                        </h3>
                        <div className="grid gap-3">
                          {["Node.js 20+", "Rust stable", "Tauri prerequisites for your OS"].map((req, i) => (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + (i*0.1) }}
                              key={i} 
                              className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3 font-medium text-slate-600"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {req}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-3">
                          <Code className="w-5 h-5 text-indigo-500" /> Install and Run
                        </h3>
                        <motion.div 
                          whileHover={{ scale: 1.01 }}
                          className="bg-slate-900 text-slate-50 p-6 rounded-2xl font-mono text-sm overflow-x-auto relative shadow-2xl"
                        >
                          <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                          </div>
                          <code className="block text-emerald-400 mb-2"># Install dependencies</code>
                          <code className="block mb-6">npm install</code>
                          <code className="block text-emerald-400 mb-2"># Run the desktop app</code>
                          <code className="block">npm run dev</code>
                        </motion.div>
                      </div>
                    </div>
                  </DocContent>
                }
              />

              <Route
                path="/getting-started"
                element={
                  <DocContent title="Getting Started">
                    <p className="text-slate-600 leading-relaxed text-lg mb-8 font-medium">
                      ɅNTIMɅTTΞR is built with a shared, extensible architecture. Here is an overview of the repository structure.
                    </p>
                    <div className="space-y-12">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-4">
                          Repository Layout
                        </h3>
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-sm shadow-xl shadow-slate-900/10 whitespace-pre overflow-x-auto leading-loose"
                        >
                          <div><span className="text-blue-400">/antimatter</span></div>
                          <div><span className="text-emerald-400">  /apps</span></div>
                          <div><span className="text-purple-400">    /desktop</span>        <span className="text-slate-500"># Tauri app, React frontend, Rust backend</span></div>
                          <div><span className="text-emerald-400">  /packages</span></div>
                          <div><span className="text-purple-400">    /agents</span>         <span className="text-slate-500"># Agent runtime contracts and orchestration helpers</span></div>
                          <div><span className="text-purple-400">    /providers</span>      <span className="text-slate-500"># Provider abstractions and registry</span></div>
                          <div><span className="text-purple-400">    /shared</span>         <span className="text-slate-500"># Shared domain types and constants</span></div>
                          <div><span className="text-purple-400">    /tools</span>          <span className="text-slate-500"># Tool abstractions and tool descriptors</span></div>
                          <div><span className="text-purple-400">    /ui</span>             <span className="text-slate-500"># Reusable UI-oriented utilities and tokens</span></div>
                        </motion.div>
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-3">
                          Provide Your Models (BYOK)
                        </h3>
                        <p className="text-slate-600 text-sm mb-6 font-medium bg-blue-50 border border-blue-100 p-4 rounded-xl">
                          ɅNTIMɅTTΞR does not include models. Users connect their own providers via the configuration UI. API keys are never hardcoded and are stored with the OS credential store when available.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {['OpenAI', 'Anthropic', 'Gemini', 'Groq', 'Local Models'].map((provider, i) => (
                             <motion.div
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: i * 0.1 }}
                               whileHover={{ scale: 1.05 }}
                               key={provider}
                               className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm font-bold text-slate-700"
                             >
                               {provider}
                             </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DocContent>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
