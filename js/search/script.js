let res;

const fetchTravelGuide = async (lat, long) => {
    console.log(lat, long)
    const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&conditions=wheelchair&bias=proximity:${long},${lat}&limit=10&apiKey=9021f7ffcc134742bf20b2aacf7d632f`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        res = result;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

const GetLatlong = (place) => {
    let geocoder = new google.maps.Geocoder();
    let address = place;
  
    geocoder.geocode({
      'address': address
    }, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        let latitude = results[0].geometry.location.lat();
        let longitude = results[0].geometry.location.lng();
        console.log(latitude, longitude)

        fetchTravelGuide(latitude, longitude)
      }
    });
  }


const searchBtn = document.getElementById("btn")
searchBtn.addEventListener("click", (event) =>{
    event.preventDefault()
    const searchText = document.getElementById("search").value
    console.log(searchText)

    GetLatlong(searchText)
})


res.map((result) => {
    const card = document.createElement('div')
    card.classList.add("card")
    const name = document.createElement('div')
    name.classList.add("name")
    name.textContent = result.name
    const description = document.createElement('div')
    description.classList.add("description")
    description.textContent = result.description
    const comment = document.createElement('div')
    comment.classList.add("comment")
    comment.textContent = result.comment

    card.appendChild(name)
    card.appendChild(description)
    card.appendChild(comment)
    card.appendChild(card)

})