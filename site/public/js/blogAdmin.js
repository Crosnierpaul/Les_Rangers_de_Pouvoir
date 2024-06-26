//----------- Requête Create  -----------//
document.getElementById('articleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imageData = event.target.result;

            var article = {
                title: title,
                content: content,
                image: imageData
            };

            fetch('/articles/Create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Article enregistré avec succès !', data);
                alert('Article enregistré avec succès !');
                // Vous pouvez rediriger l'utilisateur vers une autre page ici si nécessaire
            })
            .catch(error => {
                console.error('Erreur lors de l\'enregistrement de l\'article :', error);
                alert('Une erreur est survenue lors de l\'enregistrement de l\'article.');
            });
        };

        reader.readAsDataURL(imageFile);
    } else {
        var article = {
            title: title,
            content: content
        };

        fetch('/articles/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Article enregistré avec succès !', data);
            alert('Article enregistré avec succès !');
            // Vous pouvez rediriger l'utilisateur vers une autre page ici si nécessaire
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement de l\'article :', error);
            alert('Une erreur est survenue lors de l\'enregistrement de l\'article.');
        });
    }
});

//----------- Requête Delete -----------//
document.getElementById('deleteArticleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var articleTitleToDelete = document.getElementById('articleTitleToDelete').value.trim();

    if (articleTitleToDelete === '') {
        alert('Veuillez saisir un titre d\'article.');
        return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        fetch('/articles/Delete/' + encodeURIComponent(articleTitleToDelete), {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Article supprimé avec succès !');
                alert('Article supprimé avec succès !');
                // Actualiser la page ou effectuer d'autres actions si nécessaire
            } else {
                console.error('Erreur lors de la suppression de l\'article :', response.statusText);
                alert('Une erreur est survenue lors de la suppression de l\'article.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de l\'article :', error);
            alert('Une erreur est survenue lors de la suppression de l\'article.');
        });
    }
});

//----------- Requête Search -----------//
document.getElementById('searchArticleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var searchTitle = document.getElementById('searchTitle').value.trim();

    fetch(`/articles/${searchTitle}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Aucun article trouvé avec ce nom.');
            }
            return response.json();
        })
        .then(article => {
            document.getElementById('editTitle').value = article.title;
            document.getElementById('editContent').value = article.content;

            alert('Article trouvé avec succès !');
        })
        .catch(error => {
            console.error('Erreur lors de la recherche de l\'article :', error);
            alert('Aucun article trouvé avec ce nom.');
        });
});

//----------- Requête Update -----------//
document.getElementById('editArticleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('editTitle').value.trim();
    var content = document.getElementById('editContent').value;
    var imageFile = document.getElementById('editImage').files[0];

    var article = {
        content: content
    };

    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imageData = event.target.result;
            article.image = imageData;

            fetch(`/articles/${encodeURIComponent(title)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Article modifié avec succès !');
                    alert('Article modifié avec succès !');
                    // Actualiser la page ou effectuer d'autres actions si nécessaire
                } else {
                    console.error('Erreur lors de la modification de l\'article :', response.statusText);
                    alert('Une erreur est survenue lors de la modification de l\'article.');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la modification de l\'article :', error);
                alert('Une erreur est survenue lors de la modification de l\'article.');
            });
        };

        reader.readAsDataURL(imageFile);
    } else {
        fetch(`/articles/${encodeURIComponent(title)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        })
        .then(response => {
            if (response.ok) {
                console.log('Article modifié avec succès !');
                alert('Article modifié avec succès !');
                // Actualiser la page ou effectuer d'autres actions si nécessaire
            } else {
                console.error('Erreur lors de la modification de l\'article :', response.statusText);
                alert('Une erreur est survenue lors de la modification de l\'article.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la modification de l\'article :', error);
            alert('Une erreur est survenue lors de la modification de l\'article.');
        });
    }
});