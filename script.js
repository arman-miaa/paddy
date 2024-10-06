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
}




// displayBtn function here
const displayBtn = (categorBtn) => {
  categorBtn.forEach((btn) => {
    // console.log(btn);

    const categoryBtn = document.getElementById("category-btn");
    const displayBtn = document.createElement("div");
    displayBtn.innerHTML = `
        <button class=" h-12 w-full flex justify-center gap-2 items-center py-8 rounded-lg border-2">
                        <img src='${btn.category_icon}' alt="">
                        <p>${btn.category}</p>
                    </button>
        
                    `;
    categoryBtn.appendChild(displayBtn);
  });
};


// displayAllPets function here
// const allPets = document.getElementById("all-pets");
const displayAllPets = (pets) => {
    console.log(pets);
    pets.forEach((pet) => { 
        console.log(pet);
        const allPets = document.getElementById("all-pets");
        const showAllPets = document.createElement('div');
        showAllPets.innerHTML = `
        
        <div class="border-2 p-6 space-y-4 rounded-xl">
            <!-- img -->
             <div class="w-full">
              <img class="w-full" src="${pet.image}" alt="">
             </div>
             <!-- text -->
              <div class="space-y-2">
                <h3 class="text-xl font-bold">Mister Tartosh</h3>
                <div class="flex gap-2 items-center">
                  <img src="./images/box-icon.png" alt="">
                  <p>Breed: Golder retriever</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/bird-icon.png" alt="">
                  <p>Birth: 2024</p>
                </div>

                <div class="flex gap-2 items-center">
                <img src="./images/gender-icon.png" alt="">
                  <p>Gender: Female</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/dolor-icon.png" alt="">
                  <p>Price : 199$</p>
                </div>

              </div>
              <hr>
              <!-- btn -->
               <div class="flex justify-between items-center">
                <button class=" btn  border-2 border-[#0e79814d] bg-transparent"><img src="./images/like-icon.png" alt=""></button>

                <button class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Adopt</button>
                <button class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Details</button>

               </div>


           </div>

        `;
        allPets.appendChild(showAllPets);

    })
}

buttonCategory();
allPets();
