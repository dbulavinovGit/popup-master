jQuery(function() {
	initPopup();
});

function initPopup() {
	jQuery('.popup-holder').popup({
		opener: '.opener',
		dataDirection: 'data-direction',
		clickOutsideHidden: true
	});
}

;(function($){
	function Popup(options) {
		this.options = $.extend({
			activeClass: 'active',
			opener: '.opener',
			popupSlide: '.popup',
			direction: 'top',
			dataDirection: '',
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
			}
		},
		findElements: function() {
			this.page = $(document);
			this.holder = $(this.options.holder);
			this.slide = this.holder.find(this.options.popupSlide);
			this.opener = this.holder.find(this.options.opener);
			this.direction = this.opener.attr(this.options.dataDirection);

			this.options.dataDirection ? this.slide.addClass(this.direction) : this.slide.addClass(this.options.direction)
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
			this.slide.removeClass(this.direction);
			this.holder.removeClass(this.options.activeClass);
			this.opener.off('click', this.eventHandler);
		}
	};

	// jQuery plugin interface
	$.fn.popup = function(opt) {
		return this.each(function() {
			jQuery(this).data('Popup', new Popup($.extend(opt, { holder: this })));
		});
	};
}(jQuery));