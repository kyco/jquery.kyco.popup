/***************************************\

	jquery.kyco.popup
	=================

	Version 1.1.1

	Brought to you by
	http://www.kycosoftware.com/

	Copyright 2014 Cornelius Weidmann

	Distributed under the GPL

\***************************************/

(function($) {
	var defaults = {
		zIndex: 10,
		position: 'fixed',
		top: 'auto',
		right: 'auto',
		bottom: 'auto',
		left: 'auto',
		boxSizing: 'border-box',
		delay: 0,
		fadeDuration: 0,
		overlayBackground: '#fff',
		overlayOpacity: .3,
		callback: function() {}
	};

	var globalPopups = [];

	var methods = {
		init: function(options) {
			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var self = $(this);
				var globalWindow = $(window);
				var popupName = self.attr('class');
				var popupContainer = $('<div id="' + popupName + 'Container"></div>');
				var popupOverlay = $('<div class="' + popupName + 'Overlay"></div>');

				globalPopups.push(popupContainer);

				// Default styling
				var defaultCss = {
					'z-index': settings.zIndex,
					'top': 0,
					'left': 0,
					'width': '100%',
					'height': '100%'
				};

				popupContainer.css($.extend({}, defaultCss, {
					'position': 'absolute',
					'display': 'none'
				}));

				popupOverlay.css($.extend({}, defaultCss, {
					'position': 'fixed',
					'background': settings.overlayBackground,
					'opacity': settings.overlayOpacity
				}));

				self.css({
					'z-index': settings.zIndex,
					'position': settings.position,
					'top': settings.top,
					'right': settings.right,
					'bottom': settings.bottom,
					'left': settings.left,
					'box-sizing': settings.boxSizing
				});

				if (settings.top === 'auto' && settings.bottom === 'auto') {
					settings.top = (globalWindow.height() - self.outerHeight()) / 2;
					self.css('top', settings.top);
				}

				if (settings.right === 'auto' && settings.left === 'auto') {
					settings.left = (globalWindow.width() - self.outerWidth()) / 2;
					self.css('left', settings.left);
				}

				popupContainer.append(popupOverlay, self);
				$('body').append(popupContainer);

				settings.callback.call(popupContainer);
			});
		},
		open: function(options) {
			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var popup = getPopup($(this).attr('class'));
				popup.children().stop().delay(settings.delay).fadeIn(settings.fadeDuration);
				popup.stop().delay(settings.delay).fadeIn(settings.fadeDuration, function() {
					settings.callback.call(popup);
				});
			});
		},
		close: function(options) {
			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var popup = getPopup($(this).attr('class'));
				popup.stop().delay(settings.delay).fadeOut(settings.fadeDuration, function() {
					settings.callback.call(popup);
				});
			});
		},
		destroy: function(options) {
			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var popup = getPopup($(this).attr('class'));
				popup.stop().unbind().remove();
				settings.callback.call(popup);
			});
		}
	};

	function getPopup(name) {
		var searchStr = name + 'Container';
		var count = 0;
		var found = 0;

		globalPopups.forEach(function(popup) {
			if (searchStr == popup.attr('id')) {
				found = count;
			}
			count++;
		});

		return globalPopups[found];
	}

	// Check if browser supports Array.forEach() method, if it doesn't mimic that functionality,
	// implementation from here: http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc
	if (!('forEach' in Array.prototype)) {
		Array.prototype.forEach = function(action, that /*opt*/) {
			for (var i = 0, n = this.length; i < n; i++) {
				if (i in this) {
					action.call(that, this[i], i, this);
				}
			}
		};
	}

	$.fn.kycoPopup = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.kycoPopup');
		}
	};
})(jQuery);
