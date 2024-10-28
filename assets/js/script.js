
document.addEventListener("DOMContentLoaded", function () {

   /*
   * Click navbar
   */
   const navLinks = document.querySelectorAll("[data-nav-link]");

   if (navLinks.length > 0) {
      navLinks[1].classList.add("active");
   }

   navLinks.forEach(link => {
      link.addEventListener("click", function () {
         navLinks.forEach(nav => nav.classList.remove("active"));
         this.classList.add("active");
      })
   });

   /* 
   *  Navbar
   */

   const navbarList = document.querySelector("[data-navbar-list]");
   const navOpenBtn = document.querySelector("[data-nav-open-btn]");

   const icon = document.createElement('ion-icon');
   icon.setAttribute('name', 'chevron-down-outline');
   icon.setAttribute('aria-hidden', true);
   navOpenBtn.appendChild(icon);

   let lastScrollPosition = 0; // Lưu vị trí cuộn cuối cùng

   // get height of li item
   function getSingleRowHeight() {
      const firstItem = navbarList.querySelector(".navbar-list .navbar-link.active");
      return firstItem ? firstItem.offsetHeight : 0;
   }

   // check navbar is overflow
   function checkOverflow() {
      let totalItemWidth = 0;

      // caculator length toltal of all li
      const items = navbarList.querySelectorAll("[data-nav-link]");
      items.forEach(item => {
         totalItemWidth += item.offsetWidth;
      });

      const listWidth = navbarList.clientWidth - (items.length - 1) * 7; // - gap each li

      // compare width of total item li vs width of list
      if (totalItemWidth > listWidth) { // if overflow width
         navOpenBtn.style.display = 'block';
         navbarList.classList.add("collapsed");
         navbarList.style.maxHeight = getSingleRowHeight() + "px"; // set max-heigth = heigth of 1 row
      } else {
         navOpenBtn.style.display = 'none';
         navbarList.classList.remove("collapsed");
         navbarList.style.maxHeight = "none";
      }
   }

   checkOverflow();

   // check dimension when resize
   window.addEventListener('resize', checkOverflow);

   navOpenBtn.addEventListener("click", function () {
      // when click, list is collapsed, it is will expanded
      if (navbarList.classList.contains("collapsed")) {
         navbarList.classList.remove("collapsed");
         navbarList.classList.add("expanded");
         navbarList.style.maxHeight = "none";
         icon.setAttribute('name', 'chevron-up-outline');
      } else {
         // Ngược lại, thu gọn lại danh sách
         navbarList.classList.remove("expanded");
         navbarList.classList.add("collapsed");
         navbarList.style.maxHeight = getSingleRowHeight() + "px"; // Khi collapsed, set heigth for row
         icon.setAttribute('name', 'chevron-down-outline');
      }
   });

   // Theo dõi sự kiện scroll
   window.addEventListener("scroll", function () {
      const currentScrollPosition = window.scrollY;

      // Khi cuộn xuống
      if (currentScrollPosition > lastScrollPosition) {
         if (navbarList.classList.contains("expanded")) {
            navbarList.classList.remove("expanded");
            navbarList.classList.add("collapsed");
            navbarList.style.maxHeight = getSingleRowHeight() + "px";
            icon.setAttribute('name', 'chevron-down-outline');
         }
      }

      lastScrollPosition = currentScrollPosition;
   });


   /*
   *  GO TO TOP
   */

   const goTop = document.querySelector("[data-go-top]");
   const header = document.querySelector("[data-header]");

   window.addEventListener("scroll", () => {
      if (window.scrollY >= 140) {
         goTop.classList.add("active");
      } else {
         goTop.classList.remove("active");
      }
   });

   goTop.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(0, 750);
   });

   /*
   *  GO TABEL CONTENT
   */

   document.querySelectorAll("[data-title-content]").forEach(titleContent => {
      const uniqueId = generateUniqueId(titleContent.textContent);
      console.log(uniqueId);
      titleContent.setAttribute('id', uniqueId);
   });

   document.querySelectorAll("[data-title-tabel]").forEach(titleTabel => {
      titleTabel.addEventListener('click', function (e) {
         e.preventDefault();
         const targetId = generateUniqueId(this.textContent);
         console.log(targetId);
         const targetElement = document.getElementById(targetId);

         if (targetElement) {
            const target = targetElement.getBoundingClientRect().top + window.scrollY - (header.offsetHeight + 10);
            smoothScrollTo(target.toFixed(4), 750);
         }
      })
   })
});

function generateUniqueId(content) {
   const baseId = content.trim().slice(0, 10).replace(/\s+/g, '-');
   const hash = hashCode(content);
   return `${baseId}||${hash}`;
}

function hashCode(str) {
   let hash = 0;
   for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
   }
   return hash;
}

// Hàm cuộn mượt
function smoothScrollTo(targetY, duration) {
   const startY = window.scrollY; // Vị trí hiện tại
   const distance = targetY - startY; // Khoảng cách cần cuộn
   const startTime = performance.now(); // Thời gian bắt đầu

   function scrollStep(currentTime) {
      const elapsed = currentTime - startTime; // Thời gian đã trôi qua
      const progress = Math.min(elapsed / duration, 1); // Tính tỷ lệ cuộn (0 đến 1)
      const ease = easeInOutCubic(progress); // Tính toán hàm easing
      window.scrollTo(0, startY + distance * ease); // Cuộn đến vị trí mới

      if (elapsed < duration) {
         requestAnimationFrame(scrollStep); // Gọi hàm tiếp theo
      }
   }

   requestAnimationFrame(scrollStep); // Bắt đầu quá trình cuộn
}

// Hàm easing
function easeInOutCubic(t) {
   return t < 0.5 ?
      4 * t * t * t :
      1 - Math.pow(-2 * t + 2, 3) / 2;
}



