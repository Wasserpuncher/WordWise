function extractText() {
    let bodyText = document.body.innerText;
    return bodyText;
}

function extractHtmlElements() {
    const elements = {};
    const tags = ['h1', 'h2', 'h3', 'p', 'li'];
    tags.forEach(tag => {
        elements[tag] = document.getElementsByTagName(tag).length;
    });
    return elements;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
        const text = extractText();
        const htmlElements = extractHtmlElements();
        sendResponse({ text: text, htmlElements: htmlElements });
    }
});

