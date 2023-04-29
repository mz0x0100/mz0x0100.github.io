
$(document).ready(function() {
    
    var d = new Date();
    $('#current-year').html(d.getFullYear());
    
    $(document).scroll(function(e) {
        window.scrollY > 100 ? $('.home > #header').addClass('sticked') : $('.home > #header').removeClass('sticked');
    });

    if (document.getElementsByClassName('home').length>0)
        aos_init();
        
    let accordions = $('.accordion');

    for (let i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener('click', function() {
            this.classList.toggle('accordion-active')
            let accordionContent = this.nextElementSibling;
    
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });

    }
    
    // toggling nav open and hide on mobile devices
    const mobileNavToggles = $('.mobile-nav-toggle');

    for (let i = 0; i < mobileNavToggles.length; i++) {
        mobileNavToggles[i].onclick = function() {
            toogleMobileNav();
        }
    }

    const dropdowns = $('.navbar .dropdown > a');

    for(let i = 0; i < dropdowns.length; i++){
        dropdowns[i].onclick = function() {
            // if mobile nav is active
            if ($('.mobile-nav-active')) {
                dropdowns[i].classList.toggle('active');
                dropdowns[i].nextElementSibling.classList.toggle('dropdown-active');

                $('.dropdown-indicator').toggleClass('bi-chevron-up');
                $('.dropdown-indicator').toggleClass('bi-chevron-down');
            }
        }
    };

});

function toogleMobileNav() {

    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-show').toggleClass('d-none');
    $('.mobile-nav-hide').toggleClass('d-none');

}

/**
 * Animation on scroll function and init
 */
function aos_init() {
    AOS.init({
    duration: 800,
    easing: 'slide',
    once: true,
    mirror: false
    });
}