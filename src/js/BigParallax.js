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
