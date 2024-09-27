const allVideos=document.querySelectorAll('video')

// Event listener for the play/pause button

window.addEventListener("load",()=>{
    allVideos.forEach(video=>{
        var playButton = video.nextElementSibling;
        var bg = video.nextElementSibling.nextElementSibling;
        playButton.addEventListener("click", function() {
            if (video.paused == true) {
                // Play the video
                video.play();
                video.controls=true
                bg.remove()
                playButton.remove()
            } else {
                // Pause the video
                video.controls=false
                video.pause();
            }
        });
    })
})

