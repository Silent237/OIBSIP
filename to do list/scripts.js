document.addEventListener('DOMContentLoaded', () => {
    const addTodoButton = document.getElementById('add-todo-button');
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const todoTime = document.getElementById('todo-time');
    const todoDescription = document.getElementById('todo-description');
    const pendingTasksList = document.getElementById('pending-tasks-list');
    const taskCount = document.getElementById('task-count');
    const progressCircle = document.getElementById('progress-circle');
    const completedTasksChart = [
        document.getElementById('bar-1'),
        document.getElementById('bar-2'),
        document.getElementById('bar-3')
    ];
    const scheduleList = document.getElementById('schedule-list');
    const currentDateElement = document.getElementById('current-date');
    const projectTimeTracker = document.getElementById('project-time-tracker');
    let totalTasks = 0;
    let completedTasks = 0;

    addTodoButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        const todoDueDate = todoDate.value;
        const todoDueTime = todoTime.value;
        const todoDesc = todoDescription.value.trim();

        if (todoText !== '' && todoDueDate !== '' && todoDueTime !== '') {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');

            const todoDetails = document.createElement('span');
            todoDetails.textContent = `${todoText} - ${todoDueDate} ${todoDueTime}`;

            const descriptionDetails = document.createElement('div');
            descriptionDetails.textContent = `Description: ${todoDesc}`;
            descriptionDetails.style.marginTop = '5px';

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                pendingTasksList.removeChild(todoItem);
                totalTasks--;
                updateTaskCount();
                updateProgress();
            });

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                pendingTasksList.removeChild(todoItem);
                totalTasks--;
                completedTasks++;
                updateTaskCount();
                updateProgress();
                updateChart();
            });

            todoItem.appendChild(todoDetails);
            todoItem.appendChild(descriptionDetails);
            todoItem.appendChild(completeButton);
            todoItem.appendChild(deleteButton);
            pendingTasksList.appendChild(todoItem);

            // Add task to today's schedule if the date matches today's date
            const now = new Date();
            const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            if (todoDueDate === today) {
                const scheduleItem = document.createElement('li');
                scheduleItem.textContent = `${todoDueTime} - ${todoText}`;
                scheduleList.appendChild(scheduleItem);
            }

            totalTasks++;
            updateTaskCount();
            updateProgress();

            todoInput.value = '';
            todoDate.value = '';
            todoTime.value = '';
            todoDescription.value = '';
        }
    }

    function updateTaskCount() {
        taskCount.textContent = totalTasks;
    }

    function updateProgress() {
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        progressCircle.textContent = `${progress}%`;
    }

    function updateChart() {
        const maxBars = completedTasksChart.length;
        const tasksPerBar = Math.ceil(completedTasks / maxBars);
        completedTasksChart.forEach((bar, index) => {
            const height = completedTasks > index * tasksPerBar ? 100 : 0;
            bar.style.height = `${height}%`;
        });
    }

    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function updateCurrentDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString(undefined, options);
    }

    function startProjectTimer() {
        let seconds = 0;
        setInterval(() => {
            seconds++;
            const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            projectTimeTracker.textContent = `${hours}:${minutes}:${secs}`;
        }, 1000);
    }

    setInterval(updateClock, 1000);
    updateClock(); 
    updateCurrentDate();
    startProjectTimer();
});
