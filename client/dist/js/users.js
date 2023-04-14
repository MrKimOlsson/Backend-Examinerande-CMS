const output = document.querySelector('#output')
const modal = document.querySelector('#modal');

const getEmployees = async () => {
  const res = await fetch('http://localhost:8082/api/users', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })

  const employees = await res.json()
  console.log(employees)

  output.innerHTML = ''
  employees.forEach(employee => {

    const employeeElement = createEmployeeElement(employee)

    output.appendChild(employeeElement)

  })
}

getEmployees()

let activeId = null;

const createEmployeeElement = (employee) => {

  const employeeDiv = document.createElement('div')
  employeeDiv.className = 'employee'
  employeeDiv.id = 'emp'+employee._id

  const nameP = document.createElement('p')
  nameP.innerText = employee.admin
  ? employee.firstName + ' ' + employee.lastName + ' (A)'
  : employee.firstName + ' ' + employee.lastName

  const buttonsDiv = document.createElement('div')

  const editBtn = document.createElement('button')
  editBtn.className = 'btn btn-sm'

  const editIcon = document.createElement('i')
  editIcon.className = 'fa-solid fa-pen'

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'btn btn-sm'

  const deleteIcon = document.createElement('i')
  deleteIcon.className = 'fa-solid fa-trash'

  editBtn.appendChild(editIcon)
  deleteBtn.appendChild(deleteIcon)

  buttonsDiv.append(editBtn, deleteBtn)

  employeeDiv.append(nameP, buttonsDiv)


  editBtn.addEventListener('click', () => handleEdit(employee._id))
  deleteBtn.addEventListener('click', (e) => {
    modal.classList.remove('d-none')
    activeId = employee._id
  })

  return employeeDiv
}

const handleEdit = (id) => {
  location.assign('update.html?id='+id)
}
const handleDelete = async (activeId) => {
  const res = await fetch('http://localhost:8082/api/users/' + activeId, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })


  if(res.status != 204) {
    modal.querySelector('#modal-error').innerText = 'Something went wrong'
    return
  }

  modal.classList.add('d-none')
  document.querySelector('#emp' + activeId).remove()
}

modal.addEventListener('click', e => {
  if(e.target === e.currentTarget) {
    modal.classList.add('d-none')
  }
})

modal.querySelector('#nBtn').addEventListener('click', () => {
  modal.classList.add('d-none')
})

modal.querySelector('#yBtn').addEventListener('click', () => handleDelete(activeId))