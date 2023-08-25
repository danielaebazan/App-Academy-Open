export const createCommentSection = () => {
    const container = document.querySelector(".container");

    const commentForm = createCommentForm();
    const commentsList = createCommentsList();

    container.appendChild(commentForm);
    container.appendChild(commentsList);
};

const createCommentsList = () => {
    // Create comments section
    const comments = document.createElement("div");
    comments.className = "comments";
    comments.style.border = "solid grey 1px";
    comments.style.height = "400px";
    comments.style.width = "80%";
    comments.style.margin = "10px";
    comments.style.padding = "5px";
    comments.style.overflow = "scroll";

    return comments;
};

const createCommentForm = () => {
    // Create form
    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";
    commentForm.style.margin = "20px";
    commentForm.style.display = "flex";
    commentForm.style.width = "100%";
    commentForm.style.justifyContent = "center";
    commentForm.style.alignItems = "center";

    commentForm.appendChild(createCommentInput());
    commentForm.appendChild(createCommentSubmitBtn());

    return commentForm;
};

const createCommentInput = () => {
    // Create comment input
    const userCommentContainer = document.createElement("div");
    userCommentContainer.className = "user-comment-container";
    userCommentContainer.style.marginRight = "10px";

    const label = document.createElement("label");
    label.setAttribute("for", "user-comment");
    label.innerText = "Comment: ";

    const commentInput = document.createElement("input");
    commentInput.id = "user-comment";
    commentInput.name = "user-comment";
    commentInput.placeholder = "Add a comment... ";
    commentInput.required = true;

    userCommentContainer.appendChild(label);
    userCommentContainer.appendChild(commentInput);

    return userCommentContainer;
};

const createCommentSubmitBtn = () => {
    // Create submit button
    const submitBtn = document.createElement("input");
    submitBtn.id = "submit-comment"
    submitBtn.type = "submit";
    submitBtn.value = "Submit";

    submitBtn.addEventListener('click', submitComment);

    return submitBtn;
};

const submitComment = e => {
    e.preventDefault();
    const commentInput = document.querySelector('#user-comment');
    const commentText = commentInput.value;
    createComment(commentText); // Create the comment box
    saveComment(commentText); // Save the comment to localStorage
    commentInput.value = "";
};

const createComment = (commentText) => {
    const newCommentContainer = document.createElement('div');
    newCommentContainer.style.display = "flex";
    newCommentContainer.style.flexDirection = "column"; // Align comment box and delete button vertically
    newCommentContainer.style.margin = "10px";

    const commentBox = document.createElement("div");
    commentBox.style.display = "flex";
    commentBox.style.alignItems = "center";
    commentBox.style.padding = "5px";
    commentBox.style.border = "1px solid #ccc";
    commentBox.style.borderRadius = "5px";
    commentBox.style.backgroundColor = "#f5f5f5";

    const newComment = document.createElement("p");
    newComment.innerText = commentText;

    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-button";
    deleteButton.style.marginLeft = "15px";
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', e => {
        // Remove comment from HTML DOM
        newCommentContainer.remove();
        // Remove comment from localStorage
        removeComment(commentText);
    });

    commentBox.appendChild(newComment);
    commentBox.appendChild(deleteButton);
    newCommentContainer.appendChild(commentBox);

    const comments = document.querySelector(".comments");
    comments.appendChild(newCommentContainer);
};


export const resetComments = () => {
    const comments = document.querySelector(".comments");
    Array.from(comments.children).forEach(child => child.remove());
};


// Load comments from localStorage and populate the comments list
export const loadComments = () => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    storedComments.forEach(commentText => createComment(commentText));
};

// Save a new comment to localStorage
export const saveComment = commentText => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    storedComments.push(commentText);
    localStorage.setItem('comments', JSON.stringify(storedComments));
};