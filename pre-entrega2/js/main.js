//initialization, variables, functions and small details.
let date = new Date()
date = date.toDateString()
let title = document.getElementById("title");
title.innerHTML = `Gin Store - "7" | Today is ${date}`
let showcase = document.getElementById("shwcs");
let total = document.getElementById("cartTotal");
let totalContent = document.getElementById("cartTotalContent");
let previous = document.getElementById("previousCart");
let previousContent= document.getElementById("previousCartContent")
let closeCart = document.getElementById("closePCart");
let cartReboot = document.getElementById("rebootCart")
const cartSave = (id, value) => {
    localStorage.setItem(id, value)
};

const products = [{name: "Tanqueray", price: 5, img: "./img/1.png"}, 
                {name: "Beefeater", price: 4.5, img: "./img/2.png"}, 
                {name: "Seagrams", price: 5, img: "./img/3.png"}, 
                {name: "Larios", price: 4, img: "./img/4.png"}, 
                {name: "Bombay", price: 5.5, img: "./img/5.png"}];

var cart = JSON.parse(localStorage.getItem("cartState")) || [];

//main program.
products.forEach((product) => {
    let content = document.createElement("div");
    content.innerHTML = `
                        <img src="${product.img}"></img>
                        <h3>${product.name}</h3>
                        <h3>${product.price}</h3>
                        `;
                        showcase.append(content);
    let buy = document.createElement("button");
    buy.innerText = "buy";
    buy.className = "buy";
    content.appendChild(buy);
    buy.addEventListener("click", () => {
        Swal.fire({
            toast: true,
            position: 'center',
            icon: 'success',
            title: 'Item added!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        cart.push({
            id: product.name,
            amount: product.price,
            pic: product.img
        });
        cartSave("cartState", JSON.stringify(cart))
    });
});
//closes window and deletes cache data.
closeCart.addEventListener("click", () => {
    previousContent.style.display = "none";
    totalContent.style.display = "none";
    
});
//Brings the amount to pay.
total.addEventListener("click", () => {
    totalContent.style.display = "block"
    const checkout = cart.reduce((acc, el) => acc + el.amount, 0);
    totalContent.innerHTML = ""
    let display = document.createElement("h2");
    display.innerHTML = `${checkout} euro.`
    totalContent.append(display);
    console.log(checkout);
});

//Shows previous cart data
previous.addEventListener("click", () => {
    previousContent.style.display = "flex"
    const state = JSON.parse(localStorage.getItem("cartState"));
    previousContent.innerHTML = "";
    state.forEach((product) => {
    let display = document.createElement("div");
    display.innerHTML = `
                        <img src="${product.pic}"></img>
                        <h3>${product.id}<h3>
                        <h3>${product.amount} euro.<h3>
                        `;
                        previousContent.append(display);
                        
    });
});

cartReboot.addEventListener("click", () => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Your cart has been deleted',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
    
    localStorage.clear();
    cart = [];
})



