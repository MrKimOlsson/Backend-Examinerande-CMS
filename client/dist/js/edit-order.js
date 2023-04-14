const id = new URLSearchParams(window.location.search).get('id')
const editForm = document.querySelector('#editForm')
const deleteBtn = document.querySelector('#deleteBtn');
const modal = document.querySelector('#modal');
console.log(id)

const handleDelete = async (e) => {
  const token = localStorage.getItem('token')

  const res = await fetch('http://localhost:8082/api/orders/' + id, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })

  console.log(res)

  if(res.status != 200) {
    modal.querySelector('#modal-error').innerText = 'Någonting gick fel'
    return
  }
  
  location.assign('index.html')
}

const getPost = async () => {
    const token = localStorage.getItem('token')
  const res = await fetch('http://localhost:8082/api/orders/user' , {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
//     body: JSON.stringify({
//         title: editForm.title.value,
//         description: editForm.description.value,
//         price: editForm.price.value,
//         imgURL: editForm.imgURL.value,

        
//   })
})
const data = await res.json();
// console.log(data[1].orderList)
// orderList = data[1]
console.log(data[0])
productList = []
productList.push(data[0].orderList)

productList.forEach(product => {
    console.log('products:')
    product.forEach(item => {
        console.log(item)
    })
});
console.log('User:')
console.log(data[0].user.firstName)
console.log(data[0].user.lastName)
// console.log(orderList[1])
  

//   editForm.orderList.product.title.value = data.title,
//   editForm.orderList.product.description.value = data.description;
//   editForm.orderList.product.price.value = data.price;
//   editForm.orderList.product.imgURL.value = data.imgURL;

}
getPost()


editForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const token = localStorage.getItem('token')

  const res = await fetch('http://localhost:8082/api/orders/user', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      title: editForm.orderList.product.title.value,
      description: editForm.description.value,
      price: editForm.price.value,
      imgURL: editForm.imgURL.value,
    })
  })

  if(res.status != 200) {
    const data = await res.json()
    console.log(data)
    document.querySelector('#error').innerText = data.message
    return
  }
  
  location.assign('index.html')
})


deleteBtn.addEventListener('click', () => {
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

modal.querySelector('#yBtn').addEventListener('click', handleDelete)

