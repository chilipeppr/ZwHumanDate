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
    flex-direction: row;
    display: flex;
    xwidth: 100%;
}
.` + this.id + `-composebox-topregion-body > input {
    padding: 2px 8px;
    width: min-content;
}
.` + this.id + `-composebox-topregion > .topregion-iconurl {
    margin-top: 4px;
}
.` + this.id + `-parsed-date {
    margin: 4px 0 0 10px;
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

        // Bind shortcut key for Alt+H
        this.bindShortcutKey();

    },

    // Bind shortcut key global event to browser window
    bindShortcutKey: function() {

        $(document).keydown(this.onShortcutKey.bind(this));
            
    },

    // Detect Alt+H on PC / Option+H on Mac shortcut key 
    onShortcutKey: function(evt) {

        // console.log("onShortcutKey. evt.ctrlKey:", evt.ctrlKey, "evt.altKey:", evt.altKey, "evt.which:", evt.which, "evt:", evt);

        if (evt.altKey && evt.which == 72) {
            console.log("Shortcut key Alt+H hit for Human Date Time");
            var that = this;
            setTimeout(function() {
                that.onClickComposeBoxBtn({isShortcutKey: true});
            },150);
        }

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

        this.btnHumanDateEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id + "-btn", "Human Date Time (Alt + H)", this.iconUrlBaseSvg, this.iconUrlHoverSvg, this.iconUrlSelectedSvg, this.onClickComposeBoxBtn.bind(this));

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
            // localStorage.setItem(that.id + "-sticky-show", "off");
            // console.log("sticky setting storing off");
        });
    },

    // This method is called after the compose box button bar button is clicked
    onClickComposeBoxBtn: function(evt) {
        console.log("onClickComposeBoxBtn. evt:", evt); 

        var regionEl = $('.' + this.id + '-composebox-topregion');

        // see if exists
        if (regionEl.length == 0) {
            // it does not, create it, create with hidden css tag added
            regionEl = this.createTopRegion();
            // regionEl.addClass("hidden");
        }

        // Get the button element
        // var btnEl = zw.plugin.getOrCreateComposeBoxBtnBarCss(this.id);
        if (regionEl.hasClass("hidden")) {

            // Show the Human Date Time
            regionEl.removeClass("hidden");
            this.btnHumanDateEl.find('.iconUrlBaseSvg').addClass("active");
            console.log("removed hidden class from top region for human date time");

            // we should show the default date/time fields
            var regSchedEl = $('.send-message-panel_messageAdditional.send-message-panel_messageAdditional_isScheduling');
            if (regSchedEl.length > 0) {
                // this means the default scheduled text area is already toggled on
            } else {
                // this means the default scheduled text area is NOT toggled on
                // so, show it.
                var btnSchedEl = $('.send-message-panel_scheduledTextContainer .send-message-panel_buttonStyle');
                btnSchedEl.click();

                // get the original time field and watch when it changes because we have to override it
                // it seems to get updated every 30 secs or so and we need to rewrite it immediately thereafter
                // var origTimeEl = $('.send-message-panel_messageAdditional_isScheduling .zk-time-picker-input');
                // origTimeEl.on('input change', this.onOriginalTimeFieldChanged.bind(this));
                // origTimeEl.on('change', this.onOriginalTimeFieldChanged.bind(this));
                this.watchChangesOnTimeField();
                
            }

            // now set the textbox with the focus so they can start typing
            // and select all text so they can immediately replace what's there
            regionEl.find("input").focus().select();
            this.onParseTextbox();

        } else {

            // Hide the Human Date Time
            regionEl.addClass("hidden"); // ensure hidden
            this.btnHumanDateEl.find('.iconUrlBaseSvg').removeClass("active");
            console.log("added hidden class from top region for human date time");

            // we should hide the default date/time fields
            var regSchedEl = $('.send-message-panel_messageAdditional.send-message-panel_messageAdditional_isScheduling');
            if (regSchedEl.length > 0) {
                // this means the default scheduled text area is already toggled on
                // so hide it
                var btnSchedEl = $('.send-message-panel_scheduledTextContainer .send-message-panel_buttonStyle');
                btnSchedEl.click();
            } else {
                // this means the default scheduled text area is NOT toggled on
            }

            // place focus back on main compose box
            // this.composeBoxTextAreaEl.focus();
            console.log("this is where i would give focus to textarea:", this.composeBoxTextAreaEl);
            this.composeBoxTextAreaEl.focus();
            
        }


    },

    watchChangesOnTimeField: function() {

        // var origTimeEl = $('.send-message-panel_messageAdditional_isScheduling .zk-time-picker-input');
        // origTimeEl.on('input change', this.onOriginalTimeFieldChanged.bind(this));
        var el = $('.send-message-panel_messageAdditional_isScheduling .zk-time-picker-input').parent();
        //var el = $('.conversation-list-panel_container');
        console.log("got el to attach watch event. el:", el);
  
        // we need to debounce all of these callbacks. so the trick is to do a setTimeout but to wipe
        // the timeout on each callback so that we get the actual load pretty much only once. even if we don't
        // get it once, that's safe, it's just that we don't want to call all our phone retrieval events a million time
        var timeoutId = null;
  
        // Select the node that will be observed for mutations
        const targetNode = el[0];
  
        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true, characterData: true, };
  
        // Just use callback as trigger to re-look at DOM, just debounce so don't overdo it
        // Callback function to execute when mutations are observed
        var that = this;
        const callback = function (mutationsList, observer) {
          // do debounce
          if (timeoutId != null) {
            // we have a timeout already. cancel it.
            clearTimeout(timeoutId);
          }
  
          // now create setTimeout
          timeoutId = setTimeout(that.onOriginalTimeFieldChanged, 100);
        }
  
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
  
        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    },

    onOriginalTimeFieldChanged: function(evt) {
        console.log("onOriginalTimeFieldChanged. evt:", evt);
    },

    cachedTextboxEl: null, // cached element for textbox
    cachedParsedDateEl: null, // cached element for the parsed date

    onParseTextbox: function(evt) {

        // Get textbox val
        //var txtBoxEl = $("." + this.id + "-composebox-topregion-body > input");
        var q = this.cachedTextboxEl.val();
        // console.log("onParseTextbox. val:", q, "evt:", evt);

        // console.log("chrono:", typeof(chrono));
        if (typeof(chrono) != 'undefined') {

            var referenceDate = new Date();
            var result = chrono.parse(q, referenceDate, { forwardDate: true });
            // var val = chrono.parse(q);
            // Fri Sep 12 2014 12:00:00 GMT-0500 (CDT)
            console.log("chrono parsed val:", result);

            // this.cachedParsedDateEl.addClass("alert-success");
            // this.cachedParsedDateEl.removeClass("alert-warning");
        
            // see if got a parsed date
            if (result && result.length && result.length > 0 && result[0].ref) {

                var d = result[0].start.date();

                // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var options = { hour12: true, hour: 'numeric', minute:'2-digit'};

                var txt = "";
                // txt = d.toLocaleString('en-US', options);
                // console.log(d.toLocaleDateString("en-US")); // 9/17/2016
                // console.log(d.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016

                // figure out year. if it's the current year then don't show it, otherwise show 2 digit year
                var yearTxt = "";
                var curYr = new Date().getFullYear();
                if (d.getFullYear() != curYr) yearTxt = "/" + d.getFullYear().toString().replace(/^../, "");

                txt = d.toLocaleDateString([], {weekday:'short'}) + " " + (d.getMonth() + 1) + "/" + d.getDate() + yearTxt + " " +  d.toLocaleTimeString([], options);

                this.cachedParsedDateEl.text(txt);

                // now update the original date/time fields so we actually schedule a text here
                var origDateEl = $('.send-message-panel_messageAdditional_isScheduling .DateInput_input');
                var origTimeEl = $('.send-message-panel_messageAdditional_isScheduling .zk-time-picker-input');
                origDateEl.val(d.toLocaleDateString());
                origTimeEl.val(d.toLocaleTimeString([], options));


            } else {
                this.cachedParsedDateEl.text("Error parsing");
            }
        } else {
            this.cachedParsedDateEl.text("Chrono not ready...");
            setTimeout(this.onParseTextbox.bind(this), 1000);
        }
    },

    // This should be called only once. It creates the Top Region.
    createTopRegion: function() {

        console.log("Creating top region for human date time");

        regionEl = zw.plugin.getOrCreateComposeBoxTopRegionCss(this.id + '', "Human Date Time", this.iconUrlBaseSvg, "hidden");
        // regionEl.find('.plugin-composebox-topregion-body').text("ABC Apple Pay - Coming soon. Lets you accept payments via Apple Pay.");
        // make x close button clickable
        regionEl.find('.zk-button').click(this.onClickComposeBoxBtn.bind(this));
        // make icon bigger
        // regionEl.find('.topregion-iconurl').addClass('topregion-abc-iconurl');

        // create textbox
        var bodyEl = regionEl.find('.plugin-composebox-topregion-body');
        var newEl = $(`
<script src="https://i2dcui.appspot.com/slingshot?url=https://raw.githubusercontent.com/wanasit/chrono/master/dist/chrono.min.js" />
<div class="` + this.id + `-composebox-topregion-body">
    <input type="text" class="zk-text-input zk-editable-input focus-visible" autocomplete="on"  
    value="in 5 mins"
    />
    <div class="` + this.id + `-parsed-date">Parsed date here</div>
</div>
<div class="hidden zw-default-div-style drop-down-menu_menu ${this.id}-example-menu">
    <div class="drop-down-menu_menuOption" tabindex="0">
        <div class="zk-styled-text-base zk-styled-text-primary">2 days 3:15p</div>
    </div>
    <div class="drop-down-menu_menuOption" tabindex="0">
        <div class="zk-styled-text-base zk-styled-text-primary">4 weeks 8:30</div>
    </div>
    <div class="drop-down-menu_menuOption" tabindex="0">
        <div class="zk-styled-text-base zk-styled-text-primary">Delete</div>
    </div>
</div>
        `);
        bodyEl.append(newEl);            

        // we need to load the javascript library

        // let's setup our cached elements
        // this way they are quicker to find in the keypress callback
        this.cachedTextboxEl = newEl.find('input');
        this.cachedParsedDateEl = newEl.find('.' + this.id + '-parsed-date');
        
        // we need to attach to the keypress events in the textbox
        // this.cachedTextboxEl.on('change paste keyup', this.onParseTextbox.bind(this));
        this.cachedTextboxEl.on('input', this.onParseTextbox.bind(this));

        return regionEl;
    },

};

// Register
zw.plugin.register(myPlugin);

// Now load it
myPlugin.onLoad();