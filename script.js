const input = document.querySelector('.input')
const addbtn = document.querySelector('.addbtn')
const taskcontainer = document.querySelector('.taskcontainer')
const taskremain = document.querySelector('.tr')
const progressFill = document.getElementById('progressFill')
const progressText = document.querySelector('.progress-text')
const progressPercent = document.querySelector('.progress-percent')

let count = 0
let totalTasks = 0
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function updateProgress() {
    const completed = totalTasks - count
    const percent = totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100)
    progressFill.style.width = `${percent}%`
    progressText.textContent = `${completed} of ${totalTasks} completed`
    progressPercent.textContent = `${percent}%`
    taskremain.textContent = `${count} task${count !== 1 ? 's' : ''} remaining`
}

function addTask(taskText) {
    const row = document.createElement('div')
    const tickbox = document.createElement('input')
    tickbox.type = 'checkbox'
    tickbox.classList.add('tickbox')
    row.append(tickbox)

    const span = document.createElement('span')
    span.textContent = taskText
    span.classList.add('span')
    row.append(span)

    const removebtn = document.createElement('button')
    removebtn.innerText = 'delete'
    removebtn.classList.add('deletebtn')
    row.append(removebtn)

    row.classList.add('row')
    taskcontainer.append(row)

    count++
    totalTasks++
    updateProgress()

    tickbox.addEventListener('change', () => {
        if (tickbox.checked) {
            span.style.textDecoration = 'line-through'
            count--
        } else {
            span.style.textDecoration = 'none'
            count++
        }
        updateProgress()
    })

    removebtn.addEventListener('click', () => {
        if (!tickbox.checked) count--
        totalTasks--
        const index = tasks.indexOf(taskText)
        tasks.splice(index, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        row.remove()
        updateProgress()
    })
}

addbtn.addEventListener('click', () => {
    if (input.value.trim() === '') return
    tasks.push(input.value)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    addTask(input.value)
    input.value = ''
})

/
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addbtn.click()
})


tasks.forEach((taskText) => addTask(taskText))


