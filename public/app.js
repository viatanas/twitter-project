const buttonOne = document.getElementById("buttonone")
const buttonTwo = document.getElementById("buttontwo")
const buttonThree = document.getElementById("buttonthree")
const buttonFour = document.getElementById("buttonfour")
const buttonFive = document.getElementById("buttonfive")
const buttonSix = document.getElementById("buttonsix")
const imageContainer = document.getElementById("image-container")
const imageFile = document.getElementById("image-file")
const imageHidden = document.getElementById("image")
const removeBg = document.getElementById("remove-bg")
const exportBtn = document.getElementById("export")
const label = document.getElementById("label")


buttonOne.addEventListener("click", () => {
    imageContainer.style.background = "#9d2adb";
});

buttonTwo.addEventListener("click", () => {
    imageContainer.style.background = "#1D8BEC";
});

buttonThree.addEventListener("click", () => {
    imageContainer.style.background = "#00B7A0";
});

buttonFour.addEventListener("click", () => {
    imageContainer.style.background = "#E3E564";
});

buttonFive.addEventListener("click", () => {
    imageContainer.style.background = "#FF9632";
});

buttonSix.addEventListener("click", () => {
    imageContainer.style.background = "#F73665";
});


 // Preview Image

 imageFile.addEventListener("change", function(){
    const file = this.files[0];

    if(file){
        const reader = new FileReader();
        imageHidden.style.display = "block";
        reader.addEventListener("load", function() {
            imageHidden.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    }

    exportBtn.style.display = "block";
    label.textContent = "Change Image";
});

// Zooming Functions

const zoomIn = document.getElementById("zoom-in");
const zoomOut = document.getElementById("zoom-out");

zoomIn.addEventListener("click", () => {
    let currentWidth = imageHidden.clientWidth;

    if(currentWidth <= 400){
        imageHidden.style.width = (currentWidth + 50) + "px";
    }
})

zoomOut.addEventListener("click", () => {
    let currentHeight = imageHidden.clientHeight;

    if(currentHeight >= 250){
        imageHidden.style.width = (currentHeight - 50) + "px";
    }
})

// Drag image

let isDown = false;

imageHidden.addEventListener("mousedown", function(e){
    isDown = true;
    offset = [
        imageHidden.offsetLeft - e.clientX,
        imageHidden.offsetTop - e.clientY
    ];
})

document.addEventListener("mouseup", function(){
    isDown = false;
}, true);

document.addEventListener("mousemove", function(e){
    e.preventDefault();
    
    if(isDown){
         mousePosition = { 
            x: e.clientX,
            y: e.clientY
        };
        imageHidden.style.left = (mousePosition.x + offset[0]) + "px";
        imageHidden.style.top = (mousePosition.y + offset[1]) + "px";
}}, true);


// Remove Background

removeBg.addEventListener("click", () => {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file_b64', imageHidden.getAttribute("src"));


    fetch('https://api.remove.bg/v1.0/removebg', {
        method: "POST",
        headers: {
            'X-Api-Key': 'dJ9fdGEpWReRjqXRmNuzcTG9'
        },
        body: formData
    })
        .then(response => response.blob())
        .then(file => { 
             
            const reader = new FileReader();
            imageHidden.style.display = "block";
            reader.addEventListener("load", function() {
                imageHidden.setAttribute("src", reader.result);
            });
    
            reader.readAsDataURL(file);

        })
});

// Export Image
exportBtn.addEventListener("click", () => {
    domtoimage.toJpeg(document.getElementById("image-container"), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
    });
    