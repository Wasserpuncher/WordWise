// sentiment.js

function analyzeSentiment(text) {
    const positiveWords = ['good', 'great', 'excellent', 'super', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'catastrophic'];

    let positiveCount = 0;
    let negativeCount = 0;

    const words = text.toLowerCase().split(/\s+/);
    words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
    });

    if (positiveCount > negativeCount) {
        return 'Positive';
    } else if (negativeCount > positiveCount) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
}
