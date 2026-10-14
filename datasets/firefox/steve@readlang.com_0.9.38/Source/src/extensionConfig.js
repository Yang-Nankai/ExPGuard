/* global globalThis */

// Build-time configuration for the extension.
//
// This is the ONLY extension source file rendered through Handlebars at build
// time (see `getExtensionTemplateData` in gulpfile.js). The three string
// placeholders below — env, port, gitCommit — are substituted based on the
// READLANG_ENV and PORT env vars. All other extension source files stay as
// plain JS / TS and read values from `globalThis.READLANG_EXTENSION_CONFIG`.

"use strict";

const env = "production"; // "local" | "test" | "production"
const port = ""; // e.g. "3011" for a worktree; empty targets http://localhost
const gitCommit = "";

const hostnamesByEnv = {
  local: port ? `localhost:${port}` : "localhost",
  test: "test.readlang.com",
  production: "readlang.com",
};

const hostname = hostnamesByEnv[env];
const origin = env === "local" ? `http://${hostname}` : `https://${hostname}`;

globalThis.READLANG_EXTENSION_CONFIG = {
  env,
  port,
  hostname,
  origin,
  // Always-available localhost origin (used by the content-script origin
  // allowlist, which mirrors the three host-permissions in the manifest).
  localhostOrigin: `http://localhost${port ? `:${port}` : ""}`,
  gitCommit,
};
