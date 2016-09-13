(function() {
  var _this = this;

  this.Eb = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    startSlideShow: function(slides) {
      return slides.auto = window.setInterval(function() {
        slides.next();
      }, 10000);
    },
    stopSlideShow: function(slides) {
      if (slides.auto) {
        return window.clearInterval(slides.auto);
      }
    },
    generateSlidesFromHtml: function(slide_list) {
      var a;
      a = $.makeArray($(slide_list).children('li')).map(function(t, i) {
        return {
          id: i,
          src: $(t).find('img').attr('src')
        };
      });
      return JSON.parse(JSON.stringify(a));
    },
    slidShowInit: function(slide_list, slide_indicator_container) {
      var slideIndicator, slideShow, slides;
      slides = Eb.generateSlidesFromHtml(slide_list);
      this.slides = new Eb.Collections.Slides(slides);
      this.slides.selected = this.slides.first();
      slideShow = new Eb.Views.SlideShow({
        collection: this.slides
      });
      slideIndicator = new Eb.Views.SlideIndicators({
        collection: this.slides
      });
      $(slide_indicator_container).html(slideIndicator.render().el);
      Eb.startSlideShow(this.slides);
    },
    workSlideShowInit: function(slide_list, thumnails_container) {
      var slideShow, slides, thumbnails;
      slides = Eb.generateSlidesFromHtml(slide_list);
      this.slides = new Eb.Collections.Slides(slides);
      this.slides.selected = this.slides.first();
      slideShow = new Eb.Views.SlideShow({
        collection: this.slides
      });
      thumbnails = new Eb.Views.Thumbnails({
        collection: this.slides
      });
      $(thumnails_container).html(thumbnails.render().el);
      Eb.startSlideShow(this.slides);
    }
  };

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Models.Slide = (function(_super) {

    __extends(Slide, _super);

    function Slide() {
      return Slide.__super__.constructor.apply(this, arguments);
    }

    Slide.prototype.defaults = {
      src: '',
      title: ''
    };

    return Slide;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Collections.Slides = (function(_super) {

    __extends(Slides, _super);

    function Slides() {
      return Slides.__super__.constructor.apply(this, arguments);
    }

    Slides.prototype.model = Eb.Models.Slide;

    Slides.prototype.setSelected = function(slide) {
      this.selected = slide;
      return this.trigger('selected', slide);
    };

    Slides.prototype.next = function() {
      var index, m, t;
      if (m = this.selected) {
        index = this.indexOf(m) + 1;
        t = this.at(index) || this.first();
        return this.setSelected(t);
      }
    };

    Slides.prototype.previous = function() {
      var index, m, t;
      if (m = this.selected) {
        index = this.indexOf(m) - 1;
        t = this.at(index) || this.last();
        return this.setSelected(t);
      }
    };

    return Slides;

  })(Backbone.Collection);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Views.NextSlide = (function(_super) {

    __extends(NextSlide, _super);

    function NextSlide() {
      return NextSlide.__super__.constructor.apply(this, arguments);
    }

    NextSlide.prototype.tagName = 'li';

    NextSlide.prototype.className = 'arrow-next';

    NextSlide.prototype.events = {
      'click a': 'next'
    };

    NextSlide.prototype.render = function() {
      return $(this.el).html('<a href="#">next</a>');
    };

    NextSlide.prototype.next = function() {
      Eb.stopSlideShow(this.collection);
      this.collection.next();
      return false;
    };

    return NextSlide;

  })(Backbone.View);

  Eb.Views.PreviousSlide = (function(_super) {

    __extends(PreviousSlide, _super);

    function PreviousSlide() {
      return PreviousSlide.__super__.constructor.apply(this, arguments);
    }

    PreviousSlide.prototype.tagName = 'li';

    PreviousSlide.prototype.className = 'arrow-previous';

    PreviousSlide.prototype.events = {
      'click a': 'previous'
    };

    PreviousSlide.prototype.render = function() {
      return $(this.el).html('<a href="#">previous</a>');
    };

    PreviousSlide.prototype.previous = function() {
      Eb.stopSlideShow(this.collection);
      this.collection.previous();
      return false;
    };

    return PreviousSlide;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Views.SlideDescription = (function(_super) {

    __extends(SlideDescription, _super);

    function SlideDescription() {
      return SlideDescription.__super__.constructor.apply(this, arguments);
    }

    SlideDescription.prototype.initialize = function(options) {
      this.collection.on('selected', this.showSlideDescription, this);
      return this.el = '.slide-description';
    };

    SlideDescription.prototype.showSlideDescription = function(slide) {
      var _this = this;
      return $(this.el).fadeOut("fast", function() {
        $(_this.el).html(JST['application/templates/slides/description']({
          model: slide
        }));
        return $(_this.el).fadeIn("fast");
      });
    };

    SlideDescription.prototype.imageWidth = function() {
      return $('#slides img:first').width();
    };

    return SlideDescription;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Views.SlideIndicator = (function(_super) {

    __extends(SlideIndicator, _super);

    function SlideIndicator() {
      return SlideIndicator.__super__.constructor.apply(this, arguments);
    }

    SlideIndicator.prototype.tagName = 'li';

    SlideIndicator.prototype.events = {
      'click a': 'activateSlide'
    };

    SlideIndicator.prototype.initialize = function(options) {
      this.collection.on('selected', this.toggleActive, this);
      return this.template = options.template || 'application/templates/slides/slide_indicator';
    };

    SlideIndicator.prototype.render = function() {
      $(this.el).html(JST[this.template]({
        model: this.model
      }));
      this.toggleActive();
      return this;
    };

    SlideIndicator.prototype.activateSlide = function() {
      Eb.stopSlideShow(this.collection);
      this.collection.setSelected(this.model);
      return false;
    };

    SlideIndicator.prototype.toggleActive = function() {
      if (this.isActive()) {
        return $(this.el).addClass("active");
      } else {
        return $(this.el).removeClass("active");
      }
    };

    SlideIndicator.prototype.isActive = function() {
      return this.model === this.collection.selected;
    };

    return SlideIndicator;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Views.SlideIndicators = (function(_super) {

    __extends(SlideIndicators, _super);

    function SlideIndicators() {
      return SlideIndicators.__super__.constructor.apply(this, arguments);
    }

    SlideIndicators.prototype.tagName = 'ul';

    SlideIndicators.prototype.className = 'slide-control';

    SlideIndicators.prototype.initialize = function(options) {
      return this.collection.on('change', this.render, this);
    };

    SlideIndicators.prototype.render = function() {
      var next, prev,
        _this = this;
      next = new Eb.Views.NextSlide({
        collection: this.collection
      });
      prev = new Eb.Views.PreviousSlide({
        collection: this.collection
      });
      $(this.el).append(prev.render());
      this.collection.each(function(slide) {
        var t;
        t = new Eb.Views.SlideIndicator({
          model: slide,
          collection: _this.collection
        });
        return $(_this.el).append(t.render().el);
      });
      $(this.el).append(next.render());
      return this;
    };

    return SlideIndicators;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Views.SlideShow = (function(_super) {

    __extends(SlideShow, _super);

    function SlideShow() {
      return SlideShow.__super__.constructor.apply(this, arguments);
    }

    SlideShow.prototype.initialize = function(options) {
      return this.collection.on('selected', this.slideIn, this);
    };

    SlideShow.prototype.render = function() {
      this.renderSlideIndicators();
      return this;
    };

    SlideShow.prototype.renderSlideIndicators = function() {
      var next, prev,
        _this = this;
      next = new Eb.Views.NextSlide({
        collection: this.collection
      });
      prev = new Eb.Views.PreviousSlide({
        collection: this.collection
      });
      $('.slide-control').append(prev.render());
      this.collection.each(function(slide) {
        var t;
        t = new Eb.Views.SlideIndicator({
          model: slide,
          collection: _this.collection
        });
        return $('.slide-control').append(t.render().el);
      });
      $('.slide-control').append(next.render());
      return this;
    };

    SlideShow.prototype.slideIn = function(slide) {
      return $('#slides').animate({
        marginLeft: this.slideOffset(slide)
      }, 300);
    };

    SlideShow.prototype.slideOffset = function(slide) {
      var index, offset;
      index = this.collection.indexOf(slide);
      return offset = -1.0 * index * this.imageWidth();
    };

    SlideShow.prototype.imageWidth = function() {
      return $('#slides img:first').width();
    };

    return SlideShow;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Eb.Views.Thumbnails = (function(_super) {

    __extends(Thumbnails, _super);

    function Thumbnails() {
      return Thumbnails.__super__.constructor.apply(this, arguments);
    }

    Thumbnails.prototype.tagName = 'ul';

    Thumbnails.prototype.className = 'slide-thumbnails';

    Thumbnails.prototype.initialize = function(options) {
      return this.collection.on('change', this.render, this);
    };

    Thumbnails.prototype.render = function() {
      var _this = this;
      this.collection.each(function(thumb) {
        var v;
        v = new Eb.Views.SlideIndicator({
          collection: _this.collection,
          model: thumb,
          template: 'application/templates/slides/thumbnail'
        });
        return $(_this.el).append(v.render().el);
      });
      return this;
    };

    return Thumbnails;

  })(Backbone.View);

}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["application/templates/slides/description"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<strong>', model.get('title'),'</strong>\n<p>', model.get('description'),'</p>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["application/templates/slides/slide"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<li class="">\n\t<img src="',  model.get('src'),'"/>\n</li>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["application/templates/slides/slide_indicator"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a></a>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["application/templates/slides/thumbnail"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a href="#"><img src="', model.get('src'),'"></a>\n');}return __p.join('');};
}).call(this);

