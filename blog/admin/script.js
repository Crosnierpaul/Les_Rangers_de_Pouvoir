document.getElementById('articleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;

    var article = {
        title: title,
        content: content
    };

    // Supprimer l'article du localStorage
    localStorage.removeItem('articles');

    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));

    alert('Article enregistré avec succès !');

    // Rediriger vers la page principale après enregistrement
    window.location.href = '../public/index.html';
});
