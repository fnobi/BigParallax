window.addEventListener('DOMContentLoaded', function () {
    var els = document.getElementsByClassName('box');
    var bigParallax = new BigParallax();

    for (var i = 0; i < 4; i++) {
        bigParallax.addBox(els[i], [
            '/img/sample-', (i + 1), '.jpg'
        ].join(''));
    }

    bigParallax.start();
}, false);
