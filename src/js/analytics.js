(function(window, document, variableName, scriptElement, firstScript) {
    window.GoogleAnalyticsObject = variableName;
    window[variableName] = (window[variableName] || function() {
        (window[variableName].q = window[variableName].q || []).push(arguments);
    });
    window[variableName].l = +new Date();
    scriptElement = document.createElement('script');
    firstScript = document.scripts[0];
    scriptElement.src = 'https://www.google-analytics.com/analytics.js';
    firstScript.parentNode.insertBefore(scriptElement, firstScript);
}(window, document, 'ga'));

ga('create', ' UA-32000161-1');
ga('send', 'pageview');
