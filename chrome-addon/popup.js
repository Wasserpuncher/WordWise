document.getElementById("analyze-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getText" }, (response) => {
            analyzeText(response.text, response.htmlElements);
        });
    });
});

document.getElementById("export-button").addEventListener("click", exportResults);
document.getElementById("settings-button").addEventListener("click", toggleSettings);
document.getElementById("save-settings").addEventListener("click", saveSettings);

function analyzeText(text, htmlElements) {
    const wordCount = countWords(text);
    const mostCommonWords = getMostCommonWords(text);
    const mostCommonPhrases = getMostCommonPhrases(text);
    const readability = calculateReadability(text);
    const lengthDistribution = getLengthDistribution(text);
    const sentiment = analyzeSentiment(text);

    document.getElementById("word-count").textContent = `Wörter: ${wordCount}`;
    document.getElementById("most-common-words").textContent = `Häufigste Wörter: ${mostCommonWords}`;
    document.getElementById("most-common-phrases").textContent = `Häufigste Phrasen: ${mostCommonPhrases}`;
    document.getElementById("readability").textContent = `Lesbarkeit (Flesch-Index): ${readability}`;

    visualizeWordCount(wordCount);
    visualizeLengthDistribution(lengthDistribution);
    displayHtmlElements(htmlElements);
    document.getElementById("results").classList.remove("hidden");
    displaySentiment(sentiment);
}

function toggleSettings() {
    const settingsDiv = document.getElementById("settings");
    settingsDiv.classList.toggle("hidden");
}

function saveSettings() {
    const keywords = document.getElementById("keywords").value.split(',');
    chrome.storage.local.set({ keywords: keywords }, () => {
        alert('Einstellungen gespeichert!');
    });
}

function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

function getMostCommonWords(text) {
    const words = text.toLowerCase().match(/\w+/g);
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 5).map(item => `${item[0]} (${item[1]})`).join(", ");
}

function getMostCommonPhrases(text) {
    const phrases = text.toLowerCase().match(/(\w+\s+\w+)/g);
    const phraseCount = {};
    phrases.forEach(phrase => {
        phraseCount[phrase] = (phraseCount[phrase] || 0) + 1;
    });
    const sortedPhrases = Object.entries(phraseCount).sort((a, b) => b[1] - a[1]);
    return sortedPhrases.slice(0, 5).map(item => `${item[0]} (${item[1]})`).join(", ");
}

function calculateReadability(text) {
    const totalSentences = text.split(/[.!?]+/).length - 1;
    const totalWords = countWords(text);
    const totalSyllables = text.split(/\s+/).reduce((count, word) => count + countSyllables(word), 0);
    const fleschScore = 206.835 - (1.015 * (totalWords / totalSentences)) - (84.6 * (totalSyllables / totalWords));
    return fleschScore.toFixed(2);
}

function countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    const syllableCount = word.match(/[aeiouy]{1,2}/g);
    return syllableCount ? syllableCount.length : 0;
}

function getLengthDistribution(text) {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const lengthCount = {};
    words.forEach(word => {
        const length = word.length;
        lengthCount[length] = (lengthCount[length] || 0) + 1;
    });
    return lengthCount;
}

function visualizeWordCount(wordCount) {
    const ctx = document.getElementById('word-chart').getContext('2d');
    const data = {
        labels: ['Wörter'],
        datasets: [{
            label: 'Anzahl der Wörter',
            data: [wordCount],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function visualizeLengthDistribution(lengthDistribution) {
    const ctx = document.getElementById('length-distribution-chart').getContext('2d');
    const labels = Object.keys(lengthDistribution);
    const data = Object.values(lengthDistribution);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wortlängenverteilung',
                data: data,
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displaySentiment(sentiment) {
    const sentimentDiv = document.createElement('p');
    sentimentDiv.textContent = `Sentiment: ${sentiment}`;
    document.getElementById("results").appendChild(sentimentDiv);
}

function analyzeSentiment(text) {
    // Hier könnte eine einfache Sentiment-Analyse implementiert werden
    // Für diese Implementierung verwenden wir eine vereinfachte Logik
    const positiveWords = ['gut', 'großartig', 'exzellent', 'super', 'fantastisch'];
    const negativeWords = ['schlecht', 'schrecklich', 'furchtbar', 'katastrophal'];

    let positiveCount = 0;
    let negativeCount = 0;

    text.split(/\s+/).forEach(word => {
        if (positiveWords.includes(word.toLowerCase())) positiveCount++;
        if (negativeWords.includes(word.toLowerCase())) negativeCount++;
    });

    if (positiveCount > negativeCount) {
        return 'Positiv';
    } else if (negativeCount > positiveCount) {
        return 'Negativ';
    } else {
        return 'Neutral';
    }
}

function exportResults() {
    const results = {
        wordCount: document.getElementById("word-count").textContent,
        mostCommonWords: document.getElementById("most-common-words").textContent,
        mostCommonPhrases: document.getElementById("most-common-phrases").textContent,
        readability: document.getElementById("readability").textContent,
        sentiment: document.getElementById("results").lastChild.textContent // Sentiment
    };
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text_analysis_results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
