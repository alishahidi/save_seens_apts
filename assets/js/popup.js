$(document).ready(() => {
  $("#add-save").on("click", () => {
    browser.runtime.sendMessage({ type: "saveSeenPart" });
  });
});
