document.getElementById('search-button').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous search results

    if (!query) return;

    // Fetch the index file from your repository
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Filter your database items for titles, descriptions, or keywords that match the query
            const matches = data.filter(item => {
                return item.title.toLowerCase().includes(query) || 
                       item.description.toLowerCase().includes(query) ||
                       item.keywords.some(keyword => keyword.toLowerCase().includes(query));
            });

            displayResults(matches);
        })
        .catch(error => {
            console.error('Error loading search index:', error);
            resultsContainer.innerHTML = '<p class="error">Error loading search database.</p>';
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No matches found for your search query.</p>';
        return;
    }

    results.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item';
        resultDiv.innerHTML = `
            <a href="${item.url}" class="result-title" target="_blank">${item.title}</a>
            <div class="result-url">${item.url}</div>
            <p class="result-desc">${item.description}</p>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}
