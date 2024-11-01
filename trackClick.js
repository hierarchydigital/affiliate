// trackClick.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db } from './firebaseConfig.js'; // Import db

// Function to track clicks for an affiliate
export async function trackClick(affiliateId) {
    const affiliateRef = doc(db, 'affiliateLinks', affiliateId);

    try {
        const docSnap = await getDoc(affiliateRef);
        if (docSnap.exists()) {
            // Increment the click count
            await updateDoc(affiliateRef, {
                clickCount: increment(1)
            });
            console.log('Click counted for affiliate ID:', affiliateId);
        } else {
            // Create the document if it doesn't exist
            await setDoc(affiliateRef, {
                clickCount: 1
            });
            console.log('New affiliate created with ID:', affiliateId);
        }
    } catch (error) {
        console.error("Error tracking click: ", error);
    }
}

// Function to parse affiliate ID from URL and track click
function handleAffiliateClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateId = urlParams.get('affiliateId');

    // If affiliateId exists, track the click
    if (affiliateId) {
        trackClick(affiliateId);
    }
}

// Run the function when the page loads
window.onload = handleAffiliateClick;
