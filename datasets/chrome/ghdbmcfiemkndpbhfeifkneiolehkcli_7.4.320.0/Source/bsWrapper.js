// Copyright ©2022 FUJIFILM Healthcare Americas Corporation. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic, mechanical or otherwise, is prohibited without the prior written consent of the copyright owner.
// Filename: bsWrapper.js

try {
    importScripts("bsNativeMessage.js", "bsWindowManagement.js");
} catch (e) {
    console.log("Import of background scripts failed");
}