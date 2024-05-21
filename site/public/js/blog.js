// blog.js
const articlesList = document.getElementById('articlesList');

async function loadArticles() {
    try {
        const response = await fetch('/articles');
        const articles = await response.json();

        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `
                <h2 id="article-${article._id}">${article.title}</h2>
                ${article.image ? `<p style="float: left;"><img src="${article.image}" alt="Image de l'article"></p>` : ''}
                <p>${article.content}</p>
                <button type="submit" onclick="toggleComments('${article._id}')">Afficher les commentaires</button>
                <div id="comments-${article._id}" class="comments-section" style="display: none;">
                    ${article.comments.map(comment => `
                        <p><strong>${comment.username}:</strong> ${comment.text}</p>
                            `).join('')}
                            <button type="submit" onclick="toggleCommentForm('${article._id}')">Ajouter un commentaire</button>
                            <div id="commentForm-${article._id}" class="comment-form" style="display: none;">
                                <form action="/articles/${article._id}/comments" method="post" onsubmit="postComment(event, '${article._id}')">
                                    <input type="text" name="username" placeholder="Votre nom" required>
                                    <textarea name="text" placeholder="Votre commentaire" required></textarea>
                                    <input type="hidden" name="articleId" value="${article._id}">
                                    <button type="submit">Poster</button>
                                </form>
                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    `;
                    articlesList.appendChild(articleDiv);
                });
            } catch (error) {
                console.error('Erreur lors du chargement des articles :', error);
            }
        }
     
        function toggleComments(articleId) {
            const commentsSection = document.getElementById(`comments-${articleId}`);
            if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
                commentsSection.style.display = 'block';
            } else {
                commentsSection.style.display = 'none';
            }
        }
     
        function toggleCommentForm(articleId) {
            const commentForm = document.getElementById(`commentForm-${articleId}`);
            if (commentForm.style.display === 'none' || commentForm.style.display === '') {
                commentForm.style.display = 'block';
            } else {
                commentForm.style.display = 'none';
            }
        }
     
        async function postComment(event, articleId) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
     
            try {
                const response = await fetch(`/articles/${articleId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formData.get('username'),
                        text: formData.get('text')
                    })
                });
     
                if (response.ok) {
                    window.location.hash = `#article-${articleId}`;
                    window.location.reload();
                } else {
                    console.error('Erreur lors de la soumission du commentaire');
                }
            } catch (error) {
                console.error('Erreur lors de la soumission du commentaire :', error);
            }
        }
     
        document.addEventListener('DOMContentLoaded', loadArticles);
     