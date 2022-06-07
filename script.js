var ServerPage = {};
ServerPage.Environment = 'PRD';
ServerPage.CDNUrl = 'https://cs1.smartdraw.com';
if (ServerPage.Environment.length > 5) ServerPage.Environment = "NODE";
ServerPage.HasAuthCookie = true;
ServerPage.EmbeddedAllowCloudDocs = true;
ServerPage.Claims = null;
ServerPage.IsMin = true;

function loadTimeout() {
    if (ServerPage.Environment == "PRD" || ServerPage.Environment == "DEV3") {
        var elem = $("#_loading");
        if (elem && elem.length > 0 && elem.css("display") != "none")
            window.location.href = "/login/?timeout=1";
    }
}
setTimeout(loadTimeout, 45 * 1000); 




function googleTranslateElementInit() {
    setTimeout(function () {
        new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
    }, 2000);
}




$(function () {
    $(window).on('message', iFrameMessageHandler);
    $('html').addClass(ServerPage.Environment);


    $('#translateEventElement').on('DOMSubtreeModified', function () {
        setTimeout(function () {
            if ($($('.goog-te-banner-frame')[0]).is(":visible")) {
                //wire click handler to close button in google iframe
                $('.goog-close-link', $('.goog-te-banner-frame').contents()).on('click', function () { $(document.documentElement).toggleClass('googleBar', false); });
                $(document.documentElement).toggleClass('googleBar', true);
            }
            else
                $(document.documentElement).toggleClass('googleBar', false);
        }, 1);
    });


    SDUI.AppSettings.Application = SDUI.Resources.Application.Editor;
    SDUI.Initializer.Initialize();
    maintBanner();

});

function iFrameMessageHandler(e) {
    if (e.originalEvent.data == 'gotoSSO') {
        var domain = $('#m-loginSignup-iFrame').contents().find('#samlDomain').text();
        self.location.href = '/sso/saml/login/' + domain;
    }
}

function maintBanner(test) {
    var current = new Date();
    var show = new Date('April 21 2022 21:00:00 GMT-0000');
    var start = new Date('April 22 2022 23:00:00 GMT-0000');
    var end = new Date('April 23 2022 2:00:00 GMT-0000');
    if ((typeof (test) != 'undefined' && test == true) || (current > show && current < end)) {
        $('.closeSVG').on('click', function (e) { e.preventDefault(); e.stopPropagation(); $("#maintBanner").remove() });
        $('#maintTime').text(start.format("mmmm d, h:00tt Z"));
        $('#mainApp').prepend($("#maintBanner").detach());
        $("#maintBanner").css('display', '');
    }
}


//TEMP:
/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
//END TEMP




WebFontConfig = {
google: {
    families: ['Open+Sans:400,700,400italic,700italic', 'Yanone+Kaffeesatz:400,700', 'Roboto:400,400italic,700,700italic', 'Droid+Serif:400,400italic,700,700italic', 'Cuprum:400,700,400italic,700italic', 'Roboto+Condensed:400,700italic,700,400italic', 'Source+Sans+Pro:400,400italic,700,700italic', 'Raleway:400,700', 'PT+Sans:400,400italic,700italic', 'PT+Sans+Narrow:400,700', 'Droid+Sans:400,700', 'Lato:400,400italic,700,700italic', 'Oswald:400,700', 'Cabin:400,400italic,700,700italic', 'Ubuntu:400,400italic,700,700italic', 'Nunito:400,700', 'Francois+One', 'Arimo:400,400italic,700,700italic', 'Montserrat:400,700', 'Dosis:400,700']
},
classes: false
};

(function () {
var wf = document.createElement('script');
wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//console.log("pulling webfont from local");
//wf.src = 'app/lib/webfont.js';
wf.type = 'text/javascript';
wf.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(wf, s);
})(); 