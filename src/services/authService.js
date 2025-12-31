// src/services/authService.js

import {
  saveUser,
  validateCredentials,
  setCurrentUser,
  getCurrentUser,
  logout as logoutUser,
  getUserByUsername,
} from '../utils/storage';

/**
 * Register a new user
 */
export const register = async (userData) => {
  try {
    // Validate input
    if (!userData.username || !userData.password || !userData.role) {
      return {
        success: false,
        error: 'All fields are required',
      };
    }

    // Check if user already exists
    const existingUser = getUserByUsername(userData.username);
    if (existingUser) {
      return {
        success: false,
        error: 'Username already taken',
      };
    }

    // Save user (password will be stored as-is for demo purposes)
    // In production, you should hash the password before storing
    const result = saveUser({
      username: userData.username,
      password: userData.password,
      role: userData.role,
    });

    if (result.success) {
      return {
        success: true,
        message: 'Account created successfully',
        user: result.user,
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to create account',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'An error occurred during registration',
    };
  }
};

/**
 * Login user
 */
export const login = async (username, password) => {
  try {
    // Validate input
    if (!username || !password) {
      return {
        success: false,
        error: 'Username and password are required',
      };
    }

    // Validate credentials
    const result = validateCredentials(username, password);
    
    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    // Set current user
    setCurrentUser(result.user);

    return {
      success: true,
      message: 'Login successful',
      user: result.user,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'An error occurred during login',
    };
  }
};

/**
 * Logout current user
 */
export const logout = () => {
  try {
    logoutUser();
    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: 'An error occurred during logout',
    };
  }
};

/**
 * Get current authenticated user
 */
export const getAuthenticatedUser = () => {
  return getCurrentUser();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

/**
 * Check if user has specific role
 */
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (roles) => {
  const user = getCurrentUser();
  return user && roles.includes(user.role);
};