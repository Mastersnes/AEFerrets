define(['piwik'], function (piwik) {
    "use strict";
    var u;
    _paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
	var u="//piwik-applines.herokuapp.com/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 1]);
    return _paq;
});