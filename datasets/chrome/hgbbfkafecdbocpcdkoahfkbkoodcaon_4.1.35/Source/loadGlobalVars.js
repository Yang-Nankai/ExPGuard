// Add rollbar config:
window._rollbarConfig = {
  accessToken: "2767022d7d494ec4963f814cd7fde85b",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: "production",
  },
  // TODO: potentially remove the logging so we can investigate where the cause is by looking at surrounding logs.
  // autoInstrument: {
  //   log: false,
  // },
};
