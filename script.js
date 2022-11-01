let list = document.querySelector(".list");

let url = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let search = urlParams.get("search");

    if (!search) {
      return data;
    }
    return (filterdData = data.filter((item) => {
      return item.title.toLowerCase().includes(search);
    }));
  })
  .then((data) => {
    render(data);
  })
  .catch((err) => {
    console.error(err);
  });

document.getElementById("find").addEventListener("click", (e) => {
  let value = document.getElementById("search").value;

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("search", value);
  window.location.search = urlParams;
});

window.addEventListener("load", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let searchValue = urlParams.get("search");

  document.getElementById("search").value = searchValue;
});

function checkedItem() {
  window.addEventListener("click", function handleClick(e) {
    if (e.target.className === "item-input") {
      if (e.target.checked) {
        e.target.parentElement.style.backgroundColor = "#727272";
        e.target.previousElementSibling.style.color = "white";
        e.target.previousElementSibling.previousElementSibling.style.color =
          "white";
      } else {
        e.target.parentElement.style.backgroundColor = "white";
        e.target.previousElementSibling.style.color = "#727272";
        e.target.previousElementSibling.previousElementSibling.style.color =
          "#727272";
      }
    }
  });
}

function render(data) {
  if (data.length > 0) {
    let item = data
      .map((item, index) => {
        let maxlength = 25;
        if (item.title.length > maxlength) {
          return `
                <li class="item" key="${index}">
                <label for="${index}" class="item-label">${
            item.title.slice(0, maxlength) + "..."
          }</label>
                <p>${item.body}</p>
                <input id="${index}" name="${index}" type="checkbox" class="item-input">
                </li>`;
        } else {
          return `
            <li class="item" key="${index}">
            <label for="${index}" class="item-label">${item.title}</label>
            <p>${item.body}</p>
            <input id="${index}" name="${index}" type="checkbox" class="item-input">
            </li>`;
        }
      })
      .join("");
    list.innerHTML = item;
  } else {
    list.innerHTML = `<li><p>Not Found</p></li>`;
  }
}

checkedItem();

