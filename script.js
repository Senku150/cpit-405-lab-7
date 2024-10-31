const FULL_URL= "https://api.unsplash.com/search/photos/?client_id=8ebeLO8T0_dRS5cFwzf2a-nCXxAM9SQtYBlI_APOX2k&query="
const inputElem= document.getElementsByTagName("input")


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
inputElem[1].addEventListener("click",()=>{ //XHR
let city = inputElem[0].value
city= encodeURIComponent(city)
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status === 200) {
    createimages(JSON.parse(xhr.responseText))
  }
};
xhr.open('GET', FULL_URL+city, true);
xhr.send();
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
inputElem[2].addEventListener("click",()=>{ //promise
let city = inputElem[0].value
city= encodeURIComponent(city)
const requestOptions = { //I can use this also in async await
    method: "GET"
  };  
  fetch(FULL_URL+city, requestOptions)
    .then((response) => response.text())
    .then((result) => createimages(JSON.parse(result)))
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
inputElem[3].addEventListener("click",async()=>{ //async await
let city = inputElem[0].value
city= encodeURIComponent(city)
const response= await fetch(FULL_URL+city)
const body = await response.json()
createimages(body)

})





function createimages(results){
    const divResultElem = document.getElementById("result")
    let htmlForAddingImages="";
    results.results.forEach(element => {
       htmlForAddingImages +=`<image src="${element.urls.small}"/>` 
    })
    divResultElem.innerHTML=htmlForAddingImages
}