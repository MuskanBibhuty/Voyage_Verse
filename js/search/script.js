const fetchTravelGuide = async (searchText) => {
    const url = 'https://travel-guide-api-city-guide-top-places.p.rapidapi.com/check?noqueue=1';

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'b758d7a0demsh9fb25657fd959b7p1a5b67jsn9468655a271d',
            'x-rapidapi-host': 'travel-guide-api-city-guide-top-places.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            region: searchText,
            language: 'en',
            interests: [
                'historical',
                'cultural',
                'food'
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

const searchBtn = document.getElementById("btn")
searchBtn.addEventListener("click", (event) =>{
    event.preventDefault()
    const searchText = document.getElementById("search").value
    console.log(searchText)
    fetchTravelGuide(searchText);
})

// console.log(searchText)


