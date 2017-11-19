document.addEventListener("DOMContentLoaded", () => {
  // App.addButton();
  helpers.buttons.forEach(item => {
    item.addEventListener(
      "click",
      App.search_func(item.textContent.toLowerCase())
    );
  });
  // CustomerDetail.showDetail();
});

//   helpers.searchBar.addEventListener(
//     "keydown",
//     function(e) {
//       if (e.keyCode === 13) {
//         App.search_func();
//       }
//     },
//     false
//   );
// });
