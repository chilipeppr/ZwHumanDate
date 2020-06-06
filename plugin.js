// Human date time Zipwhip Plugin
// This plugin lets you enter a human-style date/time in
// a Compose Box widget. This makes it easier to schedule a
// text rather than being forced to use the traditional date/time
// fields in the base Zipwhip app

var pluginLangTranslator = {
    // The ID should be camel case, prefixed with your company name/initials, and be a short
    // name for this plugin. It gets pre-pended to a lot of HTML element class names, CSS styles,
    // data attributes, etc. throughout the Zipwhip app. So this name is important.
    // Example: AuthviaPayments, ZwSuggReply, ZwSentiment, ZwNpsSurvey, SenseforthCreditUnion
    id: "ZwHumanDate", // This gets prepended to all CSS styles and class names so not to clobber other plugins

    settings: {
        name: "Human Date for Scheduled Text",
        description: "Enter a human-style date and time to schedule a Zipwhip text.",
    },

    iconBaseSvg: '<svg width="24" height="24" viewBox="0 0 24 24"><g transform="matrix(.046649 0 0 .046649 .071778 22.966)"><g transform="translate(0,-488)"><path d="m272.53 56.558v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/></g><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029"/></g></g></svg>',
    iconHoverSvg: '<svg width="24" height="24" viewBox="0 0 24 24"><g transform="matrix(.046649 0 0 .046649 .071778 22.966)" fill="#549ed1"><path d="m272.53-431.44v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g></g></svg>',
    iconToggleSvg: '<svg width="24" height="24" viewBox="0 0 24 24"><g transform="matrix(.046649 0 0 .046649 .071778 22.966)"><path d="m6.9779-80.034 186.59 1.1614 39.68 31.163-4.2583-175.95h-223.17z" fill="#c2def2"/><path d="m281.06-424.18-1.5485 174.2 39.68-29.615 184.46-0.77424v-142.27z" fill="#c2def2"/><g fill="#549ed1"><path d="m272.53-431.44v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z" fill="#549ed1"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029" fill="#549ed1"/></g></g></g></svg>',
    iconTopRegionSvg: '<svg width="18" height="18" viewBox="0 0 24 24"><g fill="#b6bbc3" transform="matrix(.046649 0 0 .046649 .071778 22.966)"><g transform="translate(0,-488)"><path d="m272.53 56.558v198.99l50.73-39.682h188.74v-159.31zm224.44 144.28h-178.98l-30.428 23.441v-152.69h209.41z"/></g><g transform="translate(0,-488)"><path d="m0 256.95v159.31h189.74l49.728 39.682v-198.99zm224.44 167.72-29.426-23.442h-179.98v-129.25h209.41z"/></g><g transform="translate(0,-488)"><path d="m81.54 206.63-20.116-20.117-10.628 10.628 37.376 37.376 37.377-37.376-10.628-10.628-18.012 18.013c9.545-75.145 73.88-133.44 151.58-133.44v-15.03c-86.713 0-158.28 66.107-166.94 150.57z"/></g><g transform="translate(0,-488)"><path d="m424.83 277.38-37.377 37.376 10.628 10.628 18.012-18.013c-9.546 75.145-73.881 133.44-151.58 133.44v15.029c86.713 0 158.28-66.106 166.94-150.57l20.116 20.117 10.628-10.628z"/></g><g transform="translate(0,-488)"><rect x="72.141" y="297.03" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="329.09" width="128.25" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="361.16" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="184.36" y="329.09" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="40.078" y="297.03" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="376.74" y="96.639" width="96.188" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="128.7" width="160.31" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="160.76" width="80.157" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="160.76" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="312.61" y="96.639" width="16.031" height="15.029"/></g><g transform="translate(0,-488)"><rect x="344.67" y="96.639" width="16.031" height="15.029"/></g></g></svg>',

    langList: [{"pretty":"Arabic","short":"ar"},{"pretty":"Bulgarian","short":"bg"},{"pretty":"Bangla","short":"bn"},{"pretty":"Bosnian","short":"bs"},{"pretty":"Catalan","short":"ca"},{"pretty":"Czech","short":"cs"},{"pretty":"Welsh","short":"cy"},{"pretty":"Danish","short":"da"},{"pretty":"German","short":"de"},{"pretty":"Greek","short":"el"},{"pretty":"English","short":"en"},{"pretty":"Spanish","short":"es"},{"pretty":"Estonian","short":"et"},{"pretty":"Persian","short":"fa"},{"pretty":"Finnish","short":"fi"},{"pretty":"Filipino","short":"fil"},{"pretty":"Fijian","short":"fj"},{"pretty":"French","short":"fr"},{"pretty":"Hebrew","short":"he"},{"pretty":"Hindi","short":"hi"},{"pretty":"Croatian","short":"hr"},{"pretty":"Haitian","short":"ht"},{"pretty":"Hungarian","short":"hu"},{"pretty":"Indonesian","short":"id"},{"pretty":"Icelandic","short":"is"},{"pretty":"Italian","short":"it"},{"pretty":"Japanese","short":"ja"},{"pretty":"Korean","short":"ko"},{"pretty":"Lithuanian","short":"lt"},{"pretty":"Latvian","short":"lv"},{"pretty":"Malagasy","short":"mg"},{"pretty":"Maori","short":"mi"},{"pretty":"Malay","short":"ms"},{"pretty":"Maltese","short":"mt"},{"pretty":"Hmong Daw","short":"mww"},{"pretty":"Norwegian","short":"nb"},{"pretty":"Dutch","short":"nl"},{"pretty":"Otomi","short":"otq"},{"pretty":"Polish","short":"pl"},{"pretty":"Portuguese","short":"pt"},{"pretty":"Romanian","short":"ro"},{"pretty":"Russian","short":"ru"},{"pretty":"Slovak","short":"sk"},{"pretty":"Slovenian","short":"sl"},{"pretty":"Samoan","short":"sm"},{"pretty":"Swedish","short":"sv"},{"pretty":"Kiswahili","short":"sw"},{"pretty":"Tamil","short":"ta"},{"pretty":"Telugu","short":"te"},{"pretty":"Thai","short":"th"},{"pretty":"Klingon","short":"tlh"},{"pretty":"Tongan","short":"to"},{"pretty":"Turkish","short":"tr"},{"pretty":"Tahitian","short":"ty"},{"pretty":"Ukrainian","short":"uk"},{"pretty":"Urdu","short":"ur"},{"pretty":"Vietnamese","short":"vi"},{"pretty":"Yucatec Maya","short":"yua"},{"pretty":"Cantonese","short":"yue"},{"pretty":"Serbian (Cyrillic)","short":"sr-Cyrl"},{"pretty":"Serbian (Latin)","short":"sr-Latn"},{"pretty":"Chinese (Simplified)","short":"zh-Hans"},{"pretty":"Chinese (Traditional)","short":"zh-Hant"}],

    // This is the boot code for a plugin. It is called once the page is loaded.
    // This is the only code that is automatically called by Zipwhip on load of a plugin.
    // For all other events you must register for them in your onLoad event.
    // The onLoad method in your plugin object is called ONCE and only ONCE.
    // RESERVED NAME
    onLoad: function() {

        // Register our plugin with Zipwhip so it's aware of us
        // Don't really need to pass "this" yet as 2nd param, but maybe the plugin system
        // will need it in the future.
        zw.plugin.register(this.id, this.settings, this);

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
        zw.plugin.addEventListener(zw.plugin.events.SIDE_PANEL_LOAD, this.onSidePanelLoad.bind(this));

    },

    // The code below in this plugin is any name you want to use. Consider making these private methods/props.

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

        // Let's get our user settings first.
        var that = this;
        this.ajaxGetSettingsPerContactId(evt.contactId, function(settings) {
            console.log("got back from ajax call getting settings for this contactId. settings:", settings);

            // see if null. if so then we know the defaults of english and auto
            if (settings == null) {
                settings = {
                    locale: 'English',
                    state: 'Auto'
                }
            }

            // Create a full-blown object with all of our info and settings so we can
            // use it downstream as we create the UI
            var loadEvtObj = evt;
            loadEvtObj.langSettings = settings;

            // Setup my Compose Box Button Bar. Lazy load since we don't really know what final
            // scope our button will have, meaning will it be re-created each time? We don't know
            // as it will have a lifecyle based on React, so if we just lazy load then we're pretty
            // safe regardless of how the final implementation comes out. Another way of looking at
            // it is as long as we getOrCreateComposeBoxBtnBar() each time the compose box loads, that method
            // provided to us by core Zipwhip, will always ensure the button is there.
            // getOrCreateComposeBoxBtnBar: function(id, tooltip, iconBaseSvg, iconHoverSvg, iconToggleSvg, onClickCallback)
            var btnEl = zw.plugin.getOrCreateComposeBoxBtnBar(that.id, that.settings.name, that.iconBaseSvg, that.iconHoverSvg, that.iconToggleSvg, that.onComposeBoxBtnClick.bind(that))

            // Make sure toggle is turned off. It may have been left on from prior conversation.
            //this.btnToggleOff();

            // Setup my Compose Box Top Region
            // This just lazy loads stuff, so we'll call this from other paths as well
            that.getOrCreateTopRegion(loadEvtObj);

            // Setup my keypress event
            that.setupKeypress(loadEvtObj);

            // Load the settings / wipe old ones if they are there
            //this.ensureSettingsForThisContactId(evt.contactId, evt.phone);

            // see if this was manually shown by the user before, which we treat as a sticky setting
            // where we keep the Language Translator showing until they toggle it off
            var stickyShow = localStorage.getItem(that.id + "-sticky-show");
            if (stickyShow == "on") {
                console.log("sticky was on, so showing.");
                that.show();
            }

            // setup close button
            that.setupCloseBtn();
        });
    },

    // Setup the close button to hide
    setupCloseBtn: function() {
        var btnEl = $('.plugin-composebox-topregion-close button');
        console.log("setupCloseBtn. btnEl:", btnEl);

        var that = this;
        btnEl.click(function() {

            that.hide();

            // since this was manually unshown by the user, let's do a sticky setting
            // where we keep the Language Translator showing until they toggle it off
            localStorage.setItem(that.id + "-sticky-show", "off");
            console.log("sticky setting storing off");
        });
    },
}