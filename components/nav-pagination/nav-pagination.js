export function createPagination(page, maxPage) {
  const pages = document.createElement("span");
  pages.classList.add("navigation__pagination");
  pages.textContent = `${page} / ${maxPage}`;

  return pages;
}
