// data.js

function saveAnalysisResults(results) {
    // Speichern der Analyseergebnisse im lokalen Speicher
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text_analysis_results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function loadAnalysisResults(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const results = JSON.parse(event.target.result);
        // Hier können Sie die Ergebnisse verarbeiten
        console.log(results);
    };
    reader.readAsText(file);
}
