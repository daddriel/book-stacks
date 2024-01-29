let bookCart = [];

const book = document.getElementById("book");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const view = document.getElementById("view");
const listBooks = document.getElementById("list-books");
const listState = document.getElementById("list-state");
viewCart();

add.addEventListener("click", () => {
  if (validateInput()) {
    performCartActions(ADD_TO_CART, book.value);
    alertMessage(
      `The book "${book.value}" has been added to the list of books`,
      "success"
    );
    viewCart();
  }
});

remove.addEventListener("click", () => {
  if (bookCart.length === 0) {
    alertMessage("The list books is empty", "error");
  } else {
    performCartActions(REMOVE_FROM_CART);
    viewCart();
  }
});

const ADD_TO_CART = "add_to_cart";
const REMOVE_FROM_CART = "remove_from_cart";
const VIEW_CART = "view_cart";
function viewCart() {
  let child = listBooks.lastElementChild;
  while (child) {
    listBooks.removeChild(child);
    child = listBooks.lastElementChild;
  }
  if (bookCart.length === 0) {
    listState.innerHTML = "The list books is empty";
  } else {
    listState.innerHTML = "";

    for (let i = 0; i < bookCart.length; i++) {
      const item = document.createElement("li");
      item.textContent = bookCart[i];
      listBooks.appendChild(item);
    }
  }
  //show the list of books in the cart
}

function alertMessage(message, type) {
  //alert in html with tailwind icon for success, error, warning, info

  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alert.textContent = message;
  // close icon
  const close = document.createElement("span");
  close.classList.add("close");
  alert.appendChild(close);
  close.addEventListener("click", () => {
    alert.remove();
  });

  document.body.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 2000);
}

function performCartActions(action, newBook) {
  switch (action) {
    case ADD_TO_CART:
      bookCart.push(newBook);
      viewCart();
      break;
    case REMOVE_FROM_CART:
      bookCart.pop();
      break;
    case VIEW_CART:
      viewCart();
      break;
    default:
      break;
  }
}

function validateInput() {
  if (book.value === "") {
    alertMessage("Please enter a book", "error");
    return false;
  }
  return true;
}

document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName === "Enter") {
    if (validateInput()) {
      performCartActions(ADD_TO_CART, book.value);
      alertMessage(
        `The book "${book.value}" has been added to the list of books`,
        "success"
      );
      viewCart();
    }
  }
});
