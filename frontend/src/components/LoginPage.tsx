import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Stethoscope, Shield, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  isDarkMode: boolean;
  isRTL: boolean;
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ isDarkMode, isRTL, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: isRTL ? 'أمان متقدم' : 'Advanced Security',
      description: isRTL ? 'تشفير من الدرجة الطبية' : 'Medical-grade encryption'
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: isRTL ? 'موثوق من قبل الأطباء' : 'Trusted by Doctors',
      description: isRTL ? 'يستخدمه أكثر من 10,000 طبيب' : 'Used by 10,000+ physicians'
    },
    {
      icon: <Stethoscope className="w-5 h-5" />,
      title: isRTL ? 'متوافق مع المعايير الطبية' : 'Healthcare Compliant',
      description: isRTL ? 'متوافق مع HIPAA و HL7' : 'HIPAA & HL7 compliant'
    }
  ];

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Left Side - Branding & Features */}
      <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900' : 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700'
      }`}>
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {isRTL ? 'مخطط المناوبات الطبية' : 'Medical Shift Planner'}
              </h1>
              <p className="text-sm text-white/70">
                {isRTL ? 'إدارة احترافية للمناوبات' : 'Professional Schedule Management'}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold leading-tight">
              {isRTL ? 'إدارة مناوبات طبية آمنة وفعّالة' : 'Secure & Efficient Medical Shift Management'}
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-all"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-white/60">
            {isRTL ? '© 2026 جميع الحقوق محفوظة' : '© 2026 All rights reserved'}
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <Stethoscope className="w-6 h-6" />
            </div>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'مخطط المناوبات الطبية' : 'Medical Shift Planner'}
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'مرحباً بعودتك' : 'Welcome Back'}
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'قم بتسجيل الدخول للوصول إلى لوحة التحكم' : 'Sign in to access your dashboard'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
              >
                {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Mail className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-lg border transition-all
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                    ${isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }
                  `}
                  placeholder={isRTL ? 'doctor@hospital.com' : 'doctor@hospital.com'}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
              >
                {isRTL ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Lock className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 rounded-lg border transition-all
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                    ${isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }
                  `}
                  placeholder={isRTL ? '••••••••' : '••••••••'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-slate-500 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDarkMode ? 'text-slate-500 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'تذكرني' : 'Remember me'}
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`
                w-full py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]
                ${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/50' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30'
                }
              `}
            >
              {isRTL ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className={`mt-6 p-4 rounded-lg ${
            isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-blue-50 border border-blue-100'
          }`}>
            <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {isRTL ? 'حساب تجريبي:' : 'Demo Account:'}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Email: demo@hospital.com
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
