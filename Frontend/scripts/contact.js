



document.getElementById('submitFeedback_user').addEventListener('submit', (e)=>{
    e.preventDefault();
    feedback()
  })
  
  function feedback() {
    let name = document.getElementById("name-nil").value;
    let email = document.getElementById("email-nil").value;
    let message = document.getElementById("text-message").value;
  
    let signdata = {
      name: name,
      email: email,
      message: message,
    };
    console.log(signdata)
    fetch(`deployedurl/feed/savefeedback`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signdata)
  
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("name-nil").value = "";
        document.getElementById("email-nil").value = "";
        document.getElementById("text-message").value = "";
  
        alert("Thanks for reaching out! I'll be happy to help! we will connect soon your mail")
  
  
      })
      .catch((err) => {
        alert(err)
        console.log(err)
  
      });
  }




  const getData=()=>{
    fetch("deloyed link/feed/showfeedback",{
    
        headers:{
          "Authorization":cookie("accessToken")
        }

    }).then(res=>res.json())
    
        .then(feedbacks => {
      const parent = document.getElementById("parent");
      for (let feedback of feedbacks) {
        const div = document.createElement("div");
        const message = document.createElement("p");
        
        
        message.textContent = feedback.message;
        
        
        


     
        

  
        div.appendChild(message);
       
        parent.appendChild(div);
      }
    })
    .catch(err => console.log(err));
};

getData()