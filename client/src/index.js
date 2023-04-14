import jwt_decode from "jwt-decode";

const verifyToken = () => {
  try {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token);
    console.log(decoded)

    const now = + Date.now().toString().slice(0, 10)

    console.log('exp: ' + decoded.exp, 'now: ' + now)
    if (decoded.exp < now) {
      localStorage.removeItem('token')
      console.log('token expired')
      throw new Error('token expired')
    } else {
      console.log('token valid')
      if(decoded.admin)
        document.querySelector('#emp-link').classList.remove('d-none')
    }


  } catch (err) {
    console.log(err)
    location.replace('login.html')
  }
}
verifyToken()

const getOrders = async () => {
  const res = await fetch('http://localhost:8082/api/orders')
  const orders = await res.json()

  let productList = [];


  orders.forEach(order => {
    console.log(order)
    console.log(order.orderList)
    
    document.querySelector('#output').insertAdjacentHTML('beforeend', `
        <h2>Order by: ${order.user.firstName} ${order.user.lastName}</h2><br>
    `)

    order.orderList.forEach(product => {
        console.log(product.product.title)
        productList.push(product)

        document.querySelector('#output').insertAdjacentHTML('beforeend', `
         <a href="edit-order.html?id=${order._id}" class="post">
            <div class="right">
                    <div>
                    <h4>${product.product.title}</h4>
                    <p>Price: ${product.product.price}</p>
                    <p>Amount: ${product.amount}</p>
                    <img src="${product.product.imgURL}"/>
                    </div>
            </div> 
        </a>
    `)
    }) 

    document.querySelector('#output').insertAdjacentHTML('beforeend', `
    <h3>Deliver to:</h3>
    <a href="edit-order.html?id=${order._id}" class="post">
        <div class="right">
          <div class="top">
            <div>
              <h4>${order.user.firstName} ${order.user.lastName}</h4>
              <p>${order.user.adress}</p>
              </div>
          </div>
        </div> 
      </a><br><br>
    `)


  })

}
// getPosts()

const getProducts = async () => {
  const res = await fetch('http://localhost:8082/api/products')
  const products = await res.json()

  let productList = [];



  products.forEach(product => {
    console.log(product)
    

        document.querySelector('#output-products').insertAdjacentHTML('beforeend', `
         <br><a href="edit.html?id=${product._id}" class="post">
            <div class="right">
                <div class="top">
                    <div>
                    <h4>${product.title}</h4>
                    <p>Price: ${product.price}</p>
                    <p>Description: ${product.description}</p>
                    <img src="${product.imgURL}"/>
                    <p>Product ID: ${product._id}</p>
                    </div>
                </div>
            </div> 
        </a>
    `)
    }) 



}
// getProducts()


document.querySelector('#logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token')
  location.replace('login.html')
})

if(window.location.pathname === "/client/dist/products.html") {
  getProducts()
}
else{
  getOrders()
}