console.log(`"Pokernow Extension v${chrome.runtime.getManifest().version}"`);

async function startExtension() {
    const bigBlindValue = getBigBlindValue();
  console.log("Big Blind Value:", bigBlindValue);
  updateStats(`Big Blind Value: ${bigBlindValue}`);
}

// Function to get the big blind value
function getBigBlindValue() {
  return document.querySelectorAll(".blind-value .chips-value")[1].textContent ?? "N/A";
}

// Inject a container for the stats in every class under "seats", skipping the first class
function injectStatsContainer() {
  const seats = document.querySelectorAll('.seats > div'); // Select all direct children of the "seats" class
  seats.forEach((seat, index) => {
    if (index === 0) return; // Skip the first class
    const container = document.createElement('div');
    container.id = `pokernow-stats-container-${index}`;
    container.style.position = 'relative';
    container.style.backgroundColor = 'white';
    container.style.border = '1px solid black';
    container.style.padding = '10px';
    container.style.zIndex = '1000';
    seat.prepend(container); // Inject on top of the existing container
  });
}

// Update the stats in the container
function updateStats(stats: string) {
  const containers = document.querySelectorAll('[id^="pokernow-stats-container-"]');
  containers.forEach(container => {
    if (container) {
      container.innerHTML = stats;
    }
  });
}

// Inject the stats container when the content script is loaded
injectStatsContainer();

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
    console.log("Message Received:", message);
    switch (message) {
        case "Enable":
            console.log("Extension Enabled");
            startExtension();
            break;
    }
});