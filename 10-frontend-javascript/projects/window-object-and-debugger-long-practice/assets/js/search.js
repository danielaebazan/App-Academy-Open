export function findElementById(id) {
    // Return the element in the DOM with corresponding `id`

    // Your code here
    let check = function (ele) {
        return checkById(ele, id)
    }
    return deepTraverseSearch(document, check, "first");
}

export function findFirstElementOfTag(tag) {
    // Return the first occurence of an element of tag name `tag`

    // Your code here
    let check = function (ele) {
        return checkByTag(ele, tag)
    }
    return deepTraverseSearch(document, check, "first");
}

export function findFirstElementOfClass(cls) {
    // Return the first occurence of an element of class `cls`

    // Your code here
    let check = function (ele) {
        return checkByTag(ele, tag)
    }
    return deepTraverseSearch(document, check, "first");

}

export function findElementsOfTag(tag) {
    // Return an array of elements that have a tag name of `tag`

    // Your code here
    let check = function (ele) {
        return checkByTag(ele, tag)
    }
    return deepTraverseSearch(document, check, "all");
}

export function findElementsOfClass(cls) {
    // Return an array of elements that have are of class `cls`

    // Your code here       
    let check = function (ele) {
        return checkByClass(ele, cls)
    }
    return deepTraverseSearch(document, check, "all");
}

function deepTraverseSearch(doc, check, mode) {
    //console.log('starting deepSearch, doc, check, mode:\n\n', doc + "\n\n" + check + "\n\n" + mode + "\n\n\n");
    // doc = window.document as nested array =tree to search in
    // check - function (element) with search criteria
    // mode = 'first' or 'all'
    //console.log('doc to search:', doc);
    const stack = []
    const found = []
    // Put the starting node on a stack
    let root = doc.children[0]
    stack.push(root); // Doc only 1 children = HTML   
    // While the stack is not empty
    while (stack.length > 0) {

        // Pop a node and check it, store if ok
        let node = stack.pop();
        let checkResult = check(node)

        if (checkResult) {
            if (mode === 'first') {
                return node;
            } else if (mode === 'all') {
                found.push(node)
            } else {
                console.log("wrong check 3rd parameter, need mode ='first' or 'all'")
            }
        }


        // Put all of the node's children on the top of the stack
        // doing this from last branch to first for scanning up to down
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
        }
    }

    return found // array of searched elements;
}

// checking functions:

function checkById(ele, id) {
    return ele.id === id;
}
function checkByTag(ele, tag) {
    return ele.tagName === tag;
}
function checkByClass(ele, cls) {
    return ele.classList.contains(cls);
}