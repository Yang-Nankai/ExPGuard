(async () => {
    const module = await import("./directoContent.js");
    await module.onImportFinished();
  })();