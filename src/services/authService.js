// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import {
  saveUser,
  validateCredentials,
  setCurrentUser,
  getCurrentUser,
  logout as logoutUser,
  getUserByUsername,
} from "../utils/storage";

// Helper: map role -> displayName prefix (for doctors)
const roleToDisplayName = (role, username) => {
  if (role === "doctor") {
    // doctor ka displayName jo patients me assignedDoctor se match kare
    // e.g. username "Smith" => "Dr. Smith"
    return `Dr. ${username}`;
  }
  return username;
};

/**
 * Register a new user
 * - Firebase Auth pe account banata hai (email = username@example.com)
 * - displayName set karta hai (specially doctors ke liye "Dr. {username}")
 * - Local storage me bhi user save karta hai (tumhara purana flow)
 */
export const register = async (userData) => {
  try {
    if (!userData.username || !userData.password || !userData.role) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Local storage duplicate check as before
    const existingUser = getUserByUsername(userData.username);
    if (existingUser) {
      return {
        success: false,
        error: "Username already taken",
      };
    }

    // Email bana lete hain from username (demo ke liye)
    const email = `${userData.username}@healthtrack.demo`;

    // Firebase Auth: create user
    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      userData.password
    ); // [web:74]

    const displayName = roleToDisplayName(userData.role, userData.username);

    // Set displayName (important for doctor->patients match)
    await updateProfile(cred.user, {
      displayName,
    }); // [web:70][web:68]

    // Local storage me bhi user save (role ke saath)
    const result = saveUser({
      username: userData.username,
      password: userData.password,
      role: userData.role,
      uid: cred.user.uid,
      displayName,
    });

    if (result.success) {
      return {
        success: true,
        message: "Account created successfully",
        user: {
          ...result.user,
          uid: cred.user.uid,
          displayName,
        },
      };
    }

    return {
      success: false,
      error: result.error || "Failed to create account",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during registration",
    };
  }
};

/**
 * Login user
 * - Firebase Auth se login
 * - local storage ke user record se role leke navigation decide
 */
export const login = async (username, password) => {
  try {
    if (!username || !password) {
      return {
        success: false,
        error: "Username and password are required",
      };
    }

    const email = `${username}@healthtrack.demo`;

    // Firebase Auth login
    const cred = await signInWithEmailAndPassword(auth, email, password); // [web:74]

    // Local storage credentials validate karo (role wagaira ke liye)
    const result = validateCredentials(username, password);

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Invalid credentials",
      };
    }

    // current user state local storage me
    setCurrentUser({
      ...result.user,
      uid: cred.user.uid,
      displayName: cred.user.displayName,
    });

    return {
      success: true,
      message: "Login successful",
      user: {
        ...result.user,
        uid: cred.user.uid,
        displayName: cred.user.displayName,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during login",
    };
  }
};

/**
 * Logout current user (Firebase + local storage)
 */
export const logout = async () => {
  try {
    await signOut(auth); // [web:27]
    logoutUser();
    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: "An error occurred during logout",
    };
  }
};

export const getAuthenticatedUser = () => {
  return getCurrentUser();
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

export const hasAnyRole = (roles) => {
  const user = getCurrentUser();
  return user && roles.includes(user.role);
};
