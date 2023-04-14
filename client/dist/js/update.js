const id = new URLSearchParams(window.location.search).get('id')
const updateForm = document.querySelector('#updateForm')
const adminBtn = document.querySelector('#adminBtn');


const getEmployee = async () => {
  const res = await fetch('http://localhost:8082/api/users/' + id, {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  const data = await res.json();

  updateForm.firstName.value = data.firstName;
  updateForm.lastName.value = data.lastName;

}
getEmployee()



const handleSubmit = async (e) => {
  e.preventDefault()

  const res = await fetch('http://localhost:8082/api/users/' + id, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      firstName: updateForm.firstName.value,
      lastName: updateForm.lastName.value
    })
  })

  if(res.status !== 200) {
    document.querySelector('#error').innerText = 'something went wrong'
    return
  }

  location.assign('employees.html')

}
updateForm.addEventListener('submit', handleSubmit)




const handleUpdate = async () => {
  const token = localStorage.getItem('token')

  const res = await fetch('http://localhost:8082/api/newadmin', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ adminId: id })
  })

  console.log(res)

  if(res.status != 201) {
    const data = await res.json()
    modal.querySelector('#modal-error').innerText = data.message
    return
  }
  
  location.assign('users.html')
}


adminBtn.addEventListener('click', () => {
  modal.classList.remove('d-none')
})

modal.addEventListener('click', e => {
  if(e.target === e.currentTarget) {
    modal.classList.add('d-none')
  }
})


modal.querySelector('#nBtn').addEventListener('click', () => {
  modal.classList.add('d-none')
})

modal.querySelector('#yBtn').addEventListener('click', handleUpdate)