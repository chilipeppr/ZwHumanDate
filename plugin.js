// Human date time Zipwhip Plugin
// This plugin lets you enter a human-style date/time in
// a Compose Box widget. This makes it easier to schedule a
// text rather than being forced to use the traditional date/time
// fields in the base Zipwhip app

// Register
var myPlugin = {

    // The ID should be camel case, prefixed with your company name/initials, and be a short
    // name for this plugin. It gets pre-pended to a lot of HTML element class names, CSS styles,
    // data attributes, etc. throughout the Zipwhip app. So this name is important.
    // Example: AuthviaPayments, ZwSuggReply, ZwSentiment, ZwNpsSurvey, SenseforthCreditUnion
    id: "ZwHumanDate", // This gets prepended to all CSS styles and class names so not to clobber other plugins

    settings: {
        name: "Human Date Time for Scheduled Text",
        description: "Enter a human-style date and time to schedule a Zipwhip text.",
    },

    iconUrlBaseSvg: 'https://raw.githubusercontent.com/chilipeppr/ZwHumanDate/master/icon_base.svg',
    iconUrlHoverSvg: 'https://raw.githubusercontent.com/chilipeppr/ZwHumanDate/master/icon_hover.svg',
    iconUrlSelectedSvg: 'https://raw.githubusercontent.com/chilipeppr/ZwHumanDate/master/icon_selected.svg',

    // This is the boot code for a plugin. You should call it once you register the plugin.
    // This is the only code that is automatically called by Zipwhip on load of a plugin.
    // For all other events you must register for them in your onLoad event.
    // The onLoad method in your plugin object is called ONCE and only ONCE.
    // RESERVED NAME
    onLoad: function() {

        // Register our plugin with Zipwhip so it's aware of us
        // Don't really need to pass "this" yet as 2nd param, but maybe the plugin system
        // will need it in the future.
        //zw.plugin.register(this.id, this.settings, this);

        zw.plugin.addCss(
"." + this.id + `-composebox-topregion-body {
    flex-direction: column;
    display: flex;
    width: 100%;
}
.` + this.id + `-mainrow {
    flex-direction: row;
    display: flex;
    font-size: 12px;
}
.` + this.id + `-title {
    flex-grow:1;
}
.` + this.id + `-translatedtext {
    flex-grow: 1;
}
select.` + this.id + `-onoffauto {
    font-size:12px;
}
select.plugin-select-airy {
    font-size:12px;
    border: 0px;
    background: transparent;
}
`);
        zw.plugin.addCssUrl();

        // listen to events
        zw.plugin.addEventListener(zw.plugin.events.COMPOSE_BOX_LOAD, this.onComposeBoxLoad.bind(this));
        // zw.plugin.addEventListener(zw.plugin.events.SIDE_PANEL_LOAD, this.onSidePanelLoad.bind(this));

    },

    // The code below in this plugin is any name you want to use. Consider making these private methods/props.

    btnHumanDateEl: null, // will hold ref to compose box button bar button

    // We are called when the Compose Box is loaded. In the event object we are given
    // the current Conversation object which has a ConversationId and Contacts array
    // with ContactId's.
    // This is called each time a conversation is changed.
    /*
       composeTextAreaEl: composeTextAreaEl,
       composeBoxBtnBarPluginEl: composeBoxBtnBarPluginEl,
       composeTopRegionPluginEl: composeTopRegionPluginEl,
       phoneObj: newPhoneObj,
       phone: newPhone,
       oldPhone: oldPhone,
       conversation: conversation,
       contactId: contactId
    */
    onComposeBoxLoad: function(evt) {
        console.log("Got plugin onComposeBoxLoad. evt:", evt);

        // store the textarea for now in this plugin obj so we can retrieve it later
        this.composeBoxTextAreaEl = evt.composeTextAreaEl;

        this.btnHumanDateEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-btn", "Human Date Time", this.iconUrlBaseSvg, this.iconUrlHoverSvg, this.iconUrlSelectedSvg, this.onClickComposeBoxBtn.bind(this));

    },

    // Setup the close button to hide
    setupCloseBtn: function() {
        var btnCloseEl = $('.plugin-composebox-topregion-close button');
        console.log("setupCloseBtn. btnEl:", btnCloseEl);

        var that = this;
        btnCloseEl.click(function() {

            that.hide();

            // since this was manually unshown by the user, let's do a sticky setting
            // where we keep the Language Translator showing until they toggle it off
            localStorage.setItem(that.id + "-sticky-show", "off");
            console.log("sticky setting storing off");
        });
    },

    // This method is called after the compose box button bar button is clicked
    onClickComposeBoxBtn: function(evt) {
        console.log("onClickComposeBoxBtn. evt:", evt); 

        var regionEl = $('.' + this.id + '-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it, create with hidden css tag added
            regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '', "Human Date Time", this.iconUrlBaseSvg, "hidden");
            // regionEl.find('.plugin-composebox-topregion-body').text("ABC Apple Pay - Coming soon. Lets you accept payments via Apple Pay.");
            // make x close button clickable
            regionEl.find('.zk-button').click(this.onClickComposeBoxBtn.bind(this));
            // make icon bigger
            // regionEl.find('.topregion-iconurl').addClass('topregion-abc-iconurl');
        }

        // Get the button element
        // var btnEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id);
        if (regionEl.hasClass("hidden")) {
            regionEl.removeClass("hidden");
            this.btnHumanDateEl.find('.iconUrlBaseSvg').addClass("active");
        } else {
            regionEl.addClass("hidden"); // ensure hidden
            this.btnHumanDateEl.find('.iconUrlBaseSvg').removeClass("active");
        }

    },

};

// Register
zw.plugin.register(myPlugin);

// Now load it
myPlugin.onLoad();