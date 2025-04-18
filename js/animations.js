document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null, // Relative to the viewport
        rootMargin: '0px',
        // Use multiple thresholds to accurately detect leaving the viewport completely
        threshold: [0, 0.1] // Trigger at 0% and 10% visibility
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                // Element is at least 10% visible, trigger animation
                entry.target.classList.add('is-visible');
            } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
                // Element is completely out of view (ratio is 0), reset animation state
                entry.target.classList.remove('is-visible');
            }
            // When ratio is between 0 and 0.1 (partially leaving), do nothing to prevent flashing
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