const filter = window.location.hash.replace('#', '');
const filterAsideContainer = document.querySelector(".filter-aside-container");
const filterTopContainer = document.querySelectorAll(".filter-top-container");
const items = document.querySelectorAll(".item");
const catalogHeader = document.getElementById("catalog_header");
const catalogImagesBlocks = document.querySelectorAll(".catalog_images");

document.addEventListener('DOMContentLoaded', () => {
    if (filter.length > 2) {
        document.querySelector('.filter-item[data-filter="' + filter + '"]').classList.add("active");
        catalogHeader.textContent = document.querySelector('.filter-item[data-filter="' + filter + '"]').textContent;

        filterTopContainer.forEach((el) => {
            if (el.dataset.topFilter == filter) {
                el.classList.add("top_filter_show");
                el.classList.add("top_filter_show");

                const filterValue = el.getAttribute("data-top-filter");
                catalogImagesBlocks.forEach((block) => {
                    if (block.dataset.imagesFilter == filterValue) {
                        block.classList.add("catalog_images_show");
                        items.forEach((item) => {
                            if (item.classList.contains(filterValue)) {
                                item.classList.remove("hide");
                                item.classList.add("show");
                            }
                            else {
                                item.classList.remove("show");
                                item.classList.add("hide");
                            }
                        })
                    }
                })
            }
        });
    }
    else {
        document.querySelector('.filter-item[data-filter="popular"]').classList.add("active");
        catalogHeader.textContent = "Популярное";
        filterTopContainer[0].classList.add("top_filter_show")
        catalogImagesBlocks.forEach((block) => {
            block.classList.add("catalog_images_show");
            items.forEach((item) => {
                item.classList.remove("hide");
                item.classList.add("show");
            })
        })
    }
})


filterAsideContainer.addEventListener("click", (event) => {
    const filterValue = event.target.getAttribute("data-filter");
    if (event.target.classList.contains("filter-item")) {
        filterAsideContainer.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
        catalogHeader.textContent = event.target.textContent;

        filterTopContainer.forEach((el) => {
            if (el.classList.contains("top_filter_show")) {
                el.classList.remove("top_filter_show")
            }
            if (el.dataset.topFilter == filterValue) {
                el.classList.add("top_filter_show");

                if (el.querySelector(".active")) {
                    el.querySelector(".active").classList.remove("active");
                    el.querySelectorAll(".filter")[0].classList.add("active");
                }
            }
        });
        
        catalogImagesBlocks.forEach((block) => {
            if (block.classList.contains("catalog_images_show")) {
                block.classList.remove("catalog_images_show");
            }

            if (block.dataset.imagesFilter == filterValue) {
                block.classList.add("catalog_images_show")
                items.forEach((item) => {
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove("hide");
                        item.classList.add("show");
                    }
                    else {
                        item.classList.remove("show");
                        item.classList.add("hide");
                    }
                })
            }
        })
    }
});


filterTopContainer.forEach((el) => {
    el.addEventListener("click", (event) => {
        const filterValue = event.target.getAttribute("data-items-filter");

        if (event.target.classList.contains("filter")) {
            el.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");
            catalogHeader.textContent = event.target.textContent;
        }

        items.forEach((item) => {
            if (item.classList.contains(filterValue) || filterValue === 'all') {
                item.classList.remove("hide");
                item.classList.add("show");
            }
            else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        })
    })
})
