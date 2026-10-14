(async () => {
    const module = await import("./flightsContent.js");
    await module.onImportFinished();
  })();