const fetchBook = async () => {
  const selectedBook = sessionStorage.getItem("selectedBook");
  const response = await fetch(`/api/books/${selectedBook}`);
  const jsonResponse = await response.json();
  return jsonResponse;
};

//Renderar ut information om boken.
const renderBook = async () => {
  const bookInfo = await fetchBook();

  const bookTitle = document.getElementsByClassName("book-title")[0];
  const bookDesc = document.getElementsByClassName("book-desc")[0];

  bookTitle.textContent = bookInfo.title;
  bookDesc.textContent = bookInfo.description;
};

renderBook();
