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
    new BigParallax({
        els: document.getElementsByClassName('box'),
        imageSet: [
            '/img/sample-1.jpg',
            '/img/sample-2.jpg',
            '/img/sample-3.jpg',
            '/img/sample-4.jpg'
        ]
    });
}, false);

```
