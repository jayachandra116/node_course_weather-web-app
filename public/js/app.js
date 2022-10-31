console.log("Client side javascript is loaded!");

const weatherForm=document.querySelector('form');
const searchElement=document.querySelector('input');
const location=document.querySelector('#location');
const forecast=document.querySelector('#forecast');

location.textContent='';


weatherForm,addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=searchElement.value;
    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
    res.json().then(data=>{
        if(data.erro){
            console.log(data.error);
        }
        else{
            // console.log(data.location);
            // console.log(data.forecast);

        }
    })
})

})



