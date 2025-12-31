// src/data/users.js

import {
  getAllUsers,
  getUsersByRole,
  updateUser,
  deleteUser,
  getCurrentUser,
} from '../utils/storage';

/**
 * Get user statistics
 */
export const getUserStats = () => {
  const users = getAllUsers();
  
  return {
    total: users.length,
    patients: users.filter(u => u.role === 'patient').length,
    doctors: users.filter(u => u.role === 'doctor').length,
    admins: users.filter(u => u.role === 'admin').length,
    recentSignups: users.filter(u => {
      const signupDate = new Date(u.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return signupDate > weekAgo;
    }).length,
  };
};

/**
 * Get all patients
 */
export const getAllPatients = () => {
  return getUsersByRole('patient');
};

/**
 * Get all doctors
 */
export const getAllDoctors = () => {
  return getUsersByRole('doctor');
};

/**
 * Get all administrators
 */
export const getAllAdmins = () => {
  return getUsersByRole('admin');
};

/**
 * Get user profile
 */
export const getUserProfile = (userId) => {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;
  
  // Return user without password
  const { password, ...profile } = user;
  return profile;
};

/**
 * Update user profile
 */
export const updateUserProfile = (userId, profileData) => {
  // Remove sensitive fields that shouldn't be updated this way
  const { password, id, createdAt, ...updateData } = profileData;
  
  return updateUser(userId, updateData);
};

/**
 * Change user password
 */
export const changePassword = (userId, oldPassword, newPassword) => {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  if (user.password !== oldPassword) {
    return { success: false, error: 'Current password is incorrect' };
  }
  
  if (newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters' };
  }
  
  return updateUser(userId, { password: newPassword });
};

/**
 * Delete user account
 */
export const deleteUserAccount = (userId) => {
  return deleteUser(userId);
};

/**
 * Search users by username
 */
export const searchUsers = (searchTerm) => {
  const users = getAllUsers();
  const term = searchTerm.toLowerCase();
  
  return users
    .filter(u => u.username.toLowerCase().includes(term))
    .map(({ password, ...user }) => user);
};

/**
 * Get recent users
 */
export const getRecentUsers = (limit = 10) => {
  const users = getAllUsers();
  
  return users
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
    .map(({ password, ...user }) => user);
};

/**
 * Get active users (logged in recently)
 */
export const getActiveUsers = (daysAgo = 7) => {
  const users = getAllUsers();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
  
  return users
    .filter(u => u.lastLogin && new Date(u.lastLogin) > cutoffDate)
    .map(({ password, ...user }) => user);
};

/**
 * Validate username availability
 */
export const isUsernameAvailable = (username) => {
  const users = getAllUsers();
  return !users.some(u => u.username.toLowerCase() === username.toLowerCase());
};

/**
 * Get user by ID
 */
export const getUserById = (userId) => {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;
  
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Bulk operations for admin
 */
export const bulkDeleteUsers = (userIds) => {
  const results = {
    success: [],
    failed: [],
  };
  
  userIds.forEach(id => {
    const result = deleteUser(id);
    if (result.success) {
      results.success.push(id);
    } else {
      results.failed.push({ id, error: result.error });
    }
  });
  
  return results;
};

/**
 * Export user data for a specific user
 */
export const exportUserData = (userId) => {
  const user = getUserById(userId);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  return {
    success: true,
    data: {
      user,
      exportedAt: new Date().toISOString(),
    },
  };
};