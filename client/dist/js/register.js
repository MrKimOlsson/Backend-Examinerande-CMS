const registerForm = document.querySelector('#registerForm');

const handleSubmit = async (e) => {
  e.preventDefault()

  if(validateForm(registerForm)) return

  const token = localStorage.getItem('token')

  const res = await fetch('http://localhost:8082/api/users/add', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      firstName: registerForm.firstName.value,
      lastName: registerForm.lastName.value,
      adress: registerForm.lastName.value,
      password: registerForm.password.value
    })
  })

  console.log(res)
  if(res.status != 201) {
    const data = await res.json()
    console.log(data)
    document.querySelector('#error').innerText = data.message
    return
  }
  
  location.assign('users.html')
}

registerForm.addEventListener('submit', handleSubmit)



const addError = (element, message) => {
  const errorElement = element.parentElement.querySelector('.form-error');
  errorElement.innerText = message
  return false
}
const success = (element) => {
  const errorElement = element.parentElement.querySelector('.form-error');
  errorElement.innerText = ''
}



const validateForm = (form) => {

  for(let i = 0; i < form.length; i++) {
    success(form[i])
  }

  const errors = []

  if(form.firstName.value.trim() === '') {
    if(!addError(form.firstName, 'you need to enter a name')) errors.push(false)
  }
  else if(form.firstName.value.trim().length < 2) {
    if(!addError(form.firstName, 'the name must be 2 chars or more')) errors.push(false)
  }
  if(form.lastName.value.trim() === '') {
    if(!addError(form.lastName, 'you need to enter a name')) errors.push(false)
  }
  if(form.password.value.trim() === '') {
    if(!addError(form.password, 'you need to enter a password')) errors.push(false)
  }
  if(form.password.value !== registerForm.confirmPassword.value) {
    if(!addError(form.confirmPassword, 'passwords do not match')) errors.push(false)
  }

  return errors.includes(false)

}