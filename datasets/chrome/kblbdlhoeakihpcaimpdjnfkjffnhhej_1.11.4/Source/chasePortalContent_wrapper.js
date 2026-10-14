(async () => {
    const module = await import("./chasePortalContent.js");
    await module.onImportFinished();
  })();