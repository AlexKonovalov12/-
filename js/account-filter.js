const filter = document.querySelector(".account_aside_filter");
const blocks = document.querySelectorAll(".account_block");

filter.addEventListener('click', (event) => {
    const filterValue = event.target.getAttribute("data-name");
    if (event.target.classList.contains('filter')) {
        filter.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");

        blocks.forEach((el) => {
            if (el.classList.contains("block_show")) [
                el.classList.remove("block_show")
            ]

            if (el.dataset.name == filterValue) {
                    el.classList.add("block_show")
                }
        })
    }
})

let avatar = document.querySelector(".account_enter").querySelector("p");
const avatarsContainer = document.querySelector(".emoji_container");

avatarsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('avatar')) {
        avatarsContainer.querySelector(".active_avatar").classList.remove("active_avatar");
        avatar.textContent = event.target.textContent;
        event.target.classList.add("active_avatar");
    }
})