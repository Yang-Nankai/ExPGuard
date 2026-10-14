const preventWindowClosing = () => {

  window.onbeforeunload = function(e) {
    e.preventDefault();
    return '';
  }

}

preventWindowClosing();