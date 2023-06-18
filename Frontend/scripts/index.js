


                                  // JavaScript code for carousel functionality
var slideIndex = 0;
var slides = document.getElementsByClassName("carousel-image");

function showNextSlide() {
  // Hide the current slide
  slides[slideIndex].classList.remove("active");
  
  // Move to the next slide
  slideIndex++;
  
  // Wrap around to the first slide if at the end
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  
  // Show the next slide
  slides[slideIndex].classList.add("active");
}

// Show the first slide
slides[slideIndex].classList.add("active");

// Set interval for slide transition (change slide every 3 seconds)
setInterval(showNextSlide, 3000);


                                   // main index js script here by lokendra singh

const url="http://localhost:4000"
let playgame_btn1=document.querySelector("#playgame1")
let playgame_btn2=document.querySelector("#playgame2")
let form=document.querySelector("#form")

playgame_btn1.addEventListener("click",(e)=>{
  e.preventDefault();
  alert("PLEASE LOGIN")
})

playgame_btn2.addEventListener("click",(e)=>{
  e.preventDefault();
  alert("PLEASE LOGIN")
})




form.addEventListener("submit",async(e)=>{
  e.preventDefault()

  const data = {
    email: form.email.value,
    password: form.password.value
  };

  
  let result=await  fetch(url+"/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });

      if(result.msg==="login successfully"){
        localStorage.setItem("chessUser","islive")
        location.href="chessPage.html"
      }else if(result.error==="Invalid Password"){
        alert("Please enter your valid Password");
      }else if(result.msg==="User Not Found"){
        alert("User Not Found! please register your account");
        location.href="./views/register.html"
      }else{
        alert("something went wrong please try one more time")
      }
})
