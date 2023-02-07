browser.runtime.onMessage.addListener(function (message) {
  if (message.startSelection) {
    // Get the XPath of an element
    const getElementXPath = (element) => {
      if (element.id !== "") {
        return '//*[@id="' + element.id + '"]';
      } else if (element === document.body) {
        return element.tagName;
      }

      let ix = 0;
      const siblings = element.parentNode.childNodes;
      for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling === element) {
          return (
            getElementXPath(element.parentNode) +
            "/" +
            element.tagName +
            "[" +
            (ix + 1) +
            "]"
          );
        }
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
          ix++;
        }
      }
    };

    function add_save(event) {
      console.log(event);
      // Add an asterisk to the selected element
      event.target.innerHTML = " (seen*)" + event.target.innerHTML;

      // Store information about seen parts in local storage
      var part = {
        xpath: "/HTML/" + getElementXPath(event.target),
      };

      var seenParts = JSON.parse(localStorage.getItem("seenParts")) || [];
      seenParts.push(part);
      localStorage.setItem("seenParts", JSON.stringify(seenParts));
      document.removeEventListener("click", add_save);
    }
    document.addEventListener("click", add_save);
  }
});

var seenParts = JSON.parse(localStorage.getItem("seenParts")) || [];
console.log(seenParts);
seenParts.forEach(function (part) {
  const element = document.evaluate(
    part.xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  if (element) {
    element.innerHTML = " (seen*) " + element.innerHTML;
  }
});
