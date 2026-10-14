// load amchart script
// "lib/amcharts/index.js",
// "lib/amcharts/xy.js",
// "lib/amcharts/themes/Animated.js",

function loadAmChartsScript() {
  const scriptUrls = ["lib/amcharts/index.js", "lib/amcharts/xy.js", "lib/amcharts/themes/Animated.js"];

  for (const url of scriptUrls) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL(url);
    document.body.appendChild(script);
  }
}

// Load amCharts script when the document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAmChartsScript);
} else {
  loadAmChartsScript();
}
