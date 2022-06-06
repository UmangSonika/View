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