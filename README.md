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

```
