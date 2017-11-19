const constants = {
  url: `http://localhost:9000`
};

const selectors = {
  searchBar: document.getElementById("search"),
  products: document.querySelector(".products"),
  product: document.querySelector(".product"),
  buttons: document.querySelectorAll(".btn"),
  contents: document.getElementById("contents")
};

const helpers = Object.assign({}, constants, selectors);
