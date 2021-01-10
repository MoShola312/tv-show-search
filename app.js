const form = document.getElementById('search')
const resDisplay = document.getElementById('shows')
// const divRow= document.querySelector('#shows')

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
            resDisplay.innerHTML +=
                `<div class="col mb-4">
                    <div class="card h-100" style="width: 18rem;">
                        <a href=${result.show.url} target="_blank">
                            <img src="https://jpmedia.co/wp-content/uploads/2015/06/17_responsaradio_photography-mp3-image.jpg" class="card-img-top" alt="...">
                        </a>
                            <div class="card-body">
                                <h5 class="card-title">${result.show.name}</h5>
                                <p class="card-text">${shrtText(result.show.summary)}</p>
                            </div>
                    </div>
                </div>
              `
            
        } else {
            resDisplay.innerHTML +=
            `
                <div class="col mb-">
                    <div class="card h-100" style="width: 18rem;">
                        <a href=${result.show.url} target="_blank">
                            <img src=${result.show.image.medium} class="card-img-top" alt="...">
                        </a>
                         <div class="card-body">
                            <h5 class="card-title">${result.show.name}</h5>
                            <p class="card-text">${shrtText(result.show.summary)}</p>
                        </div>
                    </div>
                </div>
            `
            
        }
        
    }
}


function shrtText (str) {
    if(str.length > 100) str = str.substring(0,150)
    return str
}
