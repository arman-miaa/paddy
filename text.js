// commont funtion for get elment using id from html
const getElement_By_Id = (id) => {
  return document.getElementById(id);
};
let spinner = getElement_By_Id("spinner");

// getting  4 categories
const getCategories = async () => {
  const category_container = getElement_By_Id("category_container");
  try {
    const data = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const response = await data.json();
    response?.categories?.forEach((item) => {
      category_container.innerHTML += `
              <li onclick="activeButtonStyle(this,'${item?.category}')" id="cat_btn"
                class="py-2 px-4 border-[2px] border-[lightgray]   rounded-[30px]  cursor-pointer flex justify-center items-center gap-5 " data-category="${item?.category}">
                <img src="${item?.category_icon}" alt=""
                    class="w-[30px] h-[30px] object-cover">
                ${item?.category}
            </li>
            `;
    });
  } catch (err) {
    console.log(err);
  }
};
getCategories();

// this html for all products and filter products by category
const htmlContentsForCart = (item) => {
  const {
    breed,
    price,
    gender,
    pet_details,
    vaccinated_status,
    image,
    pet_name,
    date_of_birth,
  } = item;

  return `
                    <div class="card bg-base-100 w-full  md:w-[270px] shadow-xl  p-2 border my-1 cursor-pointer" id="card">
                        <figure class="w-[95%] h-[150px] m-auto">
                            <img src="${
                              image || "./images/cat.png"
                            }" alt="Loading..." class="rounded-[10px]" />
                        </figure>
                        <div class="fex justify-start items-start gap-3 my-2 p-2">
                            <h2 class="font-bold ">${
                              pet_name ||
                              '<span class="text-[crimson]">Not found !</span>'
                            }</h2>
                            <p class="flex justify-start items-center gap-2 mb-2 ">
                                <i class="fa-brands fa-windows"></i>
                                <span>Breed: ${
                                  breed ||
                                  '<span class="text-[crimson]">Not found !</span>'
                                }</span>
                            </p>
                            <p class="flex justify-start items-center gap-2 mb-2 ">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>Date of birth: ${
                                  date_of_birth ||
                                  '<span class="text-[crimson]">Not found !</span>'
                                }</span>
                            </p>
                            <p class="flex justify-start items-center gap-2 mb-2 ">
                                <i class="fa-solid fa-mercury"></i>
                                <span>Gender: ${
                                  gender ||
                                  '<span class="text-[crimson]">Gender Not available !</span>'
                                }</span>
                            </p>
                            <p class="flex justify-start items-center gap-2 mb-2 ">
                                <span>$</span><b>Price</b>: ${
                                  item.price || "price Not found.."
                                }
                            </p>
                            <div class="flex justify-around gap-2  p-2">
                                <button class="py-1 px-2 border-[lightgray] border-[1px] rounded text-[teal] hover:text-[white] hover:bg-[teal] transition-all" onclick="handleLike('${
                                  item?.image
                                }')" id="likebtn">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                </button>
                                <button class="py-1 px-2 border-[lightgray] border-[1px] rounded text-[teal] hover:text-[white] hover:bg-[teal] transition-all" onclick="clickAdoptBtn(this)">Adopt</button>
                                <button class="py-1 px-2 border-[lightgray] border-[1px] rounded text-[teal] hover:text-[white] hover:bg-[teal] transition-all" onclick="productDetails('${
                                  item?.petId
                                }')">Details</button>
                            </div>
                        </div>
                    </div>
                    `;
};

// showing error mesage if product length is 0.
const emptyContentsOfProducts = () => {
  return `
            <div class="w-full md:w-[90%] bg-[#13131308] rounded flex justify-center items-center gap-4 flex-col p-4 capitalize " id="error_modal">
                <img src="./images/error.webp" alt="" class="w-[200px] h-[200px]">
                <h2 class="text-2xl font-bold lato ">No Information Available</h2>
                <p class="w-[90%] md:w-[75%] text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
            `;
};

// commont function for getting api data
const getProducts = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

// display productlist  in to html// initial product list
const displayProducts = (data) => {
  const product_container = getElement_By_Id("product_container");
  spinner.classList.add("flex");
  spinner.classList.remove("hidden");
  setTimeout(() => {
    product_container.innerHTML = "";
    data?.forEach((item) => {
      product_container.innerHTML += htmlContentsForCart(item);
    });
    spinner.classList.add("hidden");
    spinner.classList.remove("flex");
  }, 2000);
};

// fetching all product lists..........
const fetchallData = async () => {
  try {
    const data = await getProducts(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    displayProducts(data.pets);
  } catch (err) {
    console.log(err);
  }
};
fetchallData();

// fetching products by category
const fetchByCategory = async (cat) => {
  try {
    const product_container = getElement_By_Id("product_container");
    product_container.innerHTML = "";
    spinner.classList.remove("hidden");
    spinner.classList.add("flex");
    const data = await getProducts(
      `https://openapi.programming-hero.com/api/peddy/category/${cat}`
    );
    setTimeout(() => {
      if (data?.data.length === 0) {
        product_container.innerHTML = emptyContentsOfProducts();
      } else {
        data?.data.forEach((item) => {
          product_container.innerHTML += htmlContentsForCart(item);
        });
      }
      spinner.classList.add("hidden");
      spinner.classList.remove("flex");
    }, 2000);
  } catch (err) {
    console.log(err);
  }
};

// set catygory button background color  after click
const activeButtonStyle = (element, cat) => {
  fetchByCategory(cat);
  const allCategoryButtons = document.querySelectorAll(
    "#category_container li"
  );
  allCategoryButtons.forEach((btn) => {
    btn.classList.remove("bg-[#0E7A811A]");
  });
  element.classList.add("bg-[#0E7A811A]");
};

// showing single product  details , by id
const productDetails = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await response.json();
    const {
      breed,
      price,
      gender,
      pet_details,
      vaccinated_status,
      image,
      pet_name,
      date_of_birth,
    } = data.petData;
    const details_container = getElement_By_Id("details_container");
    details_container.innerHTML = `        
                        <div class=" h-max w-full md:w-[60%]  rounded-[20px] shadow   bg-[white] p-3 flex justify-center items-start gap-5 flex-col" id="modal">
                            <img src="${image}" alt="" class="w-full h-[200px] object-cover rounded-[20px] " >
                            <div class=" flex  justify-start items-center gap-4 flex-wrap ">
                              <p class="flex justify-start items-center gap-2  w-[40%] ">
                                <i class="fa-brands fa-windows"></i>
                                <span>Breed: ${
                                  breed ||
                                  '<span class="text-[crimson]">breed not found</span>'
                                }</span>
                            </p>
                            <p class="flex justify-start items-center gap-2  w-[40%] ">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>Date of birth: 2023-08-20</span>
                            </p>
                            <p class="flex justify-start items-center gap-1  w-[40%] ">
                                <i class="fa-solid fa-mercury"></i>
                                <span>Gender: ${
                                  gender || "Gender Not Found.."
                                }</span>
                            </p>
                            <p class="flex justify-start items-center gap-1  w-[40%] ">
                                <span>$</span><b>Price</b>: ${
                                  price ||
                                  '<span class="text-[crimson]">price not found</span>'
                                }
                            </p>
                             <p class="flex justify-start items-center gap-1 ">
                                <span></span><b>vaccinated_status</b>: ${
                                  vaccinated_status ||
                                  "vaccinated_status Not found.."
                                }
                            </p>
                            </div>
                            <div>
                                <h2 class="font-bold ">Details Information</h2>
                                <p class="text-[gray] ">${
                                  pet_details ||
                                  '<span class="text-[crimson]">description not found</span>'
                                }</p>
                            </div>
                           
                            <button class="btn btn border w-full bg-[#0E7A811A] rounded-[10px]   right-2 top-2" id="" onclick="closeModel()">Cancel</button>                      
                    </div>
        `;
    const modal = getElement_By_Id("modal");
    modal.classList.add("flex");
    details_container.classList.remove("hidden");
    details_container.classList.add("flex");
  } catch (err) {
    console.log(err);
  }
};

// clodeModal // closing details modal
const closeModel = () => {
  const modal = getElement_By_Id("modal");
  modal.classList.add("flex");
  details_container.classList.remove("flex");
  details_container.classList.add("hidden");
};

// sorting product to descending order
const sortedProducts = async () => {
  try {
    const res = await getProducts(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = res.pets.sort((a, b) => b.price - a.price);
    displayProducts(data);
    const product_container = getElement_By_Id("product_container");
    product_container.innerHTML = "";
  } catch (err) {
    console.log(err);
  }
};

// handling like function and  store photo rightside
const handleLike = (photo) => {
  const photoContainer = getElement_By_Id("photoContainer");
  photoContainer.innerHTML += `
    <img src="${photo}" alt=""
    class="w-[47%] h-[100px]  border  rounded object-cover ">
    `;
};

// handling adopt button event
function clickAdoptBtn(e) {
  e.classList.add(
    "bg-[lightgray]",
    "text-[gray]",
    "border-none",
    "disabled_button",
    "hover:bg-[lightgray]"
  );
  const countdown_container = getElement_By_Id("countdown_container");
  countdown_container.classList.remove("hidden");
  countdown_container.classList.add("flex");
  setTimeout(() => {
    countdown_container.classList.add("hidden");
    countdown_container.classList.remove("flex");
    e.innerHTML = "Adopted";
    e.disabled = true;
  }, 3000);
  let counter = 3;
  const countdownElement = document.getElementById("countdown");

  const interval = setInterval(() => {
    countdownElement.textContent = counter;
    counter--;

    if (counter < 0) {
      clearInterval(interval);
    }
  }, 800);
}
