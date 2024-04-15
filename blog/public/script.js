var articles = JSON.parse(localStorage.getItem('articles')) || [];
var articlesList = document.getElementById('articlesList');

articles.forEach(function(article) {
    var articleDiv = document.createElement('div');
    articleDiv.innerHTML = '<h3>' + article.title + '</h3>' +
                           '<p>' + article.content + '</p>' +
                           '<hr>';
    articlesList.appendChild(articleDiv);
});
