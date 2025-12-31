import { db } from '../services/firebaseSDK.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseSDK.js';
import { admin } from "firebase-admin";


/**
 * Register a new user
 * POST /api/auth/register
 * 
 * Request Body:
 * {
 *   "email": "user@example.com",
 *   "password": "password123",
 * }
 */
const register = async (req, res) => {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required',
            success: false,
            timestamp: new Date().toISOString()
        });
    }

    try {
        const newUser = await createUserWithEmailAndPassword(auth, email, password);

        const userData = {
            uid: newUser.user.uid,
            email: newUser.user.email,
            trips: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Store user data in Firestore
        await db.collection('users').doc(newUser.user.uid).set(userData);

        console.log(`✅ User document created in Firestore`);

        // Generate custom token to save in client side
        const token = await admin.auth().createCustomToken(newUser.user.uid);
        console.log("tokenAtRegister ==> ", token);

        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            timestamp: new Date().toISOString(),
            userId: newUser?.user?.uid,
            token: token
        });
    } catch (error) {
        console.error('Registration error:', error);

        // Handle specific Firebase errors

        switch (error.code) {
            case 'auth/email-already-in-use':
                return res.status(400).json({
                    error: 'Email is already in use',
                    success: false,
                    timestamp: new Date().toISOString()
                });
            case 'auth/invalid-email':
                return res.status(400).json({
                    error: 'Invalid email format',
                    success: false,
                    timestamp: new Date().toISOString()
                });
            case 'auth/weak-password':
                return res.status(400).json({
                    error: 'Password is too weak',
                    success: false,
                    timestamp: new Date().toISOString()
                });
            default:
                return res.status(500).json({
                    error: error.message || 'Internal server error',
                    success: false,
                    timestamp: new Date().toISOString()
                });
        }
    }
};

/**
 * Login user (verify credentials)
 * POST /api/auth/login
 * 
 * Note: Actual authentication is done on frontend using Firebase Client SDK
 * This endpoint is optional - used for additional server-side checks
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required',
            success: false,
            timestamp: new Date().toISOString()
        });
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Generate custom token to save in client side
        const newUser = userCredential;
        const token = await admin.auth().createCustomToken(newUser.user.uid);
        console.log("tokenAtLogin ==> ", token);
        return res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            timestamp: new Date().toISOString(),
            userId: userCredential?.user?.uid,
            token: token
        });
    } catch (error) {
        console.error('Login error:', error);

        // Handle specific Firebase errors
        switch (error.code) {
            case 'auth/user-not-found':
                return res.status(404).json({
                    error: 'User not found',
                    success: false,
                    timestamp: new Date().toISOString()
                });
            case 'auth/wrong-password':
                return res.status(401).json({
                    error: 'Incorrect password',
                    success: false,
                    timestamp: new Date().toISOString()
                });
            default:
                return res.status(500).json({
                    error: error.message || 'Internal server error',
                    success: false,
                    timestamp: new Date().toISOString()
                });
        }
    }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });

  } catch (error) {
    console.error('❌ Logout error:', error);
    next(error);
  }
};

export { register, login, logout };