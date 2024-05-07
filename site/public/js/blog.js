const articlesList = document.getElementById('articlesList');

//----------- Requête Articles  -----------//
async function loadArticles() {
    try {
        // Récupérer les articles depuis le serveur
        const response = await fetch('/articles');
        const articles = await response.json();

        // Afficher les articles sur la page
        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `
                <h2>${article.title}</h2>
                ${article.image ? `<p style="float: left;"><img src="${article.image}" alt="Image de l'article"></p>` : ''}
                <p>${article.content}</p>
                <div style="clear: both;"></div>
            `;
            articlesList.appendChild(articleDiv);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des articles :', error);
    }
}

document.addEventListener('DOMContentLoaded', loadArticles);