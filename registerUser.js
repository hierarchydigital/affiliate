// registerUser.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from './firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore';

// Generate a random affiliate ID
const generateAffiliateID = () => Math.random().toString(36).substring(2, 10);

async function registerUser(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const affiliateID = generateAffiliateID();

        // Add user to Firestore with affiliate ID
        await setDoc(doc(db, 'users', user.uid), {
            username,
            email,
            affiliateID,
            createdAt: new Date()
        });

        console.log('User registered with affiliate ID:', affiliateID);
        return affiliateID;
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

// Example usage
// registerUser('test@example.com', 'password123', 'testuser');
