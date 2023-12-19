const fetchShoppingCart = async () => {
  const response = await fetch("/api/cart");
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Räknar hur många gånger ett föremål förekommer i en array.
const itemOccurences = (array) =>
  array.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

const createListItem = (item, occurences) => {
  const listItem = document.createElement("li");
  listItem.textContent = `${item} x${occurences}`;
  return listItem;
};

const renderShoppingCart = async () => {
  const cartItems = await fetchShoppingCart();
  const cartItemsOccurences = itemOccurences(cartItems);

  const elementToBeRenderedIn = document.getElementsByClassName("cart")[0];

  for (const [cartItem, occurences] of Object.entries(cartItemsOccurences)) {
    const cartItemToBeAdded = createListItem(cartItem, occurences);
    elementToBeRenderedIn.append(cartItemToBeAdded);
  }
};

renderShoppingCart();
