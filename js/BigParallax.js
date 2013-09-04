var BigParallaxBox = function (opts) {
    this.el = opts.el || document.createElement('div');
    this.imageURL = opts.imageURL || '';

    this.initImage();
};

BigParallaxBox.prototype.initImage = function () {
    var self = this;
    var image = new Image();

    image.onload = function () {
        self.imageWidth = image.width;
        self.imageHeight = image.height;

        self.initBackground();
    };
    image.src = this.imageURL;

    this.image = image;
};

BigParallaxBox.prototype.initBackground = function () {
    var el = this.el;
    var imageURL = this.imageURL;

    el.style.backgroundImage = ['url(', imageURL, ')'].join('');
    el.style.backgroundRepeat = 'no-repeat';

    this.updateBackground();
};

BigParallaxBox.prototype.updateBackground = function () {
    var el = this.el;

    var scrollTop = this.scrollTop;
    var imageWidth = this.imageWidth;
    var imageHeight = this.imageHeight;

    var offsetTop = el.offsetTop;
    var offsetHeight = el.offsetHeight;
    var offsetWidth = el.offsetWidth;

    var windowHeight = this.windowHeight;
    var scale;


    // update background-size
    if (imageWidth < offsetWidth) {
        scale = offsetWidth / imageWidth;
        el.style.backgroundSize = offsetWidth + 'px';
    } else {
        scale = 1;
        delete el.style.backgroundSize;
    }


    // update background-position
    (function () {
        var posMin = 0;
        var posMax = -(imageHeight * scale - offsetHeight);

        var scrollMin = offsetTop - windowHeight;
        var scrollMax = offsetTop + offsetHeight;

        var rate = 1 - (scrollTop - scrollMin) / (scrollMax - scrollMin);
        var positionY = posMin + (posMax - posMin) * rate;

        el.style.backgroundPosition = [
            'center',
            positionY + 'px'
        ].join(' ');
    })();
};

BigParallaxBox.prototype.updateScrollTop = function (scrollTop) {
    this.scrollTop = scrollTop;
    this.updateBackground();
};

BigParallaxBox.prototype.updateWindowHeight = function (windowHeight) {
    this.windowHeight = windowHeight;
    this.updateBackground();
};




var BigParallax = function (opts) {
    opts = opts || {};

    this.els = opts.els || [];
    this.imageSet = opts.imageSet || [];
    this.rootElement = opts.rootElement || document.body;
};

BigParallax.prototype.start = function () {
    this.initBoxes();
    this.initListeners();

    this.updateScrollTop();
    this.updateWindowHeight();
};

BigParallax.prototype.addBox = function (el, imagePath) {
    if (!el || !imagePath) {
        return;
    }

    this.els.push(el);
    this.imageSet.push(imagePath);
};

BigParallax.prototype.initBoxes = function () {
    var els = this.els;
    var imageSet = this.imageSet;
    var length = Math.min(els.length, imageSet.length);

    var boxes = [];

    for (var i = 0; i < length; i++) {
        boxes.push(new BigParallaxBox({
            el: els[i],
            imageURL: imageSet[i]
        }));
    }

    this.boxes = boxes;
};

BigParallax.prototype.initListeners = function () {
    var self = this;
    var rootElement = this.rootElement;

    document.addEventListener('scroll', function () {
        self.updateScrollTop();
    }, false);

    window.addEventListener('resize', function () {
        self.updateWindowHeight();
    }, false);
};

BigParallax.prototype.updateScrollTop = function () {
    var scrollTop = this.rootElement.scrollTop;
    var boxes = this.boxes;

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].updateScrollTop(scrollTop);
    }
};

BigParallax.prototype.updateWindowHeight = function () {
    var windowHeight = window.innerHeight;
    var boxes = this.boxes;

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].updateWindowHeight(windowHeight);
    }
};
