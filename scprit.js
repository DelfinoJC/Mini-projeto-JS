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
                    <img src="./images/trash.png" alt="lixeira" onclick="deleteTask(this)">
                </div>
            </li>
            `;
        });
    }
}