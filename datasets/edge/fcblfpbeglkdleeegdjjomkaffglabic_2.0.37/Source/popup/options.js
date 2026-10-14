jQuery(function ($) {
  class MatadorExtensionOptions {
    constructor() {
      window.resizeBy(300, 80);
      this.defaultOptions = {
        eleadEnabled: true,
        egmEnabled: true,
        dealerSocketEnabled: true,
        dpEnabled: true,
        dealerCenterEnabled: true,
        dealerpeakEnabled: true,
        vinSolutionEnabled: true,
        vautodealersEnabled: true,
        vanillaSoftEnabled: true,
        xtimeEnabled: true,
        xencallEnabled: true,
        tmsEnabled: true,
        tekionEnabled: true,
        dealerCloudEnabled: true,
        autoAlertEnabled: true,
        autogatetEnabled: true,
        automotiveMasterMindEnabled: true,
        autoswatchEnabled: true,
        asnsoftwarecrmEnabled: true,
        activixEnabled: true,
        oneEightyEnabled: true,
        linkedinEnabled: true,
        momentumEnabled: true,
        idealautosyndicateEnabled: true,
        pipedriveEnabled: true,
        promaxEnabled: true,
        readymodeEnabled: true,
        zoomInfoEnabled: true,
        zohoEnabled: true,
        elogpsEnabled: true,
        fahrneyEnabled: true,
        highergearEnabled: true,
        hubspotEnabled: true,
        isMatadorAccountConnected: false,
        crmSuiteEnabled: true,
        carResearchEnabled: true,
        connectcdkEnabled: true,
        leaddriverEnabled: true,
        subaruEnabled: true,
        sellyEnabled: true,
        sm360Enabled: true,
        reynoldEnabled: true,
        onetoyotaEnabled: true,
        dealerstudioEnabled: true,
        d2cMediaEnabled: true,
        getmyautoEnabled: true,
        googleDocEnabled: true,
        driveCentricEnabled: true,
        carWarsEnabled: true,
        opLogicEnabled: true,
        repromptEnabled: true,
        goxeeEnabled: true,
        dealercarsearchEnabled: true,
        panelPosition: 'right',
        unreadButtonChecked: true,
        extensionType: 'full',
        extensionTypeManuallyChanged: false,
      };

      this.options = $.extend({}, this.defaultOptions);

      $(document).ready(() => this.onDomContentLoaded());

      $('#save').on('click', (e) => this.onButtonSaveClick(e));
      $('#reset').on('click', (e) => this.onResetButtonClick(e));
      // $('#loginBtn').on('click', (e) => this.onLoginButtonClick(e));

      this.initShowMore();

      setInterval(() => this.updateUiState(), 300);
    }

    initShowMore() {
      const $crmList = $('#crm-list .form-check');
      const $showMoreBtn = $('#show-more-btn');
      const totalItems = $crmList.length;
      let isExpanded = false;

      const updateList = () => {
        if (isExpanded) {
          $crmList.show();
          $showMoreBtn.text('Show less');
        } else {
          $crmList.hide();
          $crmList.slice(0, 5).show();
          $showMoreBtn.text(`Show all (${totalItems})`);
        }
      };

      $showMoreBtn.on('click', () => {
        isExpanded = !isExpanded;
        updateList();
      });

      // Initial state
      updateList();
    }

    objAsComparable(options) {
      return JSON.stringify(
        Object.entries(options).sort((a, b) => {
          return a[0].localeCompare(b[0]);
        })
      );
    }

    updateUiState() {
      // console.log("ui");
      let optionsDifferent =
        this.objAsComparable(this.options) !=
        this.objAsComparable(this.optionsFromUI());

      $('#save').toggleClass('btn-primary', optionsDifferent);
    }

    updateUIFromOptions() {
      $('#autoalertid').prop(
        'checked',
        this.options.autoAlertEnabled
      );
      $('#autogatetid').prop(
        'checked',
        this.options.autogatetEnabled
      );
      $('#automotivemastermindid').prop(
        'checked',
        this.options.automotiveMasterMindEnabled
      );
      $('#asnsoftwarecrmid').prop(
        'checked',
        this.options.asnsoftwarecrmEnabled
      );
      $('#autoswatchid').prop(
        'checked',
        this.options.autoswatchEnabled
      );
      $('#eleadsid').prop('checked', this.options.eleadEnabled);
      $('#egmid').prop('checked', this.options.egmEnabled);
      $('#dealersocketid').prop(
        'checked',
        this.options.dealerSocketEnabled
      );
      $('#dpid').prop('checked', this.options.dpEnabled);
      $('#dealerpeakid').prop(
        'checked',
        this.options.dealerpeakEnabled
      );
      $('#dealercenterid').prop(
        'checked',
        this.options.dealerCenterEnabled
      );
      $('#dealercarsearchid').prop(
        'checked',
        this.options.dealercarsearchEnabled
      );
      $('#dealercloudid').prop(
        'checked',
        this.options.dealerCloudEnabled
      );
      $('#vinsolutionid').prop(
        'checked',
        this.options.vinSolutionEnabled
      );
      $('#vautodealersid').prop(
        'checked',
        this.options.vautodealersEnabled
      );
      $('#vanillasoftid').prop(
        'checked',
        this.options.vanillaSoftEnabled
      );
      $('#xtimeid').prop('checked', this.options.xtimeEnabled);
      $('#xencallid').prop('checked', this.options.xencallEnabled);
      $('#tmsid').prop('checked', this.options.tmsEnabled);
      $('#tekionid').prop('checked', this.options.tekionEnabled);
      $('#activixid').prop('checked', this.options.activixEnabled);
      $('#oneeightyid').prop(
        'checked',
        this.options.oneEightyEnabled
      );
      $('#linkedinid').prop('checked', this.options.linkedinEnabled);
      $('#momentumid').prop('checked', this.options.momentumEnabled);
      $('#idealautosyndicateid').prop(
        'checked',
        this.options.idealautosyndicateEnabled
      );
      $('#onetoyotaid').prop(
        'checked',
        this.options.onetoyotaEnabled
      );
      $('#pipedriveid').prop(
        'checked',
        this.options.pipedriveEnabled
      );
      $('#promaxid').prop('checked', this.options.promaxEnabled);
      $('#readymodeid').prop(
        'checked',
        this.options.readymodeEnabled
      );
      $('#zoominfoid').prop('checked', this.options.zoomInfoEnabled);
      $('#zohoid').prop('checked', this.options.zohoEnabled);
      $('#smid').prop('checked', this.options.sm360Enabled);
      $('#crmsuite').prop('checked', this.options.crmSuiteEnabled);
      $('#carresearchid').prop(
        'checked',
        this.options.carResearchEnabled
      );
      $('#connectcdkid').prop(
        'checked',
        this.options.connectcdkEnabled
      );
      $('#highergearid').prop(
        'checked',
        this.options.highergearEnabled
      );
      $('#hubspotid').prop('checked', this.options.hubspotEnabled);
      $('#leaddriverid').prop(
        'checked',
        this.options.leaddriverEnabled
      );
      $('#reynoldid').prop('checked', this.options.reynoldEnabled);
      $('#sellyid').prop('checked', this.options.sellyEnabled);
      $('#subaruid').prop('checked', this.options.subaruEnabled);
      $('#elogpsid').prop('checked', this.options.elogpsEnabled);
      $('#fahrneyid').prop('checked', this.options.fahrneyEnabled);
      $('#dealerstudioid').prop(
        'checked',
        this.options.dealerstudioEnabled
      );
      $('#d2cmediaid').prop('checked', this.options.d2cMediaEnabled);
      $('#getmyautoid').prop(
        'checked',
        this.options.getmyautoEnabled
      );
      $('#googledocid').prop(
        'checked',
        this.options.googleDocEnabled
      );
      $('#goxeeid').prop('checked', this.options.goxeeEnabled);
      $('#panelPosition').val(this.options.panelPosition);
      $('#drivecentric').prop(
        'checked',
        this.options.driveCentricEnabled
      );
      $('#carwars').prop('checked', this.options.carWarsEnabled);
      $('#oplogic').prop('checked', this.options.opLogicEnabled);
      $('#unreadButtonChecked').prop(
        'checked',
        this.options.unreadButtonChecked
      );
      $(
        `input[name="extensionType"][value="${this.options.extensionType}"]`
      ).prop('checked', true);
      if (this.options.isMatadorAccountConnected) {
        $('#loginBtn').prop('value', 'Sign Out');
      }
    }

    optionsFromUI() {
      return {
        autoAlertEnabled: !!$('#autoalertid').prop('checked'),
        autogatetEnabled: !!$('#autogatetid').prop('checked'),
        automotiveMasterMindEnabled: !!$(
          '#automotivemastermindid'
        ).prop('checked'),
        asnsoftwarecrmEnabled: !!$('#asnsoftwarecrmid').prop(
          'checked'
        ),
        autoswatchEnabled: !!$('#autoswatchid').prop('checked'),
        eleadEnabled: !!$('#eleadsid').prop('checked'),
        egmEnabled: !!$('#egmid').prop('checked'),
        dealercarsearchEnabled: !!$('#dealercarsearchid').prop(
          'checked'
        ),
        dealerSocketEnabled: !!$('#dealersocketid').prop('checked'),
        dpEnabled: !!$('#dpid').prop('checked'),
        dealerpeakEnabled: !!$('#dealerpeakid').prop('checked'),
        dealerCenterEnabled: !!$('#dealercenterid').prop('checked'),
        dealerCloudEnabled: !!$('#dealercloudid').prop('checked'),
        vinSolutionEnabled: !!$('#vinsolutionid').prop('checked'),
        vautodealersEnabled: !!$('#vautodealersid').prop('checked'),
        vanillaSoftEnabled: !!$('#vanillasoftid').prop('checked'),
        xtimeEnabled: !!$('#xtimeid').prop('checked'),
        xencallEnabled: !!$('#xencallid').prop('checked'),
        tmsEnabled: !!$('#tmsid').prop('checked'),
        tekionEnabled: !!$('#tekionid').prop('checked'),
        activixEnabled: !!$('#activixid').prop('checked'),
        oneEightyEnabled: !!$('#oneeightyid').prop('checked'),
        linkedinEnabled: !!$('#linkedinid').prop('checked'),
        momentumEnabled: !!$('#momentumid').prop('checked'),
        idealautosyndicateEnabled: !!$('#idealautosyndicateid').prop(
          'checked'
        ),
        onetoyotaEnabled: !!$('#onetoyotaid').prop('checked'),
        pipedriveEnabled: !!$('#pipedriveid').prop('checked'),
        promaxEnabled: !!$('#promaxid').prop('checked'),
        readymodeEnabled: !!$('#readymodeid').prop('checked'),
        zoomInfoEnabled: !!$('#zoominfoid').prop('checked'),
        zohoEnabled: !!$('#zohoid').prop('checked'),
        sm360Enabled: !!$('#smid').prop('checked'),
        crmSuiteEnabled: !!$('#crmsuite').prop('checked'),
        carResearchEnabled: !!$('#carresearchid').prop('checked'),
        connectcdkEnabled: !!$('#connectcdkid').prop('checked'),
        leaddriverEnabled: !!$('#leaddriverid').prop('checked'),
        highergearEnabled: !!$('#highergearid').prop('checked'),
        hubspotEnabled: !!$('#hubspotid').prop('checked'),
        panelPosition: $('#panelPosition').val(),
        elogpsEnabled: !!$('#elogpsid').prop('checked'),
        fahrneyEnabled: !!$('#fahrneyid').prop('checked'),
        dealerstudioEnabled: !!$('#dealerstudioid').prop('checked'),
        d2cMediaEnabled: !!$('#d2cmediaid').prop('checked'),
        getmyautoEnabled: !!$('#getmyautoid').prop('checked'),
        googleDocEnabled: !!$('#googledocid').prop('checked'),
        goxeeEnabled: !!$('#goxeeid').prop('checked'),
        reynoldEnabled: !!$('#reynoldid').prop('checked'),
        subaruEnabled: !!$('#subaruid').prop('checked'),
        sellyEnabled: !!$('#sellyid').prop('checked'),
        driveCentricEnabled: !!$('#drivecentric').prop('checked'),
        carWarsEnabled: !!$('#carwars').prop('checked'),
        opLogicEnabled: !!$('#oplogic').prop('checked'),
        repromptEnabled: true,
        unreadButtonChecked: !!$('#unreadButtonChecked').prop(
          'checked'
        ),
        extensionType:
          $('input[name="extensionType"]:checked').val() || 'full',
        extensionTypeManuallyChanged: true,
      };
    }

    onChromeGetStorage(res) {
      if (res.options != undefined) {
        this.options = $.extend(this.defaultOptions, res.options);
      }

      // If user hasn't manually changed extension type and their email is in the legacy list,
      // show legacy as the effective option
      if (
        !this.options.extensionTypeManuallyChanged &&
        res.matadorUserEmail &&
        typeof isLegacyOnlyEmail === 'function' &&
        isLegacyOnlyEmail(res.matadorUserEmail)
      ) {
        this.options.extensionType = 'legacy';
      }

      this.updateUIFromOptions();
    }

    onDomContentLoaded() {
      chrome.storage.local.get(
        ['options', 'matadorUserEmail'],
        (res) => this.onChromeGetStorage(res)
      );
    }

    onButtonSaveClick() {
      this.options = this.optionsFromUI();

      chrome.storage.local.set({ options: this.options });

      chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: 'save' },
            function () {
              window.close();
            }
          );
        }
      );
    }

    async onLoginButtonClick() {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            action: 'loginToMatadorEngagementPlatform',
            email: $('#useremail').val(),
            password: $('#userpassword').val(),
          },
          (resp) => resolve(resp)
        );
      });

      if (response) {
        $('#loginBtn').prop('value', 'Sign Out');
        this.options.isMatadorAccountConnected = true;
      }
    }

    onResetButtonClick() {
      this.options = $.extend({}, this.defaultOptions);
      this.updateUIFromOptions();

      chrome.storage.local.clear(function () {
        let error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
      });
    }
  }

  new MatadorExtensionOptions();
});
