cartLength()

function cartLength(){
const count = JSON.parse(localStorage.getItem("allItem"));
const cart = document.getElementById("cartCount")
cartCount.innerHTML = count.length
}


function add(id){
  event.preventDefault();
const existingItem = JSON.parse(localStorage.getItem("allItem"))|| [];
const form = document.getElementById("myForm")
const itemImg = document.getElementById(`shop-item-cart-${id}`)
const itemName = document.getElementById(`shop-title-${id}`)
const itemPrice = document.getElementById(`shop-price-${id}`)
const itemQnt = document.getElementById(`shop-quantity-${id}`)

  let myItem ={
      image: itemImg.src,
      name: itemName.innerHTML,
      price: itemPrice.innerHTML,
      quantity: itemQnt.value,
    }
// function drawCard(image,name,price,quantity){
//   const card = document.getElementById("card")
//   const itemImg = document.createElement("img")
//   itemImg.setAttribute('src',image)
//   const itemName = document.createElement('p')
//   itemName.innerHTML=('name:'+name)
//   const itemPrice = document.createElement('p')
//   itemPrice.innerHTML=('price:'+price)
//   const itemQnt = document.createElement('p')
//   itemQnt.innerHTML=('qnt:'+quantity)
//   card.appendChild(itemImg)
//   card.appendChild(itemName)
//   card.appendChild(itemPrice)
//   card.appendChild(itemQnt)
// if(saveItem){
//   saveToStorage({ fullName: fullName, image, major, number });
//  }
//  }

     localStorage.setItem("allItem", JSON.stringify(myItem))
     sessionStorage.setItem("allItem", JSON.stringify(myItem))
     existingItem.push(myItem)
     localStorage.setItem("allItem", JSON.stringify(existingItem))
     sessionStorage.setItem("allItem", JSON.stringify(existingItem))
     cartLength()
}
