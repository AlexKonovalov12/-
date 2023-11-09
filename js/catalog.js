class Product {
    constructor(productCard) {
        this.imageSrc = productCard.querySelector("img").src;
        this.name = productCard.querySelector(".product-name").innerText;
        this.price = productCard.querySelector(".product_price").innerText;
        this.quantity = 0
    }
}

class Cart {
    constructor() {
        this.products = [];
    }
    get count() {
        let value = this.products.reduce(function (sum, current) {
            return sum + current.quantity
        }, 0);
        return value
    }
    addProduct(product) {
        this.products.push(product);
        product.quantity++
    }
    removeProduct(index) {
        this.products.splice(index, 1);
    }
    get cost() {
        const prices = this.products.map((product) => {
            return toNum(product.price) * product.quantity;
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

function changeLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(myCart));
    cartNum.textContent = myCart.count;
}


myCart.products = cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
        e.preventDefault();
        const productCard = e.target.closest(".product-card");
        e.target.style.display = "none";
        productCard.querySelector(".cart_buttons").style.display = "flex";
        const product = new Product(productCard);
        myCart.products = savedCart.products;
        myCart.addProduct(product);
        changeLocalStorage()
    });
});

myCart.products = cardPlusButtonsArr.forEach((cardPlus) => {
    cardPlus.addEventListener("click", (e) => {
        e.preventDefault();

        e.target.classList.add("plus_selected");
        const productCard = e.target.closest(".product-card");
        const product = new Product(productCard);
        let productPrice = productCard.querySelector(".product_price");
        myCart.products = savedCart.products;
        let repeatProduct = myCart.products.find(item => item.name == product.name);
        repeatProduct.quantity++
        changeLocalStorage();

        productPrice.textContent = toCurrency((toNum(repeatProduct.price) * repeatProduct.quantity))
        let counter = Number(productCard.querySelector(".counter").textContent);
        productCard.querySelector(".counter").textContent = counter + 1;
        setTimeout(() => {
            e.target.classList.remove("plus_selected");
        }, 100);
    });
});


myCart.products = cardMinusButtonsArr.forEach((cardMinus) => {
    cardMinus.addEventListener("click", (e) => {
        e.preventDefault();

        e.target.classList.add("plus_selected");
        const productCard = e.target.closest(".product-card");
        const product = new Product(productCard);
        let productPrice = productCard.querySelector(".product_price");
        myCart.products = savedCart.products;
        let removingProduct = myCart.products.findIndex(item => item.name == product.name);
        if (myCart.products[removingProduct].quantity > 1) {
            myCart.products[removingProduct].quantity--
            productPrice.textContent = toCurrency((toNum(myCart.products[removingProduct].price) * myCart.products[removingProduct].quantity))
            changeLocalStorage();
        } else {
            myCart.removeProduct(removingProduct);
            productCard.querySelector(".cart_buttons").style.display = "none";
            productCard.querySelector(".add_to_cart").style.display = "block";
            changeLocalStorage()
            productCard.querySelector(".counter").textContent = 1;
            setTimeout(() => {
                e.target.classList.remove("plus_selected");
            }, 100);
            return;
        }

        const counter = Number(productCard.querySelector(".counter").textContent);
        productCard.querySelector(".counter").textContent = counter - 1;
        setTimeout(() => {
            e.target.classList.remove("plus_selected");
        }, 100);
    });
});

let emptyCart = document.querySelector(".empty-cart");
let fillCart = document.querySelector(".fill-cart");


function popupContainerFill() {
    const popupProductList = document.querySelector("#popup_product_list");
    const popupCost = document.querySelector("#popup_cost");

    popupProductList.innerHTML = null;
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    if (myCart.products.length > 0) {
        emptyCart.style.display = 'none';
        fillCart.style.display = 'block';
        const productsHTML = myCart.products.map((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add("popup__product");

            const productWrap1 = document.createElement("div");
            productWrap1.classList.add("popup__product-wrap");
            const productWrap2 = document.createElement("div");
            productWrap2.classList.add("popup__product-wrap");

            const productImage = document.createElement("img");
            productImage.classList.add("popup__product-image");
            productImage.setAttribute("src", product.imageSrc);

            const productTitle = document.createElement("h2");
            productTitle.classList.add("popup__product-title");
            productTitle.innerHTML = product.name;

            const productPlus = document.createElement("button");
            productPlus.classList.add("button-plus");
            productPlus.innerHTML = "+";

            const productMinus = document.createElement("button");
            productMinus.classList.add("button-minus");
            productMinus.innerHTML = "-";

            const productQuantity = document.createElement("h2");
            productQuantity.classList.add("popup__product-quantity");
            productQuantity.innerHTML = product.quantity + ' шт';

            const productPrice = document.createElement("div");
            productPrice.classList.add("popup__product-price");
            productPrice.innerHTML = toCurrency((toNum(product.price) * product.quantity));

            const productDelete = document.createElement("button");
            productDelete.classList.add("popup__product-delete");
            productDelete.innerHTML = "✖";

            productDelete.addEventListener("click", () => {
                let removingProduct = myCart.products.findIndex(item => item.name == product.name);
                myCart.removeProduct(removingProduct);
                changeLocalStorage();
                popupContainerFill();
            });

            productPlus.addEventListener("click", (e) => {
                e.target.classList.add("plus_selected");

                myCart.products = savedCart.products;
                product.quantity++
                changeLocalStorage();
                productQuantity.innerHTML = product.quantity + ' шт'
                productPrice.innerHTML = toCurrency((toNum(product.price) * product.quantity));
                popupCost.value = toCurrency(myCart.cost);
                setTimeout(() => {
                    e.target.classList.remove("plus_selected");
                }, 100);
            });

            productMinus.addEventListener("click", (e) => {
                e.target.classList.add("plus_selected");

                myCart.products = savedCart.products;

                if (product.quantity > 1) {
                    product.quantity--
                    productPrice.innerHTML = toCurrency((toNum(product.price) * product.quantity));
                    changeLocalStorage();
                    productQuantity.innerHTML = product.quantity + ' шт'
                } else {
                    let removingProduct = myCart.products.findIndex(item => item.name == product.name);
                    myCart.removeProduct(removingProduct);
                    changeLocalStorage();
                    popupContainerFill();
                    popupCost.value = toCurrency(myCart.cost);
                    return;
                }
                popupCost.value = toCurrency(myCart.cost);
                setTimeout(() => {
                    e.target.classList.remove("plus_selected");
                }, 100);
            })

            productWrap1.appendChild(productImage);
            productWrap1.appendChild(productTitle);
            productWrap2.appendChild(productMinus);
            productWrap2.appendChild(productQuantity);
            productWrap2.appendChild(productPlus);
            productWrap2.appendChild(productPrice);
            productWrap2.appendChild(productDelete);
            productItem.appendChild(productWrap1);
            productItem.appendChild(productWrap2);

            return productItem;
        });

        productsHTML.forEach((productHTML) => {
            popupProductList.appendChild(productHTML);
        });

        popupCost.value = toCurrency(myCart.cost);
    } else {
        emptyCart.style.display = 'block';
        fillCart.style.display = 'none';
    }
    
}


popupContainerFill()
