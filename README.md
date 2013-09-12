BigParallax
======

big size image parallax

## install

### from bower
```
bower install BigParallax
```

### from github
```
git clone git://github.com/fnobi/BigParallax.git
```

## usage
```
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



```
