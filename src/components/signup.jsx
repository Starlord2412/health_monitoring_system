// src/components/SignupPage.jsx

import React, { useState } from 'react';
import { Eye, EyeOff, Heart } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { register } from '../services/authService';

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: role || '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const roles = [
    { id: 'patient', label: 'Patient', description: 'Track your health' },
    { id: 'doctor', label: 'Doctor', description: 'Manage patient records' },
    { id: 'admin', label: 'Administrator', description: 'System management' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
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

  const handleRoleChange = (roleId) => {
    setFormData((prev) => ({
      ...prev,
      role: roleId,
    }));
    if (errors.role) {
      setErrors((prev) => ({
        ...prev,
        role: '',
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Register user using authService
        const result = await register({
          username: formData.username,
          password: formData.password,
          role: formData.role,
        });

        if (result.success) {
          setSubmitted(true);
          setSuccessMessage(result.message);
          
          console.log('User registered successfully:', result.user);
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate("/login", {
              state: {
                role: formData.role,
                username: formData.username,
                message: 'Account created successfully! Please login.',
              }
            });
          }, 2000);
        } else {
          // Show error from registration
          setErrors({
            submit: result.error || 'Registration failed',
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({
          submit: 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-2">
            Your account has been created successfully as a{' '}
            <span className="font-semibold text-teal-600">
              {roles.find(r => r.id === formData.role)?.label}
            </span>.
          </p>
          <p className="text-sm text-gray-500 mb-4">Username: <span className="font-semibold">{formData.username}</span></p>
          <p className="text-sm text-gray-500 animate-pulse">Redirecting to login page...</p>
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
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="text-teal-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">HealthTrack</h1>
          </div>
          <p className="text-gray-600 text-lg">Create Your Account</p>
        </div>

        {/* Error message for submit errors */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm flex items-center gap-2">
              <span>⚠️</span> {errors.submit}
            </p>
          </div>
        )}

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
              placeholder="Choose a username"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                errors.username
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-300 focus:border-teal-500'
              }`}
              disabled={isLoading}
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
                placeholder="Create a strong password"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-12 ${
                  errors.password
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-300 focus:border-teal-500'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-12 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-300 focus:border-teal-500'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Role Selection - Uncomment if needed */}
          {!role && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="space-y-2">
                {roles.map((roleOption) => (
                  <button
                    key={roleOption.id}
                    type="button"
                    onClick={() => handleRoleChange(roleOption.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      formData.role === roleOption.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-300 bg-white hover:border-teal-300'
                    }`}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.role === roleOption.id
                          ? 'border-teal-500 bg-teal-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.role === roleOption.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{roleOption.label}</p>
                        <p className="text-sm text-gray-600">{roleOption.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.role && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.role}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-linear-to-r from-teal-500 to-teal-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg mt-8 ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-teal-600 font-semibold hover:underline"
            disabled={isLoading}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}