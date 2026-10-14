var crankWheelMessages = {};

if (typeof window != 'undefined' && !window.cwPresenterLang) {
    window.cwPresenterLang = 'en';
} else {
  // we are in another context such as the upload_worker
  if (!globalThis.cwPresenterLang) {
    globalThis.cwPresenterLang = 'en';
  }
}

// Retrieves the display version of the message keyed by key, in the current
// language. The display version is the one where all placeholders have been
// replaced by their defined content.
function cwGetDisplayMessage(key) {
    var messageObj = crankWheelMessages[cwPresenterLang][key];
    var text = messageObj["message"];
    if ("placeholders" in messageObj) {
        for (var phKey in messageObj["placeholders"]) {
            // Placeholders in the messages.json format are case-insensitive so
            // we need to lower-case both strings to compare, then to replace we
            // can use a case-sensitive replacement.
            var lowerMessageText = text.toLowerCase();
            var lowerKey = '$' + phKey.toLowerCase() + '$';
            var index = lowerMessageText.indexOf(lowerKey);
            if (index != -1) {
                var originalToReplace = text.substring(index, index + lowerKey.length);
                text = text.replace(originalToReplace, messageObj["placeholders"][phKey]["content"]);
            }
        }
    }
    return text;
}

// Retrieves a localizable message, and optionally makes replacements in it.
//
// Note that replacements are done on the display version of the message. For
// example, for a message defined as follows, providing replacements
// { "$1": "foo" } would yield "Hello foo" as the result, and providing
// (incorrect) replacements { "$USER$": "foo" } would simply yield "Hello, $1":
//
// {
//   "message": "Hello, $USER$",
//   "placeholders": {
//     "user": {
//       "content": "$1",
//       "example": "Joi"
//     }
//   }
// }
function cwMessage(key, replacements) {
    var message = cwGetDisplayMessage(key);
    if (replacements) {
        for (var key in replacements) {
            message = message.replace(key, replacements[key])
        }
    }
    return message;
}

// Unit test that can be invoked from the console.
function testCwJsMessagesFramework() {
    var prevMessages = crankWheelMessages;
    var prevLanguage = cwPresenterLang;

    crankWheelMessages = {
        "en": {
            "testmsg": {
                "message": "Hello, $USER$. Come back to $OUR_SITE$ soon!",
                "description": "Say goodbye to the user",
                "placeholders": {
                  "our_site": {
                    "content": "Example.com",
                  },
                  "user": {
                    "content": "$1",
                    "example": "Cira"
                  }
                }
            }
        }
    };
    cwPresenterLang = 'en';
    var displayMessage = cwGetDisplayMessage("testmsg")
    console.log(displayMessage);
    if (!displayMessage == "Hello, $1. Come back to Example.com soon!")
        console.log("Does not match.");
    var replacedMessage = cwMessage("testmsg", {"$1": "Joi"});
    console.log(replacedMessage);
    if (!replacedMessage == "Hello, Joi. Come back to Example.com soon!")
        console.log("Does not match.");

    crankWheelMessages = prevMessages;
    cwPresenterLang = prevLanguage;
}
crankWheelMessages["en"] = 
﻿{
  "manifestDescription": {
    "message": "Easier screen sharing. No app needed for viewers, even on their mobile. Record your screen or webcam."
  },
  "defaultBrowserActionMessage": {
    "message": "Start sharing things on your screen with your customer"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Start sharing this tab"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Unable to show options page while meeting is in progress."
  },
  "keyboardActionDescription": {
    "message": "Open the control panel"
  }
}
crankWheelMessages["de"] = 
﻿{
  "manifestDescription": {
    "message": "Nutzen Sie den Bildschirm einfacher gemeinsam. F\u00fcr Zuschauer ist keine App n\u00f6tig \u2013 nicht einmal auf Mobilger\u00e4ten."
  },
  "defaultBrowserActionMessage": {
    "message": "Beginnen Sie, Dinge mit Ihrem Kunden auf Ihrem Bildschirm zu teilen."
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Beginnen Sie, diesen Tab zu teilen."
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Die Seite mit den Optionen kann nicht angezeigt werden, solange das Meeting im Gange ist."
  },
  "keyboardActionDescription": {
    "message": "Das Kontroll-Panel \u00f6ffnen"
  }
}
crankWheelMessages["es"] = 
﻿{
  "manifestDescription": {
    "message": "Pantalla compartida con mayor facilidad. Los espectadores no necesitan ninguna aplicaci\u00f3n, ni siquiera en el m\u00f3vil."
  },
  "defaultBrowserActionMessage": {
    "message": "Comience a compartir cosas en su pantalla con su cliente"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Comience a compartir esta pesta\u00f1a"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "No se puede mostrar la p\u00e1gina de opciones mientras la reuni\u00f3n est\u00e1 en curso."
  },
  "keyboardActionDescription": {
    "message": "Abre el panel de control"
  }
}
crankWheelMessages["fi"] = 
﻿{
  "manifestDescription": {
    "message": "Helpompi ruudunjako. Katsojat eiv\u00e4t tarvitse sovellusta edes mobiililaitteella. Nauhoita n\u00e4ytt\u00f6si tai verkkokamerasi sy\u00f6te."
  },
  "defaultBrowserActionMessage": {
    "message": "Aloita n\u00e4ytt\u00f6si ja haluamasi asioiden jakaminen asiakkaan kanssa"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Aloita t\u00e4m\u00e4n v\u00e4lilehden jakaminen"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Asetussivua ei voida n\u00e4ytt\u00e4\u00e4, kun tapaaminen on kesken."
  },
  "keyboardActionDescription": {
    "message": "Avaa hallintapaneeli"
  }
}
crankWheelMessages["fr"] = 
﻿{
  "manifestDescription": {
    "message": "Partage d'\u00e9cran plus facile. Aucune application n'est n\u00e9cessaire pour les t\u00e9l\u00e9spectateurs, m\u00eame sur leur mobile."
  },
  "defaultBrowserActionMessage": {
    "message": "Commencez \u00e0 partager des \u00e9l\u00e9ments avec votre client sur votre \u00e9cran"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Commencez \u00e0 partager cet onglet"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Impossible d'afficher la page d'options tant que la r\u00e9union est en cours."
  },
  "keyboardActionDescription": {
    "message": "Ouvrir le panneau de configuration"
  }
}
crankWheelMessages["it"] = 
﻿{
  "manifestDescription": {
    "message": "Condivisione dello schermo pi\u00f9 semplice. Non \u00e8 richiesta alcuna app sui dispositivi di chi visualizza la chiamata."
  },
  "defaultBrowserActionMessage": {
    "message": "Inizia a condividere elementi sullo schermo con il tuo cliente"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Inizia a condividere questa scheda"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Impossibile mostrare la pagina delle opzioni mentre la riunione \u00e8 in corso."
  },
  "keyboardActionDescription": {
    "message": "Apri il pannello di controllo"
  }
}
crankWheelMessages["ja"] = 
﻿{
  "manifestDescription": {
    "message": "\u3088\u308a\u7c21\u5358\u306b\u753b\u9762\u5171\u6709\u3067\u304d\u307e\u3059\u3002 \u8996\u8074\u8005\u306f\u30e2\u30d0\u30a4\u30eb\u3067\u3042\u3063\u3066\u3082\u30a2\u30d7\u30ea\u306f\u5fc5\u8981\u3042\u308a\u307e\u305b\u3093\u3002 \u753b\u9762\u307e\u305f\u306f\u30a6\u30a7\u30d6\u30ab\u30e1\u30e9\u3092\u9332\u753b\u3067\u304d\u307e\u3059\u3002"
  },
  "defaultBrowserActionMessage": {
    "message": "\u3042\u306a\u305f\u306e\u753b\u9762\u4e0a\u306e\u3082\u306e\u3092\u9867\u5ba2\u3068\u5171\u6709\u3057\u59cb\u3081\u307e\u3059"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "\u3053\u306e\u30bf\u30d6\u306e\u5171\u6709\u3092\u958b\u59cb\u3057\u307e\u3059"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "\u30df\u30fc\u30c6\u30a3\u30f3\u30b0\u304c\u9032\u884c\u3057\u3066\u3044\u308b\u9593\u3001\u30aa\u30d7\u30b7\u30e7\u30f3\u30da\u30fc\u30b8\u3092\u8868\u793a\u3067\u304d\u307e\u305b\u3093\u3002"
  },
  "keyboardActionDescription": {
    "message": "\u30b3\u30f3\u30c8\u30ed\u30fc\u30eb\u30d1\u30cd\u30eb\u3092\u958b\u304f"
  }
}
crankWheelMessages["nl"] = 
﻿{
  "manifestDescription": {
    "message": "Makkelijker scherm delen. Geen app nodig voor kijkers, zelfs niet op hun mobiel. Neem je scherm of webcam op."
  },
  "defaultBrowserActionMessage": {
    "message": "Begin dingen op uw scherm te delen met uw klant"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Begin dit tabblad te delen"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Kan de optiepagina niet weergeven terwijl de vergadering bezig is."
  },
  "keyboardActionDescription": {
    "message": "Open het configuratiescherm"
  }
}
crankWheelMessages["no"] = 
﻿{
  "manifestDescription": {
    "message": "Enklere skjermdeling. Ikke behov for noen app for deltagere, selv p\u00e5 mobilen. Gj\u00f8r opptak av skjermen eller webkameraet."
  },
  "defaultBrowserActionMessage": {
    "message": "Start deling av ting p\u00e5 skjermen med kunden din"
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Start deling av denne fanen"
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Kan ikke vise siden med valg mens m\u00f8te p\u00e5g\u00e5r."
  },
  "keyboardActionDescription": {
    "message": "\u00c5pne kontrollpanelet"
  }
}
crankWheelMessages["pl"] = 
﻿{
  "manifestDescription": {
    "message": "\u0141atwiejsze udost\u0119pnianie ekranu. Widzowie nie potrzebuj\u0105 aplikacji, nawet na swoim telefonie kom\u00f3rkowym."
  },
  "defaultBrowserActionMessage": {
    "message": "Zacznij udost\u0119pnia\u0107 ekran klientowi."
  },
  "startSharingThisTabBrowserActionMessage": {
    "message": "Zacznij udost\u0119pnia\u0107 t\u0119 zak\u0142adk\u0119."
  },
  "cantShowOptionsWhenMeetingInProgress": {
    "message": "Pokazanie strony opcji nie jest mo\u017cliwe podczas spotkania."
  },
  "keyboardActionDescription": {
    "message": "Otw\u00f3rz panel sterowania"
  }
}
