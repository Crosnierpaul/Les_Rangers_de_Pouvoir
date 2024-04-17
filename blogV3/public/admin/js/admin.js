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

            // Envoyer l'article à votre backend pour enregistrement dans la base de données
            // Exemple d'envoi avec fetch :
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
        // Si aucune image n'a été sélectionnée, enregistrer l'article sans image
        var article = {
            title: title,
            content: content
        };

        // Envoyer l'article à votre backend pour enregistrement dans la base de données
        // Exemple d'envoi avec fetch :
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


// Supprimer un article
document.getElementById('deleteArticleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var articleTitleToDelete = document.getElementById('articleTitleToDelete').value.trim();

    // Vérifier si un titre d'article a été saisi
    if (articleTitleToDelete === '') {
        alert('Veuillez saisir un titre d\'article.');
        return;
    }

    // Confirmation de la suppression de l'article
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        // Envoyer une requête DELETE à votre backend pour supprimer l'article
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
