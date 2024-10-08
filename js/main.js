
// Load All Pet Categories
const loadAllPetsCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json();
    displayAllPetCategories(data.categories);
    // fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
}

// Load All Pets
const loadAllPets = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    displayAllPets(data.pets);
}
loadAllPets();

// Show Specific Category
const loadSpecificPetsCategory = async (category, petId) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        const data = await res.json()
        displayAllPets(data.data);
        // console.log(data.data);
        // console.log(category, petId);

        // Active Btn
        setActiveBtn(petId);
    } catch (error) {
        console.log(error);
    }
}

// Load Pet Details
const loadPetDetails = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => displayPetDetails(data.petData))
}

// Active Category Btn
const setActiveBtn = (id) => {
    // console.log(id);
    // Get all buttons with the class 'category-btn'
    const buttons = document.getElementsByClassName('category-btn');

    // Remove only the active classes from all buttons
    for (const btn of buttons) {
        btn.classList.remove('bg-emerald-50', 'rounded-lg', 'border', 'border-emerald-700');
    }

    // Add active classes to the clicked button
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add('bg-emerald-50', 'rounded-lg', 'border', 'border-emerald-700');
}

// Display All Pets
const displayAllPets = (pets) => {
    // console.log(pets);
    const allPetsContainer = document.getElementById('all-pets-container');

    // Clear all pets container
    allPetsContainer.innerHTML = '';

    // Handle Spinner
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden')
        // Handle no content in Pets
        if (pets.length === 0) {
            allPetsContainer.classList.remove('grid')
            allPetsContainer.innerHTML = `
                <div class='bg-gray-100 rounded-2xl px-2 py-5 md:py-20'>
                    <div class='flex justify-center'>
                        <img class='text-center' src="../assests/error.webp" alt="Error...">
                    </div>
                    <h1 class="text-center font-bold text-red-500 text-2xl mt-5">Oops!! Sorry, there is no content here.</h1>
                </div>
            `;
        }
        else {
            allPetsContainer.classList.add('grid')
        }
    
        pets.forEach(pet => {
            // console.log(pet);
            // console.log(pet.petId);
            const { image, pet_name, breed, date_of_birth, gender, price, petId } = pet;
            const div = document.createElement('div')
            div.innerHTML = `
                <div class="p-3 xl:p-5 border rounded-lg">
                    <img class="rounded-lg mb-3 w-full lg:h-[130px] xl:h-[180px] 2xl:h-[200px]" src=${image} alt="">
                    <h1 class="font-bold text-xl mb-1">${pet_name}</h1>
                    <div class="flex items-center gap-2 text-gray-500">
                        <i class="fa-solid fa-border-all"></i>
                        <p>Bread: ${!breed ? 'Not Found' : `${breed}`}</p>
                    </div>
                    <div class="flex items-center gap-2 text-gray-500">
                        <i class="fa-regular fa-calendar"></i>
                        <p>Birth: ${!date_of_birth ? 'Not Found' : `${date_of_birth}`}</p>
                    </div>
                    <div class="flex items-center gap-2 text-gray-500">
                        <i class="fa-solid fa-venus"></i> 
                        <p>Gender: ${!gender ? 'Not Found' : `${gender}`}</p>
                    </div>
                    <div class="flex items-center gap-2 text-gray-500">
                        <i class="fa-solid fa-dollar-sign"></i> 
                        <p>Price: ${!price ? 'Not Found' : `${price}$`}</p>
                    </div>
                    <div class="pt-3 mt-2 border-t">
                        <button onclick="${`showThumbnail('${image}')`}" class="rounded-md py-1 px-2 xl:px-3 border text-gray-500 hover:bg-gray-200 transition duration-300"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button class="rounded-md py-1 px-2 xl:px-3 border text-emerald-700 font-bold hover:bg-gray-200 transition duration-300">Adopt</button>
                        <button onclick=${`loadPetDetails('${petId}')`} class="rounded-md py-1 px-2 xl:px-3 border text-emerald-700 font-bold hover:bg-gray-200 transition duration-300">Details</button>
                    </div>
                </div>
            `;
            allPetsContainer.append(div);
        })
    }, 2000)
}

// All Pet Categories Display
const displayAllPetCategories = (petsCategory) => {
    // console.log(petsCategory);
    const categoryContainer = document.getElementById('category-container');
    petsCategory.forEach(pet => {
        // console.log(pet);
        const div = document.createElement('div');
        div.classList = 'border rounded-lg'
        div.innerHTML = `
            <button id='btn-${pet.id}' onclick="loadSpecificPetsCategory('${pet.category}', '${pet.id}')" class="flex gap-3 w-full justify-center items-center py-3 category-btn">
                <img src=${pet.category_icon} alt="">
                <p class="font-bold text-2xl">${pet.category}</p>
            </button>
        `;
        categoryContainer.append(div)
    })
}

// Like Btn Clicked Show thumbnail
const showThumbnail = (thumbnail) => {
    // console.log(thumbnail);
    const thumbnailContainer = document.getElementById('show-thumbnail');
    let div = document.createElement('div');
    div.innerHTML = `
        <img class='rounded-md' src=${thumbnail} alt="">
    `;
    thumbnailContainer.append(div);
}

// Display pet details
const displayPetDetails = (details) => {
    // loadPetDetails();
    console.log(details);
    const { image, pet_name, breed, pet_details, price, date_of_birth, vaccinated_status, gender, } = details;

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = `
        <img class="rounded-lg mb-3 w-full" src=${image} alt="">
        <div class="flex gap-10">
            <div>
                <h1 class="font-bold text-xl mb-2">${pet_name}</h1>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-solid fa-border-all"></i>
                    <p>Bread: ${!breed ? 'Not Found' : `${breed}`}</p>
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-solid fa-venus"></i>
                    <p>Gender: ${!gender ? 'Not Found' : `${gender}`}</p>
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-solid fa-venus"></i>
                    <p>Vaccinated status: ${!vaccinated_status ? "Not Found" : `${vaccinated_status}`}</p>
                </div>
            </div>
            <div class="mt-10">
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-regular fa-calendar"></i>
                    <p>Birth: ${!date_of_birth ? 'Not Found' : `${date_of_birth}`}</p>
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                    <i class="fa-solid fa-dollar-sign"></i>
                    <p>Price: ${!price ? 'Not Found' : `${price}$`}</p>
                </div>
            </div>
        </div>
        <div class="pt-3 mt-2 border-t">
            <h2 class="font-bold mb-2">Details Information</h2>
            <ul class="list-disc ml-5  text-gray-500">
                <li>${pet_details}</li>
            </ul>
        </div>
        <div class="modal-action">
            <form class="w-full" method="dialog">
                <button class="btn w-full text-emerald-700 text-lg text-justify">Cancel</button>
            </form>
        </div>
    `;
    detailsContainer.append(div);
    document.getElementById('detailsModal').showModal();
}

loadAllPetsCategory()
