function reddenPage() {
  var videos = document.getElementsByTagName("video");
  for (var i = 0; i < videos.length; i++) {
    var videoElm = videos[i];
    var videoRect = videoElm.getBoundingClientRect();
    var allElems = document.getElementsByTagName("*");

    for (var j = 0; j < allElems.length; j++) {
      var element = allElems[j];

      if (element !== videoElm && !element.contains(videoElm)) {
        var elementRect = element.getBoundingClientRect();

        if (elementRect.width === videoRect.width && elementRect.height === videoRect.height && elementRect.left === videoRect.left && elementRect.top === videoRect.top) {
          videoElm.setAttribute("controls", true);
          element.style.pointerEvents = "none";
          element.style.opacity = "0.3";
          // if (element.style.pointerEvents !== "none") {
          // if (!videoElm.classList.contains("has-controls")) {
          // if (!videoElm.hasAttribute("controls") && element.style.pointerEvents !== "none") {
          //   // element.setAttribute("style", "pointer-events: all; opacity: 1;");
          // } else {
          //   videoElm.removeAttribute("controls");
          //   element.setAttribute("style", "pointer-events: none; opacity: 0.3;");
          //   // element.style.pointerEvents = null;
          //   // element.style.opacity = "1";
          // }
        }
      }
    }
  }
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage,
    });
  }
});
