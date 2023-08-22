window.addEventListener('DOMContentLoaded', event => {
    alert('The DOM has loaded.');

    // Store references to event listeners
    const redInput = document.getElementById('red-input');
    const addItemButton = document.getElementById('add-item');
    const colorSelect = document.getElementById('color-select');

    const redInputListener = () => {
        if (redInput.value.toLowerCase() === 'red') {
            redInput.style.backgroundColor = 'red';
        } else {
            redInput.style.backgroundColor = 'transparent';
        }
    };

    const addItemButtonListener = () => {
        const listAddInput = document.getElementById('list-add');
        const listItemValue = listAddInput.value;

        if (listItemValue.trim() !== '') {
            const ul = document.querySelector('ul');
            const newLi = document.createElement('li');
            newLi.textContent = listItemValue;
            ul.appendChild(newLi);
            listAddInput.value = '';
        }
    };

    const colorSelectListener = () => {
        const section3 = document.getElementById('section-3');
        section3.style.backgroundColor = colorSelect.value;
    };

    // Add event listeners
    redInput.addEventListener('input', redInputListener);
    addItemButton.addEventListener('click', addItemButtonListener);
    colorSelect.addEventListener('change', colorSelectListener);

    const removeListenersButton = document.getElementById('remove-listeners');
    removeListenersButton.addEventListener('click', removeListeners);

    function removeListeners() {
        redInput.removeEventListener('input', redInputListener);
        addItemButton.removeEventListener('click', addItemButtonListener);
        colorSelect.removeEventListener('change', colorSelectListener);
        removeListenersButton.removeEventListener('click', removeListeners);
    }

    const readdListenersButton = document.getElementById('readd-listeners');
    readdListenersButton.addEventListener('click', readdListeners);

    function readdListeners() {
        redInput.addEventListener('input', redInputListener);
        addItemButton.addEventListener('click', addItemButtonListener);
        colorSelect.addEventListener('change', colorSelectListener);
    }

    const hoverDiv = document.getElementById('hover-div');
    hoverDiv.addEventListener('mouseenter', () => {
        hoverDiv.textContent = 'Hovering over';
    });

    hoverDiv.addEventListener('mouseleave', () => {
        hoverDiv.textContent = 'Hover over me';
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            alert('Space bar pressed!');
        }
    });

});

