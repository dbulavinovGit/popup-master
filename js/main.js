jQuery(function() {
	initPopup();
});

function initPopup() {
	jQuery('.popup-holder').popup({
		opener: '.opener',
		clickOutsideHidden: true
	});
}

;(function($){
	function Popup(options) {
		this.options = $.extend({
			activeClass: 'active',
			opener: '.opener',
			direction: 'data-direction',
			popupSlide: '.popup',
			effect: 'slide',
			clickOutsideHidden: false,
			animSpeed: 400
		}, options);
		this.init();
	}

	Popup.prototype = {
		init: function() {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.slide.addClass(this.getSlideDirectio())
			}
		},
		findElements: function() {
			this.page = $('html');
			this.holder = $(this.options.holder);
			this.slide = this.holder.find(this.options.popupSlide);
			this.opener = this.holder.find(this.options.opener);
			this.direction = this.opener.attr(this.options.direction);
		},
		attachEvents: function() {
			var self = this;

			this.outsideClickHandler = function(e) {
				if(self.isOpen()) {
					var target = $(e.target);

					if(!target.closest(self.opener).length && !target.closest(self.slide ).length) {
						self.hideSlide();
					}
				}
			},

			this.eventHandler = function(e) {
				e.preventDefault();
				self.toggle();
			}

			this.opener.on('click', this.eventHandler);
		},
		getSlideDirectio: function() {
			switch (this.direction) {
				case 'left':
					return 'left'
					break;
				case 'right':
					return 'right'
					break;
				case 'top':
					return 'top'
					break;
				case 'bottom':
					return 'bottom'
					break;
				default:
					alert( 'error' );
			}
		},
		isOpen: function() {
			return this.holder.hasClass(this.options.activeClass)
		},
		showSlide: function() {
			this.holder.addClass(this.options.activeClass);
			if(this.options.clickOutsideHidden) {
				this.page.on('click', this.outsideClickHandler);
			}
		},
		hideSlide: function() {
			this.holder.removeClass(this.options.activeClass);
			if(this.options.clickOutsideHidden) {
				this.page.off('click', this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpen()) {
				this.hideSlide();
			} else {
				this.showSlide();
			}
		},
		destroy: function() {
			this.slide.removeClass(this.getSlideDirectio());
			this.holder.removeClass(this.options.activeClass);
			this.opener.off('click', this.eventHandler);s
		}
	};

	// jQuery plugin interface
	$.fn.popup = function(opt) {
		return this.each(function() {
			jQuery(this).data('Popup', new Popup($.extend(opt, { holder: this })));
		});
	};
}(jQuery));