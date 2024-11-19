function filterArticles() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const articles = document.querySelectorAll(".article");

    articles.forEach(article => {
        const title = article.querySelector(".title").textContent.toLowerCase();
        const authors = article.querySelector(".authors").textContent.toLowerCase();
        const keywords = article.querySelector(".keywords").textContent.toLowerCase();

        if (title.includes(query) || authors.includes(query) || keywords.includes(query)) {
            article.style.display = "";
        } else {
            article.style.display = "none";
        }
    });
}
