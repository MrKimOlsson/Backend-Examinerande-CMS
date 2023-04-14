const createForm = document.querySelector('#createForm');

const handleSubmit = async (e) => {
  e.preventDefault()

  //tbd validera formuläret

  const token = localStorage.getItem('token')

  const res = await fetch('http://localhost:8082/api/products', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      title: createForm.title.value,
      imgURL: createForm.imgURL.value,
      description: createForm.description.value,
      price: createForm.price.value,
      // tags: createForm.tags.value.split(' '),
    })
  })

  console.log(res)
  if(res.status != 201) {
    const data = await res.json()
    console.log(data)
    document.querySelector('#error').innerText = data.message
    return
  }
  
  location.assign('index.html')
}

createForm.addEventListener('submit', handleSubmit)