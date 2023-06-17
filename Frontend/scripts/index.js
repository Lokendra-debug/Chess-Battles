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