window.onload = function () {
    // Create title 
    const title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Catstagram";
    document.body.appendChild(title);

    // Create main container
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    document.body.appendChild(mainContainer);

    let catImageContainer; // Declare the variable outside the fetch block

    // Fetch cat images
    const apiUrl = "https://api.thecatapi.com/v1/images/search";
    const apiKey = "live_1oHQQMsQbUJ0ytII569JOTJfPALR4Eia9fHUFwBcYjpUCtKIIggZv9J1qaVQLAzn";

    const headers = new Headers();
    headers.append("x-api-key", apiKey);

    fetch(apiUrl, { headers })
        .then(response => response.json())
        .then(data => {
            const catImageUrl = data[0].url;

            // Display the image
            catImageContainer = document.createElement("div");
            catImageContainer.id = "cat-image-container";

            const catImage = document.createElement("img");
            catImage.src = catImageUrl;
            catImage.alt = "Random cat";

            catImageContainer.appendChild(catImage);
            mainContainer.appendChild(catImageContainer);

            // Create the new img button
            const newImageButton = document.createElement("button");
            newImageButton.id = "new-image";
            newImageButton.textContent = "New Image";
            newImageButton.addEventListener("click", fetchNewCatImage);
            mainContainer.appendChild(newImageButton);

            // Popularity Score 
            const popularityScore = document.createElement("p");
            popularityScore.id = "popularity-score";
            popularityScore.textContent = "Popularity Score: 0";
            catImageContainer.appendChild(popularityScore);

            // Upvote and Downvote
            const upvoteDownvoteContainer = document.createElement("div");
            upvoteDownvoteContainer.id = "upvote-downvote-buttons";
            catImageContainer.appendChild(upvoteDownvoteContainer);

            const upvoteButton = document.createElement("button");
            upvoteButton.textContent = "Upvote";
            upvoteButton.addEventListener("click", upvote);
            upvoteDownvoteContainer.appendChild(upvoteButton);

            const downvoteButton = document.createElement("button");
            downvoteButton.textContent = "Downvote";
            downvoteButton.addEventListener("click", downvote);
            upvoteDownvoteContainer.appendChild(downvoteButton);

            let upvotes = 0;
            let downvotes = 0;

            function upvote() {
                upvotes++;
                updatePopularityScore();
            }

            function downvote() {
                downvotes++;
                updatePopularityScore();
            }

            function updatePopularityScore() {
                const score = upvotes - downvotes;
                popularityScore.textContent = `Popularity Score: ${score}`;
            }
        })
        .catch(error => console.error("Error fetching cat image:", error));

    function fetchNewCatImage() {
        // Fetch new cat image
        fetch(apiUrl, { headers })
            .then(response => response.json())
            .then(data => {
                const newCatImageUrl = data[0].url;

                // Update the image source
                catImage.src = newCatImageUrl;

                // Reset upvotes, downvotes, and comments
                resetPopularityScore();
            })
            .catch(error => console.error("Error fetching new cat image:", error));
    }

    function resetPopularityScore() {
        upvotes = 0;
        downvotes = 0;
        updatePopularityScore();
    }
    
    // Comment section
    const commentSection = document.createElement("div");
    commentSection.id = "comment-section";

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.id = "comment-input";
    commentInput.placeholder = "Enter your comment";

    const commentButton = document.createElement("button");
    commentButton.id = "comment-button";
    commentButton.textContent = "Add Comment";
    commentButton.addEventListener("click", addComment);

    // Append comment input and button to comment section
    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentButton);

    // Position the comment section at the bottom
    document.body.appendChild(commentSection);

    // Comment container
    const commentContainer = document.createElement("div");
    commentContainer.id = "comment-container";

    // Append comment container after comment section
    document.body.appendChild(commentContainer);

    // Function to add a comment
    function addComment() {
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
            const commentElement = document.createElement("p");
            commentElement.textContent = commentText;
            commentContainer.appendChild(commentElement);
            commentInput.value = ""; // Clear the input
        }
    }
};
