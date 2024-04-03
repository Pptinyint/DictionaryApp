const form = document.querySelector('form');
const resultEl = document.querySelector('#result');


form.addEventListener('submit', async (event)=>{
    event.preventDefault();
   // console.log(form.elements[0].value);
   // console.log(event.target.searchInput.value);
   await getdata(event.target.searchInput.value);
});

let getdata = async (wordInfo) => {
    //alert("ww:" + wordInfo);

    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInfo}`;
    try {

         resultEl.innerHTML = `fetching data...`;
         
        const wordResponse = await fetch(URL);
            if(!wordResponse.ok){
                throw new Error('Failed to fetch data');
            }
        
        
            const wordResult = await wordResponse.json();        
            const definitions = wordResult[0].meanings[0].definitions[0];
            resultEl.innerHTML = `
            <p><small><b>Word:</b>${wordResult[0].word}</small></p>
            <p class="partOfspeech">${wordResult[0].meanings[0].partOfSpeech}</p>
            <p><small><b>Definition:</b>${definitions.definition === undefined ? "No Data Found!" : definitions.definition}</small></p>
            <p><small><b>Example: </b>${definitions.example === undefined ? "No Data Found!" : definitions.example}</small></p>
            <p><small><b>Antonyms: </b></small></p>`;

            if(definitions.antonyms.length == 0){
                resultEl.innerHTML += `<small>No Data Found!</small>`;
            }else{
                for(let i=0;  i<definitions.antonyms.length; i++){
                    resultEl.innerHTML += `<small><li>${definitions.antonyms[i]}</li></small>`;
                    console.log(definitions.antonyms[i]);
                }
            }  
            resultEl.innerHTML += `<div><a href="${wordResult[0].sourceUrls}" class="btnButton" target="_blank">read More..</a></div>`;     
       
            console.log(wordResult);
        
    } catch (error) {
        console.log("Error: " + error);
        resultEl.innerHTML = `<h2>Error: ${error.message}</h2>`;
    }
   

   
};
