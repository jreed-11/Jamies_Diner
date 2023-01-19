import {menuArray} from '/data.js'

const totalPriceEl = document.getElementById('total-price')
const modal = document.getElementById('card-details-modal')
let myOrderArray = [];
let totalPrice = 0;


// Click Functions //

document.addEventListener('click', function(e){
  if(e.target.dataset.item) {
    handleMenuClick(e.target.dataset.item)
  } else if(e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove)
  } else if(e.target.id === 'complete-order-btn'){
    modal.style.display = 'block'
  } else if(e.target.id === 'modal-close-btn') {
    modal.style.display = 'none'
  }
  
})



function handleMenuClick(itemId) {
  let targetItem = menuArray.filter(function(item){
    return  parseInt(itemId) === item.id
  })[0]

  

    if(!myOrderArray.includes(targetItem)){
      myOrderArray.push(targetItem)
      targetItem.quantity =1
    } else {
      targetItem.quantity++
    }

    totalPrice += targetItem.price
    totalPriceEl.textContent =`£${totalPrice}`

    // if(myOrderArray.length > 0) {
    //   // document.getElementById('order-section').classList.remove('hidden')
    //   // document.getElementById('order-display').classList.remove('hidden')
      
    // }

    // document.getElementById('your-order').classList.remove('hidden')
    // document.getElementById('order-item-details').classList.remove('hidden')
    // document.getElementById('item-quantity').textContent = `x${targetItem.quantity}`
    render()

}

// Remove Items //

function handleRemoveClick(item){
  let targetItem = menuArray.filter(function(removeItem){
    return  parseInt(item) === removeItem.id
  })[0]

  if(targetItem.quantity > 1){
    targetItem.quantity--
  } else {
    let itemIndex = myOrderArray.indexOf(targetItem)
    myOrderArray.splice(itemIndex, 1)
  }

  targetItem -= targetItem.price
  totalPriceEl.textContent = `£${totalPrice}`

  
  render()
}


// Get Menu Items //

function getMenuItems(){

let menuItems = ``

menuArray.forEach(function(item){
    
    menuItems += `
    <div class="menu-item">
        <div class="item-wrapper">
            <img src="${item.image}" class="item-img">
                <div class="item-detail" id="item-detail">  
                    <p class="item-name">${item.name}</p>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">£${item.price}</p>
                </div>
        </div>    
            <button class="item-btn" id="item-btn" data-item="${item.id}">+</button> 
        </div>
  
    <div class="item-divider"></div>
    `  
})
    return menuItems
    
}    

// My Order Section //

function yourOrder(){

  let orderHtml = ''

  myOrderArray.forEach(function(item){

    orderHtml += 
    `
      <div class="your-order" id="your-order">
          
          <div class="order-item-details">     
            <p class="order-item-name">${item.name}</p>
            <button class="order-remove-btn" data-remove="${item.id}">Remove</button>
            <p class="item-quantity">x ${item.quantity}</p>        
          </div>

          <div class="order-price-details">
            <p class="item-price">£${item.price * item.quantity}</p>
          </div>
        
      </div>

    
    `
  })

  return orderHtml

}

//Render to HTML //

function render(){
        document.getElementById('menu-section').innerHTML = getMenuItems()
        document.getElementById('order-display').innerHTML = yourOrder()
        
    }

render()
