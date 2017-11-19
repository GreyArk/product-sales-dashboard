class App {
  static search_func(item) {
    return async () => {
      await App.populate(item);
    };
    // return async () => {
    //   const data = await (await fetch(`${helpers.url}/products`)).json();
    //   let arr = data.map(elem => elem.id);

    //   if (arr.includes(item)) {
    //     App.populate(item);
    //   } else if (item === "") {
    //     window.location.reload();
    //   } else {
    //     helpers.products.innerHTML = `<h2 class="msg">The product couldn't be found. Please search again!</h2>`;
    //   }
    // };
  }

  static async populate(product) {
    const params = `/products/${product}`;

    try {
      const response = await (await fetch(`${helpers.url}${params}`)).json();
      const customers = response.customers;

      helpers.products.innerHTML = "";
      customers.forEach(customer => {
        helpers.products.innerHTML += `<article class="product">
          <h2 class="product--name">${response.name}</h2>
          <ul class="customers">
            <li class="customer">
              <div class="customer--info">
                <img class="customer--avatar" src=${customer.avatar}>
                <h3 class="customer--name">${customer.name}</h3>
                <small class="customer--position">${customer.job.title}</small>
                <small class="customer--company">${customer.job.company}</small>
              </div>
              <blockquote class="customer--quote">
                ${customer.quote}
              </blockquote>
            </li>
          </ul>
        </article>`;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  /*
  static async addButton() {
    const newDiv = document.createElement("div");
    newDiv.className = "btn_div";

    const data = await (await fetch(`${helpers.url}/products`)).json();
    let arr = data.map(elem => elem.id);

    arr.forEach(val => {
      newDiv.innerHTML += `
        <button class="btn">${val.toUpperCase()}</button>
      `;
    });

    helpers.contents.insertBefore(newDiv, helpers.contents.firstChild);

    const btnArr = document.querySelectorAll(".btn");
    btnArr.forEach(item => {
      item.addEventListener(
        "click",
        App.search_func(item.textContent.toLowerCase())
      );
    });
  }
*/
}
