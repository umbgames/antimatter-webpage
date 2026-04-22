import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Terminal,
  Settings,
  Globe,
  Cpu,
  Menu,
  X
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-400/20 blur-[120px]"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="px-6 md:px-12 py-6 flex justify-between items-center border-b border-slate-200/50 bg-white/50 backdrop-blur-md sticky top-0 z-50"
      >
        <a href="/" className="flex items-center space-x-3 group">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            src="/logo.png"
            alt="Antimatter Logo"
            className="h-10 w-auto object-contain cursor-pointer"
          />
          <span className="font-bold text-lg tracking-tight hidden sm:block text-slate-900 group-hover:text-blue-600 transition-colors">
            ɅNTIMɅTTΞR
          </span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-500 items-center">
          <motion.a
            whileHover={{ scale: 1.05, color: "#0f172a" }}
            href="#features"
            className="transition-colors"
          >
            Features
          </motion.a>
          <Link to="/docs">
            <motion.span
              whileHover={{ scale: 1.05, color: "#0f172a" }}
              className="transition-colors"
            >
              Documentation
            </motion.span>
          </Link>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#download"
            className="px-5 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-900 transition-colors flex items-center gap-1 group whitespace-nowrap bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            Get Started{" "}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4 text-sm font-medium">
          <a
            href="#download"
            className="px-4 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-900 transition-colors flex items-center gap-1 bg-white/80 backdrop-blur-sm shadow-sm"
          >
            Get Started
          </a>
          <button 
            className="text-slate-500 hover:text-slate-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 overflow-hidden absolute top-[80px] left-0 right-0 w-full z-40 shadow-lg"
          >
            <nav className="flex flex-col p-6 gap-6 font-semibold text-slate-600 text-lg">
              <a 
                href="#features" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-slate-900 transition-colors border-b border-slate-100 pb-4"
              >
                Features
              </a>
              <Link 
                to="/docs" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-slate-900 transition-colors border-b border-slate-100 pb-4"
              >
                Documentation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main className="flex-1 grid lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto w-full pt-16 pb-24 px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col justify-center relative"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 whitespace-normal sm:whitespace-nowrap sm:break-normal break-all"
          >
            ɅNTIMɅTTΞR
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 leading-relaxed max-w-xl mb-4 font-medium"
          >
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">A</span>daptive{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">N</span>etwork for{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">T</span>ask{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">I</span>ntegration,{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">M</span>ulti-Agent{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">T</span>asking,{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">T</span>ooling, &{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">E</span>xecution{" "}
            <span className="text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-2">R</span>untime.
          </motion.p>

          <motion.blockquote
            variants={itemVariants}
            className="text-slate-500 text-sm max-w-lg mb-10 pl-5 border-l-4 border-blue-200 italic font-medium leading-relaxed bg-slate-100/30 py-2 rounded-r-xl"
          >
            A local-first, no-signup, BYOK agentic IDE for developers who want
            control over their workspace, model providers, and execution surface. 
            Orchestrate dozens of specialized AI agents with native execution capabilities.
          </motion.blockquote>

          <motion.div variants={itemVariants} id="download" className="flex flex-col space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Available for immediate download
            </span>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="/downloads/antimatter-windows-x64-1.0.4.exe"
                download="antimatter-windows-x64-1.0.4.exe"
                className="flex-1 bg-slate-900 text-white rounded-xl py-4 px-6 flex items-center justify-between shadow-xl shadow-slate-900/20 group"
              >
                <div className="text-left flex flex-col leading-tight">
                  <span className="text-[10px] opacity-60 uppercase font-bold text-slate-400">
                    Download for
                  </span>
                  <span className="font-bold">Windows</span>
                </div>
                <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Download className="w-5 h-5 text-white" />
                </motion.div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -5, borderColor: "#93c5fd" }}
                whileTap={{ scale: 0.95 }}
                href="/downloads/antimatter-macos-arm64-1.0.4.dmg"
                download="antimatter-macos-arm64-1.0.4.dmg"
                className="flex-1 bg-white/80 border border-slate-200 text-slate-900 rounded-xl py-4 px-6 flex items-center justify-between shadow-lg shadow-slate-200/50 backdrop-blur-sm group"
              >
                <div className="text-left flex flex-col leading-tight">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Download for
                  </span>
                  <span className="font-bold">macOS</span>
                </div>
                <Download className="w-5 h-5 text-slate-400" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -5, borderColor: "#93c5fd" }}
                whileTap={{ scale: 0.95 }}
                href="/downloads/antimatter-linux-x86_64-1.0.4.AppImage"
                download="antimatter-linux-x86_64-1.0.4.AppImage"
                className="flex-1 bg-white/80 border border-slate-200 text-slate-900 rounded-xl py-4 px-6 flex items-center justify-between shadow-lg shadow-slate-200/50 backdrop-blur-sm group"
              >
                <div className="text-left flex flex-col leading-tight">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Download for
                  </span>
                  <span className="font-bold">Linux</span>
                </div>
                <Download className="w-5 h-5 text-slate-400" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Abstract Visual representation */}
        <motion.div
           style={{ y: y1 }}
          className="lg:col-span-5 relative w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-300/50 p-6 border border-slate-200/60 overflow-hidden mb-8 transform-gpu"
          >
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight font-bold">
                ɅNTIMɅTTΞR_Terminal
              </span>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4 font-mono text-xs text-slate-600"
            >
              <motion.p variants={itemVariants} className="text-blue-600 font-semibold">$ git clone https://github.com/umb-games/antimatter</motion.p>
              <motion.p variants={itemVariants} className="text-blue-600 font-semibold">$ cd antimatter && npm install</motion.p>
              <motion.p variants={itemVariants} className="text-slate-400">&gt; Resolving modular packages...</motion.p>
              <motion.p variants={itemVariants} className="text-blue-600 font-semibold">
                $ npm run dev
              </motion.p>
              <motion.p variants={itemVariants} className="text-emerald-500 drop-shadow-sm">&gt; Desktop shell initialized (Tauri + Rust).</motion.p>
              <motion.p variants={itemVariants} className="flex items-center gap-2">
                <span className="w-2 h-4 bg-blue-500 animate-pulse inline-block" />
              </motion.p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 flex flex-col shadow-lg shadow-slate-200/50 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-3 text-blue-600">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold mb-1">OS Integration</span>
              <p className="text-[11px] text-slate-500">
                Tauri + Rust for raw desktop shell and system-facing commands.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 flex flex-col shadow-lg shadow-slate-200/50 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mb-3 text-emerald-600">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold mb-1">Open Source</span>
              <p className="text-[11px] text-slate-500">
                React, Vite, Monaco Editor, and modular packages for agents.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Features */}
      <section
        id="features"
        className="w-full bg-white border-y border-slate-200/60 relative z-20"
      >
        <motion.div
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-100px" }}
           variants={containerVariants}
           className="max-w-7xl mx-auto px-6 md:px-12 py-32 grid md:grid-cols-3 gap-12 relative"
        >
          <motion.div variants={itemVariants} className="space-y-4 group">
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
              <Settings className="w-6 h-6" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
              Local-First & BYOK
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Your workspace stays on your machine. Bring your own credentials
              for OpenAI, Anthropic, Gemini, Groq, or connect local endpoints. No signup, no cloud lock-in.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 group">
            <motion.div whileHover={{ scale: 1.1, rotate: -10 }} className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600 shadow-sm border border-emerald-100">
              <Globe className="w-6 h-6" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-emerald-600 transition-colors">
              Safe-by-Default Execution
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Agents must ask for approval before risky actions. See diff previews for
              file writes and interact with a guarded terminal execution stub.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 group">
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 text-indigo-600 shadow-sm border border-indigo-100">
              <Terminal className="w-6 h-6" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">
              Production Architecture
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Built with a Tauri + Rust backend, React + Vite frontend, Monaco Editor,
              and a highly extensible architecture for agents and providers.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-50 px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest gap-4 z-20 relative">
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} UMB Games & Technology Ltd. All
          rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link to="/docs" className="hover:text-slate-900 transition-colors">
            Documentation
          </Link>
          <a href="#" className="hover:text-slate-900 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-900 transition-colors">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
