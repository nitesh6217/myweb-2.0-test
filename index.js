const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      logo = body.querySelector(".logo")

      logo.addEventListener("click",() =>{
        sidebar.classList.toggle("close");
      });

      