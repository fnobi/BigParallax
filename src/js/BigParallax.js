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

    var elementOn = function (el, type, fn) {
        if (el.addEventListener) {
            el.addEventListener(type, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        }
    };

    function scrollListener () {
        self.updateScrollTop();
    }

    function resizeLiscrollListener () {
        self.updateWindowHeight();
    }

    elementOn(document, 'scroll', scrollListener);
    elementOn(window, 'scroll', scrollListener);
    elementOn(window, 'resize', resizeLiscrollListener);
};

BigParallax.prototype.updateScrollTop = function () {
    var scrollTop = (
        document.documentElement.scrollTop || document.body.scrollTop || window.scrollTop || 0
    );
    var boxes = this.boxes;

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].updateScrollTop(scrollTop);
    }
};

BigParallax.prototype.updateWindowHeight = function () {
    var windowHeight = window.innerHeight || document.body.clientHeight || 0;
    var boxes = this.boxes;

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].updateWindowHeight(windowHeight);
    }
};
