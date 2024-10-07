// window.onload = () => {
//   window.scroll(0,0,"smooth")
// }

// buttonCategory function here
const buttonCategory = () => {
  console.log("Hello");
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((response) => response.json())
    .then((data) => displayBtn(data.categories))
    .catch((err) => console.log(err));
};

//  all pets section function
const allPets = () => {
  console.log("Allpets");
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((response) => response.json())
    .then((data) => displayAllPets(data.pets))
    .catch((err) => console.log(err));
};

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
  // console.log(categoryName);
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const pets = data.data;
      if (pets.length === 0) {
        document.getElementById("hidden-box").classList.remove("hidden");
        document.getElementById("all-pets").classList.add("hidden");
      } else {
        document.getElementById("hidden-box").classList.add("hidden");
        document.getElementById("all-pets").classList.remove("hidden");
        displayAllPets(pets);
      }
    });
  // .catch((error) => console.error(error));

  // .catch(err => console.log(err))
};

// click like button function
const likePet = (petId) => {
  // console.log(petId);
  const likeImgBox = document.getElementById("like-img-box");
  const likePetImg = document.createElement('div');
  likePetImg.innerHTML = `
  
  <div class=" p-2 gap-2">
              <img class="rounded-xl w-auto" src="${petId}" alt="" />
            </div>
  
  `;
  likeImgBox.appendChild(likePetImg);
 }


// displayAllPets function here
const displayAllPets = (pets) => {
  // console.log(pets);
  const allPets = document.getElementById("all-pets");
  allPets.innerHTML = "";

  pets.forEach((pet) => {
    // console.log(pet);
    const showAllPets = document.createElement("div");
    showAllPets.innerHTML = `
        
        <div class="border-2 p-6 space-y-4 rounded-xl">
            <!-- img -->
             <div class="w-full">
              <img class="w-full rounded-xl" src="${pet.image}" alt="">
             </div>
             <!-- text -->
              <div class="space-y-2">
                <h3 class="text-xl font-bold">${pet.pet_name}</h3>
                <div class="flex gap-2 items-center">
                  <img src="./images/box-icon.png" alt="">
                  <p>Breed: ${pet.breed}</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/bird-icon.png" alt="">
                  <p>Birth: ${pet.date_of_birth}</p>
                </div>

                <div class="flex gap-2 items-center">
                <img src="./images/gender-icon.png" alt="">
                  <p>Gender: ${pet.gender}</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/dolor-icon.png" alt="">
                  <p>Price : ${pet.price}$</p>
                </div>

              </div>
              <hr>
              <!-- btn -->
               <div class="flex justify-between items-center">
                <button onclick="likePet('${pet.image}')" class=" btn  border-2 border-[#0e79814d] bg-transparent"><img " src="./images/like-icon.png" alt=""></button>

                <button class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Adopt</button>
                <button class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Details</button>

               </div>


           </div>

        `;
    allPets.appendChild(showAllPets);
  });
};

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
