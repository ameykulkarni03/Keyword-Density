const textInput = document.getElementById('textInput');

const stopWords = [
  'a', 'an', 'the', 'in', 'of', 'on', 'for', 'to', 'with', 'by', 'as', 'at', 'this', 'that', 'is', 'it', 'and', 'or'  
];

function tokenizeText(text) {
  return text.toLowerCase().match(/\b\w+\b/g); 
}

function calculateFrequencies(tokens, n) {
  const frequencies = {};
  for (let i = 0; i <= tokens.length - n; i++) {
    const phrase = tokens.slice(i, i + n).join(' ');
    if (!stopWords.includes(phrase)) {
      frequencies[phrase] = (frequencies[phrase] || 0) + 1;
    }
  }
  return frequencies;
}

function updateResultsTable(frequencies, category) {
    const resultBody = document.getElementById(`resultBody${category}`);
    resultBody.innerHTML = '';

    const sortedPhrases = Object.keys(frequencies).sort((a, b) => frequencies[b] - frequencies[a]);

    for (let i = 0; i < Math.min(5, sortedPhrases.length); i++) {
        const phrase = sortedPhrases[i];
        const frequency = frequencies[phrase];
        const density = ((frequency / tokens.length) * 100).toFixed(2);
        const row = `<tr><td>${phrase}</td><td>${frequency}</td><td>${density}</td></tr>`;
        resultBody.innerHTML += row;
    }

    document.getElementById(`resultTable${category}`).style.display = 'table';
}

const analyzeButton = document.getElementById('analyzeButton');
analyzeButton.addEventListener('click', () => {

  const input = textInput.value.trim(); 
  tokens = tokenizeText(input);

  const oneWordFrequencies = calculateFrequencies(tokens, 1);
  const twoWordFrequencies = calculateFrequencies(tokens, 2);
  const threeWordFrequencies = calculateFrequencies(tokens, 3);

  updateResultsTable(oneWordFrequencies, 'One');
  updateResultsTable(twoWordFrequencies, 'Two');
  updateResultsTable(threeWordFrequencies, 'Three');

  document.getElementById('results').style.display = 'block';

});
