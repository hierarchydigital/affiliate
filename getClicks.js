// getClicks.js
import { db } from './firebaseConfig.js'; // Ensure you're importing db from firebaseConfig.js

// Function to retrieve click count for a specific affiliate ID
async function getClickCount(affiliateId) {
    const affiliateRef = doc(db, 'affiliateLinks', affiliateId);

    try {
        const doc = await affiliateRef.get();
        if (doc.exists) {
            const clickCount = doc.data().clickCount || 0; // Default to 0 if undefined
            document.getElementById("click-count-display").textContent = `Total Clicks: ${clickCount}`;
        } else {
            document.getElementById("click-count-display").textContent = "Total Clicks: 0";
        }
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
