const newTaskButton = () => {
    overlay.classList.add('active');
    createTask.classList.add('active');
}

const closeModal = () => {
    overlay.classList.remove('active');
    createTask.classList.remove('active');
}

const getTask = () => {
    fetch('http://localhost:3000/task')
        .then(res => res.json())
        .then(data => {
            insertTask(data)
        })
}

getTask();

const insertTask = (taskList) => {
    if (taskList.length > 0) {
        listTasks.innerHTML = '';
        taskList.map(task => {
            listTasks.innerHTML +=
                `<li>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="actions">
                    <img src="./images/edit.png" alt="editar" onclick="editTask(this)">
                    <img src="./images/trash.png" alt="lixeira" onclick="deleteTask(${task.id})">
                </div>
            </li>
            `;
        });
    }
}

const createTaskFunction = () => {
    event.preventDefault();
    let task = {
        title: titulo.value,
        description: descricao.value
    }
    fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(res => res.json())
        .then(data => {
            getTask();
            let form = document.querySelector('#createTask form');
            form.reset();
        })
    closeModal();
}



const deleteTask = (id) => {
    fetch(`http://localhost:3000/task/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            getTask();
        })
};

const exportTask = () => {
    console.log(getTaskHtml.value);
    let tasks = document.querySelectorAll('ul li');
    if (getTaskHtml.value.length > 0) {
        tasks.forEach(task => {
            if (!task.children[1].innerText.includes(getTaskHtml.value) && !task.children[0].innerText.includes(getTaskHtml.value)) {
                task.classList.add('hidden');
            } else {
                task.classList.remove('hidden');
            }
        });
    } else {
        tasks.forEach(task => {
            task.classList.remove('hidden');
        });
    }
}
