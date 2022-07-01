/* Global Variables */
const myKey = '295031d80dce48a82e99867be16ba6f7';
const myUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
//https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
const fetchWeather = async (myUrl, myKey, zip) => {
    const response = await fetch (myUrl + zip + '&appid=' + myKey);
    try{
        const allData = await response.json();
        return allData;
    }catch(error){
        console.log('Error', Error);
    }
}

const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generate = document.querySelector("#generate");
const converttoJson = (response) => {
    return response 
}
generate.addEventListener('click', (event)=> {
    event.preventDefault()
getData(fetchWeather)
.then((myData) => {
    filterData(myData)
    .then((info)=> {
        postData('/add', info)
        .then(() => {
            retrieveData('/all')
            .then((myData) => {
                updateUI(myData)
            });
        });
    });
})
});

// Create a new date instance dynamically with JS
const temp = document.getElementById('temp');
const name = document.getElementById('name');
const date = document.getElementById('date');
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const content = document.getElementById('content');



const getData  = async (myUrl) => {
    const response = await fetch (myUrl);
    try{
        const myData = await response.json();
        return myData;
    }catch(error){
        console.log('Error', Error);
    }
}

const filtertData  = async (myData) => {
   // const response = await fetch (myData);
    try{
        if (myData.message) {
        return myData;}
    else {
        const info = {
            date: newDate,
            feelings: feelings.val,
            temp: data.main.temp,
            name: data.name
        }
        return info;
    }
    }
    catch(error){
        console.log('Error', Error);
    }
}

const postData = async (myUrl = "", myData={}) => {
    try{
        const response = await fetch (myUrl, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myData)
        });
        return response;
    }
    catch(error){
        console.log('Error', Error);   
}
}

const retrieveData = async(myUrl) => {
    const myData = await fetch (myUrl);
    try{
        const response = await data.json();
        console.log(response);
    }
    catch(error){
        console.log('Error', Error);
}
}

const updateUI = async () => {
    const request = await fetch ('/all');
    try {
        const allMyData = await request.json();
        console.log(allMyData);
        if (allMyData.newDate) {
            const icon = allMyData.icon;
            document.getElementById('entryHolder').style.display='block';
            document.getElementById('error').style.display= 'none'
            name.InnerHTML =allMyData.name+'.';
            date.InnerHTML =allMyData.newDate+'.';
            temp.InnerHTML = + allMyData.temp + '0C';
            content.InnerHTML =allMyData.feelings? allMyData.feelings:'Please write how you are feeling today';
            background(icon);
        }
        else {
            document.getElementById('entryHolder').style.display='none';
            document.getElementById('error').style.display='block';
            document.getElementById('error').InnerHTML =allMyData.message;

        }
    }
    catch(error){
        console.log('Error', Error);
}
}