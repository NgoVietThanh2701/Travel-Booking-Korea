
/* 
*  Navbar
*/

document.addEventListener("DOMContentLoaded", function () {

   const navbarList = document.querySelector(".navbar-list");
   const navOpenBtn = document.querySelector(".nav-open-btn");

   const icon = document.createElement('ion-icon');
   icon.setAttribute('name', 'chevron-down-outline');
   icon.setAttribute('aria-hidden', true);
   navOpenBtn.appendChild(icon);

   // get height of li item
   function getSingleRowHeight() {
      const firstItem = navbarList.querySelector("li");
      return firstItem ? firstItem.offsetHeight : 0;
   }

   // check navbar is overflow
   function checkOverflow() {
      const listWidth = navbarList.clientWidth;
      let totalItemWidth = 0;

      // caculator length toltal of all li
      const items = navbarList.querySelectorAll("li");
      items.forEach(item => {
         totalItemWidth += item.offsetWidth;
      });

      const rowHeight = getSingleRowHeight(); // get height of first row

      // compare width of total item li vs width of list
      if (totalItemWidth > listWidth) { // if overflow width
         navOpenBtn.style.display = 'block';
         navbarList.classList.add("collapsed");
         navbarList.style.maxHeight = rowHeight + "px"; // set max-heigth = heigth of 1 row
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
});