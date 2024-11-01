// trackClick.js
import { db } from './firebaseConfig.js';
import { doc, getDoc, updateDoc, increment, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Function to track clicks for an affiliate
async function trackClick(affiliateId) {
    const affiliateRef = doc(db, 'affiliateLinks', affiliateId);

    try {
        const docSnap = await getDoc(affiliateRef);
        if (docSnap.exists()) {
            await updateDoc(affiliateRef, {
                clickCount: increment(1)
            });
            console.log('Click counted for affiliate ID:', affiliateId);
        } else {
            await setDoc(affiliateRef, {
                clickCount: 1
            });
            console.log('New affiliate created with ID:', affiliateId);
        }
    } catch (error) {
        console.error("Error tracking click:", error);
    }
}

// Function to parse affiliate ID from URL and track click
function handleAffiliateClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateId = urlParams.get('affiliateId');

    if (affiliateId) {
        trackClick(affiliateId);
    }
}

// Run the function when the page loads
window.onload = handleAffiliateClick;
