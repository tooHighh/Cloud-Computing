const socket = io(location.host);

let i = document.getElementById("i");
let menu = document.querySelector(".menu");

menu.addEventListener("mouseenter", () => {
  i.style.transform = "rotate(180deg)";
  i.style.transitionDuration = "0.5s";
});

menu.addEventListener("mouseleave", () => {
  i.style.transform = "rotate(0deg)";
  i.style.transitionDuration = "0.5s";
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(".nav", {
  y: "-100%",
  scrollTrigger: {
    trigger: ".nav",
    markers: false,
    start: "50% 0%",
    end: "bottom 10%",
    scrub: 1,
  },
});

gsap.to(".boxUl1", {
  x: "-50%",
  scrollTrigger: {
    trigger: ".box",
    start: "top 90%",
    end: "bottom -90%",
    scrub: true,
  },
});

gsap.to(".boxUl2", {
  x: "50%",
  scrollTrigger: {
    trigger: ".box",
    start: "top 90%",
    end: "bottom -90%",
    scrub: true,
  },
});

gsap.from(".co", {
  opacity: 0,
  x: -50,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".about",
    start: "top 100%",
    end: "bottom 65%",
    toggleActions: "restart none none reset",
  },
});

ScrollTrigger.matchMedia({
  "(min-width: 599px)": function () {
    gsap.from(".li", {
      opacity: 0,
      y: 150,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".ul",
        start: "top -35%",
        end: "top 65%",
        toggleActions: "restart none reverse none",
      },
    });

    gsap.to(".p0 ,.main-title-home", {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".ul",
        start: "top -35%",
        end: "top 65%",
        toggleActions: "restart none reverse none",
      },
    });

    gsap.from(".c, .img1, .h3", {
      opacity: 0,
      y: 150,
      duration: 1,
      scrollTrigger: {
        trigger: ".ul",
        start: "top -35%",
        end: "top 65%",
        toggleActions: "restart none reverse none",
      },
    });

    gsap.to(".c", {
      fontSize: "60em",
      duration: 1,
      scrollTrigger: {
        trigger: ".ul",
        start: "top -35%",
        end: "top 65%",
        toggleActions: "restart none reverse none",
      },
    });
  },
});

const text = "Introduction to Cloud Computing";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    const introTitle = document.getElementById("intro-title");
    if (introTitle != null) introTitle.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 90);
  }
}

const i1 = document.getElementById("iMain1");
const i2 = document.getElementById("iMain2");
const i3 = document.getElementById("iMain3");
const con = document.querySelector(".page");

if (document.location.pathname.split("/").pop() == "") {
  window.onload = function () {
    typeWriter();
    delayAnim();
  };
} else {
  const introTitle = document.getElementById("intro-title");
  if (introTitle != null) introTitle.textContent = text;
  anim();
}

function anim() {
  i1.classList.add("iMain1");
  i2.classList.add("iMain2");
  i3.classList.add("iMain3");
  if (con != null) con.classList.add("content");
}

function delayAnim() {
  setTimeout(() => {
    i1.classList.add("iMain1");
    i2.classList.add("iMain2");
    i3.classList.add("iMain3");
    if (con != null) con.classList.add("con");
  }, 2800);
}

document.addEventListener("DOMContentLoaded", () => {
  const next = document.querySelector(".next");
  const previous = document.querySelector(".previous");

  const buttons = document.querySelectorAll(".b");

  const pages = [
    "/pages/index1.html",
    "/pages/index2.html",
    "/pages/index3.html",
    "/pages/index4.html",
    "/pages/index5.html",
  ];

  const currentPage = window.location.pathname.split("/").pop();

  const currentPageIndex = pages
    .map((page) => page.split("/").pop())
    .indexOf(currentPage);

  if (next != null)
    next.addEventListener("click", () => {
      if (currentPageIndex < pages.length - 1)
        window.location.href = pages[currentPageIndex + 1];
    });

  if (previous != null)
    previous.addEventListener("click", () => {
      if (currentPageIndex > 0)
        window.location.href = pages[currentPageIndex - 1];
    });

  buttons.forEach((button, index) => {
    if (index !== currentPageIndex) {
      button.addEventListener("click", () => {
        window.location.href = pages[index];
      });
    }
    if (index === currentPageIndex) {
      button.classList.add("present");
    }
  });
});

function taketo1(nb) {
  document.location.href = `/pages/index${nb}.html`;
}

function taketo() {
  document.location.href = "/index.html";
}

let comments = [];

socket.on("commentData", (data) => {
  comments = data;
  console.log(comments);
  createCommentSection();
});

let rate = [];

socket.on("commentRate", (data) => {
  console.log(data);
  rate = data;
});

function createCommentSection() {
  const comment = document.querySelector(".comment");
  comment.innerHTML = "";
  if (!comment.querySelector(".commentSection")) {
    for (let i = comments.length - 1; i >= 0; i--) {
      let html = "";

      for (let k = 0; k < rate.length; k++) {
        if (
          Math.round(rate[k].average_rate) == 0 &&
          rate[k].comment === comments[i].comment
        ) {
          html = `<div class="commentSection">
    <div style="display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;"> 
    <div>
      <p style="margin=0;padding=0">${comments[i].fname} ${comments[i].lname}</p>
      <small>${comments[i].email}</small>       
      </div>
      <div class="rating">
      <p style="display:inline">Average Rating: </p>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
    </div>
    </div >
      <div class="div">
        <p style="color:white">${comments[i].comment}</p>
        <div class="rating">
        <p style="display:inline">Your Rating: </p>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
        </div>
      </div>
    </div>`;
        } else if (
          Math.round(rate[k].average_rate) == 1 &&
          rate[k].comment === comments[i].comment
        ) {
          html = `<div class="commentSection">
    <div style="display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;"> 
    <div>
      <p style="margin=0;padding=0">${comments[i].fname} ${comments[i].lname}</p>
      <small>${comments[i].email}</small>       
      </div>
      <div class="rating">
      <p style="display:inline">Average Rating: </p>
      <i class="fa-solid fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
    </div>
    </div >
      <div class="div">
        <p style="color:white">${comments[i].comment}</p>
        <div class="rating">
        <p style="display:inline">Your Rating: </p>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
        </div>
      </div>
    </div>`;
        } else if (
          Math.round(rate[k].average_rate) == 2 &&
          rate[k].comment === comments[i].comment
        ) {
          html = `<div class="commentSection">
    <div style="display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;"> 
    <div>
      <p style="margin=0;padding=0">${comments[i].fname} ${comments[i].lname}</p>
      <small>${comments[i].email}</small>       
      </div>
      <div class="rating">
      <p style="display:inline">Average Rating: </p>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
    </div>
    </div >
      <div class="div">
        <p style="color:white">${comments[i].comment}</p>
        <div class="rating">
        <p style="display:inline">Your Rating: </p>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
        </div>
      </div>
    </div>`;
        }
        if (
          Math.round(rate[k].average_rate) == 3 &&
          rate[k].comment === comments[i].comment
        ) {
          html = `<div class="commentSection">
    <div style="display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;"> 
    <div>
      <p style="margin=0;padding=0">${comments[i].fname} ${comments[i].lname}</p>
      <small>${comments[i].email}</small>       
      </div>
      <div class="rating">
      <p style="display:inline">Average Rating: </p>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-regular fa-star "></i>
      <i class="fa-regular fa-star "></i>
    </div>
    </div >
      <div class="div">
        <p style="color:white">${comments[i].comment}</p>
        <div class="rating">
        <p style="display:inline">Your Rating: </p>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
        </div>
      </div>
    </div>`;
        } else if (
          Math.round(rate[k].average_rate) == 4 &&
          rate[k].comment === comments[i].comment
        ) {
          html = `<div class="commentSection">
    <div style="display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;"> 
    <div>
      <p style="margin=0;padding=0">${comments[i].fname} ${comments[i].lname}</p>
      <small>${comments[i].email}</small>       
      </div>
      <div class="rating">
      <p style="display:inline">Average Rating: </p>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-regular fa-star "></i>
    </div>
    </div >
      <div class="div">
        <p style="color:white">${comments[i].comment}</p>
        <div class="rating">
        <p style="display:inline">Your Rating: </p>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
        </div>
      </div>
    </div>`;
        } else if (
          Math.round(rate[k].average_rate) == 5 &&
          rate[k].comment === comments[i].comment
        ) {
          html = `<div class="commentSection">
    <div style="display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;"> 
    <div>
      <p style="margin=0;padding=0">${comments[i].fname} ${comments[i].lname}</p>
      <small>${comments[i].email}</small>       
      </div>
      <div class="rating">
      <p style="display:inline">Average Rating: </p>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
      <i class="fa-solid fa-star "></i>
    </div>
    </div >
      <div class="div">
        <p style="color:white">${comments[i].comment}</p>
        <div class="rating">
        <p style="display:inline">Your Rating: </p>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
          <i class="fa-regular fa-star str"></i>
        </div>
      </div>
    </div>`;
        }
      }
      comment.insertAdjacentHTML("afterbegin", html);

      const stars = comment.querySelectorAll(
        `.commentSection:nth-child(1) .str`
      );

      stars.forEach((star, j) => {
        star.addEventListener("click", (e) => {
          e.preventDefault();

          for (let k = 0; k <= j; k++) {
            stars[k].classList.remove("fa-regular");
            stars[k].classList.add("fa-solid");
          }

          fetch("/addRate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rate: j + 1,
              comment: comments[i].comment,
              email: comments[i].email,
            }),
          });
        });
      });
    }
  }
}
