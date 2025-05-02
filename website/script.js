document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll('.scroll-reveal-item');

    // Staggering delay function (currently not used, delays set in CSS)
    const staggerDelay = (element, baseDelay = 0) => {
        // Placeholder for potential future staggering logic
    };

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px 0px -10% 0px', // Trigger a bit sooner (10% from bottom)
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add the .is-visible class to trigger the CSS transition
                entry.target.classList.add('is-visible');
                // Stop observing the element once it has become visible
                observer.unobserve(entry.target);
            }
        });
    };

    // Create and start the observer
    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each target element
    revealItems.forEach(item => {
        intersectionObserver.observe(item);
    });
});