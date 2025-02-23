// popup.js

document.getElementById("startApply").addEventListener("click", () => {
    const keywords = document.getElementById("keywords").value.trim();
    const location = document.getElementById("location").value.trim();
    const experience = document.getElementById("experience").value;

    if (!keywords || !location) {
        alert("Please enter both keywords and location.");
        return;
    }

    chrome.runtime.sendMessage({
        action: "startApplying",
        keywords,
        location,
        experience
    }, (response) => {
        if (response && response.status) {
            alert(response.status);
        } else {
            console.error("No response from background.js");
        }
    });
});
