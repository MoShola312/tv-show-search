const form = document.getElementById('search')
const resDisplay = document.getElementById('shows')

form.addEventListener('submit', async function(e){
e.preventDefault();
resDisplay.innerHTML = ''
    try {
        const searchTerm = (form.elements.query.value)

        const config = { params: {q: searchTerm}}
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config)

        makeImages(res.data)
        form.elements.query.value = ""
    } 
    catch (error) {
        console.log(error)
    }
})

function makeImages (shows){
    for (let result of shows){
        if(result.show.image === null) {
            const title = document.createElement('p')
            // const title = document.querySelector('.card-title')
            title.innerHTML=result.show.name

            const img = document.createElement('IMG');
            //set class attribute to .card-img-top
            //appendTo(".card")
        
            img.src = "https://jpmedia.co/wp-content/uploads/2015/06/17_responsaradio_photography-mp3-image.jpg";

            const hyperlink = document.createElement('a')
            hyperlink.target = "_blank"
            hyperlink.href = result.show.url
            hyperlink.appendChild(img)

            resDisplay.append(title, hyperlink)
        } else {
            // const title = document.createElement('p')
            const title = document.querySelector('.card-title')
            title.innerHTML=result.show.name

            const img = document.createElement('IMG');
            
            img.src = result.show.image.medium;

            const hyperlink = document.createElement('a')
            hyperlink.target = "_blank"
            hyperlink.href = result.show.url
            hyperlink.appendChild(img)

            resDisplay.append(title, hyperlink)
        }
        
    }
}

