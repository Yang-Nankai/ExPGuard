// Holds the functionality to observe the candidate not visible alert in the proctoring tab

var urlChecker;
var oldValue = '-91px';

const setupObserver = () => {

  clearInterval(urlChecker);

  try {

    const targetNode = document.getElementById('userPositionCheck');

    const config = { attributes: true };

    const callback = function(mutationsList, observer) {
      for(const mutation of mutationsList) {

        if (mutation.type !== 'attributes') {
          return;
        }

        if (mutation.attributeName !== 'style') {
          return;
        }

        let newValue = targetNode.style.top;

        if (oldValue === newValue) {
          return;
        }
        
        if (newValue === '0px') {
          oldValue = '0px';
          chrome.runtime.sendMessage({ message: CANDIDATE_NOT_VISIBLE });
          console.log('%c'+CANDIDATE_NOT_VISIBLE_ERROR_MESSAGE, 'font-size:20px;color:red;');
        } else {
          oldValue = newValue;
          chrome.runtime.sendMessage({ message: CANDIDATE_VISIBLE });
          console.log('%cCandidate Visible!', 'font-size:20px;color:blue;');
        }

      }
    };    

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

  } catch (error) {
    console.log('Funtionality already added!', 'font-size:30px;color:red;');
  }
  
}

urlChecker = setInterval(()=>{
  if (PROCTORING_TEST_TAB_URL_EXPRESSION.test(window.location.href)) {
    setupObserver();
  }
}, 2000);