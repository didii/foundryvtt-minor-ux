let isCtrlDown = false;
let isAltDown = false;

let selectors = [
    '#chat-log .card-buttons button', // chat buttons
    '#chat-log .minor-qol-roll-damage-button', // chat buttons
    '.actor .item-image', // item in actor window
    '.actor .item-buttons button', // item buttons in sheet
].join(', ');

function setState() {
    let action;
    if (!isCtrlDown && !isAltDown) { // both down -> normal
        action = (el) => el.removeAttribute('data-rolltype');
    } else if (isCtrlDown) { // ctrl down -> disadvantage
        action = (el) => el.setAttribute('data-rolltype', 'disadvantage');
    } else { // alt down or both down -> advantage
        action = (el) => el.setAttribute('data-rolltype', 'advantage');
    }
    let elements = document.querySelectorAll(selectors);
    elements.forEach((el) => action(el));
}

document.addEventListener('keydown', (keyEvent) => {
    if (!isCtrlDown && keyEvent.keyCode === 17) { // Ctrl
        isCtrlDown = true;
        setState();
    }

    if (!isAltDown && keyEvent.keyCode === 18) { // Alt
        isAltDown = true;
        setState();
    }
});

document.addEventListener('keyup', (keyEvent) => {
    if (isCtrlDown && keyEvent.keyCode === 17) { // Ctrl
        isCtrlDown = false;
        setState();
    }

    if (isAltDown && keyEvent.keyCode === 18) { // Ctrl
        isAltDown = false;
        setState();
    }
});