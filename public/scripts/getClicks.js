// getClicks.js
import { db } from './firebaseConfig.js'; // Make sure to import db from your firebaseConfig

// Function to retrieve click count for a specific affiliate ID
async function getClickCount(affiliateId) {
    const affiliateRef = db.collection('affiliateLinks').doc(affiliateId);
    
    try {
        const doc = await affiliateRef.get();
        const clickCount = doc.exists ? doc.data().clickCount : 0;
        document.getElementById("click-count-display").textContent = `Total Clicks: ${clickCount}`;
    } catch (error) {
        console.error("Error fetching click count: ", error);
    }
}

// Function to get affiliate ID from URL and call getClickCount
function displayClickCount() {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateId = urlParams.get('affiliateId');

    if (affiliateId) {
        getClickCount(affiliateId);
    }
}

// Run the function when the page loads
window.onload = displayClickCount;
