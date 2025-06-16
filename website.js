



const slider = document.querySelector('.slider');
        const items = document.querySelectorAll('.slider .item');
        const toggleBtn = document.getElementById('toggle-btn');
        const imageText = document.getElementById('image-text');
        const textTitle = document.getElementById('text-title');
        const textDescription = document.getElementById('text-description');

        const total = items.length;
        const anglePerItem = 360 / total;

        let isPlaying = true;
        let currentRotation = 0;
        let isAnimating = false;
        let activeItemIndex = -1;

        // Function to get approximate current rotation during animation
        function getCurrentRotationApprox() {
            if (isPlaying) {
                // Estimate based on animation time and speed
                const animationDuration = 20000; // 20 seconds
                const startTime = performance.now() - (performance.now() % animationDuration);
                const elapsed = performance.now() - startTime;
                const progress = (elapsed / animationDuration) % 1;
                return progress * 360;
            }
            return currentRotation;
        }

        // Function to normalize angle to 0-360 range
        function normalizeAngle(angle) {
            return ((angle % 360) + 360) % 360;
        }

        // Function to find shortest rotation path
        function getShortestRotation(from, to) {
            const diff = normalizeAngle(to - from);
            if (diff > 180) {
                return from - (360 - diff);
            } else {
                return from + diff;
            }
        }

        // Function to show text
        function showText(title, description) {
            textTitle.textContent = title;
            textDescription.textContent = description;
            setTimeout(() => {
                imageText.classList.add('show');
            }, 800); // Show text after rotation completes
        }

        // Function to hide text
        function hideText() {
            imageText.classList.remove('show');
        }

        // Function to set active item
        function setActiveItem(index) {
            // Remove active class from all items
            items.forEach(item => item.classList.remove('active'));
            
            // Add active class to current item
            if (index >= 0 && index < items.length) {
                items[index].classList.add('active');
                activeItemIndex = index;
            } else {
                activeItemIndex = -1;
            }
        }

        // Pause/Play toggle
        toggleBtn.addEventListener('click', () => {
            if (isAnimating) return; // Don't allow toggle during click animation

            if (isPlaying) {
                currentRotation = getCurrentRotationApprox();
                slider.style.animation = 'none';
                slider.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(${currentRotation}deg)`;
                toggleBtn.textContent = 'Play';
            } else {
                // Hide text and remove active state when resuming
                hideText();
                setActiveItem(-1);
                // Resume animation from current position
                slider.style.animation = `spin 20s linear infinite`;
                slider.style.animationDelay = `-${(currentRotation / 360) * 20}s`;
                toggleBtn.textContent = 'Pause';
            }
            isPlaying = !isPlaying;
        });

        // Rotate selected image to front on click with smooth animation
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (isAnimating) return; // Prevent multiple clicks during animation

                isAnimating = true;

                // Hide any existing text
                hideText();

                // Pause the animation and get current position
                if (isPlaying) {
                    currentRotation = getCurrentRotationApprox();
                    isPlaying = false;
                    slider.style.animation = 'none';
                    slider.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(${currentRotation}deg)`;
                    toggleBtn.textContent = 'Play';
                }

                
                setTimeout(() => {
                    const targetAngle = -index * anglePerItem;

                    const shortestAngle = getShortestRotation(currentRotation, targetAngle);

                    slider.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(${shortestAngle}deg)`;

                    currentRotation = normalizeAngle(shortestAngle);

                    setActiveItem(index);

                    // Show text for this image
                    const title = item.getAttribute('data-title');
                    const description = item.getAttribute('data-description');
                    showText(title, description);

                    // Enable interactions after animation completes
                    setTimeout(() => {
                        isAnimating = false;
                    }, 800); // Match the CSS transition duration
                }, 50);
            });
        });



//-----------------the main----------------------
const svg = document.getElementById('svg');
        const container = document.querySelector('.svg');
        let ticking = false;
        let isHovering = false;

        function updateRotation() {
            // Only apply scroll rotation when not hovering
            if (!isHovering) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = scrollTop / maxScroll;
                
                // Calculate rotation (360 degrees per full scroll)
                const rotation = scrollPercent * 360;
                
                svg.style.transform = `rotate(${rotation}deg)`;
            }
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateRotation);
                ticking = true;
            }
        }

        // Handle hover events
        container.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        container.addEventListener('mouseleave', () => {
            isHovering = false;
            // Resume scroll-based rotation
            requestTick();
        });

        window.addEventListener('scroll', requestTick);

        // --------scroll text-------------

         let scrollDownCount = 0;
    let isSecondVisible = false;

    const h1_1 = document.getElementById('h-1');
    const h1_2 = document.getElementById('h-2');

    window.addEventListener('wheel', (e) => {
      const direction = Math.sign(e.deltaY);

      if (!isSecondVisible && direction > 0) {
        scrollDownCount++;
        if (scrollDownCount >= 2) {
          // Show H1-2
          h1_1.style.opacity = 0;
          h1_2.style.opacity = 1;
          isSecondVisible = true;
          scrollDownCount = 0;
        }
      } else if (isSecondVisible && direction < 0) {
        // Scroll up one notch — switch back
        h1_1.style.opacity = 1;
        h1_2.style.opacity = 0;
        isSecondVisible = false;
        scrollDownCount = 0;
      }
    });


    // --------------p text----------------



          let scrollDDownCount = 0;
    let isSecondVVisible = false;

    const p_1 = document.getElementById('p-1');
    const p_2 = document.getElementById('p-2');

    window.addEventListener('wheel', (e) => {
      const dirrection = Math.sign(e.deltaY);

      if (!isSecondVVisible && dirrection > 0) {
        scrollDDownCount++;
        if (scrollDDownCount >= 2) {
          // Show H1-2
          p_1.style.opacity = 0.5;
          p_2.style.opacity = 1;
          isSecondVVisible = true;
          scrollDDownCount = 0;
        }
      } else if (isSecondVVisible && dirrection < 0) {
        // Scroll up one notch — switch back
        p_1.style.opacity = 1;
        p_2.style.opacity = 0.5;
        isSecondVVisible = false;
        scrollDDownCount = 0;
      }
    });




  // ----------------dj9  -----------------------

  const bottomNavBarElement = document.getElementById('bottomFixedNavbarElement');
  const topScrollTrackingElement = document.getElementById('hiddeElement');
function handleBottomNavbarVisibility() {
            // Get the bounding rectangle of the top section (`hiddeElement`).
            const topSectionRect = topScrollTrackingElement.getBoundingClientRect();

            // If the bottom of the top section is scrolled past the top of the viewport (i.e., less than 0),
            // then the top section is out of view.
            if (topSectionRect.bottom < 0) {
                bottomNavBarElement.classList.add('show');
            } else {
                bottomNavBarElement.classList.remove('show');
            }
        }

        // Add a scroll event listener for navbar visibility
        window.addEventListener('scroll', handleBottomNavbarVisibility);