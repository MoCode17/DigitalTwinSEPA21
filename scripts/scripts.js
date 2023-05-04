
    var menuLinks = document.querySelectorAll('.menu-link');

    function scrollToDashboard(event) {
        event.preventDefault();
        var targetId = event.target.getAttribute('href');
        var target = document.querySelector(targetId);
        target.scrollIntoView({ behavior: 'smooth' });
    }
    
    menuLinks.forEach(link => {
        link.addEventListener('click', scrollToDashboard);
    });


