
const loadPhones = async (searchText, dataLimit) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    } catch (error) {
        console.error(error)
    }
}

const displayPhones = (phones, dataLimit) => {
    const viewMoreBtn = document.getElementById('view-more')
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        viewMoreBtn.classList.remove('d-none')
    } else {
        viewMoreBtn.classList.add('d-none')
    }


    const noPhoneFound = document.getElementById('no-phone-found')
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none')

    } else {
        noPhoneFound.classList.add('d-none')
    }

    const phonesContainer = document.getElementById('phones_container')
    phonesContainer.innerHTML = '';
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        
        <div class="card h-100 box">
            <img src="${phone.image}" class="phone_image rounded card-img-top" alt="${phone.phone_name}">
            <div class="card-body">
                <h5 class="card-title text-center">${phone.phone_name}</h5>
                <p class=" text-center card-text">This is a short card.</p>
                <button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary d-block m-auto" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                
            </div>
        </div>
        `
        phonesContainer.appendChild(phoneDiv)
    })
    loaderSpinner(false)

}
const searchField = document.getElementById('search-field');
const processSearch = (dataLimit) => {
    loaderSpinner(true)
    
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
}

document.getElementById('search-btn').addEventListener('click', () => {
    processSearch(10)
})

const loaderSpinner = (isLoad) => {
    const loaderElement = document.getElementById('loader');
    if (isLoad === true) {
        loaderElement.classList.remove('d-none');
    } else {
        loaderElement.classList.add('d-none')
    }
}

// this is not the best way to load rest data from api 

document.getElementById('show-all-button').addEventListener('click', function () {
    loaderSpinner(true)
    processSearch()
})
searchField.addEventListener('keypress',(event)=>{

    if(event.key === 'Enter'){
        loaderSpinner(true)
        processSearch()
    }
})

const loadPhoneDetails =  async id => {
    const url =  `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url); 
    const data = await res.json();
    displayPhoneDetailsModal(data.data)
    
}

const displayPhoneDetailsModal = phone => {
    const phoneDetailsModalTitle = document.getElementById('phoneDetailsModalLabel'); 
    phoneDetailsModalTitle.innerText = phone.name;
    const phoneDetailsModalContent = document.getElementById('phoneDetailsModalContent'); 
    phoneDetailsModalContent.innerHTML = `
    
    <p> Release Data: ${phone.releaseDate}</p>
    
    `
}

loadPhones('apple')