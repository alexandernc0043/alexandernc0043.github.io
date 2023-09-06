window.onload = function () {
    var backgroundImg=["alexandernc0043.github.io/images/5D13645D-FB6C-49EA-8570-0AC4F1D59BA9_1_105_c.jpeg",
                      "alexandernc0043.github.io/images/7743C8A2-DDE7-467D-BBA3-E0A5EC5BBC74_1_105_c.jpeg",
                      "alexandernc0043.github.io/images/7C18C057-B906-48CC-9632-A2329A13FEB8_1_105_c.jpeg",
                      "alexandernc0043.github.io/images/CA935BA2-DCB1-4A86-BFE4-283A95AC61B6_1_105_c.jpeg",
                      "alexandernc0043.github.io/images/E24E291D-8CA2-4733-B31E-3E6299870961_1_105_c.jpeg"
                      ]
    
      setInterval(changeImage, 5000);
     function changeImage() {   
      var i = Math.floor((Math.random() * 3));
      
      document.body.style.backgroundImage = "url('"+backgroundImg[i]+"')";
      
    }
  }