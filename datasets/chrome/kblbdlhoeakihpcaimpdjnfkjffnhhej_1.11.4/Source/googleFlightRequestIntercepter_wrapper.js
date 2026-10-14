(async () => {
    const module = await import("./googleFlightRequestIntercepter.js");
    await module.onImportFinished();
  })();