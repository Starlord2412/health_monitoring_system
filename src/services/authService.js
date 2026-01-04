// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { ref, set, get, update } from "firebase/database"; // [web:35]
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
    return `Dr. ${username}`;
  }
  return username;
};

/**
 * Register a new user
 */
export const register = async (userData) => {
  try {
    if (!userData.username || !userData.password || !userData.role) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Local storage duplicate check
    const existingUser = getUserByUsername(userData.username);
    if (existingUser) {
      return {
        success: false,
        error: "Username already taken",
      };
    }

    const email = `${userData.username}@healthtrack.demo`;

    // Firebase Auth: create user
    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      userData.password
    );
    const uid = cred.user.uid;

    const displayName = roleToDisplayName(userData.role, userData.username);

    // Set displayName
    await updateProfile(cred.user, {
      displayName,
    });

    // Realtime Database: users/{uid}
    await set(ref(db, `users/${uid}`), {
      uid,
      username: userData.username,
      email,
      role: userData.role,
      displayName,
      createdAt: Date.now(),
    }); // [web:74][web:87]

    // If patient: patients/{uid}
    if (userData.role === "patient") {
      await set(ref(db, `patients/${uid}`), {
        uid,
        name: userData.username,
        email,
        assignedDoctorId: null,
        assignedDoctorName: null,
        createdAt: Date.now(),
        // NEW: default details block
        details: {
          firstName: "",
          lastName: "",
          age: null,
          lastVisit: "",
          primaryCondition: "stable",
        },
      });
    }

    // Local storage
    const result = saveUser({
      username: userData.username,
      password: userData.password,
      role: userData.role,
      uid,
      displayName,
    });

    if (result.success) {
      return {
        success: true,
        message: "Account created successfully",
        user: {
          ...result.user,
          uid,
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
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Realtime DB: users/{uid}
    const snap = await get(ref(db, `users/${uid}`));
    if (!snap.exists()) {
      return {
        success: false,
        error: "User profile not found in database",
      };
    }

    const dbUser = snap.val();

    await update(ref(db, `users/${uid}`), {
      lastLogin: Date.now(),
    });

    // localStorage validation (existing logic)
    const result = validateCredentials(username, password);
    if (!result.success) {
      return {
        success: false,
        error: result.error || "Invalid credentials",
      };
    }

    const mergedUser = {
      ...result.user,
      ...dbUser,
      uid,
      displayName: cred.user.displayName || dbUser.displayName,
    };

    setCurrentUser(mergedUser);

    return {
      success: true,
      message: "Login successful",
      user: mergedUser,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during login",
    };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
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
