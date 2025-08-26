const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      hum = body.querySelector(".hum")
      logo = body.querySelector(".logo")

      hum.addEventListener("click",() =>{
        sidebar.classList.toggle("close");
        
      });
      logo.addEventListener("click",() =>{
        sidebar.classList.toggle("close");
        
      });

      
