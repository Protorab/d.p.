// iport vendor script
// import $ from "jquery";
// import wow from "wowjs";
import inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
import Vue from "vue";
const vue = require("vue");
// const WOW = require("wowjs");
// window.wow = new wow.WOW();
// window.wow.init();
// window.jQuery = $;
// window.$ = $;
// require("./vendor/mail.js");
// import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  // variable start
  const menuItem = document.querySelectorAll(".menu-link");
  const phoneInput = document.querySelectorAll("input[type=tel]");
  const images = document.querySelectorAll("img");

  const phoneLink = document.querySelectorAll("a[href^='tel']");
  const showPhotos = document.querySelectorAll(".show__photo");
  const popupPhoto = document.querySelector("#popup__photo");
  const popupPhotoImg = document.querySelector(".photo__popup-img");
  const popupPhotoTitle = document.querySelector(".photo__popup-title");
  const showModalBtns = document.querySelectorAll(".show__modal");
  const closePopup = document.querySelectorAll(".close__popup");
  const sendForms = document.querySelectorAll(".send__form");
  const burgerMenu = document.querySelector(".burger__menu");
  const menu = document.querySelector(".menu-nav");
  const body = document.querySelector("body");
  const accordionItemTitles = document.querySelectorAll(".accordion-item");
  const customSelect = document.querySelectorAll(".custom-select-wrapper");
  // variable end

  let phoneMaskBy = new inputmask({
    mask: "+375-99-999-99-99",
    clearIncomplete: true,
    greedy: false,
  });

  const attrClear = (item, attr, sw) => {
    let str = item.getAttribute(attr);

    if (str) {
      switch (sw) {
        case 1:
          item.setAttribute(attr, str.replace(/<\/?[^>]+(>|$)/g, ""));
          break;
        case 2:
          item.setAttribute(attr, str.replace(/\s+/g, ""));
          break;
        default:
          break;
      }
    }
  };

  // Toggle popup function
  const popupToggle = (
    popUp,
    popUpElement,
    el1ShowClassAdd,
    el2ShowClassAdd,
    el1HideClassRemove,
    el2HideClassRemove,
    state,
    timing
  ) => {
    popUp.classList.add(el1ShowClassAdd);
    popUp.classList.remove(el1HideClassRemove);
    popUpElement.classList.remove(el2HideClassRemove);
    popUpElement.classList.add(el2ShowClassAdd);
    body.classList.toggle("__fixed");
    setTimeout(function FormFadeIn() {
      popUp.style.display = state;
    }, timing);
  };

  //  class removable function
  const classRemove = (element, removeClass) => {
    const elementClass = document.querySelector("" + element + "");
    if (elementClass) {
      elementClass.classList.remove(removeClass);
    }
  };

  // popup Close function start
  const popupClose = () => {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (window.getComputedStyle(modal).display === "flex") {
        const modalContent = modal.querySelector(".modal-content");
        popupToggle(
          modal,
          modalContent,
          "animate__fadeOut",
          "animate__bounceOutUp",
          "animate__fadeIn",
          "animate__bounceInDown",
          "none",
          1000
        );
      }
    });
  };

  if (menuItem.length > 0) {
    for (let i = 0; i < menuItem.length; i++) {
      const item = menuItem[i];
      item.parentNode.style.zIndex = 100 - i;
      let dorpMenu = item.parentNode.querySelector(".menu-dropdown");
      let arrow = document.createElement("span");
      arrow.classList.add("arrow");
      arrow.classList.add("arrow--menu");
      if (dorpMenu) {
        item.parentNode.appendChild(arrow);

        item.addEventListener("click", (e) => {
          e.preventDefault();
          if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            )
          ) {
            if (e.currentTarget.parentNode.classList.contains("--open")) {
              e.currentTarget.parentNode.classList.remove("--open");
            } else {
              e.currentTarget.parentNode.classList.add("--open");
            }
          }
        });
      }
    }
  }
  // phone link clear white space
  if (phoneLink.length > 0) {
    phoneLink.forEach((link) => {
      attrClear(link, "href", 2);
    });
  }

  if (images.length > 0) {
    images.forEach((img) => {
      attrClear(img, "title", 1);
      attrClear(img, "alt", 1);
    });
  }

  // inputmask for phone input
  if (phoneInput.length > 0) {
    phoneInput.forEach((phoneMask) => {
      phoneMaskBy.mask(phoneMask);
    });
  }

  // showPhotos click
  if (showPhotos.length > 0) {
    showPhotos.forEach((showPhoto) => {
      showPhoto.addEventListener("click", function (e) {
        e.preventDefault();
        const title = this.title;
        const img = this.href;
        popupPhotoTitle.innerHTML = title;
        popupPhotoImg.src = img;
        popupToggle(
          popupPhoto,
          popupPhotoImg,
          "animate__fadeIn",
          "animate__bounceIn",
          "animate__fadeOut",
          "animate__bounceOut",
          "flex",
          100
        );
      });
    });
  }

  //  burgerMenu function
  if (burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      this.classList.toggle("--clicked");
      menu.classList.toggle("--show");
      e.preventDefault;
    });
  }

  // abort send form on enter keydown
  if (sendForms.length > 0) {
    sendForms.forEach((sendForm) => {
      sendForm.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
    });
  }

  // hide menu on scroll
  window.addEventListener("scroll", function () {
    classRemove(".burger__menu.--clicked", "--clicked");
    classRemove(".menu-nav.--show", "--show");
  });

  // show popUp start
  if (showModalBtns.length > 0) {
    for (let i = 0; i < showModalBtns.length; i++) {
      const btn = showModalBtns[i];
      btn.addEventListener("click", function (e) {
        const popupType = this.dataset.type;
        const targetModel = document.querySelector("#modal__" + popupType + "");
        e.preventDefault();
        const targetModelItem = targetModel.querySelector(".modal-content");
        popupToggle(
          targetModel,
          targetModelItem,
          "animate__fadeIn",
          "animate__bounceInDown",
          "animate__fadeOut",
          "animate__bounceOutUp",
          "flex",
          100
        );
      });
    }
  }

  // call close popup func on popUp close click
  if (closePopup.length > 0) {
    closePopup.forEach(function (close) {
      close.addEventListener("click", function (e) {
        popupClose();
        e.preventDefault();
      });
    });
  }

  // call close popup func on ESC keypress
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      popupClose();
    }
  });

  for (let i = 0; i < accordionItemTitles.length; i++) {
    accordionItemTitles[i].addEventListener("click", function (event) {
      event.preventDefault();
      event.target.classList.toggle("active");
      let accordionItemContent = event.target.nextElementSibling;

      if (!accordionItemContent.classList.contains("active")) {
        accordionItemContent.classList.add("active");
        accordionItemContent.style.height = "auto";
        let height = accordionItemContent.clientHeight + "px";
        accordionItemContent.style.height = "0px";

        setTimeout(function () {
          accordionItemContent.style.height = height;
        }, 0);
      } else {
        accordionItemContent.style.height = "0px";

        accordionItemContent.addEventListener(
          "transitionend",
          function () {
            accordionItemContent.classList.remove("active");
          },
          {
            once: true,
          }
        );
      }
    });
  }

  // custom Select
  if (customSelect.length > 0) {
    customSelect.forEach((customSelect) => {
      customSelect.addEventListener("click", function () {
        this.querySelector(".custom-select").classList.toggle("open");
      });
      for (const customOption of document.querySelectorAll(".custom-option")) {
        customOption.addEventListener("click", function () {
          if (!this.classList.contains("selected")) {
            let customInput = this.parentNode.parentNode.querySelector(
              ".custom-select-input"
            );
            let inputOption = customInput.querySelector("option");
            this.parentNode
              .querySelector(".custom-option.selected")
              .classList.remove("selected");
            this.classList.add("selected");
            this.closest(".custom-select").querySelector(
              ".custom-select__trigger span"
            ).textContent = this.textContent;
            this.dataset.value !== "def"
              ? (inputOption.setAttribute("value", this.textContent),
                inputOption.setAttribute("selected", true),
                (inputOption.innerHTML = this.textContent))
              : (inputOption.setAttribute("value", ""),
                inputOption.removeAttribute("selected"),
                (inputOption.innerHTML = ""));
          }
        });
      }
      window.addEventListener("click", function (e) {
        const select = document.querySelectorAll(".custom-select");
        select.forEach((item) => {
          if (!item.contains(e.target)) {
            item.classList.remove("open");
          }
        });
      });
    });
  }
});
