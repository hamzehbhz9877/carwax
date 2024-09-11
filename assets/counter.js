const counters = document.querySelectorAll('.count'),
    speed = 400,
    /**
     * create an IntersectionObserver with the specified callback that will be executed for each intersection change for every counter we have.
     * You may customize the options (2nd argument) per you requirement
     */
    observer = new IntersectionObserver(
        entries => entries.forEach(entry => entry.isIntersecting && animate(entry.target)),
        {
            threshold: 1 // tells the browser that we only need to execute the callback only when an element (counter) is fully visible in the viewport
        }
    ),
    // the animate function now accepts a counter (HTML element)
    animate = counter => {
        const value = +counter.dataset.target,
            data = +counter.innerText,
            time = value / speed;
        if (data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(() => animate(counter), 1);
        } else {
            counter.innerText = value;
        }
    };

// attach the counters to the observer
counters.forEach(c => observer.observe(c));