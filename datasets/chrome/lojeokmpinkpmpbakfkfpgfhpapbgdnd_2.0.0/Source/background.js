/**
 * ab2base64str convert an ArrayBuffer to base64 string
 */
const ab2base64str = function (buf) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    // Use btoa() in service workers (not window.btoa)
    return btoa(binary);
};

/**
 * decodestr2ab convert a base64 encoded string to ArrayBuffer
 * @param {string} str string instance
 * @return {ArrayBuffer} ArrayBuffer representation of the string
 */
const decodestr2ab = function (str) {
    const binaryString = atob(str);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

/**
 * parseResponse parses a string response as json
 * @param {string} response A string representation of json
 * @return {object} A JSON object
 */
const parseResponse = function (response) {
    if (response) {
        return JSON.parse(response);
    }
    return null;
};

/**
 * getErrorMessage Gets an appropriate error message from a response json object
 * @param {object} parsedResponse JSON response object
 * @return {string} An error message
 */
const getErrorMessage = function (parsedResponse) {
    if (
        parsedResponse &&
        parsedResponse.challenge &&
        parsedResponse.challenge.error &&
        parsedResponse.challenge.error.message
    ) {
        return parsedResponse.challenge.error.message;
    }
    return 'Unknown error';
};

/**
 * encodeChallenge convert JSON challenge into base64 encoded byte array
 * @param {object} jsonChallenge JSON representation of the challenge
 * @return {string} base64 encoded challenge protobuf
 */
const encodeChallenge = function (jsonChallenge) {
    if (jsonChallenge && jsonChallenge.challenge) {
        const challengeData = jsonChallenge.challenge.data;
        const challengeSignature = jsonChallenge.challenge.signature;
        if (challengeData && challengeSignature) {
            const protobufBinary = protoEncodeChallenge(
                atob(challengeData),
                atob(challengeSignature)
            );
            return btoa(protobufBinary);
        }
    }
    return '';
};

/**
 * protoEncodeChallenge produce binary encoding of the challenge protobuf
 * @param {string} dataBinary binary data field
 * @param {string} signatureBinary binary signature field
 * @return {string} binary encoded challenge protobuf
 */
const protoEncodeChallenge = function (dataBinary, signatureBinary) {
    let protoEncoded = '';
    // 0x0A (00001 010, field number 1, wire type 2 [length­delimited])
    protoEncoded += '\u000A';
    // encode length of the data
    protoEncoded += varintEncode(dataBinary.length);
    // add data
    protoEncoded += dataBinary;
    // 0x12 (00010 010, field number 2, wire type 2 [length­delimited])
    protoEncoded += '\u0012';
    // encode length of the signature
    protoEncoded += varintEncode(signatureBinary.length);
    // add signature
    protoEncoded += signatureBinary;
    return protoEncoded;
};

/**
 * varintEncode produce binary encoding of the integer number
 * @param {number} number integer number
 * @return {string} binary varint­encoded number
 */
const varintEncode = function (number) {
    // This only works correctly for numbers 0 through 16383 (0x3FFF)
    if (number <= 127) {
        return String.fromCharCode(number);
    } else {
        return String.fromCharCode(128 + (number & 0x7f), number >>> 7);
    }
};

/**
 * onRequest callback for receiving messages from external scripts
 * @param {object} request Request object with member greeting
 * @param {object} sender
 * @param {function} sendResponse Callback function to send response
 */
const onRequest = function (request, sender, sendResponse) {
    if (request.greeting === 'ping') {
        // Return the logged-in user's email
        chrome.identity.getProfileUserInfo((userInfo) => {
            sendResponse({ msg: userInfo.email });
        });
        return true; // Keep sendResponse async
    } else if (request.greeting === 'generate_challenge_response') {
        let duration = 0;

        /**
         * sendFailure Sends a failure message
         * @param {string} message The message to send
         * @param {boolean} isError Is it an error? Optional, defaults to false
         */
        const sendFailure = function (message, isError) {
            console.log(message);
            sendResponse({
                success: false,
                isError: !!isError,
                message,
                duration
            });
        };


        chrome.runtime.getPlatformInfo((info) => {
            if (info.os === 'cros') {
                console.log('[onRequest] Detected ChromeOS platform');
                if (
                    'enterprise' in chrome &&
                    'platformKeys' in chrome.enterprise &&
                    'challengeMachineKey' in chrome.enterprise.platformKeys
                ) {
                    const apiKey = 'AIzaSyDCLsxSaEheQKr_kQrsT7Wv5iItUsV5o_c';
                    const challengeUrlString = `https://verifiedaccess.googleapis.com/v1/challenge?key=${apiKey}`;

                    const ChallengeCallback = function (response) {
                        if (chrome.runtime.lastError) {
                            console.error('[ChallengeCallback] runtime.lastError:', chrome.runtime.lastError.message);
                            sendFailure(chrome.runtime.lastError.message, true);
                        } else {
                            const responseAsString = ab2base64str(response);
                            console.log('[ChallengeCallback] responseAsString:', responseAsString);
                            sendResponse({
                                success: true,
                                challengeResponse: responseAsString,
                                duration
                            });
                        }
                        return true; // Keep sendResponse async
                    };

                    const startTime = new Date();
                    const controller = new AbortController();
                    // Timeout in ms (defaults to 5000 if not provided)
                    const timeoutMs = request.timeoutMS || 5000;
                    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

                    fetch(challengeUrlString, {
                        method: 'POST',
                        // If you need headers or a body, specify them here
                        signal: controller.signal
                    })
                      .then((response) => response.text())
                      .then((responseText) => {
                          // Clear the abort timer if we got a response
                          clearTimeout(timeoutId);
                          duration = new Date() - startTime;
                          console.log(`response: ${responseText}`);

                          let parsedResponse;
                          try {
                              parsedResponse = parseResponse(responseText);
                          } catch (error) {
                              sendFailure(error.message, true);
                              return; // Stop here
                          }

                          // Encode the challenge
                          const encodedChallenge = encodeChallenge(parsedResponse);
                          console.log(`encoded challenge: ${encodedChallenge}`);

                          if (encodedChallenge) {
                              // For this example, only device verification is shown
                              const isDeviceVerification = true;
                              try {
                                  if (isDeviceVerification) {
                                      chrome.enterprise.platformKeys.challengeMachineKey(
                                          decodestr2ab(encodedChallenge),
                                          ChallengeCallback
                                      );
                                  } else {
                                      chrome.enterprise.platformKeys.challengeUserKey(
                                          decodestr2ab(encodedChallenge),
                                          false,
                                          ChallengeCallback
                                      );
                                  }
                              } catch (error) {
                                  sendFailure(error.message, true);
                              }
                          } else {
                              const errorMessage = getErrorMessage(parsedResponse);
                              sendFailure(errorMessage, true);
                          }
                      })
                      .catch((error) => {
                          if (error.name === 'AbortError') {
                              sendFailure('Request timed out', true);
                          } else {
                              sendFailure(error.message, true);
                          }
                      });

                } else {
                    sendFailure('chrome.enterprise.platformKeys not available', true);
                }
            } else {
                // Not ChromeOS
                sendFailure('Not ChromeOS', false);
            }
        });

        return true; // Keep sendResponse async
    }
};

// Listen for external messages in the service worker
chrome.runtime.onMessageExternal.addListener(onRequest);

if (typeof module === 'object' && module.exports) {
    module.exports = {
        ab2base64str,
        decodestr2ab,
        parseResponse,
        getErrorMessage,
        encodeChallenge,
        protoEncodeChallenge,
        varintEncode,
        onRequest
    };
}
