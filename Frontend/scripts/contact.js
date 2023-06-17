



document.getElementById('submitFeedback_user').addEventListener('submit', (e)=>{
    e.preventDefault();
    feedback()
  })
  
  function feedback() {
    let name = document.getElementById("name-pankaj").value;
    let email = document.getElementById("email-pankaj").value;
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