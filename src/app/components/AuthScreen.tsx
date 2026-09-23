import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Building, Check, ArrowRight, Sun, ShieldCheck, BarChart3, Clock, FileText, TrendingUp, Key } from "lucide-react";
import leftPanelImg from "../../imports/images/left-panel.webp";
import leftPanelPasswordImg from "../../imports/images/left-panel password.webp";
import InspinLogo from "./Logo";

interface AuthScreenProps {
  onLogin: () => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  
  // Form fields
  const [email, setEmail] = useState("admin@inspin.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("Elena Rostova");
  const [organization, setOrganization] = useState("Acme Research Corp");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeMode = (newMode: "login" | "signup" | "reset") => {
    setMode(newMode);
    setError(null);
    setPassword("");
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      changeMode("login");
    }, 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Welcometonewworld") {
      setError(null);
      onLogin();
    } else {
      setError("Incorrect password. Access denied.");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Welcometonewworld" || password.length >= 6) {
      setError(null);
      onLogin();
    } else {
      setError("Password must be at least 6 characters.");
    }
  };

  const bgImage = mode === "reset" ? leftPanelPasswordImg : leftPanelImg;

  return (
    <div className="min-h-screen w-screen bg-[#f1f5f9] flex items-center justify-center p-4 md:p-8 font-['Inter',sans-serif]">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-[1080px] min-h-[640px] grid grid-cols-1 md:grid-cols-12 overflow-hidden border border-slate-100">
        
        {/* Left Side: Brand Visual Panel */}
        <div 
          className="md:col-span-6 relative p-10 flex flex-col justify-between text-white overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Logo */}
          <div className="z-10 select-none bg-white/95 px-4 py-2.5 rounded-2xl shadow-sm border border-white/10 w-fit flex items-center justify-center self-center">
            <InspinLogo height={28} width={80} />
          </div>

          {/* Central Interactive graphic diagram */}
          <div className="flex flex-col items-center justify-center flex-1 py-10 z-10 select-none">
            <h2 className="text-[26px] font-bold text-center tracking-tight leading-tight max-w-[340px] mb-3">
              {mode === "login" && "Welcome back"}
              {mode === "signup" && "Create your account"}
              {mode === "reset" && "Reset your Password"}
            </h2>
            <p className="text-[12.5px] text-slate-200/80 font-medium text-center max-w-[320px] mb-8 leading-relaxed">
              {mode === "login" && "Sign in to your research workspace and continue your insights."}
              {mode === "signup" && "Sign in to your research workspace and continue your insights."}
              {mode === "reset" && "No worries! Enter your work email and we'll send you a secure link to reset your password."}
            </p>

            {/* Orbiting diagram */}
            <div className="relative size-40 flex items-center justify-center">
              <div className="absolute inset-0 border border-dashed border-white/20 rounded-full animate-[spin_40s_linear_infinite]" />
              
              {/* Center Logo */}
              <div className="size-16 rounded-full bg-white flex items-center justify-center shadow-2xl relative z-10">
                <div className="size-11 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white text-[22px]">
                  i
                </div>
              </div>

              {/* Orbiting Icons */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-7 bg-white rounded-lg flex items-center justify-center shadow-lg border border-slate-100 text-purple-600">
                <Clock className="size-4" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 size-7 bg-white rounded-lg flex items-center justify-center shadow-lg border border-slate-100 text-teal-600">
                <BarChart3 className="size-4" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-7 bg-white rounded-lg flex items-center justify-center shadow-lg border border-slate-100 text-indigo-600">
                <FileText className="size-4" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-3.5 size-7 bg-white rounded-lg flex items-center justify-center shadow-lg border border-slate-100 text-emerald-600">
                <TrendingUp className="size-4" />
              </div>
            </div>
          </div>

          {/* Bottom security banner */}
          <div className="bg-emerald-950/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3 z-10 mt-auto">
            <div className="size-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-4.5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11.5px] font-bold">Your data is secure</span>
              <span className="text-[9.5px] text-slate-300 font-medium">Enterprise-grade security with end-to-end encryption</span>
            </div>
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between relative bg-white">
          {/* Top theme/helper action */}
          <div className="absolute top-6 right-6">
            <button className="size-9 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-400 flex items-center justify-center cursor-pointer transition-colors shadow-sm">
              <Sun className="size-4" />
            </button>
          </div>

          {/* Spacer to push form down slightly */}
          <div className="h-6" />

          {/* Render Form */}
          <div className="flex-1 flex flex-col justify-center max-w-[360px] mx-auto w-full">
            
            {/* Mode 1: LOGIN */}
            {mode === "login" && (
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 mb-0.5">
                  <h3 className="text-[20px] font-bold text-slate-800 tracking-tight">Sign In</h3>
                  <p className="text-[12.5px] text-slate-400 font-semibold">Access your workspace and insights</p>
                </div>

                {/* Demo Credentials Callout */}
                <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] font-bold text-emerald-900 flex items-center gap-1.5">
                      <Key className="size-3.5 text-[#059669]" />
                      Demo Login Credentials
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("admin@inspin.com");
                        setPassword("Welcometonewworld");
                        if (error) setError(null);
                      }}
                      className="px-2.5 py-1 bg-[#059669] hover:bg-[#047857] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                    >
                      Auto-fill
                    </button>
                  </div>
                  <div className="bg-white/90 rounded-xl p-2.5 border border-emerald-100 flex flex-col gap-1.5 text-[11.5px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Email:</span>
                      <span className="font-semibold text-slate-800 font-mono text-[11.5px]">admin@inspin.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Password:</span>
                      <code className="font-mono font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[11.5px]">
                        Welcometonewworld
                      </code>
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@inspin.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[11px] font-bold cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot actions */}
                <div className="flex justify-between items-center text-[12px] font-semibold">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                    <input type="checkbox" className="accent-[#059669] size-3.5" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => changeMode("reset")}
                    className="text-[#059669] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-[12px] font-semibold rounded-xl text-center animate-in fade-in-20 duration-300">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-[13px] font-bold shadow-sm shadow-emerald-100 transition-colors cursor-pointer mt-2"
                >
                  Sign In
                </button>

                <div className="text-center text-[12px] font-semibold text-slate-400 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => changeMode("signup")}
                    className="text-[#059669] hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            )}

            {/* Mode 2: SIGN UP */}
            {mode === "signup" && (
              <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 mb-1">
                  <h3 className="text-[20px] font-bold text-slate-800 tracking-tight">Create your account</h3>
                  <p className="text-[12px] text-slate-400 font-semibold">Join your team workspace</p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Elena Rostova"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="SuperSecure123!"
                      className="w-full pl-10 pr-10 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[11px] font-bold cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {/* Strength bars */}
                  <div className="flex flex-col gap-1 mt-0.5">
                    <div className="flex gap-1">
                      <div className="h-1 bg-emerald-500 rounded-full flex-1" />
                      <div className="h-1 bg-emerald-500 rounded-full flex-1" />
                      <div className="h-1 bg-emerald-500 rounded-full flex-1" />
                      <div className="h-1 bg-slate-200 rounded-full flex-1" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold mt-0.5">
                      <span className="text-emerald-600">Strong password</span>
                      <span className="text-slate-400">Must be 8+ characters</span>
                    </div>
                  </div>
                </div>

                {/* Organization */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Organization Name <span className="text-slate-400 lowercase normal-case">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Acme Research Corp"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                    />
                  </div>
                </div>

                {/* Agree terms */}
                <label className="flex items-start gap-2.5 text-[11.5px] font-semibold text-slate-500 cursor-pointer select-none leading-tight mt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-[#059669] size-3.5 mt-0.5"
                  />
                  <span>
                    I agree to the{" "}
                    <span className="text-[#059669] hover:underline">Terms of Service</span> and{" "}
                    <span className="text-[#059669] hover:underline">Privacy Policy</span>
                  </span>
                </label>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-[12px] font-semibold rounded-xl text-center animate-in fade-in-20 duration-300">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!agreeTerms}
                  className="w-full py-2.5 bg-[#059669] hover:bg-[#047857] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-[13px] font-bold shadow-sm shadow-emerald-100 transition-colors cursor-pointer mt-2"
                >
                  Create Account
                </button>

                <div className="text-center text-[12px] font-semibold text-slate-400 mt-2">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => changeMode("login")}
                    className="text-[#059669] hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}

            {/* Mode 3: RESET PASSWORD */}
            {mode === "reset" && (
              <form onSubmit={handleResetSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5 mb-2">
                  <h3 className="text-[20px] font-bold text-slate-800 tracking-tight">Reset your password</h3>
                  <p className="text-[12.5px] text-slate-400 font-semibold">Enter your work email and we will send you a reset link</p>
                </div>

                {/* Success Banner */}
                {resetSent && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] font-semibold rounded-xl flex items-center gap-2 animate-in fade-in-20 duration-300">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    Reset link sent successfully! Redirecting...
                  </div>
                )}

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-[13px] font-bold shadow-sm shadow-emerald-100 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Mail className="size-4" />
                  Send Reset Link
                </button>

                <div className="text-center text-[12px] font-semibold text-slate-400 mt-4">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => changeMode("login")}
                    className="text-[#059669] hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Bottom spacing helper */}
          <div className="h-6" />
        </div>

      </div>
    </div>
  );
}
