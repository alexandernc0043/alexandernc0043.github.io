const sections = document.getElementsByTagName("section");
const tableOfContents = document.querySelector("#toc ul")
Array.from(sections).forEach((element, idx) => {
    element.id = (idx + 1).toString();
    const header = element.querySelector("h2")
    tableOfContents.insertAdjacentHTML("beforeend", `<li><a href="#${idx + 1}">${header.textContent}</a></li>`);
});
const header = document.querySelector("h1")
document.title = header.textContent