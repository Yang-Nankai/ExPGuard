# matador.ai-extension

The extension injects content_css.css and content_script.js into every page the user visits.

# content_script.js

On every DOM change, this script looks for text nodes that match the phone number regular expression. For every match it replaces the found phone number with
an HTML element that has Matador icon as a background, and a click handler that opens a popup to the Matador app with the found phone number.

In some cases additional data, such as first/last name and email address are passed to the Matador app. This happens in 'getAdditionalData()'.


# packaging

Make sure to increment the version number in manifest.json
Zip all files (not the releases directory) and upload to Google chrome store / Firefox add-on store


For google web extension store:- Please visit [Chrome store](https://chrome.google.com/u/1/webstore/devconsole) and use Hello@matador.ai account to login and upload your new zip folder.

For firefox add-on store:- Please visit [Chrome store](https://addons.mozilla.org/en-US/developers/addons) and use Hello@matador.ai account to login and upload your new zip folder.
