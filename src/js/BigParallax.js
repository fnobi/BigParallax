var BigParallax = function (opts) {
    opts = opts || {};

    this.rootElement = opts.rootElement || document.body;

    this.boxes = [];
};

BigParallax.prototype.start = function () {
    this.initListeners();

    this.updateScrollTop();
    this.updateWindowHeight();
};

BigParallax.prototype.addBox = function (el, imageURL) {
    if (!el || !imageURL) {
        return;
    }

    this.boxes.push(new BigParallaxBox({
        el: el,
        imageURL: imageURL
    }));
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
