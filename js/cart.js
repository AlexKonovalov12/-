class Product {
    constructor(productCard) {
        this.imageSrc = productCard.querySelector("img").src;
        this.name = productCard.querySelector(".product-name").innerText;
        this.price = productCard.querySelector(".product_price").innerText;
    }
}

class Cart {
    constructor() {
        this.products = [];
    }
    get count() {
        return this.products.length;
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(index) {
        this.products.splice(index, 1);
    }
    get cost() {
        const prices = this.products.map((product) => {
            return toNum(product.price);
        });
        const sum = prices.reduce((acc, num) => {
            return acc + num;
        }, 0);
        return sum;
    }

    get discount() {
        return this.cost - this.costDiscount;
    }
}

const cardAddArr = Array.from(document.querySelectorAll(".add_to_cart"));
const cardButtonsArr = Array.from(document.querySelectorAll(".cart_buttons"));
const cardPlusButtonsArr = Array.from(document.querySelectorAll(".button-plus"));
const cardMinusButtonsArr = Array.from(document.querySelectorAll(".button-minus"));
const cartNum = document.querySelector("#cart_num");
const cart = document.querySelector("#cart");

function toNum(str) {
    const num = parseInt(str.replace(/ /g, ""));
    return num;
}

function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
    }).format(num);
    return format;
}


const myCart = new Cart();

if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
}

const savedCart = JSON.parse(localStorage.getItem("cart"));
myCart.products = savedCart.products;
cartNum.textContent = myCart.count;


myCart.products = cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
        e.preventDefault();
        const productCard = e.target.closest(".product-card");
        e.target.style.display = "none";
        productCard.querySelector(".cart_buttons").style.display = "flex";
        const product = new Product(productCard);
        myCart.products = savedCart.products;
        myCart.addProduct(product);
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartNum.textContent = myCart.count;
    });
});

myCart.products = cardPlusButtonsArr.forEach((cardPlus) => {
    cardPlus.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.classList.add("plus_selected");
        const productCard = e.target.closest(".product-card");
        const product = new Product(productCard);
        let counter = Number(productCard.querySelector(".counter").textContent);
        myCart.products = savedCart.products;
        myCart.addProduct(product);
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartNum.textContent = myCart.count;
        productCard.querySelector(".counter").textContent = counter + 1;
        setTimeout(() => {
            e.target.classList.remove("plus_selected");
        }, 100);
    });
});



myCart.products = cardMinusButtonsArr.forEach((cardMinus) => {
    cardMinus.addEventListener("click", (e) => {
        e.preventDefault();

        const productCard = e.target.closest(".product-card");
        const product = new Product(productCard);
        const counter = Number(productCard.querySelector(".counter").textContent);

        e.target.classList.add("plus_selected");

        myCart.products = savedCart.products;
        let removingProduct = myCart.products.findIndex(item => item.name == product.name);
        myCart.removeProduct(removingProduct);

        if (!myCart.products.some(item => product.name == item.name)) {
            productCard.querySelector(".cart_buttons").style.display = "none";
            productCard.querySelector(".add_to_cart").style.display = "block";
            localStorage.setItem("cart", JSON.stringify(myCart));
            cartNum.textContent = myCart.count;
            productCard.querySelector(".counter").textContent = 1;
            setTimeout(() => {
                e.target.classList.remove("plus_selected");
            }, 100);
            return;
        }

        localStorage.setItem("cart", JSON.stringify(myCart));
        cartNum.textContent = myCart.count;
        productCard.querySelector(".counter").textContent = counter - 1;
        setTimeout(() => {
            e.target.classList.remove("plus_selected");
        }, 100);
    });
});



