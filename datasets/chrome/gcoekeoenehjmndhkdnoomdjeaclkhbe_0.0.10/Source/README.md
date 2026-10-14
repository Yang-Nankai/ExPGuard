# Nearpod for Classroom extension
Option on Google Classroom to create assignments by launching the user's Nearpod library lessons.
Important note: do not confuse this with the Nearpod addon, that's another repo.

This repo contains an assets folder with all icons used in the app, a scripts folder that contains service-worker and content files, both needed for the extension to work. On service-worker we can find methods to start the application, to create an assignment and the setup of global variables. On content file there’s the i-frame that is built inside the modal and the declaration of every action needed to interact with it.

## Manifest upgrade and technical details
If you are trying to update the manifest version first check the Google official documentation for it, there usually is a step by step guide. Here you can find what was done for the last migration:
- [Nearpod Google Classroom Extension](https://illuminate.atlassian.net/wiki/spaces/ID/pages/17723556044/Google+Classroom+Extension)
- [Nearpod Google Classroom Extension Updates](https://illuminate.atlassian.net/wiki/spaces/TECH/pages/17641767257/Google+Chrome+Extension+updates)
