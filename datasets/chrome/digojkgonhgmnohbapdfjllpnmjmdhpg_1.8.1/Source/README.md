ProctorExam Extension for Chrome
================================

This extension allows you to share your browsing activity when taking an online exam on ProctorExam.

The [manifest.json][manifest] is set to let this plugin work only in
conjunction with `*.proctorexam.com` pages, the extension won't work with any
other website.

[manifest]: https://developer.chrome.com/extensions/manifest

## Setup

To build the extension use:

    yarn build

To run the browser with the extension (for testing), use:

    yarn start

This should also auto-reload the extension as you rebuild changes.

## Testing in development

To test the extension in development, you can load the extension in Chrome by running `yarn start`. The next step is running procwise with the modified exam-takers-web-components by using the following url parameter:

    ?wise_branch=*your-branch-name*

## Version bump

When bumping a version make sure to update the manifest file but also include the new version string constant in the background-script.js.

## Browser Support

Google Chrome (version 88+) only.

## License

This is a variation of [the extension][mkext] created by [Muaz Khan][mkgh] with
some tweaks to make it more suitable for use with the ProctorExam API. It also
publishes events to the ProctorExam tab when tabs are opened, updated or closed
in order to track the browsing behaviour of a user during an exam.

It is derived from the [OpenTok plugin][ot]

Released under the [MIT license][license].

[ot]: http://tokbox.com/opentok/libraries/client/js/
[mkext]: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/Chrome-Extensions/desktopCapture
[mkgh]: https://github.com/muaz-khan
[license]: http://opensource.org/licenses/MIT
