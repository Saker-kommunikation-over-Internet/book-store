// Hämtar böckerna från API.
const fetchBooks = async () => {
  const response = await fetch("/api/books");
  const jsonResponse = await response.json();
  return jsonResponse;
};

const fetchRecentlyViewed = async () => {
  const response = await fetch("/api/recentlyviewed");
  const jsonResponse = await response.json();
  return jsonResponse;
};

const fetchShoppingCart = async () => {
  const response = await fetch("/api/cart");
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Dessa ovanstående funktioner går definitivt att göra mer generella.
// Jag behöll det såhär för tydlighetens skull.

// Renderar ut alla böcker på huvudsidan.
const renderMainPage = async () => {
  const books = await fetchBooks();
  const elementToRenderIn =
    document.getElementsByClassName("book-container")[0];
  books.forEach((bookInfo, index) => {
    renderSingleBook(bookInfo, index, elementToRenderIn);
  });
};

// Renderar ut alla böcker i recentlyviewed.
const renderRecentlyViewed = async () => {
  const books = await fetchRecentlyViewed();
  const elementToRenderIn =
    document.getElementsByClassName("recently-viewed")[0];
  books.forEach((bookInfo, index) => {
    renderSingleBook(bookInfo, index, elementToRenderIn);
  });
};

// Renderar ut en enstaka bok givet titel, beskrivning, index och element att rendera inuti.
const renderSingleBook = (bookInfo, index, elementToRenderIn) => {
  // Skapar elementen vi behöver
  const container = document.createElement("div");
  const linkWrapper = document.createElement("a"); // En länk som omsluter boken vilket gör den navigerbar.
  const book = document.createElement("div");
  const title = document.createElement("h2");
  const desc = document.createElement("p");
  const img = document.createElement("img");
  const addToCart = document.createElement("button");

  linkWrapper.href = `/book`;

  linkWrapper.addEventListener("click", (e) =>
    handleBookClick(e, bookInfo, index)
  );
  addToCart.addEventListener("click", () => handleAddToCart(bookInfo));

  container.className = "book";
  addToCart.className = "add-to-cart-btn";

  // Sätter titeln och beskrivning från /books.
  title.textContent = bookInfo.title;
  desc.textContent = bookInfo.description;

  img.src = "./book-placeholder.webp";
  img.alt = "Placeholder for book";
  img.className = "placeholder-img";

  addToCart.textContent = "Add to Cart";

  book.append(img);
  book.append(title);
  book.append(desc);

  linkWrapper.append(book);

  container.append(linkWrapper);
  container.append(addToCart);

  elementToRenderIn.append(container);
};

// Sätter sessionStorage till rätt bookId innan man navigerar till book.
// Sparar också till servern att man nyss kollat på en bok.
const handleBookClick = async (e, bookInfo, index) => {
  e.preventDefault();
  sessionStorage.setItem("selectedBook", index);

  // Skickar till servern att lägga till boken i recently viewed.
  await fetch("/api/recentlyviewed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookInfo)
  });

  // Redirectar till /book
  window.location.href = "/book";
};

// Uppdaterar mängden items i varukorgen.
const updateNumberOfItemsInCart = async () => {
  const cart = await fetchShoppingCart();

  const numberOfItemsInCart = cart.length;

  const cartText = document.getElementsByClassName("cart-text")[0];
  cartText.textContent = `Currently ${numberOfItemsInCart} items in cart`;
};

// Lägger till en vara i varukorgen på servern.
// Uppdaterar sedan också varukorgen.
const handleAddToCart = async (bookInfo) => {
  await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookInfo)
  });
  updateNumberOfItemsInCart();
};

renderMainPage();
renderRecentlyViewed();
updateNumberOfItemsInCart();
