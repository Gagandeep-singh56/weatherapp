let usertab= document.querySelector("[user-tab]"); 
let searchtab= document.querySelector("[search-tab]");
let usercontainer=document.querySelector("[weather]");
let grantacess=document.querySelector("[grant-acess]");
let searchform=document.querySelector("[searchbar]");
let loadingscreen=document.querySelector("[loading]");
let inputme=document.querySelector("[inputme]");
 let  cirbtn=document.querySelector("[cirbtn]");
 let notfound=document.querySelector(".notfound");
let currenttab=usertab;
 currenttab.classList.add("active");


 async function fetchdatabyname(){
    // if(city === ""){                                      
    // return;
    // }
    let city=inputme.value;
   
  
    usercontainer.classList.remove("active");
    notfound.classList.remove("active");
    grantacess.classList.remove("active");
    loadingscreen.classList.add("active");

    try{
        let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if(!response.ok){
            
            throw new error("Api did'nt fetched (unexpected input)");}
        
        let final= await response.json();

        loadingscreen.classList.remove("active");
        renderdata(final);;
        usercontainer.classList.add("active");
       
    }
    catch(e)
    {
        // alert('Something  is Wrong');
    loadingscreen.classList.remove("active");
    // usercontainer.classList.remove("active");
    // notfound.classList.add("active");
        usercontainer.classList.remove("active");
        notfound.classList.add("active");
    }
 }
 cirbtn.addEventListener("click",()=>{
    fetchdatabyname();
 })
 function switchtabs(passedtab)
 {
    if(passedtab!=currenttab)
    {
        currenttab.classList.remove("active");
        currenttab=passedtab;
        currenttab.classList.add("active");
        if(!searchform.classList.contains("active"))
        {
            usercontainer.classList.remove("active");
            grantacess.classList.remove("active");
            searchform.classList.add("active");
            // fetchdatabyname();
        }
        else {
            searchform.classList.remove("active");
            usercontainer.classList.remove("active");
            notfound.classList.remove("active");
            // coordinatespresent();
            getfromSessionStorage();
        }
    }
    
 }
 function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("userCordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantacess.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchuserdata(coordinates);
    }

}
usertab.addEventListener("click",()=>{
    switchtabs(usertab);
})
searchtab.addEventListener("click",()=>{
    switchtabs(searchtab);
})

// acc to me i will eventually improve
let API_KEY="55539392357197c0b0b4d569e99a08df";
// getpermission();
var lat;
var long;
// function handlepermit()
// {
//     grantacess.classList.remove("active");
//     usercontainer.classList.add("active");
// }
// if coordinates already present
coordinatespresent();
function coordinatespresent()
{
    const pinpoints=sessionStorage.getItem("userCordinates");
    if(!pinpoints)
    {
        grantacess.classList.add("active");
    }
    else{
        // console.log(pinpoints);
        // grantacess.classList.remove("active");
        // usercontainer.classList.add("active");
        let convert=JSON.parse(pinpoints);
         fetchuserdata(convert);
    }
}
function getpermission()
{
    // console.log("ji  ji");
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showposition);
    }
    else{
        alert('Location access not Supported ');
    }
}
 function renderdata(data)
 {
    let location=document.querySelector("[location]");
    let flag=document.querySelector("[flag]");
    let status=document.querySelector("[status]");
    let statusimg=document.querySelector("[statusimg]");
    let temp=document.querySelector("[temp]");
    let speed=document.querySelector("[speed]");
    let humidity=document.querySelector("[humidity]");
    let clouds=document.querySelector("[clouds]");

    location.innerText=data?.name;
    flag.src = `https://flagcdn.com/w320/${data?.sys?.country.toLowerCase()}.png`;
    status.innerText=data?.weather?.[0]?.description;
    statusimg.src= `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText=`${data?.main?.temp} °C`;
    speed.innerText=`${data?.wind?.speed} m/s`;
    humidity.innerText=`${data?.main?.humidity}%`;
    clouds.innerText=`${data?.clouds?.all}%`;


    
    
 }
 async function fetchuserdata(userCordinates)
 {
     let lat=userCordinates.lat;
     let lon=userCordinates.long;
     grantacess.classList.remove("active");
     loadingscreen.classList.add("active");
    try{
        let info=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        let data=await info.json();
        console.log(data);
        loadingscreen.classList.remove("active");
        usercontainer.classList.add("active");
        renderdata(data);
        
    }
    catch(e)
    {
        alert("Data Not Found");
        loadingscreen.classList.remove("active");

    }
    // renderdata();
 }
function showposition(position)
{
let userCordinates={
 lat:position.coords.latitude,
 long:position.coords.longitude
}
 sessionStorage.setItem("userCordinates",JSON.stringify(userCordinates));
 fetchuserdata(userCordinates);
}
 let grantbutton=document.querySelector(".permit");
 grantbutton.addEventListener("click",
    getpermission
 )


