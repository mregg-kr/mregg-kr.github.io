/**
 * Interactive Script for Git Profile Landing Page
 * Features:
 *  1. Smooth cursor-tracking ambient glow effect (using requestAnimationFrame & LERP)
 *  2. Mobile active panel toggle behavior on tap
 */

document.addEventListener('DOMContentLoaded', () => {
    const glowBg = document.getElementById('glow-bg');
    const panels = document.querySelectorAll('.panel');
    let hasMoved = false;

    // Coordinates for the lerp animation
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        // Fade in glow background on first movement
        if (!hasMoved) {
            hasMoved = true;
            document.body.classList.add('mouse-moved');
            // Instantly snap to the first mouse position to avoid slide-in from (0,0)
            currentX = targetX;
            currentY = targetY;
        }
    });

    // Lerped (Linear Interpolated) loop for ultra-smooth fluid movement
    function animateGlow() {
        if (hasMoved) {
            // 0.08 interpolation factor creates a elegant, viscous ease-out lag
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            
            // Translate the absolute-positioned glow container centered under the cursor
            glowBg.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
        }
        requestAnimationFrame(animateGlow);
    }

    // Start the animation loop
    requestAnimationFrame(animateGlow);

    // Mobile viewport touch interaction fallback
    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            // Only apply tap toggles on mobile sized viewports
            if (window.innerWidth <= 768) {
                const isActive = panel.classList.contains('active');
                
                // Clear active states on all panels
                panels.forEach(p => p.classList.remove('active'));
                
                // Toggle active state for current panel
                if (!isActive) {
                    panel.classList.add('active');
                    // Smoothly scroll the panel into view if it is partly cut off
                    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    // Reset panel active states when viewport changes back to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            panels.forEach(p => p.classList.remove('active'));
        }
    });
});
