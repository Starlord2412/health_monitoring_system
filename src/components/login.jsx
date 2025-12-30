import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
export default function LoginPage() {

  const navigate = useNavigate()
  const location = useLocation();
  const roleFromSignup = location.state?.role || "";


  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: roleFromSignup || '',

  });


  
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };





  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setIsLoggedIn(true);
      console.log('Login submitted:', { ...formData, rememberMe });
      console.log("successfully logged in", isLoggedIn)
      console.log("successfully logged in", submitted)
      setTimeout(() => {
        setFormData({
          username: '',
          password: '',
          role: roleFromSignup || '',
        });
      }, 1000);
    }
    
    else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (submitted) {
      const role = String(formData.role || roleFromSignup || '').toLowerCase();
      const target = role === 'doctor' ? '/doctor' : '/family';
      const timer = setTimeout(() => navigate(target, { replace: true }), 800);
      return () => clearTimeout(timer);
    }
  }, [submitted, formData.role, roleFromSignup, navigate]);






  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-teal-500 to-teal-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 rounded-full p-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">
            You've successfully logged in as <span className="font-semibold text-teal-600">{formData.username}</span>.
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-500 via-teal-400 to-cyan-500 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 opacity-20">
        <Heart size={40} className="text-white animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Heart size={60} className="text-white" />
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="text-teal-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">HealthTrack</h1>
          </div>
          <p className="text-gray-600 text-lg">Welcome Back</p>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${errors.username
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-300 focus:border-teal-500'
                }`}
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-12 ${errors.password
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-300 focus:border-teal-500'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-gray-300 text-teal-500 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700 font-medium">Remember me</span>
            </label>
            <button onClick={() => { }} className="text-sm text-teal-600 font-semibold hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-linear-to-r from-teal-500 to-teal-600 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mt-8"
          >
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-teal-500 hover:bg-gray-50 transition-all font-medium text-gray-700">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <button onClick={() => { }} className="text-teal-600 font-semibold hover:underline">
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}