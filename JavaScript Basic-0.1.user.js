// ==UserScript==
// @name         JavaScript Basic
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  none
// @author       yoyoba22
// @match        https://en.wikipedia.org/wiki*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function highlightWord() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

        let textNode;
        while ((textNode = walker.nextNode())) {
            const parentElement = textNode.parentElement;

            if (shouldProcessElement(parentElement)) {
                const content = textNode.nodeValue;
                const matches = content.match(/\b(test)\b/ig);

                if (matches) {
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    matches.forEach(match => {
                        const index = content.indexOf(match, lastIndex);
                        if (index > lastIndex) {
                            fragment.appendChild(document.createTextNode(content.substring(lastIndex, index)));
                        }

                        const span = document.createElement('span');
                        span.style.backgroundColor = 'red';
                        span.style.cursor = 'pointer'; // Add this line to make the highlighted word clickable
                        span.addEventListener('click', function() {
                            window.open('https://en.wikipedia.org/wiki/Test', '_blank');
                        });
                        span.appendChild(document.createTextNode(match));
                        fragment.appendChild(span);

                        lastIndex = index + match.length;
                    });

                    if (lastIndex < content.length) {
                        fragment.appendChild(document.createTextNode(content.substring(lastIndex)));
                    }

                    parentElement.replaceChild(fragment, textNode);
                }
            }
        }
    }

    function shouldProcessElement(element) {
        if (element.tagName === 'IMG') {
            return false;
        }
        return true;
    }

    window.addEventListener('load', highlightWord);

})();