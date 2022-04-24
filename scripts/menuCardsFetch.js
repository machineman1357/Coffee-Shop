setTimeout(() => {
    fetchMenuCardData("hot", "HotDrinks");
}, Math.random() * 5000);
setTimeout(() => {
    fetchMenuCardData("cold", "ColdDrinks");
}, Math.random() * 5000);
setTimeout(() => {
    fetchMenuCardData("pastries", "Pastries");
}, Math.random() * 5000);

function fetchMenuCardData(elementIdPrefix, dataId) {
    console.log(`fetching menu card data with elementIdPrefix ${elementIdPrefix} and dataId ${dataId}...`);

    const queryString = `
        {
            menuCard(id: "${dataId}") {
                title
                menuItems {
                    name
                    description
                    price
                }
            }
        }
    `;

    fetch("https://autumn-night-honesty.glitch.me/graphql", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query: queryString }),
      })
        .then((r) => r.json())
        .then((data) => onDataRecieved_MenuCards(data, elementIdPrefix));
}

function onDataRecieved_MenuCards(data, elementIdPrefix) {
    console.log("data returned:", data);

    const containerElement_hotDrinks = document.querySelector(`#${elementIdPrefix}-drinks-container`);

    // remove waiting for data style
    containerElement_hotDrinks.classList.remove("menuCard_waitingForData");

    // clear elements
    containerElement_hotDrinks.innerHTML = "";

    // add h1 menu card title
    const h1ELement = document.createElement("h1");
    h1ELement.innerHTML = data.data.menuCard.title;
    containerElement_hotDrinks.appendChild(h1ELement);

    createMenuItems(containerElement_hotDrinks, data.data.menuCard.menuItems);
}

function createMenuItems(menuCardContainer, menuItemsData) {
    for (let i = 0, len = menuItemsData.length; i < len; i++) {
        const menuItemData = menuItemsData[i];
        
        // create h3 menu item name element
        const h3MenuItemNameElement = document.createElement("h3");
        h3MenuItemNameElement.innerHTML = menuItemData.name;
        menuCardContainer.appendChild(h3MenuItemNameElement);

        // create description and price ordered list element
        const ulInformationElement = document.createElement("ul");
        menuCardContainer.appendChild(ulInformationElement);

        // create description element
        const h3MenuItemDescriptionElement = document.createElement("li");
        h3MenuItemDescriptionElement.innerHTML = menuItemData.description;
        ulInformationElement.appendChild(h3MenuItemDescriptionElement);

        // create price element
        const h3MenuItemPriceElement = document.createElement("li");
        h3MenuItemPriceElement.innerHTML = menuItemData.price;
        ulInformationElement.appendChild(h3MenuItemPriceElement);
    }
}
