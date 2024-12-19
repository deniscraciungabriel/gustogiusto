// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Carousel functionality
  const carousel = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  let currentSlide = 0;

  function showSlide(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // // Auto-advance carousel
  // let carouselInterval = setInterval(nextSlide, 5000);

  // // Pause carousel on hover
  // carousel.addEventListener('mouseenter', () => {
  //     clearInterval(carouselInterval);
  // });

  // carousel.addEventListener('mouseleave', () => {
  //     carouselInterval = setInterval(nextSlide, 5000);
  // });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Auto-select Home
  const homeLink = document.querySelector('nav ul li a[href="#home"]');
  homeLink.classList.add("active");

  // Update active link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll("nav ul li a").forEach((li) => {
      li.classList.remove("active");
      if (li.getAttribute("href").substring(1) === current) {
        li.classList.add("active");
      }
    });
  });

  // Language switcher
  const languageSelect = document.getElementById("language-select");
  const elementsToTranslate = document.querySelectorAll("[data-en]");

  function setLanguage(language) {
    elementsToTranslate.forEach((element) => {
      element.textContent = element.getAttribute(`data-${language}`);
      let text = element.getAttribute(`data-${language}`);
      if (element.id === "about-text") {
        text = text.replace(/\n/g, "<br><br>");
      }
      element.innerHTML = text;
    });
    document.documentElement.lang = language;
  }

  languageSelect.addEventListener("change", function () {
    setLanguage(this.value);
  });

  // Set default language to Italian
  setLanguage("it");

  // Phone click tracking
  document.addEventListener("DOMContentLoaded", function () {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach((link) => {
      link.addEventListener("click", function () {
        gtag("event", "click", {
          event_category: "Phone",
          event_label: "Booking Call",
          value: 1,
        });
      });
    });
  });

  function loadMenu() {
    fetch("./menu.txt")
      .then((response) => response.text())
      .then((data) => {
        const menuGrid = document.getElementById("menu-grid");
        const categories = data.trim().split("\n\n"); // Split by double newline for categories

        categories.forEach((category) => {
          const [categoryName, ...items] = category.split("\n"); // First line is category name
          const categoryDiv = document.createElement("div");
          categoryDiv.classList.add("menu-category");

          const categoryTitle = document.createElement("h3");
          categoryTitle.textContent = categoryName;
          categoryDiv.appendChild(categoryTitle);

          const itemList = document.createElement("ul");

          items.forEach((item) => {
            const [itemName, price] = item.split("|"); // Split by "|" for item name and price
            const listItem = document.createElement("li");

            const itemSpan = document.createElement("span");
            itemSpan.textContent = itemName.trim();

            const priceSpan = document.createElement("span");
            priceSpan.classList.add("price");
            priceSpan.textContent = price.trim();

            listItem.appendChild(itemSpan);
            listItem.appendChild(priceSpan);
            itemList.appendChild(listItem);
          });

          categoryDiv.appendChild(itemList);
          menuGrid.appendChild(categoryDiv);
        });
      })
      .catch((error) => console.error("Error loading menu:", error));
  }

  // Load the menu on page load
  window.onload = loadMenu;
});
