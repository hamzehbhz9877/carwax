const counters = document.querySelectorAll(".count");
const speed = 200;

// The code to start the animation is now wrapped in a function
const startCounters = () => {
    counters.forEach((counter) => {
        const updateCount = () => {
            const target = parseInt(+counter.getAttribute("data-target"));
            const count = parseInt(+counter.innerText);
            const increment = Math.trunc(target / speed);
            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 1);
            } else {
                count.innerText = target;
            }
        };
        updateCount();
    });
}

// On the first scroll in this window, call the function to start the counters
window.addEventListener('scroll', startCounters, {
    once: true
});