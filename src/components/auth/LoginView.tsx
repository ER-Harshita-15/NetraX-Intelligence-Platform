import React, { useState } from 'react';
import {
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Radio,
  Check,
  AlertCircle,
  KeyRound,
  Cctv,
  Fingerprint
} from 'lucide-react';
import { Button } from '../buttons/Button';

export interface LoginViewProps {
  onLoginSuccess: (officerName: string, officerId: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [officerId, setOfficerId] = useState('INV-7492');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim()) {
      setErrorMessage('Please provide an authorized Officer ID.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please provide your tactical passphrase.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    // Realistic authentication latency simulation
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Officer Sharma', officerId);
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setOfficerId('INV-7492');
    setPassword('Surveillance@2026');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC] flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Subtle CCTV / Intelligence Network Background Visual */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        {/* Vector Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#26313D25_1px,transparent_1px),linear-gradient(to_bottom,#26313D25_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F14]/70 to-[#0B0F14]" />

        {/* Surveillance Grid Lines and Map Silhouette */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          preserveAspectRatio="none"
          viewBox="0 0 1200 800"
        >
          <path
            d="M 100 200 L 400 350 L 800 250 L 1100 450"
            stroke="#2DD4FF"
            strokeWidth="1"
            strokeDasharray="4 8"
            fill="none"
          />
          <path
            d="M 200 600 L 600 450 L 950 620"
            stroke="#2DD4FF"
            strokeWidth="0.8"
            strokeDasharray="6 6"
            fill="none"
          />
          <circle cx="400" cy="350" r="4" fill="#2DD4FF" />
          <circle cx="800" cy="250" r="4" fill="#2DD4FF" />
          <circle cx="600" cy="450" r="4" fill="#22C55E" />
          <circle cx="400" cy="350" r="24" stroke="#2DD4FF" strokeWidth="0.5" fill="none" opacity="0.4" />
          <circle cx="800" cy="250" r="32" stroke="#2DD4FF" strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>

        {/* Telemetry Corner Accents */}
        <div className="absolute top-6 left-6 text-[10px] font-mono text-[#64748B] flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[#2DD4FF] animate-pulse" />
          <span>NETRAX SECURE ENCLAVE NODE • PORT: 8443</span>
        </div>
        <div className="absolute top-6 right-6 text-[10px] font-mono text-[#64748B]">
          SYS CLOCK: 2026.09.18 • 23:34:00 UTC
        </div>
        <div className="absolute bottom-6 left-6 text-[10px] font-mono text-[#64748B]">
          ENC: AES-256-GCM • SHA-384
        </div>
        <div className="absolute bottom-6 right-6 text-[10px] font-mono text-[#64748B]">
          TERMINAL: SEC-12-STATION-04
        </div>
      </div>

      {/* Top Header Placeholder */}
      <div className="h-16 px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-[#151D26] border border-[#2DD4FF]/40 flex items-center justify-center shadow-[0_0_12px_rgba(45,212,255,0.12)]">
            <Shield className="w-4 h-4 text-[#2DD4FF]" />
          </div>
          <span className="font-mono font-bold tracking-widest text-[15px] text-[#F8FAFC]">
            NETRA<span className="text-[#2DD4FF]">X</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[11px] font-mono text-[#94A3B8]">SURVEILLANCE GRID READY</span>
        </div>
      </div>

      {/* Main Login Card Centered Container */}
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-[420px] rounded-[12px] bg-[#111820] border border-[#26313D] shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-8 relative overflow-hidden backdrop-blur-md">
          {/* Subtle Top Cyan Glow Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#2DD4FF]" />

          {/* Wordmark and Tagline */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-[10px] bg-[#151D26] border border-[#26313D] text-[#2DD4FF] shadow-[0_0_20px_rgba(45,212,255,0.15)] mb-2">
              <Shield className="w-7 h-7 text-[#2DD4FF]" />
            </div>

            <h1 className="text-[26px] font-mono font-bold tracking-wider text-[#F8FAFC]">
              NETRA<span className="text-[#2DD4FF]">X</span>
            </h1>

            <p className="text-[13px] text-[#94A3B8] font-medium tracking-normal">
              AI-Powered Investigation & Surveillance
            </p>
          </div>

          {/* Quick Demo Fill Helper */}
          <div className="mb-6 p-2.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <Fingerprint className="w-3.5 h-3.5 text-[#2DD4FF]" />
              <span>TEST CREDENTIAL:</span>
              <span className="text-[#F8FAFC] font-semibold">INV-7492</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[#2DD4FF] hover:underline cursor-pointer font-bold"
            >
              Fill Demo
            </button>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-[6px] bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[12px] font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Officer ID Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="officer-id"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
              >
                Officer ID / Badge Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-[#64748B] pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="officer-id"
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. INV-7492"
                  className="w-full h-11 pl-10 pr-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[13px] font-mono placeholder-[#64748B] focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
                >
                  Password / Passphrase
                </label>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-[#64748B] pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security key"
                  className="w-full h-11 pl-10 pr-10 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[13px] font-mono placeholder-[#64748B] focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#64748B] hover:text-[#F8FAFC] transition-colors p-1 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                    rememberMe
                      ? 'bg-[#2DD4FF] border-[#2DD4FF] text-[#0B0F14]'
                      : 'border-[#26313D] bg-[#0F151C]'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-[12px] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[12px] font-mono text-[#2DD4FF] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full justify-center text-[14px] font-medium"
                rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
              >
                Secure Login
              </Button>
            </div>
          </form>

          {/* Card Internal Telemetry Notice */}
          <div className="mt-6 pt-4 border-t border-[#26313D] flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#64748B]">
            <Cctv className="w-3.5 h-3.5 text-[#2DD4FF]" />
            <span>SESSION MONITORED & AUDITED</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <footer className="h-14 px-8 flex items-center justify-between text-[11px] font-mono text-[#64748B] z-10 border-t border-[#26313D]/40 bg-[#0B0F14]/80">
        <div>Secure Investigation Environment</div>
        <div className="hidden sm:block">AUTHORIZED ACCESS ONLY • LAW ENFORCEMENT PROTOCOL 10.4</div>
      </footer>

      {/* Forgot Password Dialog */}
      {showForgotModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-[3px]"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[10px] bg-[#151D26] border border-[#26313D] p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-[#2DD4FF]">
              <KeyRound className="w-5 h-5" />
              <h3 className="text-[15px] font-semibold text-[#F8FAFC]">Security Enclave Reset</h3>
            </div>
            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
              Tactical credentials are hard-keyed to precinct hardware security tokens. To request a credential re-keying or RSA token reissue, please contact Sector 12 Dispatch Operations directly via encrypted radio or internal dispatch extension #409.
            </p>
            <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[11px] font-mono text-[#64748B]">
              DISPATCH CONTACT: dispatch@netrax.sector12.gov • SECURE RADIO CH-4
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="secondary" size="sm" onClick={() => setShowForgotModal(false)}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
