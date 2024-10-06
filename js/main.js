

// Load All Pet Categories
const loadAllPetsCategory = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json();
    displayAllPetCategories(data.categories);
    // fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
}

// Load All Pets
const loadAllPets = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    displayAllPets(data.pets);
}
loadAllPets();

// Display All Pets
const displayAllPets = (pets) => {
    // console.log(pets);
    const allPetsContainer = document.getElementById('all-pets-container');
    pets.forEach(pet => {
        console.log(pet);
        const {image, pet_name, breed, date_of_birth, gender, price} = pet;
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="p-3 xl:p-5 border rounded-lg">
                <img class="rounded-lg mb-3 w-full lg:h-[130px] xl:h-[180px] 2xl:h-[200px]" src=${image} alt="">
                <h1 class="font-bold text-xl mb-1">${pet_name}</h1>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-solid fa-border-all"></i>
                    <p>Bread: ${breed}</p>
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-regular fa-calendar"></i>
                    <p>Birth: ${date_of_birth}</p>
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-solid fa-venus"></i> 
                    <p>Gender: ${gender}</p>
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-solid fa-dollar-sign"></i> 
                    <p>Price: ${price}$</p>
                </div>
                <div class="pt-3 mt-2 border-t">
                    <button class="rounded-md py-1 px-2 xl:px-3 border text-gray-500"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="rounded-md py-1 px-2 xl:px-3 border text-emerald-700 font-bold">Adopt</button>
                    <button class="rounded-md py-1 px-2 xl:px-3 border text-gren text-emerald-700 font-bold">Details</button>
                </div>
            </div>
        `;
        allPetsContainer.append(div);
    })
}

// All Pet Categories Display
const displayAllPetCategories = (petsCategory) => {
    // console.log(petsCategory);
    const categoryContainer = document.getElementById('category-container');
    petsCategory.forEach( pet => {
        // console.log(pet);
        const div = document.createElement('div');
        div.classList ='border rounded-lg'
        div.innerHTML = `
            <button class="flex gap-3 w-full justify-center items-center py-3">
                <img src=${pet.category_icon} alt="">
                <p class="font-bold text-2xl">${pet.category}</p>
            </button>
        `;
        categoryContainer.append(div)
    })
}

loadAllPetsCategory()


