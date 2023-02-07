browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "saveSeenPart") {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { startSelection: true });
      });
  }
});
