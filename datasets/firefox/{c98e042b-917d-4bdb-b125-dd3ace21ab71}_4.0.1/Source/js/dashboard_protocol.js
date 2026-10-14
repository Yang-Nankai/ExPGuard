"use strict";

const DashboardPort = Object.freeze({
  DASHBOARD: "dashboard",
  TOOLBAR: "toolbar"
});

const DashboardCommand = Object.freeze({
  REFRESH: "refresh",
  REFRESH_ACCOUNT: "refreshAccount",
  OPEN_ACCOUNT: "openAccount",
  OPEN_FOLDER: "openFolder",
  OPEN_MESSAGE: "openMessage",
  MAIL_ACTION: "mailAction",
  OPEN_OPTIONS: "openOptions",
  OPEN_HELP: "openHelp"
});

const DashboardEvent = Object.freeze({
  DATA: "data",
  LOADING: "loading",
  COMMAND_RESULT: "commandResult"
});

const MailAction = Object.freeze({
  READ: "read",
  DELETE: "del",
  SPAM: "spam"
});

const MailActionExecutor = Object.freeze({
  STATIC: "static",
  HANDLER: "handler"
});
