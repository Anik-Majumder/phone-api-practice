const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  // display 20 phones only
  phones = phones.slice(0, 10);
  // display no phone found
  const noPhone = document.getElementById("warning");
  if (phones.length == 0) {
    noPhone.classList.remove("hidden");
  } else {
    noPhone.classList.add("hidded");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
          <figure class="bg-white pt-4">
            <img src="${phone.image}" alt="Shoes" />
          </figure>
          <div class="card-body bg-white">
            <h2 class="card-title text-black">${phone.brand}</h2>
            <p>${phone.phone_name}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop loader
  toggleSpinner(false);
};

document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  loadPhones(searchText);
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};
