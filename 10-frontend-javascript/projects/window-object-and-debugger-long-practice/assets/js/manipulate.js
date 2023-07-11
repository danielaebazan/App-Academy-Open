export function changeTitle() {
    // Change the title of the page to "(Your name)'s Portfolio"
    document.head.children[2].innerText = "Daniela Bazán's Portafolio"
}

export function changeHeader() {
    // Change the name in the h1 of the page to your name
    document.body.children[0].children[0].innerText = "Daniela Bazán"
}

export function changeAboutMe() {
    /* Update the first paragraph in the About Me section with a small
     passage about yourself */

    document.body.children[1].children[1].innerText = "My name is Daniela Bazán"
    document.body.children[1].children[2].innerText = " This is some text for test purposes"
}