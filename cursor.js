window.addEventListener('DOMContentLoaded', function() {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.getElementById("custom-cursor").style.display = "none";
        document.body.style.cursor = "auto";
    }
    else if (mediaQuery.matches) {
        document.getElementById("custom-cursor").style.display = "none";
        document.body.style.cursor = "auto";
    }
    else {
        // custom cursor effect
        const cursor = document.getElementById('custom-cursor');
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
        let cursorInitialized = false;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!cursorInitialized) {
                cursor.style.opacity = '1';
                cursorInitialized = true;
            }
        });

        function animateCursor() {
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.transform = `translate(${cursorX - cursor.offsetWidth/2}px, ${cursorY - cursor.offsetHeight/2}px)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        function clearCursorHover() {
            cursor.classList.remove('cursor-link-hover', 'cursor-hover');
        }

        document.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!link.closest('.project-image')) {
                    clearCursorHover();
                    cursor.classList.add('cursor-link-hover');
                }
            });
            link.addEventListener('mouseleave', clearCursorHover);
        });

        document.querySelectorAll('.project-image a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                clearCursorHover();
                cursor.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', clearCursorHover);
        });

        document.addEventListener('mousedown', function() {
            cursor.classList.add('cursor-click');
        });
        document.addEventListener('mouseup', function() {
            cursor.classList.remove('cursor-click');
        });

        if (!cursor.querySelector('.cursor-label')) {
            const label = document.createElement('span');
            label.className = 'cursor-label';
            label.textContent = 'VIEW';
            cursor.appendChild(label);
        }
        document.querySelectorAll('.project-image').forEach(link => {
            link.addEventListener('mouseenter', () => {
                clearCursorHover();
                cursor.classList.add('cursor-hover', 'show-label'); // Add both hover and label
            });
            link.addEventListener('mouseleave', () => {
                clearCursorHover();
                cursor.classList.remove('show-label'); // Remove label on mouse out
            });
        });

        // Hide cursor when mouse leaves the window
        document.addEventListener('mouseout', function(e) {
            if (!e.relatedTarget && !e.toElement) {
                cursor.style.opacity = '0';
                cursorInitialized = false;
            }
        });
    }

});