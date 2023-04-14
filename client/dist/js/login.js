const loginForm = document.querySelector('#loginForm');
const error = document.querySelector('#error')
const loginBtn = document.querySelector('#loginBtn')

const handleLogin = async (e) => {
  e.preventDefault()

  if(loginForm.email.value.trim() === '' || loginForm.password.value.trim() === ''){
    error.innerText = 'You need to enter all the fields'
    return
  }
  error.innerText = ''

  loginBtn.innerText = 'Loading...'
  loginBtn.setAttribute('disabled', 'true')

  const res = await fetch('http://localhost:8082/api/users/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: loginForm.email.value,
      password: loginForm.password.value
    })
  })

  console.log(res)
  if(res.status !== 200) {
    const data = await res.json()
    error.innerText = data.message
    loginBtn.innerText = 'Login'
    loginBtn.removeAttribute('disabled')
    return
  }

  const token = await res.json()
  localStorage.setItem('token', token)
  location.replace('index.html')

}



loginForm.addEventListener('submit', handleLogin)