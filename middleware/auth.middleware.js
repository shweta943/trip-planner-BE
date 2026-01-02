/**
 * Middleware to authenticate requests using Firebase ID tokens.
 */
import admin from 'firebase-admin';

export const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized user' })
        }

        const token = header.split('Bearer ')[1].trim();

        // Verify the token using Firebase Admin SDK for server-side verification
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
        };
    } catch (error) {
        console.error('Auth verification failed:', error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
    next(); // Proceed to the next middleware or route handler
};