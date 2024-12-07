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

const stars1 = document.querySelectorAll(".str1");
const stars2 = document.querySelectorAll(".str2");
const stars3 = document.querySelectorAll(".str3");

stars1.forEach((star, j) => {
  star.addEventListener("click", (e) => {
    e.preventDefault();

    for (let k = 0; k <= j; k++) {
      stars1[k].classList.remove("fa-regular");
      stars1[k].classList.add("fa-solid");
    }
  });
});

stars2.forEach((star, j) => {
  star.addEventListener("click", (e) => {
    e.preventDefault();

    for (let k = 0; k <= j; k++) {
      stars2[k].classList.remove("fa-regular");
      stars2[k].classList.add("fa-solid");
    }
  });
});

stars3.forEach((star, j) => {
  star.addEventListener("click", (e) => {
    e.preventDefault();

    for (let k = 0; k <= j; k++) {
      stars3[k].classList.remove("fa-regular");
      stars3[k].classList.add("fa-solid");
    }
  });
});


