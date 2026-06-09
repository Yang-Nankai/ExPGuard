// signer.js  —  Frame: BG_1 (via import)
//
// Demonstrates the sanitizer path: when payload is digested with crypto.subtle,
// downstream sinks see an untainted hash. No flow should be reported here.

export async function signedFetch(endpoint, payload) {
  const data = new TextEncoder().encode(JSON.stringify(payload));
  // [Sanitiser] crypto.subtle.digest clears taint on `data`.
  const buf = await crypto.subtle.digest("SHA-256", data);
  const hashed = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // hashed is not tainted (sanitised) — fetch should NOT raise a flow.
  await fetch(endpoint + "?digest=" + hashed, { method: "POST" });

  return hashed;
}
