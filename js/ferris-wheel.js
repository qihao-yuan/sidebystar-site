document.addEventListener('DOMContentLoaded', () => {
    console.log('Ferris wheel script loaded.'); // Log: Script start

    const container = document.getElementById('ferris-wheel-container');
    if (!container) {
        console.error('Ferris wheel container not found!');
        return;
    }
    const members = Array.from(container.querySelectorAll('.team-member'));
    const totalMembers = members.length;
    const dotIndicatorContainer = document.getElementById('dot-indicator'); // Get dot container
    let dotElements = []; // Array to hold dot elements

    if (members.length === 0) {
        console.warn('No team members found in the container.');
        if (dotIndicatorContainer) dotIndicatorContainer.style.display = 'none'; // Hide dots if no members
        return;
    }
    if (!dotIndicatorContainer) {
         console.warn('Dot indicator container #dot-indicator not found.');
    } else {
        // Create dots dynamically
        for (let i = 0; i < totalMembers; i++) {
            const dot = document.createElement('span');
            dot.classList.add('indicator-dot');
            dotIndicatorContainer.appendChild(dot);
            dotElements.push(dot);
        }
    }

    // Calculate radius AFTER checking container exists and has height
    let radius = 0; 
    function calculateRadius() {
        // Try a slightly smaller radius again for more Z difference
        radius = container.clientHeight * 0.50;
        console.log('Calculated Radius:', radius);
        if (radius === 0) {
             console.warn('Container height might be 0, radius calculation failed.');
        }
    }
    calculateRadius(); // Initial calculation

    const angleStep = members.length > 0 ? (Math.PI * 2) / members.length : 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let snapTimeout = null; // Timer for snapping debounce
    const snapDelay = 150; // Delay in ms after last scroll to trigger snap
    // CSS values needed for alignment calculation (must match CSS)
    const dotHeight = 10; 
    const dotGap = 10;

    function updateDotIndicator(currentIndex) {
        if (dotElements.length === 0 || !dotIndicatorContainer) return;
        
        const activeIndex = (currentIndex % totalMembers + totalMembers) % totalMembers;
        
        // Remove vertical offset calculation and application
        /*
        let verticalOffset = 0;
        if (totalMembers > 1) {
            const totalIndicatorHeight = totalMembers * dotHeight + (totalMembers - 1) * dotGap;
            const activeDotTopEdge = activeIndex * (dotHeight + dotGap);
            const activeDotCenter = activeDotTopEdge + dotHeight / 2;
            const indicatorCenter = totalIndicatorHeight / 2;
            verticalOffset = indicatorCenter - activeDotCenter; 
        }
        dotIndicatorContainer.style.transform = `translateY(calc(-50% + ${verticalOffset}px))`;
        */
       
        // Ensure base transform is applied (or rely purely on CSS)
        // If CSS already handles `top: 50%; transform: translateY(-50%);`, this might not be needed
        // dotIndicatorContainer.style.transform = `translateY(-50%)`; // Revert to simple centering if needed

        // Update active class
        dotElements.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updatePositions(angle) {
        let loggedFirst = false;
        const centerZoneThreshold = radius * 0.85; // Z-value for full visibility
        const visibleZoneThreshold = radius * 0.1;  // Z-value below which it's basically hidden

        members.forEach((member, index) => {
            const memberAngle = angle + index * angleStep;
            const baseY = Math.sin(memberAngle) * radius; // Use the base Y
            const z = Math.cos(memberAngle) * radius;
            // Scale range [0.85, 1]
            const baseScale = (z + radius) / (2 * radius) * 0.15 + 0.85; 

            let finalOpacity = 0;
            let finalScale = baseScale; // Use base scale initially
            let finalY = baseY; // Use the calculated Y position, no exaggeration

            if (z > centerZoneThreshold) {
                // Center Zone
                finalOpacity = 1;
            } else if (z > visibleZoneThreshold) {
                // Visible Neighbor Zone
                finalOpacity = 0.85; // High opacity for visible overlap
                // Remove scale adjustment for neighbors temporarily
                // finalScale = baseScale * 0.98; 
            } else {
                // Hidden Zone (behind center or far back)
                finalOpacity = 0;
            }
            
            finalOpacity = Math.max(0, Math.min(1, finalOpacity));
            finalOpacity = isNaN(finalOpacity) ? 0 : finalOpacity;
            finalScale = isNaN(finalScale) ? 0.85 : finalScale;
            finalY = isNaN(finalY) ? 0 : finalY;

            member.style.transform = `translateX(-50%) translateY(${finalY}px) translateZ(${z}px) scale(${finalScale})`;
            member.style.opacity = finalOpacity;
            // zIndex calculation is crucial for overlap
            member.style.zIndex = Math.floor(z + radius);

            if (!loggedFirst && index === 0) {
                 console.log(`Update [${index}]: y=${finalY.toFixed(1)}, z=${z.toFixed(1)}, scale=${finalScale.toFixed(2)}, opacity=${finalOpacity.toFixed(2)}`);
                 loggedFirst = true;
            }
        });
    }

    function animate() {
        // Slower easing if not snapping, faster if snapping?
        // Or just keep the slow easing
        currentAngle += (targetAngle - currentAngle) * 0.06; // Keep slow easing

        // Only update if change is significant OR if we are close to the final snap target
        if (Math.abs(targetAngle - currentAngle) > 0.001) {
             updatePositions(currentAngle);
             // Calculate closest index based on current visual angle
             const currentIndex = Math.round(-currentAngle / angleStep);
             updateDotIndicator(currentIndex); // Update indicator in animation frame
        } else if (Math.abs(targetAngle - currentAngle) <= 0.001 && snapTimeout === null) {
            // Ensure final position is exactly the target if snapping finished
             currentAngle = targetAngle;
             updatePositions(currentAngle);
             // Ensure final indicator update for exact position
             const finalIndex = Math.round(-currentAngle / angleStep);
             updateDotIndicator(finalIndex);
        }

        requestAnimationFrame(animate);
    }

    // --- Mouse Wheel Interaction with Snapping ---
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scrollSensitivity = 0.003;

        // Immediately update targetAngle for responsive scrolling feel
        targetAngle += e.deltaY * scrollSensitivity;

        // Clear any existing snap timer
        if (snapTimeout) {
            clearTimeout(snapTimeout);
        }

        // Set a new timer to snap after delay
        snapTimeout = setTimeout(() => {
            const closestIndex = Math.round(-currentAngle / angleStep);
            const snapAngle = -closestIndex * angleStep;

            console.log(`Snapping to index: ${closestIndex % totalMembers}, angle: ${snapAngle}`);
            targetAngle = snapAngle;
            snapTimeout = null;

            // REMOVED: updateDotIndicator(closestIndex); // Update dot indicator

        }, snapDelay);

        console.log('Wheel Event - DeltaY:', e.deltaY, 'Immediate Target Angle:', targetAngle);
    }, { passive: false });

    // Re-calculate radius on resize potentially
    window.addEventListener('resize', calculateRadius);

    // Initialize positions and dot indicator
    console.log('Initial position update call');
    updatePositions(currentAngle);
    const initialIndex = Math.round(-currentAngle / angleStep); 
    updateDotIndicator(initialIndex);
    // Ensure CSS handles initial centering
    
    animate();
}); 