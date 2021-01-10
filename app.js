const form = document.getElementById('search')
const resDisplay = document.getElementById('shows')

form.addEventListener('submit', async function(e){
e.preventDefault();
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
            const img = document.createElement('IMG');
             img.src = " ";
             resDisplay.append(img)
        } else {
            const img = document.createElement('IMG');
             img.src = result.show.image.medium;
             resDisplay.append(img)
        }
        
    }
}

