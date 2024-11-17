// Load a single article based on the 'id' query parameter
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');


function load() {
    

    fetch('/articlejs/article-db.json')
        .then(response => response.json())
        .then(data => {
            if (data[myParam]) {
                // Update the page title and content for a single article
                document.getElementById("pgtitle").innerHTML = `${data[myParam].metadata.title} | The Open News Project`;
                document.getElementById("pgbody").innerHTML = 
                    `<h4>Written By ${data[myParam].metadata.author} on ${data[myParam].metadata.month_name} ${data[myParam].metadata.day}, ${data[myParam].metadata.year}</h4>${data[myParam].content}`;
                document.getElementById('article-title').innerHTML = data[myParam].metadata.title;
                } else {
                console.error("Article not found.");
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// Load all articles and display them in a stacked format
// Load all articles and display them in a stacked format
function check() {
    fetch('/articlejs/article-db.json')
        .then(response => response.json())
        .then(data => {
            window.articlesData = data; // Store the fetched articles globally
            displayArticles(data); // Display all articles initially
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// Display articles in pgbody
function displayArticles(data) {
    document.getElementById("pgbody").innerHTML = ''; // Clear current content

    // Get article IDs, sort them in descending order
    const sortedArticleIds = Object.keys(data).sort((a, b) => b - a);

    sortedArticleIds.forEach(articleId => {
        const article = data[articleId];
        const articleHTML = `
            <a href="/article/?id=${articleId}" style="color:#000; text-decoration:none;"><div class="article">
                <h1>${article.metadata.title}</h1>
                <h4>${article.metadata.description}</h4>
                <p style="color: #333;">
                    By ${article.metadata.author}, 
                    ${article.metadata.month_number}/${article.metadata.day}/${article.metadata.year}
                </p>
            </div></a>
            <hr>
        `;
        document.getElementById("pgbody").innerHTML += articleHTML; // Append each article
    });
}

// Search articles based on user input
function searchArticles() {
    const query = document.getElementById("searchInput").value.toLowerCase(); // Get search input

    if (!query) {
        displayArticles(window.articlesData); // If no query, show all articles
        return;
    }

    // Filter articles based on query
    const filteredArticles = Object.keys(window.articlesData)
        .filter(articleId => {
            const article = window.articlesData[articleId];
            const title = article.metadata.title.toLowerCase();
            const description = article.metadata.description.toLowerCase();
            return title.includes(query) || description.includes(query); // Match title or description
        })
        .reduce((obj, articleId) => {
            obj[articleId] = window.articlesData[articleId];
            return obj;
        }, {});

    displayArticles(filteredArticles); // Display filtered articles
}
