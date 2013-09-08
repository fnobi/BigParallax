(function () {
    function init () {
        var bigParallax = new BigParallax();

        for (var i = 0; i < 4; i++) {
            bigParallax.addBox(
                document.getElementById('box-' + (i + 1)), 
                ['/img/sample-', (i + 1), '.jpg'].join('')
            );
        }

        bigParallax.start();
    }

    if (navigator.userAgent.match(/MSIE/)) {
        window.attachEvent('onload', init);
    } else {
        window.addEventListener('DOMContentLoaded', init, false);
    }
})();


