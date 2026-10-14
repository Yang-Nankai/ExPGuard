(function($) {
        let requestRowCount = 0;
        let responseRowCount = 0;
        const Access_Control_Allow_Origin = 'Access-Control-Allow-Origin';
        const Access_Control_Allow_Methods = 'Access-Control-Allow-Methods';
        const Access_Control_Allow_Headers = 'Access-Control-Allow-Headers';
        const Access_Control_Allow_Credentials = 'Access-Control-Allow-Credentials';
        // Create new request row
        function createNewRequestRow(key, value, id) {
            requestRowCount++;
            return $(`
              <div class="request-row row mt-4 position-relative" ${id && id.length > 0 ? `id="${id}"` : ''}>
                <div class="col-6">
                  <label class="position-absolute bottom-10 start-10 translate-middle-y ms-3"
                    style="z-index: 1000;" for="request-input-field-${requestRowCount}">Key</label>
                  <div class="input-group">
                    <input class="form-control shadow-none in36 request-input-field" id="request-input-field-${requestRowCount}" type="text" aria-label="Field"
                      placeholder="Enter your key here..." ${key && key.length > 0 ? `value="${key}"` : ''}>
                    <button class="btn btn-outline-watch-card dropdown-toggle shadow-none" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false"></button>
                    <ul class="dropdown-menu dropdown-menu-end" style="background-color: #27292C; color: #858895; z-index: 9999;">
                      <li><a class="dropdown-item dropdown-request-item" href="#">Referer</a></li>
                      <li><a class="dropdown-item dropdown-request-item" href="#">Origin</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-6">
                  <label class="position-absolute bottom-10 start-10 translate-middle-y ms-3" for="request-input-value-${requestRowCount}">Value</label>
                  <div class="position-absolute translate-middle-y remove-request">
                    <a class="remove-request-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" fill="#B3ABB9" />
                        <path
                          d="M12 2.25317C6.62391 2.25317 2.25 6.62708 2.25 12.0032C2.25 17.3793 6.62391 21.7532 12 21.7532C17.3761 21.7532 21.75 17.3793 21.75 12.0032C21.75 6.62708 17.3761 2.25317 12 2.25317ZM15.5302 14.473C15.6027 14.542 15.6608 14.6248 15.7008 14.7165C15.7409 14.8082 15.7622 14.9071 15.7635 15.0072C15.7648 15.1073 15.746 15.2066 15.7083 15.2993C15.6706 15.3921 15.6147 15.4763 15.5439 15.5471C15.4731 15.6179 15.3889 15.6738 15.2962 15.7115C15.2034 15.7492 15.1041 15.768 15.004 15.7667C14.9039 15.7654 14.805 15.7441 14.7133 15.704C14.6216 15.6639 14.5388 15.6059 14.4698 15.5333L12 13.064L9.53016 15.5333C9.38836 15.668 9.19955 15.742 9.00398 15.7395C8.80841 15.737 8.62155 15.6582 8.48325 15.5199C8.34495 15.3816 8.26614 15.1948 8.26364 14.9992C8.26114 14.8036 8.33513 14.6148 8.46984 14.473L10.9392 12.0032L8.46984 9.53333C8.33513 9.39153 8.26114 9.20272 8.26364 9.00715C8.26614 8.81158 8.34495 8.62472 8.48325 8.48642C8.62155 8.34812 8.80841 8.26932 9.00398 8.26681C9.19955 8.26431 9.38836 8.3383 9.53016 8.47302L12 10.9424L14.4698 8.47302C14.6116 8.3383 14.8005 8.26431 14.996 8.26681C15.1916 8.26932 15.3785 8.34812 15.5168 8.48642C15.6551 8.62472 15.7339 8.81158 15.7364 9.00715C15.7389 9.20272 15.6649 9.39153 15.5302 9.53333L13.0608 12.0032L15.5302 14.473Z"
                          fill="#F3F1F9" />
                      </svg>
                    </a>
                  </div>
                  <input class="form-control shadow-none request-input-value" id="request-input-value-${requestRowCount}" type="text"
                    placeholder="Enter your value here..." ${value && value.length > 0 ? `value="${value}"` : ''}>
                </div>
              </div>
            `);
  }

  // Create new response row
  function createNewResponseRow(key, value, id) {
    responseRowCount++;
    return $(`
            <div class="response-row row mt-4 position-relative" ${id && id.length > 0 ? `id="${id}"` : ''}>
              <div class="col-6">
                <label class="position-absolute bottom-10 start-10 translate-middle-y ms-3"
                  style="z-index: 1000;" for="response-input-field-${responseRowCount}">Key</label>
                <div class="input-group">
                  <input class="form-control shadow-none in36 response-input-field" id="response-input-field-${responseRowCount}" type="text" aria-label="Field"
                    placeholder="Enter your key here..." ${key && key.length > 0 ? `value="${key}"` : ''}>
                  <button class="btn btn-outline-watch-card dropdown-toggle shadow-none" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false"></button>
                  <ul class="dropdown-menu dropdown-menu-end" style="background-color: #27292C; color: #858895; z-index: 9999;">
                    <li><a class="dropdown-item dropdown-response-item" href="#">${Access_Control_Allow_Origin}</a></li>
                    <li><a class="dropdown-item dropdown-response-item" href="#">${Access_Control_Allow_Methods}</a></li>
                    <li><a class="dropdown-item dropdown-response-item" href="#">${Access_Control_Allow_Headers}</a></li>
                    <li><a class="dropdown-item dropdown-response-item" href="#">${Access_Control_Allow_Credentials}</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-6">
                <label class="position-absolute bottom-10 start-10 translate-middle-y ms-3" for="response-input-value-${responseRowCount}">Value</label>
                <div class="position-absolute translate-middle-y remove-response">
                  <a class="remove-response-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8" fill="#B3ABB9" />
                      <path
                        d="M12 2.25317C6.62391 2.25317 2.25 6.62708 2.25 12.0032C2.25 17.3793 6.62391 21.7532 12 21.7532C17.3761 21.7532 21.75 17.3793 21.75 12.0032C21.75 6.62708 17.3761 2.25317 12 2.25317ZM15.5302 14.473C15.6027 14.542 15.6608 14.6248 15.7008 14.7165C15.7409 14.8082 15.7622 14.9071 15.7635 15.0072C15.7648 15.1073 15.746 15.2066 15.7083 15.2993C15.6706 15.3921 15.6147 15.4763 15.5439 15.5471C15.4731 15.6179 15.3889 15.6738 15.2962 15.7115C15.2034 15.7492 15.1041 15.768 15.004 15.7667C14.9039 15.7654 14.805 15.7441 14.7133 15.704C14.6216 15.6639 14.5388 15.6059 14.4698 15.5333L12 13.064L9.53016 15.5333C9.38836 15.668 9.19955 15.742 9.00398 15.7395C8.80841 15.737 8.62155 15.6582 8.48325 15.5199C8.34495 15.3816 8.26614 15.1948 8.26364 14.9992C8.26114 14.8036 8.33513 14.6148 8.46984 14.473L10.9392 12.0032L8.46984 9.53333C8.33513 9.39153 8.26114 9.20272 8.26364 9.00715C8.26614 8.81158 8.34495 8.62472 8.48325 8.48642C8.62155 8.34812 8.80841 8.26932 9.00398 8.26681C9.19955 8.26431 9.38836 8.3383 9.53016 8.47302L12 10.9424L14.4698 8.47302C14.6116 8.3383 14.8005 8.26431 14.996 8.26681C15.1916 8.26932 15.3785 8.34812 15.5168 8.48642C15.6551 8.62472 15.7339 8.81158 15.7364 9.00715C15.7389 9.20272 15.6649 9.39153 15.5302 9.53333L13.0608 12.0032L15.5302 14.473Z"
                        fill="#F3F1F9" />
                    </svg>
                  </a>
                </div>
                <input class="form-control shadow-none response-input-value" id="response-input-value-${responseRowCount}" type="text"
                  placeholder="Enter your value here..." ${value && value.length > 0 ? `value="${value}"` : ''}>
              </div>
            </div>
            `);
  }

  // Add initial request & response row
  $(document).ready(function () {
    chrome.storage.local.get(['linkValue', 'queryParamsString', 'linkSubtitle'], function(items) {
      let isUnblockCorsButtonAppended = false;
      if (items.linkValue) {
          $('#link-input').val(items.linkValue);
      }
      if (items.linkSubtitle) {
        $('#subtitles-input').val(items.linkSubtitle);
      }
      if (items.queryParamsString) {
          let queryParams = items.queryParamsString.split('&');
          queryParams.forEach(function(param) {
              let [key, value] = param.split('=');
              key = decodeURIComponent(key);
              value = decodeURIComponent(value);
              if (key.startsWith('req__')) {
                $("#origin-header").remove()
                $("#referer-header").remove()
                const origin = createNewRequestRow('Origin', value, 'origin-header').addClass("mt-4");
                const referer = createNewRequestRow('Referer', value, 'referer-header').addClass("mt-4");
                $("#request-rows").append(origin).append(referer)
              } 
              else if (key.startsWith('res__')) {
                if (!isUnblockCorsButtonAppended) {
                  $('#unblock-cors').addClass("recommend-button-active").prop('disabled', true);
                  $('#unblock-cors').closest('.recommend-button-container').append(recommendUnblockCORSCloseButton);
                  isUnblockCorsButtonAppended = true;
                }
                const allowOrigin = createNewResponseRow(key.substring(5), value, key.substring(5).toLocaleLowerCase()).addClass("mt-4")
                $("#response-rows").append(allowOrigin)
              }
        });
      } else {
        const initialReqRow = createNewRequestRow(null, null, 'default-request-row');
        const initialResRow = createNewResponseRow(null, null, 'default-response-row');
        $("#request-rows").append(initialReqRow);
        $("#response-rows").append(initialResRow);
      }
      updateButtonState();
    });
    $linkInput.trigger("input");
    $linkInput.on("input", updateButtonState);
  });

  // Advanced Features animation
  $(".advanced-features").click(function () {
    $(this).toggleClass('active');
    $(".advanced-content").slideToggle("fast");
  });

  // Set value from dropdown for request header field
  $(document).on('click', '.dropdown-menu .dropdown-request-item', function (e) {
    e.preventDefault();
    var rowNumber = $(this).closest('.request-row').index();
    $(`#request-input-field-${rowNumber + 1}`).val($(this).text());
  });

  // Set value from dropdown for response header field
  $(document).on('click', '.dropdown-menu .dropdown-response-item', function (e) {
    e.preventDefault();
    var rowNumber = $(this).closest('.response-row').index();
    $(`#response-input-field-${rowNumber + 1}`).val($(this).text());
  });

  // Add new request header
  $("#add-request-button").click(function () {
    const newRow = createNewRequestRow();
    newRow.addClass("mt-4");
    $("#request-rows").append(newRow);
  });
  
  // Add new response header
  $("#add-response-button").click(function () {
    const newRow = createNewResponseRow();
    newRow.addClass("mt-4");
    $("#response-rows").append(newRow);
  });

  // Remove target request header
  $("#request-rows").on("click", ".remove-request-button", function () {
    $(this).closest(".request-row").remove();
  });
  
  // Remove target response header
  $("#response-rows").on("click", ".remove-response-button", function () {
    $(this).closest(".response-row").remove();
  });

  const recommendSetRefererOriginCloseButton = `
  <button class="close-recommend-button" id="close-set-referer-origin">
    <img src="/images/close.svg" alt="Close">
  </button>`

  const urlInputForRefererOrigin = `
  <div class="col-lg-10 col-9">
    <label class="position-absolute bottom-10 start-10 translate-middle-y ms-3" for="origin-referer-input">URL cho Origin & Referer</label>
    <input class="form-control shadow-none" id="origin-referer-input" type="text" placeholder="Nhập giá trị trường của bạn tại đây">
  </div>
  <div class="col-lg-2 col-3">
    <button type="submit" id="submit-origin-referer-url" class="submit-button" style="background-color: rgb(64, 47, 187); color: rgb(255, 255, 255);">Gửi</button>
  </div>
  `

  // Click set referer & origin button handler
  $('#set-referer-origin').click(function (e) {
    e.preventDefault();
    $(this).prop('disabled', true)
    $(this).closest('.recommend-button-container').append(recommendSetRefererOriginCloseButton)
    $(this).addClass("recommend-button-active")
    $('#origin-referer-input-box').addClass('mt-4 row').append(urlInputForRefererOrigin)
  })

  // Submit origin & referer handler
  $('#origin-referer-input-box').on('click', '#submit-origin-referer-url', function (e) {
    e.preventDefault();
    const urlValue = $('#origin-referer-input').val();
    $("#origin-header").remove()
    $("#referer-header").remove()
    const origin = createNewRequestRow('Origin', urlValue, 'origin-header').addClass("mt-4");
    const referer = createNewRequestRow('Referer', urlValue, 'referer-header').addClass("mt-4");
    $("#default-request-row").remove();
    $("#request-rows").append(origin).append(referer)
  })

  // Close set referer & origin handler
  $('.recommend-button-container').on('click', '#close-set-referer-origin', function (e) {
    e.preventDefault();
    $(this).remove();
    $('#set-referer-origin').removeClass("recommend-button-active").prop('disabled', false)
    $('#origin-referer-input-box').empty()
    $('#origin-header').remove()
    $('#referer-header').remove()
    $('#origin-referer-input-box').removeClass('mt-4 row');
  })

  const recommendUnblockCORSCloseButton =`
    <button class="close-recommend-button" id="close-unblock-cors">
      <img src="/images/close.svg" alt="Close">
    </button>`;

  // Unblock cors button handler
  $('#unblock-cors').click(function (e) {
    e.preventDefault();
    $(this).prop('disabled', true);
    $(this).closest('.recommend-button-container').append(recommendUnblockCORSCloseButton)
    $(this).addClass("recommend-button-active")
    $("#default-response-row").remove()
    const allowOrigin = createNewResponseRow(Access_Control_Allow_Origin, '*', Access_Control_Allow_Origin.toLocaleLowerCase()).addClass("mt-4")
    const allowMethods = createNewResponseRow(Access_Control_Allow_Methods, '*', Access_Control_Allow_Methods.toLocaleLowerCase()).addClass("mt-4")
    const allowHeaders = createNewResponseRow(Access_Control_Allow_Headers, '*', Access_Control_Allow_Headers.toLocaleLowerCase()).addClass("mt-4")
    const allowCredentials = createNewResponseRow(Access_Control_Allow_Credentials, 'true', Access_Control_Allow_Credentials.toLocaleLowerCase()).addClass("mt-4")
    $("#response-rows").append(allowOrigin).append(allowMethods).append(allowHeaders).append(allowCredentials);
  })

  // Close unblock cors handler
  $('.recommend-button-container').on('click', '#close-unblock-cors', function (e) {
    e.preventDefault();
    $(this).remove()
    $('#unblock-cors').removeClass("recommend-button-active").prop('disabled', false)
    $(`#${Access_Control_Allow_Origin.toLocaleLowerCase()}`).remove();
    $(`#${Access_Control_Allow_Methods.toLocaleLowerCase()}`).remove();
    $(`#${Access_Control_Allow_Headers.toLocaleLowerCase()}`).remove();
    $(`#${Access_Control_Allow_Credentials.toLocaleLowerCase()}`).remove();
    const initialResRow = createNewResponseRow(null, null, 'default-response-row');
    $("#response-rows").append(initialResRow);
  })

  function updateButtonState() {
    const hasValue = $linkInput.val().length > 0;
    $submitButton.prop("disabled", !hasValue);
    $submitButton.css({
      backgroundColor: hasValue ? "#402FBB" : "#F3F1F9",
      color: hasValue ? "#FFF" : "#867F8D",
    });
  }
  // Watch button's state based on link input
  const $linkInput = $("#link-input");
  const $submitButton = $(".watch-button");
  function updateButtonState() {
    const hasValue = $linkInput.val().length > 0;
    $submitButton.prop("disabled", !hasValue);
    $submitButton.css({
      backgroundColor: hasValue ? "#402FBB" : "#F3F1F9",
      color: hasValue ? "#FFF" : "#867F8D",
    });
  }
  $linkInput.on("input", updateButtonState).trigger("input");

  // Watch button handler
  $('.watch-button').click(function (e) {
    e.preventDefault();

    const linkValue = $('#link-input').val();
    const subtitleValue = $('#subtitles-input').val();
    const queryParams = [];

    $('#request-rows .request-row').each(function () {
      const field = $(this).find('.request-input-field').val();
      const value = $(this).find('.request-input-value').val();
      if (field && value) {
        queryParams.push(`req__${encodeURIComponent(field)}` + '=' + encodeURIComponent(value));
      }
    }); 
    
    $('#response-rows .response-row').each(function () {
      const field = $(this).find('.response-input-field').val();
      const value = $(this).find('.response-input-value').val();
      if (field && value) {
        queryParams.push(`res__${encodeURIComponent(field)}` + '=' + encodeURIComponent(value));
      }
    });
    let queryParamsString = queryParams.join('&');
    chrome.storage.local.set({ 'linkValue': linkValue, 'queryParamsString': queryParamsString, 'linkSubtitle' : subtitleValue }, function() {
      console.log('Settings saved');
    });
    window.location.href = '/pages/player.html?link=' + encodeURIComponent(linkValue) + '&' + queryParams.join('&');
    if(subtitleValue) {
      window.location.href = '/pages/player.html?link=' + encodeURIComponent(linkValue) + '&' + queryParams.join('&') + '&subtitle=' + encodeURIComponent(subtitleValue);    
    }
  });
})(jQuery);