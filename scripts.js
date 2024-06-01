$(document).ready(function() {
    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        let query = $('#search-input').val();
        if (query) {
            search(query);
        } else {
            alert("Please enter a search term.");
        }
    });
});

function search(query) {
    $('#results').html('<p>Loading...</p>');

    const apiKey = "YOUR_BING_API_KEY";
    const endpoint = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`;

    $.ajax({
        url: endpoint,
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
        success: function(data) {
            displayResults(data);
        },
        error: function() {
            $('#results').html('<p>Error fetching results. Please try again.</p>');
        }
    });
}

function displayResults(data) {
    $('#results').empty();
    if (data.webPages && data.webPages.value.length > 0) {
        data.webPages.value.forEach(function(item) {
            let resultItem = `
                <div class="result-item">
                    <h2>${item.name}</h2>
                    <p>${item.snippet}</p>
                    <a href="${item.url}" target="_blank">${item.url}</a>
                </div>
            `;
            $('#results').append(resultItem);
        });
    } else {
        $('#results').html('<p>No results found</p>');
    }
}
