const button = document.querySelectorAll(".buttonFilter");

const images = document.querySelectorAll(".imageFilter");

const search = document.querySelector(".searchBar");

let activeFilter;

setHelpText = () => {
    for (let item of button) {
        if (item.classList.contains("active")) {
            activeFilter = item.getAttribute("animal");
        }
    }

    document.querySelector("h3").innerHTML = `${search.value || (activeFilter && activeFilter !== "all") ? "Limiting results to show animals" : ""}${search.value ? ` description containing "${search.value}"` : ""}${activeFilter && activeFilter !== "all" ? ` with the filter ${activeFilter}` : ""}.`
}

filterByButton = (item) => {
    for (let item of button) {
        item.classList.remove("active");
    }
    item.classList.add("active");
    
    for (let image of images) {
        image.classList.contains(item.getAttribute("animal")) || item.getAttribute("animal") === "all" ? filterBySearch(): image.classList.add("hide");
    }

    setHelpText();
}

filterBySearch = () => {
    const searchText = search.value.toLowerCase();
    
    for (let item of button) {
        if (item.classList.contains("active")) {
            activeFilter = item.getAttribute("animal");
            console.log(activeFilter);
        }
    }
    
    for (let image of images) {
        if (!image.getAttribute("alt").toLowerCase().includes(searchText)) {
            image.classList.add("hide");
        } else {
            image.classList.contains(activeFilter) || activeFilter === "all" ? image.classList.remove("hide") : image.classList.add("hide");
        }
    }

    setHelpText();
}

for (let item of button) {
    item.addEventListener("click", (e) => {
        filterByButton(item);
    })
}

search.addEventListener("keyup", (e) => {
    preventDefault();
    filterBySearch();
})