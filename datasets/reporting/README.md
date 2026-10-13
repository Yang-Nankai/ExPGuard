# Ground Truth reporting artifacts

This directory contains generated Markdown reports for all 161 same-version extension instances and updated-version Flows whose original source/sink pair was detected again by the revalidation run. Reports are placed in the email body; the Markdown files are also retained here as the auditable source. `developer-contacts.json` records only public or directly encoded contacts. `reporting-ledger.json` records delivery and Git status. `archive-index.json` records the 45 delisted instances and 131 old versions without duplicating large CRX/XPI or unpacked trees.

Updated-version entries with mixed tool outcomes or tool failures are clearly qualified in the report and require human review. New Flows in updated versions are out of scope. Narrative text generated with the DeepSeek ExPGuard Report Agent is recorded in each report's `agent-generation.json`; the Flow identifiers, code anchors, verification outcomes, and scope remain sourced from the dataset and analysis artifacts.

Email delivery is recipient-selected and capped at two messages per invocation by default. Only send further reports after the current test messages have been reviewed. SMTP credentials are read from environment variables or an interactive prompt and are never stored in this directory.
