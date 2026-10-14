(function () {
  if (window.matador) return;
  window.matador = {
    openConversation: (args) => {
      window.postMessage(
        {
          type: 'openConversation',
          functionName: 'openConversation',
          args: args,
        },
        window.location.origin
      );
    },
    toggleSidepanel: (args) => {
      window.postMessage(
        {
          type: 'toggleSidepanel',
          functionName: 'toggleSidepanel',
          args: args,
        },
        window.location.origin
      );
    },
  };
})();
