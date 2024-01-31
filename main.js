var video = document.getElementById('video');

        // Add event listeners for hover
        video.addEventListener('mouseover', playVideo);
        video.addEventListener('mouseout', pauseVideo);

        // Function to play the video
        function playVideo() {
            video.play();
        }

        // Function to pause the video
        function pauseVideo() {
            video.pause();
        }