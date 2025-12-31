// src/utils/storage.js

const STORAGE_KEYS = {
  USERS: 'healthtrack_users',
  CURRENT_USER: 'healthtrack_current_user',
};

/**
 * Get all users from storage
 */
export const getAllUsers = () => {
  try {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

/**
 * Save a new user to storage
 */
export const saveUser = (userData) => {
  try {
    const users = getAllUsers();
    
    // Check if username already exists
    const userExists = users.some(user => user.username === userData.username);
    if (userExists) {
      throw new Error('Username already exists');
    }

    // Create user object with timestamp and unique ID
    const newUser = {
      id: generateUserId(),
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error saving user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user by username
 */
export const getUserByUsername = (username) => {
  const users = getAllUsers();
  return users.find(user => user.username === username);
};

/**
 * Validate user credentials
 */
export const validateCredentials = (username, password) => {
  const user = getUserByUsername(username);
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  if (user.password !== password) {
    return { success: false, error: 'Incorrect password' };
  }
  
  return { success: true, user };
};

/**
 * Set current logged-in user
 */
export const setCurrentUser = (user) => {
  try {
    // Update last login time
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex].lastLogin = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    // Save current user (without password for security)
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    
    return true;
  } catch (error) {
    console.error('Error setting current user:', error);
    return false;
  }
};

/**
 * Get current logged-in user
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Logout current user
 */
export const logout = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

/**
 * Update user data
 */
export const updateUser = (userId, updatedData) => {
  try {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Update current user if it's the same user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const { password, ...userWithoutPassword } = users[userIndex];
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    }

    return { success: true, user: users[userIndex] };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete user
 */
export const deleteUser = (userId) => {
  try {
    const users = getAllUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
    
    // Logout if deleting current user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      logout();
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Clear all data (for testing/reset)
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

/**
 * Generate unique user ID
 */
const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get users by role
 */
export const getUsersByRole = (role) => {
  const users = getAllUsers();
  return users.filter(user => user.role === role);
};

/**
 * Export all data (for backup)
 */
export const exportData = () => {
  return {
    users: getAllUsers(),
    exportedAt: new Date().toISOString(),
  };
};

/**
 * Import data (for restore)
 */
export const importData = (data) => {
  try {
    if (data.users && Array.isArray(data.users)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data.users));
      return { success: true };
    }
    throw new Error('Invalid data format');
  } catch (error) {
    console.error('Error importing data:', error);
    return { success: false, error: error.message };
  }
};