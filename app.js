//select elements

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");

function renderProducts(){
    foods.forEach((product) => {
        productsEl.innerHTML += `
        <div class="item">
          <div class="item-container">
            <div class="item-img">
              <img src="${product.imgSrc}" alt="${product.name}" />
            </div>
            <div class="desc">
              <h2>${product.name}</h2>
              <h2>${product.kcal}</h2>
              <p>${product.description}</p>
            </div>

            <div class="add-to-cart" onclick="addToCart(${product.id})">
              <img src="foodImages/bag-plus.png" alt="add to cart" />
            </div>
          </div>
        </div>
        `;
    });
}

renderProducts();

//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();



//ADD to cart
function addToCart(id){
    //check if food already exists in cart
    if(cart.some((item) => item.id === id)){
        changeNumberOfUnits("plus", id);
    }
    else{
        const item = foods.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits : 1
        });
     
        
    }
  updateCart();
}


//update cart

function updateCart(){
    renderCartItems();
    renderSubtotal();
    //save cart to local storage

    localStorage.setItem("CART", JSON.stringify(cart))
}

//calculate and render subtotal
function renderSubtotal(){
    let totalKcal=0, totalItems = 0;
cart.forEach((item)=>{
    totalKcal += item.kcal * item.numberOfUnits;
    totalItems += item.numberOfUnits;
})
subtotalEl.innerHTML = `Total : ${totalKcal} kcal`
}


//render cart items
function renderCartItems(){
    cartItemsEl.innerHTML = ""; //clear cart el
    cart.forEach((item) =>{
        cartItemsEl.innerHTML +=`
        <div class="cart-item">
            <div class="item-info" onclick = "removeItemFromCart(${item.id})">
              <img src="${item.imgSrc}" alt="${item.name}" />
              <h4>${item.name}</h4>
            </div>
            <div class="unit-price">${item.kcal}</div>
            <div class="units">
              <div class="btn minus" onclick = "changeNumberOfUnits('minus', ${item.id})">-</div>
              <div class="number">${item.numberOfUnits}</div>
              <div class="btn plus" onclick = "changeNumberOfUnits('plus', ${item.id})">+</div>
            </div>
          </div>
        `
    })
}


//remove item from cart
function removeItemFromCart(id){
   cart = cart.filter((item) => item.id !== id);
    updateCart();
}



//change number of units for item

function changeNumberOfUnits(action, id){
  cart =  cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if(item.id === id ){
        if(action === "minus"&& numberOfUnits > 1){
            numberOfUnits--;
        }
     if(action === "plus"){
            numberOfUnits++;
        }
    }
        return {
            ...item,
            numberOfUnits,
        };
    })
    updateCart();
}
//getting the calories and giving alert if eaten more than submitted

// const kcal = document.getElementById("txtCalories");
// const btn1 = document.getElementById("submitBtn");
// let calories;


//   calories =  btn1.addEventListener('click', getCalories);






 function EatTheFood(){
    var totalCalories = 0;
    cart.forEach((item)=>{
        totalCalories += item.kcal * item.numberOfUnits;
        
    })
    var calories = document.getElementById('txtCalories').value;
     if(totalCalories > calories){
        swal("Oh no!", "You eat too much!", "error");
     }
     else{
        swal("Good job!", "You are sticking to the diet!", "success");
     }
    
 }