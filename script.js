// window.onload = () => {
//   window.scroll(0,0,"smooth")
// }

// buttonCategory function here
document.getElementById("hidden-box").classList.add("hidden");
document.getElementById("countdown-container").classList.add("hidden");

const buttonCategory = () => {
  console.log("Hello");
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((response) => response.json())
    .then((data) => displayBtn(data.categories))
    .catch((err) => console.log(err));
};

//  all pets section function
let pet = [];
let currentFilteredPets = [];
const allPets = () => {
  console.log("Allpets");
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((response) => response.json())
    .then((data) => {
      pet = data.pets;
      displayAllPets(pet)
    })
    .catch((err) => console.log(err));

}
    

      



// displayBtn function here
const displayBtn = (categorBtn) => {
  const categoryBtn = document.getElementById("category-btn");
  categorBtn.innerHTML = "";
  categorBtn.forEach((btn) => {
    // console.log(btn);

    const showAllBtn = document.createElement("div");
    showAllBtn.innerHTML = `
        <button class="category-button h-12 w-full flex justify-center gap-2 items-center py-8 rounded-lg border-2">
                        <img src='${btn.category_icon}' alt="">
                        <p>${btn.category}</p>
                    </button>
        
                    `;
    categoryBtn.appendChild(showAllBtn);

    showAllBtn
      .querySelector(".category-button")
      .addEventListener("click", () => {
        // console.log("Button clicked");
        // console.log(btn.category);
        getPetByCategory(btn.category);

        document.querySelectorAll(".category-button").forEach((button) => {
          button.classList.remove("active");
        });
        showAllBtn.querySelector(".category-button").classList.add("active");
      });
  });
};

// function to get pets by category buttons
const getPetByCategory = (categoryName) => {
  const spinner = document.getElementById("spinner");
  const hiddenBox= document.getElementById("hidden-box");
  const allPets = document.getElementById("all-pets");
  const likeImgSite = document.getElementById("like-img-box");


  // spinner show
  spinner.classList.remove("hidden");
  allPets.classList.add("hidden");
  likeImgSite.classList.add("hidden");
  hiddenBox.classList.add("hidden");

  // console.log(categoryName);
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const pets = data.data;
      currentFilteredPets = pets;

      if (pets.length === 0) {
        setTimeout(() => {
          spinner.classList.add("hidden");
          hiddenBox.classList.remove("hidden");
          allPets.classList.add("hidden");
          likeImgSite.classList.remove("hidden");
        }, 3000);
      } else {
        spinner.classList.add("hidden");
        hiddenBox.classList.add("hidden");
        allPets.classList.remove("hidden");
        likeImgSite.classList.remove("hidden");
        displayAllPets(pets)
      }

    })
  .catch ((err) => {
    spinner.classList.add("hidden");
    console.log(err);
  })
  // .catch((error) => console.error(error));

  // .catch(err => console.log(err))
};

// click like button function
const likePet = (petId) => {
  // console.log(petId);
  const likeImgBox = document.getElementById("like-img-box");
  const likePetImg = document.createElement("div");
  likePetImg.innerHTML = `
  
  <div class=" p-[10px]">
              <img class="rounded-xl object-cover w-auto" src="${petId}" alt="" />
            </div>
  
  `;
  likeImgBox.appendChild(likePetImg);
};

// modal function to display  details
const displayDetails = (id) => {
  console.log(id);

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((response) => response.json())
    .then((details) => {
      const petData = details.petData;

      // Select the modal elements
      const modalBox = document.getElementById("adoptModal");
      const modalBody = document.getElementById("modalContent");

      modalBody.innerHTML = `
      
        <div class="border-2 bg-white mt-[200px] p-6 space-y-4 rounded-xl">
          <!-- Image -->
          <div class="w-full">
            <img class="w-full object-cover rounded-xl" src="${
              petData.image || "<span class='text-red-400'>Not Found</span>"
            }" alt="${petData.pet_name || "<span class='text-red-400'>Not Found</span>"}">
          </div>
          <!-- Text -->
          <div class="space-y-2">
            <h3 class="text-xl font-bold">${
              petData.pet_name || "<span class='text-red-400'>Not Found</span>"
            }</h3>
            
            <!-- Container text -->
            <div class="  flex flex-col md:flex-row w-full md:w-11/12  lg:w-9/12 py-2 md:justify-between md:items-center">
              <!-- Left side -->
              <div class="space-y-2">
                <div class="flex gap-2 items-center">
                  <img src="./images/box-icon.png" alt="">
                  <p>Breed: ${petData.breed || "<span class='text-red-400'>Not Found</span>"}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <img src="./images/gender-icon.png" alt="">
                  <p>Birth: ${petData.date_of_birth || "<span class='text-red-400'>Not Found</span>"}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <img src="./images/gender-icon.png" alt="">
                  <p>vaccinated_status: ${
                    petData.vaccinated_status || "<span class='text-red-400'>Not Found</span>"
                  }</p>
                </div>
              </div>
              <!-- Right side -->
              <div class="space-y-2">
                <div class="flex gap-2 items-center">
                  <img src="./images/bird-icon.png" alt="">
                  <p>Gender: ${petData.gender || "<span class='text-red-400'>Not Found</span>"}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <img src="./images/dolor-icon.png" alt="">
                  <p>Price: $${petData.price || "<span class='text-red-400'>Not Found</span>"}</p>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <h3 class="text-2xl font-bold">Details Information</h3>
          <p>${petData.pet_details || "<span class='text-red-400'>Not Found</span>"}</p>

          <button id="closeButton" class="mt-4 px-4 py-2 w-full text-green-900 bg-[#0E7A811A] rounded">Cancel</button>
        </div>
      `;

      // Show the modal
      modalBox.classList.remove("hidden");

      // Close modal on button click
      document.getElementById("closeButton").addEventListener("click", () => {
        modalBox.classList.add("hidden");
      });
    })
    .catch((error) => {
      console.error("Error fetching pet details:", error);
    });
};

// displayAllPets function here
const displayAllPets = (pets) => {
  const allPets = document.getElementById("all-pets");
  const hiddenBox = document.getElementById("hidden-box");
  const spinner = document.getElementById("spinner");
  const likeImgSite = document.getElementById("like-img-box");
  // console.log('spinner Hi');
  spinner.classList.add("flex");
  spinner.classList.remove("hidden");
  allPets.classList.add("invisible");
  likeImgSite.classList.add("invisible");

  hiddenBox.classList.add("invisible");

  setTimeout(() => {

    allPets.innerHTML = "";
    pets.forEach((pet) => {
      const showAllPets = document.createElement("div");
      showAllPets.innerHTML = `
        
        <div class="border-2  p-6 space-y-4 rounded-xl">
            <!-- img -->
             <div class="w-full">
              <img class="w-full rounded-xl" src="${
                pet.image || "<span class='text-red-400'>Not Found</span>"
              }" alt="">
             </div>
             <!-- text -->
              <div class="space-y-2">
                <h3 class="text-xl font-bold">${
                  pet.pet_name || "<span class='text-red-400'>Not Found</span>"
                }</h3>
                <div class="flex gap-2 items-center">
                  <img src="./images/box-icon.png" alt="">
                  <p>Breed: ${pet.breed || "<span class='text-red-400'>Not Found</span>"}</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/bird-icon.png" alt="">
                  <p>Birth: ${pet.date_of_birth || "<span class='text-red-400'>Not Found</span>"}</p>
                </div>

                <div class="flex gap-2 items-center">
                <img src="./images/gender-icon.png" alt="">
                  <p>Gender: ${
                    pet.gender || "<span class='text-red-400'>Not Found</span>"
                  }</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/dolor-icon.png" alt="">
                  <p>Price : ${
                    pet.price
                      ? `${pet.price}$`
                      : "<span class='text-red-400'>Not Found</span>"
                  }</p>

                </div>

              </div>
              <hr>
              <!-- btn -->
               <div class="flex justify-between items-center">
                <button onclick="likePet('${
                  pet.image || "<span class='text-red-400'>Not Found</span>"
                }')" class=" btn lg:p-0 lg:px-2 xl:px-4  border-2 border-[#0e79814d] bg-transparent"><img " src="./images/like-icon.png" alt=""></button>

                <button   onclick="clickAdoptBtn(this)"  class="btn text-primary lg:p-0 lg:px-2 xl:px-3 border-2 border-[#0e79814d] bg-transparent">Adopt</button>

                <button onclick="displayDetails('${
                  pet.petId || "<span class='text-red-400'>Not Found</span>"
                }')" class="btn text-primary lg:p-0 lg:px-2 xl:px-3 border-2 border-[#0e79814d] bg-transparent">Details</button>

               </div>


           </div>

        `;
      allPets.appendChild(showAllPets);
    });


    // hide spinner after loading
    spinner.classList.add('hidden');
    spinner.classList.remove('flex');
    allPets.classList.remove("invisible");
    likeImgSite.classList.remove("invisible");
    hiddenBox.classList.remove("invisible");
  }, 2000);


}

// ============sort  
function sortedProducts() {
  console.log("Sort button clicked");

  let dataToSort;
  if (currentFilteredPets.length > 0) {
    dataToSort = currentFilteredPets.sort((a, b) => b.price - a.price);
  }
  else {
    dataToSort = pet.sort((a, b) => b.price - a.price)
  }

  // const data = pet.sort((a, b) => b.price - a.price);
  // console.log(data);
  displayAllPets(dataToSort)
  
}
  





//  selected bacground color button

const style = document.createElement("style");
style.innerHTML = `
.active {
background-color: rgba(14, 122, 129, 0.1);
border-radius: 120px;
border: 1.5px solid rgb(14, 122, 129);
}

`;
document.head.appendChild(style);

buttonCategory();
allPets();

//  sortedProducts function here







// adopt ===============================
let interval;
function clickAdoptBtn(e) {
  e.classList.add(
    "bg-[lightgray]",
    "text-[gray]",
    "border-none",
    "disabled_button",
    "hover:bg-[lightgray]"
  );

  const countdownBox = document.getElementById("countdown-container");
  countdownBox.classList.remove("hidden");
  countdownBox.classList.add("flex");

  let counter = 3;
  const counterPoint = document.getElementById("countdown");
  counterPoint.textContent = counter;

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    counter--;
    counterPoint.textContent = counter;

     if (counter <= 1) {
            clearInterval(interval); 
            setTimeout(() => {
                countdownBox.classList.add("hidden");
                countdownBox.classList.remove("flex");
                e.innerHTML = "Adopted";
                e.disabled = true;
            }, 1000); 
        }
    }, 1000); 

  }




