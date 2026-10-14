(async () => {
    const module = await import("./expediaContent.js");
    await module.onImportFinished();
  })();