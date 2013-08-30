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
    el.style.backgroundAttachment = 'fixed';

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

    // update background-size
    var scale;
    if (imageWidth < offsetWidth) {
        scale = offsetWidth / imageWidth;
        el.style.backgroundSize = offsetWidth + 'px';
    } else {
        scale = 1;
        delete el.style.backgroundSize;
    }


    // update background-position
    var diff = scrollTop - offsetTop;
    var value = diff / (offsetHeight + windowHeight);

    var positionY = -(imageHeight * scale) * value - windowHeight / 2;

    el.style.backgroundPosition = [
        'center',
        positionY + 'px'
    ].join(' ');
};

BigParallaxBox.prototype.updateScrollTop = function (scrollTop) {
    this.scrollTop = scrollTop;
    this.updateBackground();
};

BigParallaxBox.prototype.updateWindowHeight = function (windowHeight) {
    this.windowHeight = windowHeight;
    this.updateBackground();
};



