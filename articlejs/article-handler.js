import "./article-db.json";

function load()
{
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    fetch('./article-db.json')
            .then(response => response.json())
            .then(data => {
                document.getElementById("pgtitle").innerHTML = `${data.metadata.title} | The Open News Project`;
                document.getElementById("pgbody").innerHTML = data.content
            })
            .catch(error => console.error('Error fetching JSON:', error));
}