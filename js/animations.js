document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null, // Relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Remove the class when the element leaves the viewport
                entry.target.classList.remove('is-visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements that need scroll animation
    // Use '.animate-on-scroll' for general elements and '.staggered-item' for items to load sequentially
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .staggered-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- Staggered Load Animation Delay ---
    // Select all elements that need staggered loading
    const staggeredItems = document.querySelectorAll('.staggered-item');
    staggeredItems.forEach((item, index) => {
        // Set the --item-index CSS variable directly on the element's style
        item.style.setProperty('--item-index', index);
    });

    // --- Optional: Add any page-specific JS logic below if needed ---

}); 