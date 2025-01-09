function sendMessage(message: ChromeMessage, callback?: (response: any) => void) {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!;
        chrome.tabs.sendMessage(currentTabID, message, callback!);
    });
}

document.getElementById("Enable")?.addEventListener("click", () => {
    var port = chrome.runtime.connect({name: "popup"});
    port.postMessage("Enable");
});

document.getElementById("Disable")?.addEventListener("click", () => {
    sendMessage("Disable");
});
