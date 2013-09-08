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


    if (!imageWidth || !imageHeight || !offsetHeight || !offsetWidth) {
        return;
    }


    // update background-size
    if (imageWidth < offsetWidth) {
        scale = offsetWidth / imageWidth;
        el.style.backgroundSize = offsetWidth + 'px';
    } else {
        scale = 1;
        el.style.backgroundSize = 'auto';
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



