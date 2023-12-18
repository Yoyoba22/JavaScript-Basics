// ==UserScript==
// @name         JavaScript Basic Notification Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  none
// @author       yoyoba22
// @match        https://en.wikipedia.org/wiki/Test*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var notificationDiv = document.createElement('div');
    notificationDiv.style.position = 'absolute';
    notificationDiv.style.top = '19%';
    notificationDiv.style.right = '60%';
    notificationDiv.style.backgroundColor = '#ff0000';
    notificationDiv.style.color = '#ffffff';
    notificationDiv.style.padding = '35px';
    notificationDiv.style.borderRadius = '35px';
    notificationDiv.style.fontSize = '2vw';
    notificationDiv.innerHTML = 'Test';

    notificationDiv.addEventListener('click', function() {
        window.open('https://en.wikipedia.org/w/index.php?title=Special:PrefixIndex&from=Test_and_Training_Range&prefix=Test', '_blank');
    });

    document.documentElement.appendChild(notificationDiv);
})();