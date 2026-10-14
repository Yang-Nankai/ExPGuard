$(".palceholder").click(function () {
  $(this).siblings("input").focus();
});

$(".form-control").focus(function () {
  $(this).parent().addClass("focused");
});

$(".form-control").blur(function () {
  var $this = $(this);
  if ($this.val().length == 0) $(this).parent().removeClass("focused");
});
$(".form-control").blur();


$("#eye").click(function () {
  var state = $("#password").attr("type");
  if (state == "password") {
    $("#password").attr("type", "text");
    $("#eye").attr("src", "images/eye-off.png");
  } else {
    $("#password").attr("type", "password");
    $("#eye").attr("src", "images/eye-on.png");
  }
});

document.querySelector("form").addEventListener("submit", (event) => {
  document.querySelector(".logdiv").style.display = "none";
  document.querySelector(".loader").style.display = "block";
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username && password) {
    chrome.runtime.sendMessage(
      { message: "manualLogin", payload: { username, password } },
      function (response) {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { isEnable: "true" });
          }
        );
        if (response == "success") window.location.replace("./popup.html");

        if (response == "fail") {
          document.querySelector(".wrongpass").style.display = "block";
          document.querySelector(".logdiv").style.display = "flex";
          document.querySelector(".loader").style.display = "none";
          setTimeout(function () {
            document.querySelector(".wrongpass").style.display = "none";
          }, 3000);
        }
      }
    );
  } else {
    document.querySelector("#username").placeholder = "Enter a username.";
    document.querySelector("#password").placeholder = "Enter a password.";
    document.querySelector("#username").style.border = "2px solid red";
    document.querySelector("#password").style.border = "2px solid red";
    document.querySelector(".logdiv").style.display = "flex";
    document.querySelector(".loader").style.display = "none";
  }
});

const uniqueId = "amazon-analysis-" + chrome.runtime.id;

chrome.storage.local.get(uniqueId + "_isEnable", function (data) {
  if (
    data[uniqueId + "_isEnable"] === "true" ||
    data[uniqueId + "_isEnable"] === true ||
    data[uniqueId + "_isEnable"] === undefined
  ) {
    chrome.runtime.sendMessage(
      { message: "login", payload: {} },
      function (response) {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { isEnable: "true" });
          }
        );
        if (response == "success") window.location.replace("./popup.html");

        if (response == "fail") {
          document.querySelector(".logdiv").style.display = "flex";
          document.querySelector(".loader").style.display = "none";
        }
      }
    );
    $("#extension_status").prop("checked", true);
  }
});

$("#extension_status").change(function () {
  chrome.storage.local.set(
    {
      [uniqueId + "_isEnable"]: $(this).is(":checked"),
    },
    function () {
      if (chrome.runtime.lastError) {
        console.error("Error Storing 2: ", chrome.runtime.lastError.message);
      }
    }
  );
  if ($(this).is(":checked")) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { isEnable: "true" });
    });
  } else {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { isEnable: "false" });
    });
  }
});
