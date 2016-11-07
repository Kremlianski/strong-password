
/**

Strong Password jQuery Plugin

@author Alexandre Kremlianski (kremlianski@gmail.com)
 
@version 1.0

@requires jQuery
 */


/**
 *
 * @class StrongPass
 *
 *
 */

(function() {
  var PopoverCore, Position, Seq, StrongPass, defaults, postsettings,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  StrongPass = (function() {

    /*
    
    the array of sounds
     */
    var consonants, sounds, vovels;

    function StrongPass() {}

    sounds = ["Nee", "Bo", "my", "cho", "vee", "Voo", "Na", "Jo", "Cea", "ha", "cy", "kea", "Va", "xea", "dy", "Boo", "Da", "So", "Ry", "joo", "ly", "woo", "vu", "Gy", "fi", "qea", "du", "hee", "Bi", "ni", "fee", "Ba", "lu", "noo", "Zu", "cha", "Ji", "vi", "Hu", "Ree", "di", "bu", "Fy", "Zoo", "goo", "ve", "Zi", "Shee", "Kee", "Xu", "de", "Hi", "Xee", "Fu", "Soo", "Choo", "Mea", "Sha", "Nu", "Dee", "Chi", "me", "Loo", "lee", "be", "Joo", "Dea", "Che", "shy", "jo", "ree", "Coo", "ca", "Ge", "ro", "gea", "ka", "fy", "rea", "Ga", "Co", "sa", "qoo", "Do", "Lo", "Ky", "wy", "chee", "Wa", "fo", "Jea", "Wea", "Sy", "hoo", "Mi", "Ma", "Lee", "wu", "gi", "chea", "Su", "mu", "Qy", "Moo", "xi", "Koo", "cu", "Si", "Qu", "Sho", "see", "xe", "Doo", "Gu", "fe", "hea", "ne", "Ri", "sea", "xa", "jee", "Je", "roo", "co", "na", "Re", "Cho", "Vee", "le", "ko", "va", "Ze", "Shea", "Kea", "He", "Bee", "so", "Go", "ry", "Vea", "la", "Mee", "zy", "Woo", "Za", "hy", "Ha", "Wo", "Vy", "Hee", "ba", "choo", "Dy", "Cha", "shu", "xy", "Ly", "xoo", "Mo", "Xa", "Hea", "Fi", "ri", "Fa", "By", "Ni", "gee", "Goo", "zi", "Lu", "xu", "chy", "hi", "shi", "fu", "Jy", "bee", "nu", "qi", "Ju", "bea", "soo", "Ru", "qe", "Wee", "chi", "Ci", "Nea", "Shy", "xo", "Lea", "ge", "Ki", "zee", "Ce", "no", "Xoo", "Rea", "ga", "we", "Ke", "vo", "do", "zea", "Qoo", "Ro", "Se", "qee", "lo", "Zo", "fea", "Ho", "sy", "Sa", "bo", "wee", "Hoo", "ma", "lea", "cee", "Wy", "jea", "Xo", "Ja", "Fo", "qy", "koo", "da", "Xea", "Ra", "My", "voo", "cea", "Wu", "si", "Zee", "shee", "qu", "boo", "Cy", "ru", "bi", "Fee", "zu", "See", "ji", "Chee", "Noo", "hu", "Xi", "Vu", "Fea", "Ku", "je", "Xe", "re", "Vi", "Roo", "Di", "zoo", "Bu", "ze", "vea", "mee", "chu", "Li", "she", "kee", "Shoo", "ra", "Ve", "xee", "De", "ny", "za", "mea", "sha", "Le", "wo", "Ko", "vy", "dee", "loo", "Be", "mo", "qa", "La", "dea", "Shu", "Zy", "che", "fa", "Hy", "coo", "by", "Qo", "Gee", "Ca", "jy", "Chy", "Shi", "Xy", "ky", "wi", "Ka", "wa", "shoo", "Gea", "li", "ju", "Ny", "She", "Chu", "mi", "ku", "Foo", "Bea", "su", "ci", "wea", "Qi", "nee", "Qa", "ki", "Du", "ce", "Gi", "Qe", "nea", "ke", "Mu", "moo", "gu", "se", "Wi", "Zea", "shea", "Qee", "Cu", "No", "zo", "sho", "gy", "foo", "ho", "Sea", "We", "Vo", "Chea", "doo", "Jee", "Qea", "Fe", "qo", "Me", "ja", "Cee", "Ne", "he", "go"];


    /*
    the array of vovels
     */

    vovels = ["a", "e", "i", "o", "u", "y"];


    /*
    the array of consonants
     */

    consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z", "w"];


    /**
     *
     * @method regenerate
     * @static
     * Empties the previous result and generates the new one
     *
     */

    StrongPass.regenerate = function() {
      var result;
      result = $('.sp-result', this.$popover.get(0)).empty();
      StrongPass.generate.apply(this);
    };


    /**
     *
     * @method generate
     * @static
     * Generates the new password and then create the effect of calculation
     *
     */

    StrongPass.generate = function() {

      /**
       *
       * @param {Array} a
       * shuffles an array
       *
       */
      var addFirstLetter, addLastLetter, getN, innerSort, n, outerSort, pass, passArray, result, shuffle, x, yesOrNot;
      shuffle = function(a) {
        var i, j, x;
        j = void 0;
        x = void 0;
        i = void 0;
        i = a.length;
        while (i) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
          i -= 1;
        }
      };

      /**
       * Creates the effect of calculation
       */
      outerSort = function() {
        var letter, letters, span;
        if (passArray.length === 0) {
          return;
        }
        span = $('<span>').appendTo(result);
        letter = passArray.shift();
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        shuffle(letters);
        innerSort(letters, letter, span);
        outerSort();
      };
      innerSort = function(letters, letter, span) {
        var x;
        if (!letters || letters.length === 0) {
          return;
        }
        x = letters.shift();
        span.html(x);
        setTimeout((function() {
          if (x === letter) {
            span.addClass('sp-generated');
          } else {
            return innerSort(letters, letter, span);
          }
        }), 25);
      };

      /**
       *
       * @return {Boolean}
       *
       */
      yesOrNot = function() {
        return Math.random() < 0.5;
      };

      /**
       *
       * @param {String} pass
       * @return {String}
       *
       */
      addFirstLetter = function(pass) {
        var letter;
        if (yesOrNot()) {
          letter = vovels[Math.floor(Math.random() * vovels.length)];
          pass = letter + pass;
        }
        return pass;
      };

      /**
       *
       * @param {String} pass
       * @return {String}
       *
       */
      addLastLetter = function(pass) {
        var letter;
        if (yesOrNot()) {
          letter = consonants[Math.floor(Math.random() * consonants.length)];
          pass = pass + letter;
        }
        return pass;
      };

      /**
       *
       * @param {array} range
       * @return {Integer}
       * returns a random number within the given range
       */
      getN = function(range) {
        var x, y;
        x = range[0];
        y = range[1];
        return Math.floor(Math.random() * (y - x + 1)) + x;
      };
      this.pass = '';

      /*
      the number of sounds in the result password
       */
      n = this.options.sounds;
      if (this.options.range) {
        n = getN(this.options.range);
      }

      /*
      a container for the result
       */
      result = $('.sp-result', this.$popover.get(0));

      /*
      the password
       */
      pass = ((function() {
        var k, ref, results;
        results = [];
        for (x = k = 1, ref = n; 1 <= ref ? k <= ref : k >= ref; x = 1 <= ref ? ++k : --k) {
          results.push(sounds[Math.floor(Math.random() * sounds.length)]);
        }
        return results;
      })()).reduce(function(x, y) {
        return x + y;
      });

      /*
      prepending a vowel
       */
      if (this.options.firstVowel) {
        pass = addFirstLetter(pass);
      }

      /*
      appending a consonant
       */
      if (this.options.lastConsonant) {
        pass = addLastLetter(pass);
      }
      passArray = pass.split('');
      this.pass = pass;
      return outerSort();
    };

    return StrongPass;

  })();

  Seq = (function() {
    function Seq() {}

    Seq.value = 1;

    Seq.next = function() {
      return Seq.value++;
    };

    return Seq;

  })();


  /*
  
  The object of changable params
   */

  defaults = {
    placement: 'vertical',
    cssClass: null,
    arrow: true,
    animation: 'fade',
    backdrop: true,
    onHide: function() {},
    afterHide: function() {},
    offset: {
      top: 0,
      left: 0
    },
    followClick: true,
    visibleTime: 1000,
    caption: 'Do you like this password?',
    buttons: {
      regen: 'Renew',
      ok: 'Apply',
      cancel: 'Cancel'
    },
    firstVowel: false,
    lastConsonant: false,
    sounds: 4,
    range: false,
    width: 222,
    height: 'auto'
  };


  /*
  
  The object of unchangable params
   */

  postsettings = {
    template: function() {
      return "<div class='sp-popover'> <div class='sp-arrow'></div> <div class='sp-popover-inner'> <div class='sp-popover-content'> <div class='sp-result'></div> <div class='sp-caption'> " + this.options.caption + " </div> <div class='sp-form'> <div class='sp-form-row'> <div class='sp-footer'> <button class='sp-button sp-button-ok'> " + this.options.buttons.ok + " </button> <button class='sp-button sp-button-regen'> " + this.options.buttons.regen + " </button> <button class='sp-button sp-button-cancel'> " + this.options.buttons.cancel + " </button> </div> </div> </div> </div> </div> </div>";
    },
    backdropTemplate: '<div class="sp-popover-backdrop"></div>',
    onRender: function() {
      var that;
      that = this;
      $('.sp-button-regen', this.$popover).on('click', function(e) {
        var $but;
        $but = $(this);
        $but.addClass(that.options.prefix + 'clicked');
        setTimeout((function() {
          return $but.removeClass(that.options.prefix + 'clicked');
        }), 400);
        StrongPass.regenerate.apply(that);
      });
      $('.sp-button-ok', this.$popover).on('click', (function(_this) {
        return function(e) {
          _this.$element.attr('type', 'text');
          _this.$element.val(_this.pass);
          setTimeout((function() {
            return _this.$element.attr('type', 'password');
          }), _this.options.visibleTime);
          _this.hide();
        };
      })(this));
      return $('.sp-button-cancel', this.$popover).on('click', (function(_this) {
        return function(e) {
          _this.hide();
        };
      })(this));
    },
    padding: true,
    prefix: 'sp-',
    NS: 'sp-popover',
    eventNS: 'sp.popover'
  };


  /**
   *
   * @class Position
   *
   */

  Position = (function() {
    function Position() {}


    /**
     *
     * @method getPlacement
     * @static
     * @param {Object} pos
     * @param {String} placement
     * @return {String}
     *
     */

    Position.getPlacement = function(pos, placement) {
      var clientHeight, clientWidth, db, de, detect, isH, isV, pageX, pageY, scrollLeft, scrollTop;
      de = document.documentElement;
      db = document.body;
      clientWidth = window.innerWidth || screen.width;
      clientHeight = window.innerHeight || screen.height;
      scrollTop = Math.max(db.scrollTop, de.scrollTop);
      scrollLeft = Math.max(db.scrollLeft, de.scrollLeft);
      pageX = Math.max(0, pos.left - scrollLeft);
      pageY = Math.max(0, pos.top - scrollTop);
      isH = placement === 'horizontal';
      isV = placement === 'vertical';
      detect = placement === 'auto' || isH || isV;
      if (detect) {
        if (pageX < clientWidth / 3) {
          if (pageY < clientHeight / 3) {
            placement = isH ? 'right-bottom' : 'bottom-right';
          } else if (pageY < clientHeight * 2 / 3) {
            if (isV) {
              placement = pageY <= clientHeight / 2 ? 'bottom-right' : 'top-right';
            } else {
              placement = 'right';
            }
          } else {
            placement = isH ? 'right-top' : 'top-right';
          }
        } else if (pageX < clientWidth * 2 / 3) {
          if (pageY < clientHeight / 3) {
            if (isH) {
              placement = pageX <= clientWidth / 2 ? 'right-bottom' : 'left-bottom';
            } else {
              placement = 'bottom';
            }
          } else if (pageY < clientHeight * 2 / 3) {
            if (isH) {
              placement = pageX <= clientWidth / 2 ? 'right' : 'left';
            } else {
              placement = pageY <= clientHeight / 2 ? 'bottom' : 'top';
            }
          } else {
            if (isH) {
              placement = pageX <= clientWidth / 2 ? 'right-top' : 'left-top';
            } else {
              placement = 'top';
            }
          }
        } else {
          if (pageY < clientHeight / 3) {
            placement = isH ? 'left-bottom' : 'bottom-left';
          } else if (pageY < clientHeight * 2 / 3) {
            if (isV) {
              placement = pageY <= clientHeight / 2 ? 'bottom-left' : 'top-left';
            } else {
              placement = 'left';
            }
          } else {
            placement = isH ? 'left-top' : 'top-left';
          }
        }
      } else if (placement === 'auto-top') {
        if (pageX < clientWidth / 3) {
          placement = 'top-right';
        } else if (pageX < clientWidth * 2 / 3) {
          placement = 'top';
        } else {
          placement = 'top-left';
        }
      } else if (placement === 'auto-bottom') {
        if (pageX < clientWidth / 3) {
          placement = 'bottom-right';
        } else if (pageX < clientWidth * 2 / 3) {
          placement = 'bottom';
        } else {
          placement = 'bottom-left';
        }
      } else if (placement === 'auto-left') {
        if (pageY < clientHeight / 3) {
          placement = 'left-top';
        } else if (pageY < clientHeight * 2 / 3) {
          placement = 'left';
        } else {
          placement = 'left-bottom';
        }
      } else if (placement === 'auto-right') {
        if (pageY < clientHeight / 3) {
          placement = 'right-top';
        } else if (pageY < clientHeight * 2 / 3) {
          placement = 'right';
        } else {
          placement = 'right-bottom';
        }
      }
      return placement;
    };


    /**
     *
     * @method getPopoverPosition
     * @param {Object} elementPos
     * @param {String} placement
     * @param {Integer} popoverWidth
     * @param {Integer} popoverHeight
     * @param {Object} that - context
     * @return {Object}
     * returns position and arrowOffset objects
     *
     */

    Position.getPopoverPosition = function(elementPos, placement, popoverWidth, popoverHeight, that) {
      var arrowOffset, arrowSize, clientHeight, clientWidth, db, de, elementH, elementW, fixedH, fixedW, padding, pageH, pageW, pos, position, ref, refix, scrollLeft, scrollTop, validBottom, validLeft, validRight, validTop;
      pos = elementPos;
      de = document.documentElement;
      db = document.body;
      clientWidth = window.innerWidth || screen.width;
      clientHeight = window.innerHeight || screen.height;
      elementW = that.$element.outerWidth();
      elementH = that.$element.outerHeight();
      scrollTop = Math.max(db.scrollTop, de.scrollTop);
      scrollLeft = Math.max(db.scrollLeft, de.scrollLeft);
      position = {};
      arrowOffset = null;
      arrowSize = (ref = that.options.arrow) != null ? ref : {
        20: 0
      };
      padding = 10;
      fixedW = elementW < arrowSize + padding ? arrowSize : 0;
      fixedH = elementH < arrowSize + padding ? arrowSize : 0;
      refix = 0;
      pageH = clientHeight + scrollTop;
      pageW = clientWidth + scrollLeft;
      validLeft = pos.left + pos.width / 2 - fixedW > 0;
      validRight = pos.left + pos.width / 2 + fixedW < pageW;
      validTop = pos.top + pos.height / 2 - fixedH > 0;
      validBottom = pos.top + pos.height / 2 + fixedH < pageH;
      switch (placement) {
        case 'bottom':
          position = {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - (popoverWidth / 2)
          };
          break;
        case 'top':
          position = {
            top: pos.top - popoverHeight,
            left: pos.left + pos.width / 2 - (popoverWidth / 2)
          };
          break;
        case 'left':
          position = {
            top: pos.top + pos.height / 2 - (popoverHeight / 2),
            left: pos.left - popoverWidth
          };
          break;
        case 'right':
          position = {
            top: pos.top + pos.height / 2 - popoverHeight / 2,
            left: pos.left + pos.width
          };
          break;
        case 'top-right':
          position = {
            top: pos.top - popoverHeight,
            left: validLeft ? pos.left - fixedW : padding
          };
          arrowOffset = {
            left: validLeft ? Math.min(elementW, popoverWidth) / 2 + fixedW : -2000
          };
          break;
        case 'top-left':
          refix = validRight ? fixedW : -padding;
          position = {
            top: pos.top - popoverHeight,
            left: pos.left - popoverWidth + pos.width + refix
          };
          arrowOffset = {
            left: validRight ? popoverWidth - (Math.min(elementW, popoverWidth) / 2) - fixedW : -2000
          };
          break;
        case 'bottom-right':
          position = {
            top: pos.top + pos.height,
            left: validLeft ? pos.left - fixedW : padding
          };
          arrowOffset = {
            left: validLeft ? Math.min(elementW, popoverWidth) / 2 + fixedW : -2000
          };
          break;
        case 'bottom-left':
          refix = validRight ? fixedW : -padding;
          position = {
            top: pos.top + pos.height,
            left: pos.left - popoverWidth + pos.width + refix
          };
          arrowOffset = {
            left: validRight ? popoverWidth - (Math.min(elementW, popoverWidth) / 2) - fixedW : -2000
          };
          break;
        case 'right-top':
          refix = validBottom ? fixedH : -padding;
          position = {
            top: pos.top - popoverHeight + pos.height + refix,
            left: pos.left + pos.width
          };
          arrowOffset = {
            top: validBottom ? popoverHeight - (Math.min(elementH, popoverHeight) / 2) - fixedH : -2000
          };
          break;
        case 'right-bottom':
          position = {
            top: validTop ? pos.top - fixedH : padding,
            left: pos.left + pos.width
          };
          arrowOffset = {
            top: validTop ? Math.min(elementH, popoverHeight) / 2 + fixedH : -2000
          };
          break;
        case 'left-top':
          refix = validBottom ? fixedH : -padding;
          position = {
            top: pos.top - popoverHeight + pos.height + refix,
            left: pos.left - popoverWidth
          };
          arrowOffset = {
            top: validBottom ? popoverHeight - (Math.min(elementH, popoverHeight) / 2) - fixedH : -2000
          };
          break;
        case 'left-bottom':
          position = {
            top: validTop ? pos.top - fixedH : padding,
            left: pos.left - popoverWidth
          };
          arrowOffset = {
            top: validTop ? Math.min(elementH, popoverHeight) / 2 + fixedH : -2000
          };
      }
      position.top += that.options.offset.top;
      position.left += that.options.offset.left;
      return {
        position: position,
        arrowOffset: arrowOffset
      };
    };

    return Position;

  })();


  /**
   *
   * @class PopoverCore
   *
   */

  PopoverCore = (function() {

    /**
     *
     * @constructor
     * @param {DOMElement} element - input[type=password] element
     * @param {Object} options - custom options
     *
     */
    function PopoverCore(element, options) {
      this.element = element;
      this.hide = bind(this.hide, this);
      this._toggle = bind(this._toggle, this);
      this.$element = $(this.element);
      this.options = $.extend({}, defaults, options, postsettings);
      this.init();
    }


    /**
     *
     * @method init
     *
     */

    PopoverCore.prototype.init = function() {
      var that;
      that = this;
      this.$element.off('mousedown touchstart').one('mousedown touchstart', this._toggle).on('mousedup touchstart', function() {});
      this._poped = false;
      this._inited = true;
      this._opened = false;
      this._id = Seq.next();
      if (this.$popover == null) {
        this.$popover = this._buildPopover();
      }
    };


    /**
     *
     * @method destroy
     *
     * removes popover and backdrop and event handler for element
     *
     */

    PopoverCore.prototype.destroy = function() {
      var ref, ref1;
      this.hide();
      this.$element.off('mousedown touchstart');
      if ((ref = this.$popover) != null) {
        ref.remove();
      }
      if ((ref1 = this.$backdrop) != null) {
        ref1.remove();
      }
    };


    /**
     *
     * @method _toggle
     * @param {Event Object} event
     * shows or hides
     *
     */

    PopoverCore.prototype._toggle = function(event) {
      this.$element.blur();
      event.preventDefault();
      event.stopPropagation();
      if (!this._opened) {
        this.show(event);
      }
    };


    /**
     *
     * @method show
     * @param {Event Object} event
     * shows the popover
     *
     */

    PopoverCore.prototype.show = function(event) {
      var $arrow, e, elementPos, placement, popoverHeight, popoverWidth, postionInfo, ref, ref1, x, y;
      this.$popover.removeClass().addClass(this.options.NS);
      this.$element.get(0).disabled = true;
      if (this._opened) {
        return;
      }
      this.$popover.show();
      if ((ref = this.$backdrop) != null) {
        ref.show();
      }
      this._opened = true;
      elementPos = this._getElementPosition();
      if (this.$popoverContent == null) {
        this.$popoverContent = this.$popover.find('.' + this.options.NS + '-content');
      }
      popoverWidth = this.$popover.get(0).offsetWidth;
      popoverHeight = this.$popover.get(0).offsetHeight;
      placement = 'bottom';
      e = $.Event('show.' + this.options.eventNS);
      this.$element.trigger(e, [this.popover]);
      if ((this.options.height != null)) {
        this.$popoverContent.height(this.options.height);
      }
      if ((this.options.width != null)) {
        this.$popoverContent.width(this.options.width);
      }
      if (this.options.cssClass) {
        this.$popover.addClass(this.options.cssClass);
      }
      if (!this.options.arrow) {
        this.$popover.find('.' + this.options.prefix + 'arrow').remove();
      }
      this.$popover.detach().css({
        top: -2000,
        left: -2000,
        display: 'block'
      });
      if (this.options.animation != null) {
        this.$popover.addClass(this.options.animation);
      }
      this.$popover.appendTo(document.body);
      if ((ref1 = this.$backdrop) != null) {
        ref1.appendTo(document.body);
      }
      placement = Position.getPlacement(elementPos, this.options.placement);
      this.$element.trigger('added.' + this.options.eventNS);
      setTimeout(((function(_this) {
        return function() {
          return $('html').on('mouseup touchstart', function(e) {
            if (!$(e.target).parents('#' + _this.options.prefix + _this._id).size()) {
              _this.hide();
            }
          });
        };
      })(this)), 600);
      if (!this.options.padding) {
        if (this.options.height !== 'auto') {
          this.$popoverContent.css('height', this.$popoverContent.outerHeight());
        }
        this.$popover.addClass(this.options.prefix + 'no-padding');
      }
      popoverWidth = this.$popover[0].offsetWidth;
      popoverHeight = this.$popover[0].offsetHeight;
      postionInfo = Position.getPopoverPosition(elementPos, placement, popoverWidth, popoverHeight, this);
      x = event.clientX;
      y = event.clientY;
      if (!this.options.arrow) {
        this.$popover.css({
          'margin': 0
        });
      }
      if (this.options.arrow) {
        $arrow = this.$popover.find('.' + this.options.prefix + 'arrow');
        $arrow.removeAttr('style');
        if (postionInfo.arrowOffset) {
          if (postionInfo.arrowOffset.left === -1 || postionInfo.arrowOffset.top === -1) {
            $arrow.hide();
          } else {
            $arrow.css(postionInfo.arrowOffset);
          }
        }
        if (placement === 'left' || placement === 'right') {
          $arrow.css({
            top: this.$popover.height() / 2
          });
        } else if ((placement === 'top' || placement === 'bottom' || placement === 'top-left' || placement === 'bottom-left' || placement === 'top-right' || placement === 'bottom-right' || placement === 'auto-top' || placement === 'auto-bottom') && this.options.followClick) {
          $arrow.css({
            left: event.clientX - postionInfo.position.left
          });
          if (postionInfo.position.left > x - 20) {
            postionInfo.position.left = x - 10;
            $arrow.css({
              left: event.clientX - postionInfo.position.left + 10
            });
          } else if (postionInfo.position.left + popoverWidth < x + 20) {
            postionInfo.position.left = x - popoverWidth + 10;
            $arrow.css({
              left: event.clientX - postionInfo.position.left - 10
            });
          }
        } else if (placement === 'top' || placement === 'bottom') {
          $arrow.css({
            left: this.$popover.width() / 2
          });
          if (postionInfo.arrowOffset) {
            if (postionInfo.arrowOffset.left === -1 || postionInfo.arrowOffset.top === -1) {
              $arrow.hide();
            } else {
              $arrow.css(postionInfo.arrowOffset);
            }
          }
        }
      }
      this.$popover.css(postionInfo.position).addClass(placement).addClass('in');
      this._poped = true;
      this.$element.trigger('shown.' + this.options.eventNS, [this.$popover]);
      StrongPass.generate.apply(this);
      return this.$element;
    };


    /**
     *
     * @method hide
     * hides the popover and calls the destroy method in the end
     *
     */

    PopoverCore.prototype.hide = function() {
      var ani, e, ref;
      if (!this._opened) {
        return;
      }
      this.$element.get(0).disabled = false;
      e = $.Event('hide.' + this.options.eventNS);
      this.$element.trigger(e, [this.$popover]);
      if (this.$popover) {
        ani = this.options.animaion ? this.options.animaioni + '-out' : 'out';
        this.$popover.removeClass('in').addClass(ani);
        if ((ref = this.$backdrop) != null) {
          ref.hide();
        }
        setTimeout(((function(_this) {
          return function() {
            _this.$popover.hide();
            _this.$element[0].focus();
            _this.destroy();
            if (_this.options.afterHide) {
              _this.options.afterHide(_this.$element);
            }
          };
        })(this)), 300);
      }
      this._opened = false;
      this.$element.trigger('hidden.' + this.options.eventNS, [this.$element]);
      if (this.options.onHide) {
        this.options.onHide(this.$popover);
        return this.$element;
      }
    };


    /**
     *
     * @method _buildPopover
     * creates the popover from the template
     * @return {jQuery Object}
     *
     */

    PopoverCore.prototype._buildPopover = function() {
      var id;
      if (this.$popover != null) {
        return this.$popover;
      }
      id = this.options.prefix + this._id;
      this.$popover = $(this.options.template.apply(this)).attr('id', id).removeClass().addClass(this.options.NS);
      if (this.options.backdrop) {
        this.$backdrop = $(this.options.backdropTemplate);
      } else {
        this.$backdrop = null;
      }
      this.options.onRender.apply(this);
      return this.$popover;
    };


    /**
     *
     * @method _getElementPositio
     * @return {Object}
     *
     */

    PopoverCore.prototype._getElementPosition = function() {
      return $.extend({}, this.$element.offset(), {
        width: this.$element[0].offsetWidth,
        height: this.$element[0].offsetHeight
      });
    };

    return PopoverCore;

  })();


  /*
   *
   * @param {Object} options - custom options
   * @return {jQuery Object}
   * creates jQuery plugin
   *
   */

  $.fn.strongPassword = function(options) {
    return this.each(function() {
      new PopoverCore(this, options);
    });
  };

}).call(this);
