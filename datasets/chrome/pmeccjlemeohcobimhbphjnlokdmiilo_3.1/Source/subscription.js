// subscription.js - Handles subscription status check on app load

document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Ensure the paywall object is available from wall.2.1.3.js
    if (typeof paywall === 'undefined') {
      console.error('Paywall is not defined. Make sure wall.2.1.3.js is loaded.');
      return;
    }

    const userInfo = await paywall.getUser();
    if (userInfo && userInfo.paid) {
      console.log('Premium user detected: Google OCR is enabled.');
      // Enable premium features here
    } else {
      console.log('Free user detected: Only Tesseract OCR is available.');
      // Optionally, attach event listener to premium feature buttons to open paywall
      document.querySelectorAll('.premium-feature').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await paywall.open({ resolveEvent: 'success-purchase' });
            // After successful purchase, enable premium feature
            console.log('Premium feature unlocked.');
          } catch (err) {
            switch (err.visibility_status_reason) {
              case 'closed-by-user':
                alert('Upgrade required for this feature.');
                break;
              case 'openings-trial':
              case 'time-trial':
                alert('Trial active: Upgrade for unlimited access.');
                break;
              default:
                alert('Please upgrade to access this feature.');
            }
          }
        });
      });
    }
  } catch (error) {
    console.error('Subscription check failed', error);
  }
});
