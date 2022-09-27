async function doLogin() {
    const username = document.getElementById("loginName").value;
    const password = document.getElementById("loginPassword").value;
  
    const data = await fetch("/api/Login.php", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((b) => b.json());
    if (data.result) {
      console.log(
        "Your name is " +
          data.user.firstName +
          " " +
          data.user.lastName +
          " and you have logged in."
      );
      localStorage.setItem('user', JSON.stringify(data.user));
      var test = document.getElementById('error');
      if(test){
        document.getElementById('error').id = 'success'; 
        
      } else document.getElementById('noerror').id = 'success';
      
      const text = document.getElementById('success');
      text.textContent = "Success! Logging in..."  
      window.location.href = "LandingPage.html";
    }else{
        var test = document.getElementById('noerror');
        if(test){
          document.getElementById('noerror').id = 'error';         
        }        
       console.log(data.error);
       }
  }
  
  function doLogout() {
    localStorage.clear();
    window.location.href = "index.html";
  }
  
