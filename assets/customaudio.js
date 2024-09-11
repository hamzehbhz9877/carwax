/** Implementation of the presentation of the audio player */
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';


const audioPlayerContainer = document.querySelectorAll('.audio-player-container');


audioPlayerContainer.forEach(PlayerAu=>{
    const playIconContainer = PlayerAu.querySelector('.play-icon');
    const seekSlider = PlayerAu.querySelector('.seek-slider');
    const volumeSlider = PlayerAu.querySelector('.volume-slider');
    const muteIconContainer =  PlayerAu.querySelector('.mute-icon');

    let playState = 'play';
    let muteState = 'unmute';

    const playAnimation = lottieWeb.loadAnimation({
        container: playIconContainer,
        path: 'https://lottie.host/27cacb13-ea09-4921-8974-8146507b0d39/CpWawH1VaC.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: "Play Animation",
    });

    const muteAnimation = lottieWeb.loadAnimation({
        container: muteIconContainer,
        path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: "Mute Animation",
    });

    playAnimation.goToAndStop(0, true);

    playIconContainer.addEventListener('click', () => {
        if(playState === 'play') {
            audio.play();
            playAnimation.playSegments([0, 15], true);
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            audio.pause();
            playAnimation.playSegments([15, 0], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });

    muteIconContainer.addEventListener('click', () => {
        if(muteState === 'unmute') {
            muteAnimation.playSegments([0, 15], true);
            audio.muted = true;
            muteState = 'mute';
        } else {
            muteAnimation.playSegments([15, 25], true);
            audio.muted = false;
            muteState = 'unmute';
        }
    });

    const showRangeProgress = (rangeInput) => {
        if(rangeInput === seekSlider) PlayerAu.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        else PlayerAu.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    }

    seekSlider.addEventListener('input', (e) => {
        showRangeProgress(e.target);
    });
    volumeSlider.addEventListener('input', (e) => {
        showRangeProgress(e.target);
    });





    /** Implementation of the functionality of the audio player */

    const audio =  PlayerAu.querySelector('audio');
    const durationContainer =  PlayerAu.querySelector('.duration');
    const currentTimeContainer =  PlayerAu.querySelector('.current-time');
    const outputContainer =  PlayerAu.querySelector('.volume-output');
    let raf = null;

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    }

    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    }

    const displayBufferedAmount = () => {
        const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
        // PlayerAu.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
    }

    const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        PlayerAu.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
        raf = requestAnimationFrame(whilePlaying);
    }

    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        });
    }

    audio.addEventListener('progress', displayBufferedAmount);

    seekSlider.addEventListener('input', () => {
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        if(!audio.paused) {
            cancelAnimationFrame(raf);
        }
    });

    seekSlider.addEventListener('change', () => {
        audio.currentTime = seekSlider.value;
        if(!audio.paused) {
            requestAnimationFrame(whilePlaying);
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        const value = e.target.value;

        outputContainer.textContent = value;
        audio.volume = value / 100;
    });
})

