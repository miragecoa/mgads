// FAQ Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
            
            // Update section height after animation
            setTimeout(() => {
                updateSection2Height();
            }, 250);
        });
    });
    
    // Function to update section 2 height based on content
    function updateSection2Height() {
        const section2 = document.querySelector('.section-2');
        const content = document.querySelector('.section-2-content');
        
        if (section2 && content) {
            // Force reflow to get accurate height
            void content.offsetHeight;
            
            // Get the actual content height including padding
            const contentHeight = content.offsetHeight;
            const minHeight = window.innerWidth > 1920 ? 1310 : (1310 / 1920 * window.innerWidth);
            
            // Set height to content height or minimum height, whichever is larger
            const finalHeight = Math.max(contentHeight, minHeight);
            section2.style.height = finalHeight + 'px';
        }
    }
    
    // Initial height calculation
    updateSection2Height();
    
    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateSection2Height();
        }, 250);
    });
});

