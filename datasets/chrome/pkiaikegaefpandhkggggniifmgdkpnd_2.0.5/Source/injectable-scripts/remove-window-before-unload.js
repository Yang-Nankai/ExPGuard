const removeWindowBeforeUnload = () => {

  window.onbeforeunload = null;

}

removeWindowBeforeUnload();