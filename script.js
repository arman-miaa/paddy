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
  
  <div class=" p-[10px]">
              <img class="rounded-xl w-auto" src="${petId}" alt="" />
            </div>
  
  `;
  likeImgBox.appendChild(likePetImg);
 }

// modal function to display adopt details
const displayAdoptDetails = (id) => { 
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((response) => response.json())
    .then(details => console.log(details.petData))
  
  const modalBox = document.getElementById('adoptModal');
  const modalBody = document.getElementById("modalContent");

  modalBody.innerHTML = `
  
    <div class="border-2 p-6 space-y-4 rounded-xl">
            <!-- img -->
             <div class="w-full">
              <img class="w-full object-cover" src="./images/Rectangle 1.png" alt="">
             </div>
             <!-- text -->
              <div class="space-y-2">
                <h3 class="text-xl font-bold">Mister Tartosh</h3>
                
           <!-- container text -->
            <div class="border-2 flex w-8/12 py-2 justify-between items-center">
                   <!-- left side -->
                <div  class="space-y-2">
  <div class="flex gap-2 items-center">
                  <img src="./images/box-icon.png" alt="">
                  <p>Breed: Golder retriever</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/gender-icon.png" alt="">
                  <p>Birth: 2024</p>
                </div>
                <div class="flex gap-2 items-center">
                  <img src="./images/gender-icon.png" alt="">
                  <p>Birth: 2024</p>
                </div>
                </div>
<!-- right side -->
               <div class="space-y-2">
                 <div class="flex gap-2 items-center">
                <img src="./images/bird-icon.png" alt="">
                  <p>Gender: Female</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/dolor-icon.png" alt="">
                  <p>Price : 199$</p>
                </div>

               </div>
            </div>

              </div>
              <hr class="">
              <h3 class="text-2xl font-bold">Details Information</h3>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
The point of using is that it has a more-or-less normal distribution of letters, as opposed to using.</p>
          


<button id="closeButton" class="mt-4 px-4 py-2 w-full text-green-900 bg-[#0E7A811A] rounded">Cancel</button>
           </div>
  
  `;

  modalBox.classList.remove('hidden');

  // close modal
  document.getElementById('closeButton').addEventListener('click', () => {
    modalBox.classList.add('hidden');
  })
  
 
 }
 


// displayAllPets function here
const displayAllPets = (pets) => {
  const allPets = document.getElementById("all-pets");
  allPets.innerHTML = "";

  pets.forEach((pet) => {

    const showAllPets = document.createElement("div");
    // const petData = encodeURIComponent(JSON.stringify(pet));
    // console.log(pet);
    // console.log({pet});
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

                <button id="adopt-modal"  class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Adopt</button>

                <button onclick="displayAdoptDetails('${pet.petId}')" class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Details</button>

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
