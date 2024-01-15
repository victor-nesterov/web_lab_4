const savedList = JSON.parse(localStorage.getItem('draggableList')) || []
document.querySelector('.list').innerHTML = savedList.join('')

const draggables = document.querySelectorAll('.draggable')
const lists = document.querySelectorAll('.list')


draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
        saveToLocalStorage()
    })

    draggable.setAttribute('contentEditable', 'true');

    draggable.addEventListener('mousedown', (e) => {
        e.stopPropagation()
    });

    draggable.addEventListener('input', () => {
        saveToLocalStorage()
    });

    draggable.addEventListener('dblclick', () => {
        draggable.classList.toggle('clicked');
    });

})

lists.forEach(list => {
    list.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElelment = getDragAfterElement(list, e.clientY)
        const draggable = document.querySelector('.dragging')
        console.log(afterElelment)
        if(afterElelment == null){
            list.appendChild(draggable)
        }
        else {
            list.insertBefore(draggable, afterElelment)
        }
        
    })
})

function getDragAfterElement(list, y){
    const draggableElements = [...list.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        }
        else{
            return closest
        }

    }, {offset: Number.NEGATIVE_INFINITY }).element
}

function addDraggable() {
    var newDraggable = document.createElement('p');
    newDraggable.textContent = 'New'

    newDraggable.classList.add('draggable')
    newDraggable.draggable = true

    document.querySelector('.list').appendChild(newDraggable);
    
    const draggables = document.querySelectorAll('.draggable')

    newDraggable.addEventListener('dragstart', () => {
        newDraggable.classList.add('dragging')
    })

    newDraggable.addEventListener('dragend', () => {
        newDraggable.classList.remove('dragging')
        saveToLocalStorage()
    })

    newDraggable.setAttribute('contentEditable', 'true')

    newDraggable.addEventListener('mousedown', (e) => {
        e.stopPropagation()
    })

    newDraggable.addEventListener('input', () => {
        saveToLocalStorage()
    });

newDraggable.addEventListener('dblclick', () => {
        newDraggable.classList.toggle('clicked');
    });
}

function saveToLocalStorage() {
    const currentList = Array.from(document.querySelector('.list').children);
    const serializedList = currentList.map(item => item.outerHTML);
    localStorage.setItem('draggableList', JSON.stringify(serializedList));
}

function deleteClickedDraggables(){
    const clickedDraggables = document.querySelectorAll('.draggable.clicked');
    clickedDraggables.forEach(clickedDraggable => {
        clickedDraggable.remove();
    });

    saveToLocalStorage();
}