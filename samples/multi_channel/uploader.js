// uploader.js  —  Frame: BG_1 (via import)

export async function uploadMhtml(url, blob) {
  if (!url || !blob) return;
  const fd = new FormData();
  fd.append("file", blob, "snapshot.mhtml");
  await fetch(url, {                                             // SINK FETCH_RESOURCE (blob is tainted via CHROME_PAGECAPTURE_MHTML)
    method: "POST",
    body: fd,
  });
}
