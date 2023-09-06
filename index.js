window.onload = function () {
    var backgroundImg=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyB57zuc4bms-hDtWMa-4BZvscIlJDm4r7a9WLaO4SAxUvKM-DDA",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBinSpWOvAtkxjmkf709O3rjH2ObRbWAEn9s0JcWaeL6LMtCbOrQ",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKY4J2qIFqkuDnABMzeypywbMSZL1cleS8vpySz0KD02wOYORU1g",
                      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQkdQT0zN0xDVP-VuvwojSbS5dOstX14eZvJCOWNPxKJ5dWTIc"
                      ]
    
      setInterval(changeImage, 5000);
     function changeImage() {   
      var i = Math.floor((Math.random() * 3));
      
      document.body.style.backgroundImage = "url('"+backgroundImg[i]+"')";
      
    }
  }