/**
 * Version Tracking System
 *
 * This file handles syncing events data to the web application.
 * It uses the 'queryVersion' stored with the events data to track
 * which extension version was used when the data was last queried from Steam.
 *
 * The events are sent as a raw array to the web application, where
 * the backend handles classification and processing.
 */

window.addEventListener("message", (event) => {
  // Verify message is from the same window/frame
  if (event.source !== window) {
    return;
  }
  // Verify origin matches current page origin for security
  const currentOrigin = window.location.origin;
  if (event.origin && event.origin !== currentOrigin) {
    return;
  }
  if (event.data && event.data.type === "get-pulls") {
    loadAndProcessData();
  }
});

function loadAndProcessData() {
  getEvents()
    .then((data) => {
      // Use the stored query version if available, otherwise default to 1.7.7
      const queryVersion = data?.queryVersion ?? "1.7.7";
      const events = data?.events ?? [];

      if (
        window.location.href.includes("/sync-data") ||
        window.location.href.includes("/stats")
      ) {
        window.postMessage(
          {
            events: events,
            version: queryVersion,
          },
          window.location.origin
        );
      }
    })
    .catch((error) => {
      console.error("Error loading events:", error);
      // Send empty events array to indicate no data available
      if (
        window.location.href.includes("/sync-data") ||
        window.location.href.includes("/stats")
      ) {
        window.postMessage(
          {
            events: [],
            version: "1.7.7",
          },
          window.location.origin
        );
      }
    });
}
