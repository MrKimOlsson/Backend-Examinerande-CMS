// import jwt_decode from "jwt-decode";

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

const getProducts = async () => {
  const res = await fetch('http://localhost:8082/api/products')
  const products = await res.json()

  let productList = [];


  products.forEach(product => {
    console.log(product)
    

        document.querySelector('#output-products').insertAdjacentHTML('beforeend', `
        <h3>Product:</h3>
         <a href="edit.html?id=${product._id}" class="post">
            <div class="right">
                <div class="top">
                    <div>
                    <h4>${product.title}</h4>
                    <p>Price: ${product.price}</p>
                    <img src="${product.product.imgURL}"/>
                    </div>
                </div>
            </div> 
        </a>
    `)
    }) 



}
getProducts()


document.querySelector('#logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token')
  location.replace('login.html')
})