import { menuArray } from "./data"

const itemsDiv = document.getElementById("items")
const orderDiv = document.getElementById("order")
const modal = document.getElementById('modal')
const nameInput = document.getElementById("name")
let order = []

function createMenu () {
    let menuHtml = ``
    menuArray.forEach((item) => {
        menuHtml += `
        <div class="item">
            <div class="item-details">
                <p class="emoji">${item.emoji}</p>
                <div class="item-info">
                    <h1 class="item-title">${item.name}</h1>
                    <p class="item-description">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <button class="add-item" data-btn="${item.id}">+</button>
        </div>
        `
    })
    itemsDiv.innerHTML = menuHtml
}

function renderOrder (){
    if (order.length === 0){
        orderDiv.innerHTML = ""
    }else {
        let totalPrice = 0
        let orderHtml = `<h1 class="your-order">Your order</h1>`
        order.forEach(function (foodItem) {
            orderHtml += `
            <div class="order-item">
                <div class="item-btn">
                    <h1 class="item-name">${foodItem.name}</h1>
                    <button data-remove="${foodItem.id}" class="remove">remove</button>
                </div>
                <h1 class="price">$${foodItem.price}</h1>
            </div>
            `
            totalPrice += foodItem.price
        })
        
        orderHtml += `
        <div class="order-item total">
            <h1>Total price:</h1>
            <h1>$${totalPrice}</h1>
        </div>
        <button class="submit" data-submit="submit">Complete order</button>
        `
        orderDiv.innerHTML = orderHtml
    }
}

function addItem(id) {
    const targetObj = menuArray.filter((obj) => obj.id === id)[0]
    if (!order.includes(targetObj)){
        order.push(targetObj)
    }
    
    
}

function removeItem(id){
    order = order.filter((obj) => obj.id !== id)
    console.log(order)
}

function completionMessage(name){
    orderDiv.innerHTML = `
    <div id="ending-message">
        <h1 id="ending-text">Thanks, ${name? name : "User"}! Your order is on its way!<h1>
    </div>
    `
}

document.addEventListener("click", function (event) {
    if (event.target.dataset.btn){
        const clickedItemID = parseInt(event.target.dataset.btn)
        createMenu()
        addItem(clickedItemID)
        renderOrder()
    }else if (event.target.dataset.remove){
        const removeItemId = parseInt(event.target.dataset.remove)
        createMenu()
        removeItem(removeItemId)
        renderOrder()
    }else if (event.target.dataset.submit){
        modal.style.visibility = "visible"
    }else if (event.target.dataset.card){
        modal.style.visibility = "hidden"
        createMenu()
        let userName = nameInput.value
        completionMessage(userName)
    }
})

createMenu()