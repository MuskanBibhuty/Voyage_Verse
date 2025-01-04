const accessKey = "L88-S0LHb1IUnnlxjt5L1OINJd843Z8NqTFgsdXsOeY"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResult = document.querySelector(".image")

let inputdata = ""
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = 'https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client-id=${accessKey}'

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if (page === 1){
        searchResult.innerHTML = ""
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('span')
        imageWrapper.classList.add("box")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
    })
}

formEl.addEventListener('enter', (event) =>{
    event.preventDefault()
    searchImages
})