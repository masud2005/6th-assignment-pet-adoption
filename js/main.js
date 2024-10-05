

// Load All Pet Categories
const loadAllPetsCategory = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json();
    displayAllPetCategories(data.categories);
    // fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
}


// All Pet Categories Display
const displayAllPetCategories = (petsCategory) => {
    console.log(petsCategory);
    const categoryContainer = document.getElementById('category-container');
    petsCategory.forEach( pet => {
        console.log(pet);
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


