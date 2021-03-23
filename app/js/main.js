/** @format */
// iport vendor script
// import $ from "jquery";
// import wow from "wowjs";
import inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
// const WOW = require("wowjs");
// window.wow = new wow.WOW();
// window.wow.init();
// window.jQuery = $;
// window.$ = $;
// require("./vendor/mail.js");
// import module example (npm i -D jquery)

// variable
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelectorAll("input[type=tel]");
  const images = document.querySelectorAll("img");
  const modalForms = document.querySelector(".modal__form");
  const phoneLink = document.querySelectorAll("a[href^='tel']");
  const formPopup = document.querySelector(".form__popup");

  const showPopup = document.querySelectorAll(".show__popup");
  const closePopup = document.querySelectorAll(".close__popup");
  const sendForms = document.querySelectorAll(".send__form");
  const burgerMenu = document.querySelector(".burger__menu");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");

  const accordionItemTitles = document.querySelectorAll(
    ".accordion-item__title"
  );
  const customSelect = document.querySelectorAll(".custom-select-wrapper");
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

  //  class removable function
  const classRemove = (element, removeClass) => {
    const elementClass = document.querySelector("" + element + "");
    if (elementClass) {
      elementClass.classList.remove(removeClass);
    }
  };
  // inputmask for phone input
  if (phoneInput.length > 0) {
    phoneInput.forEach((phoneMask) => {
      phoneMaskBy.mask(phoneMask);
    });
  }

  //  burgerMenu function
  if (burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      this.classList.toggle("__clicked");
      menu.classList.toggle("__show");
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
    classRemove(".burger__menu.__clicked", "__clicked");
    classRemove(".menu.__show", "__show");
  });

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

  // show popUp start
  if (showPopup.length > 0) {
    for (let i = 0; i < showPopup.length; i++) {
      const btn = showPopup[i];
      btn.addEventListener("click", function (e) {
        const popupType = this.dataset.type;
        if (this.classList.contains("order__certificates")) {
          document.querySelector(
            "#certificate__name"
          ).value = this.dataset.name;
          document.querySelector(
            "#certificate__point"
          ).value = this.dataset.count;
        }
        e.preventDefault();
        const targetPopup = document.querySelector(".popup" + popupType + "");

        const targetPopupForm = targetPopup.querySelector(".form__popup");
        popupToggle(
          targetPopup,
          targetPopupForm,
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
  // popup Close function start
  const popupClose = () => {
    if (modalForms.length > 0) {
      modalForms.forEach((item) => {
        if (!item.classList.contains(".popup__photo")) {
          if (window.getComputedStyle(item).display === "flex") {
            const formItem = item.querySelector(".form__popup");
            popupToggle(
              item,
              formItem,
              "animate__fadeOut",
              "animate__bounceOutUp",
              "animate__fadeIn",
              "animate__bounceInDown",
              "none",
              1000
            );
          }
        }
      });
    }
    // if (popupPhoto.length > 0) {
    if (window.getComputedStyle(popupPhoto).display === "flex") {
      popupToggle(
        popupPhoto,
        popupPhotoImg,
        "animate__fadeOut",
        "animate__bounceOut",
        "animate__fadeIn",
        "animate__bounceIn",
        "none",
        1000
      );
    }
    if (window.getComputedStyle(popupThanks).display === "flex") {
      popupToggle(
        popupThanks,
        thanksMessage,
        "animate__fadeOut",
        "animate__bounceOut",
        "animate__fadeIn",
        "animate__bounceIn",
        "none",
        1000
      );
    }
    // }
  };
  // call close popup func on popUp overlay click
  if (popupBg.length > 0) {
    popupBg.forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        popupClose();
      });
    });
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
  if (accordionItemTitles.length > 0) {
    for (var i = 0; i < accordionItemTitles.length; i++) {
      accordionItemTitles[i].addEventListener("click", function (event) {
        event.preventDefault();
        event.target.classList.toggle("active");
        var accordionItemContent = event.target.nextElementSibling;

        if (!accordionItemContent.classList.contains("active")) {
          accordionItemContent.classList.add("active");
          accordionItemContent.style.height = "auto";

          var height = accordionItemContent.clientHeight + "px";

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
  }

  // custom Select
  if (customSelect.length > 0) {
    customSelect.forEach((customSelect) => {
      customSelect.addEventListener("click", function () {
        this.querySelector(".custom-select").classList.toggle("open");
      });
      for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener("click", function () {
          if (!this.classList.contains("selected")) {
            this.parentNode
              .querySelector(".custom-option.selected")
              .classList.remove("selected");
            this.classList.add("selected");
            this.closest(".custom-select").querySelector(
              ".custom-select__trigger span"
            ).textContent = this.textContent;
          }
        });
      }
      window.addEventListener("click", function (e) {
        const select = document.querySelector(".custom-select");
        if (!select.contains(e.target)) {
          select.classList.remove("open");
        }
      });
    });
  }
});
