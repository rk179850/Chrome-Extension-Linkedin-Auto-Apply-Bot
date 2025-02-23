chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background.js:", message);

    if (message.action === "startApplying") {
        const { keywords, location, experience } = message;

        console.log("Keywords:", keywords);
        console.log("Location:", location);
        console.log("Experience:", experience);

        applyToJobs(keywords, location, experience);
        sendResponse({ status: "Application process started!" });
    }
});


function applyToJobs(keywords, location, experience) {
    chrome.tabs.query({}, (tabs) => {
        console.log("All open tabs:", tabs);

        const linkedInTab = tabs.find(tab => tab.url && tab.url.includes("linkedin.com/jobs"));

        if (!linkedInTab) {
            console.error("LinkedIn jobs tab not found. Open: https://www.linkedin.com/jobs/");
            return;
        }

        console.log("Found LinkedIn tab:", linkedInTab.url);

        chrome.scripting.executeScript({
            target: { tabId: linkedInTab.id },
            func: automateApplication,
            args: [keywords, location, experience]
        }).then(() => {
            console.log("Script injected and executed successfully.");
        }).catch(err => {
            console.error("Script injection error:", err);
        });
    });
}


function automateApplication(keywords, location, experience) {
    console.log("Automating application with:", keywords, location, experience);

    
    const keywordInput = document.querySelector('input[placeholder="Search by title, skill, or company"], input[aria-label="Search by title, skill, or company"]');
    const locationInput = document.querySelector('input[placeholder="City, state, or zip code"], input[aria-label="City, state, or zip code"]');

    if (keywordInput) {
        keywordInput.value = keywords;
        console.log("Keywords entered.");
    } else {
        console.error("Keywords input not found.");
    }

    if (locationInput) {
        locationInput.value = location;
        console.log("Location entered.");
    } else {
        console.error("Location input not found.");
    }

    
    const searchButton = document.querySelector('button[aria-label="Search"], button[aria-label="Search Jobs"]');
    if (searchButton) {
        searchButton.click();
        console.log("Search button clicked.");
    } else {
        console.error("Search button not found.");
    }

    
    console.log("Document Body HTML:", document.body.innerHTML);
}

