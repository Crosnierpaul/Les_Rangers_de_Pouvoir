var articles = JSON.parse(localStorage.getItem('articles')) || [];
var articlesList = document.getElementById('articlesList');

articles.forEach(function(article) {
    var articleDiv = document.createElement('div');
    articleDiv.innerHTML = '<h3>' + article.title + '</h3>' +
                           '<p>' + article.content + '</p>' +
                           (article.image ? '<img src="' + article.image + '" alt="Image de l\'article">' : '') + // Vérifie s'il y a une image dans l'article
                           '<hr>';
    articlesList.appendChild(articleDiv);
});

