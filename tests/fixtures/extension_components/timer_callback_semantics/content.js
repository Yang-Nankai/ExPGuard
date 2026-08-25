window.addEventListener("message", (event) => {
  const payload = event.data;

  // The local name shadows the outer tainted `payload`. These are callback
  // registrations, not string-code execution.
  (function payload() {
    setTimeout(payload, 10);
    setInterval(payload, 10);
    eval(payload);
  })();

  // A minifier's one-letter local binding must shadow the outer tainted
  // `payload`.  These are also callable values, never code strings.
  {
    const a = () => {};
    setTimeout(a, 10);
    setInterval(a, 10);
    eval(a);
  }

  // These are genuine attacker-controlled string-code paths and must survive.
  setTimeout(event.data, 10);
  setInterval(event.data, 10);
  eval(event.data);
});
