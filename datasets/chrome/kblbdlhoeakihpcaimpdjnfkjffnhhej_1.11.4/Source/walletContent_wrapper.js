(async () => {
    const module = await import("./walletContent.js");
    await module.onImportFinished();
  })();