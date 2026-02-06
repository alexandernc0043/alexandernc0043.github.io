const dinoKittyImage = document.querySelector("img");

dinoKittyImage.addEventListener("click", (event) => {
  dinoKittyImage.animate(
    [
      {
        transform: "rotate(0deg)",
      },
      {
        transform: "rotate(360deg)",
      },
    ],
    2000,
  );
});
