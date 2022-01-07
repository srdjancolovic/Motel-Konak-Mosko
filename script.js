"use strict";
//////////VARIABLES
const html = document.querySelector("html");
const mainSection = document.querySelector("main");
//Image slider
const imgSliderMain = document.getElementById("img-slider");
const swiperSlider = document.querySelector(".swiper-wrapper");
//Open/close menu btn
const openCloseBtn = document.querySelector(".open-close");
//Menu toggler lines
const topLine = document.querySelector(".top");
const bottomLine = document.querySelector(".bottom");
//Nav menu
const navMenu = document.querySelector(".menu");
//Heading and logo div
const headingAndLogo = document.getElementById("heading");
//Navi links
const navLinks = document.querySelectorAll(".link");
//Preloader
const preloader = document.querySelector(".preloader");

///Modal
const modalBtn = document.querySelector(".btn-modal");
const aboutModal = document.querySelector(".about-modal");
const closeModal = document.querySelector(".close-modal");

//////Hide preload animation on load
$(window).on("load", function () {
  $(".preloader").addClass("hide-preloader");

  $(function () {
    function onScrollInit(items, trigger) {
      items.each(function () {
        var osElement = $(this),
          osAnimationClass = osElement.attr("data-animation"),
          osAnimationDelay = osElement.attr("data-delay");

        osElement.css({
          "-webkit-animation-delay": osAnimationDelay,
          "-moz-animation-delay": osAnimationDelay,
          "animation-delay": osAnimationDelay,
        });

        var osTrigger = trigger ? trigger : osElement;

        osTrigger.waypoint(
          function () {
            osElement.addClass("animated").addClass(osAnimationClass);
          },
          {
            triggerOnce: true,
            offset: "88%",
          }
        );
      });
    }

    onScrollInit($(".os-animation"));
    onScrollInit(
      $(".staggered-animation"),
      $(".staggered-animation-container")
    );
  });
});

////////EVENT HANDLERS

//Show modal
modalBtn.addEventListener("click", function () {
  aboutModal.classList.toggle("show-modal");
  modalBtn.classList.toggle("btn-modal-hide");
  headingAndLogo.classList.toggle("heading-after");
  openCloseBtn.style.pointerEvents = "none";
  imgSliderMain.style.pointerEvents = "none";
  swiperSlider.classList.toggle("swiper-after");
  openCloseBtn.style.opacity = 0;
});

//Hide modal
closeModal.addEventListener("click", function () {
  aboutModal.classList.toggle("show-modal");
  modalBtn.classList.toggle("btn-modal-hide");
  openCloseBtn.style.opacity = 1;

  //Add/remove shadow when modal is toggled
  headingAndLogo.classList.toggle("heading-after");
  openCloseBtn.style.pointerEvents = "visible";
  imgSliderMain.style.pointerEvents = "visible";
  swiperSlider.classList.remove("swiper-after");
});

//Toggle menu and menu animation
openCloseBtn.addEventListener("click", function () {
  topLine.classList.toggle("top-close");
  bottomLine.classList.toggle("bottom-close");
  navMenu.classList.toggle("show-menu");
});

//Close menu on html click anywhere
html.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("open-close") ||
    e.target.classList.contains("menu")
  )
    return;
  navMenu.classList.remove("show-menu");
  topLine.classList.remove("top-close");
  bottomLine.classList.remove("bottom-close");
});

//Close modal on heading and logo section
mainSection.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-modal")) return;
  aboutModal.classList.remove("show-modal");
  headingAndLogo.classList.remove("heading-after");
  modalBtn.classList.remove("btn-modal-hide");
  openCloseBtn.style.pointerEvents = "visible";
  imgSliderMain.style.pointerEvents = "visible";
  swiperSlider.classList.remove("swiper-after");
  openCloseBtn.style.opacity = 1;
});

//Toggle menu when some of navi link is pressed
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    topLine.classList.toggle("top-close");
    bottomLine.classList.toggle("bottom-close");
    navMenu.classList.toggle("show-menu");
  });
});

//////Hide menu toggler when intersecting menu slider

const menuSlider = document.getElementById("menu-slider");

const hideMenuToggler = function (entries) {
  const [entry] = entries;

  const innerWidth = window.innerWidth;

  if (entry.isIntersecting === false && innerWidth > 576) {
    openCloseBtn.style.opacity = 1;
    openCloseBtn.style.pointerEvents = "visible";
  }
  if (entry.isIntersecting === true && innerWidth < 576) {
    console.log("manje");
    openCloseBtn.style.opacity = 0;
    openCloseBtn.style.pointerEvents = "none";
  }

  if (entry.isIntersecting === false && innerWidth < 576) {
    openCloseBtn.style.opacity = 1;
    openCloseBtn.style.pointerEvents = "visible";
  }
};

const menuTogglerObserver = new IntersectionObserver(hideMenuToggler, {
  root: null,
  threshold: 0.5,
});

menuTogglerObserver.observe(menuSlider);

//////LANDING PAGE SLIDER CONTROLS
const main = new Swiper(".landing-page-slider", {
  spaceBetween: 30,
  effect: "fade",
  direction: "vertical",
  speed: 800,
  loop: true,
  autoplay: {
    delay: 2500,
    speed: 3000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//FOOD MENU SLIDER
const foodMenu = new Swiper(".food-menu-slider", {
  effect: "cards",
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  speed: 500,
});

//FOOD GALLERY SLIDER
const foodGallery = new Swiper(".gallery-slider", {
  centeredSlides: false,
  spaceBetween: 40,
  slidesPerView: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  speed: 1000,

  navigation: {
    nextEl: ".next-sl",
    prevEl: ".prev-sl",
  },
  breakpoints: {
    1350: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 2,
    },
    300: {
      slidesPerView: 1,
    },
  },
});

///////////HOVER ANIMATION
const links = document.querySelector(".links");
const hoverAnimation = function (e) {
  if (e.target.classList.contains("link")) {
    const link = e.target;
    const siblings = link.closest(".links").querySelectorAll(".link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
links.addEventListener("mouseover", hoverAnimation.bind(0.4));
links.addEventListener("mouseout", hoverAnimation.bind(1));

///////SMOOTH SCROLL
$(".link, .arrow").on("click", function (e) {
  if (this.hash !== "") {
    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      1000
    );
  }
});

//LIGHTBOX IMAGE GALLERY
$(document).ready(function () {
  lightbox.option({
    resizeDuration: 700,
    wrapAround: true,
    imageFadeDuration: 800,
  });
});
