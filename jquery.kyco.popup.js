// jquery.kyco.popup brought to you by www.kyco.co.za. Copyright 2013 Cornelius Weidmann. Distributed under the GPL.
(function($){
	$.fn.extend({
		kycoPopup: function(options){
			/**
			 *  Turns an element into a popup. Multiple popups can be triggered on the same page.
			 *  Defaults:
			 *  trigger: 'pageload', // or e.g. '$(".defaultPopupTrigger")'
			 *  trigger_delay: 0, // in ms, 1000 = 1s
			 *  popup_fadein: 0, // in ms, 1000 = 1s
			 *  popup_fadeout: 0, // in ms, 1000 = 1s

			 *  overlay_background: '#000', // or standard css shorthand for background, e.g. '#000 url(overlay.png) no-repeat'
			 *  overlay_opacity: 0.1, // value between 0 and 1

			 *  shadow_offset_width: 5, // value of shadow width in px
			 *  shadow_offset_height: 5, // value of shadow height in px
			 *  shadow_border: '0', // or standard css shorthand for border, e.g. '2px solid #000'
			 *  shadow_borderradius: '0', // or standard css shorthand for border-radius, e.g. '10px 5px'
			 *  shadow_boxshadow: '0', // or standard css shorthand for box-shadow, e.g. '2px 0 5px 0 #000 inset'
			 *  shadow_background: '#000', // or standard css shorthand for background, e.g. '#000 url(overlay.png) no-repeat'
			 *  shadow_opacity: 0.5, // value between 0 and 1

			 *  popup_top: default_y_pos, // value of top positioning in px, e.g. 100
			 *  popup_left: default_x_pos, // value of left positioning in px, e.g. 100

			 *  close_on_popupCloser: 'yes', // or 'no' to disable
			 *  close_on_backgroundClick: 'yes', // or 'no' to disable
			 *  close_on_ESC: 'yes' // or 'no' to disable
			 */

			// Set variable names to class name of popup.
			var customPopupName = this.attr('class');
			var customPopupNameContainer = customPopupName + 'Container';
			var customPopupNameLockPage = customPopupName + 'LockPage';
			var customPopupNameShadow = customPopupName + 'Shadow';
			var customPopupNameCloser = customPopupName + 'Closer';
			var customPopupNameTrigger = customPopupName + 'Trigger';

			// Get class name of element which needs popup attached and change it to the container which will hold all popup elements.
			var el_class = this.attr('class', customPopupNameContainer).attr('class');

			// Create an ID for the element equal to class name so that future references with "getElementById" can be made.
			var el_id = this.attr('id', el_class).attr('id');

			// Hide the popup, that's the default.
			$('.' + customPopupNameContainer).css({'display':'none'});

			// Get the contents of the div that is calling the popup. We will make some structural changes, later we paste the actual content back into the popup.
			var get_popup_contents = document.getElementById(el_id).innerHTML;

			// Create structure. This creates the overlay, the popup shadow and the popup itself with the content.
			document.getElementById(el_id).innerHTML = '<div class="' + customPopupNameLockPage + '"></div><div class="' + customPopupNameShadow + '" id="' + customPopupNameShadow + '"></div><div class="' + customPopupName + '" id="' + customPopupName + '">' + get_popup_contents + '</div>';

			// Center the popup, that's the default.
			var window_width = document.documentElement.clientWidth;
			var window_height = document.documentElement.clientHeight;
			var popup_width = document.getElementById(customPopupName).offsetWidth;
			var popup_height = document.getElementById(customPopupName).offsetHeight;
			var popup_y_pos = window_height/2 - popup_height/2;
			var popup_x_pos = window_width/2 - popup_width/2;
			var default_y_pos = popup_y_pos;
			var default_x_pos = popup_x_pos;

			// Set the defaults for the popup.
			var defaults = {
				// Defaults that should not be changed:
				overlay_zindex: '1000000000',
				overlay_position: 'fixed',
				overlay_top: 0,
				overlay_left: 0,
				overlay_width: '100%',
				overlay_height: '100%',

				shadow_zindex: '1000000001',
				shadow_position: 'fixed',
				shadow_top: 0,
				shadow_left: 0,

				popup_zindex: '1000000001',
				popup_position: 'fixed',

				// Defaults that can be customised:
				overlay_background: '#000',
				overlay_opacity: 0.1,

				shadow_offset_width: 5,
				shadow_offset_height: 5,
				shadow_border: '0',
				shadow_borderradius: '0',
				shadow_boxshadow: '0',
				shadow_background: '#000',
				shadow_opacity: 0.5,

				popup_top: default_y_pos,
				popup_left: default_x_pos,
				popup_width: '',
				popup_height: '',

				close_on_popupCloser: 'yes',
				close_on_backgroundClick: 'yes',
				close_on_ESC: 'yes',

				trigger: 'pageload',
				trigger_delay: 0,

				popup_fadein: 0,
				popup_fadeout: 0
			};

			// Extend the defaults with the user options.
			var settings = $.extend(defaults, options);

			// After the defaults and user options are set as settings, launch the popup.
			function launchPopup(){
				/**
				 *  Creates all styling for the overlay, shadow and popup. Makes sure that the popup is positioned according
				 *  to the defaults or the user options. Also sets trigger behaviour for the popup.
				 */

				$('.' + customPopupNameContainer).fadeIn(settings.popup_fadein);

				$('.' + customPopupNameLockPage).css({
					// Set the defaults that should not have been changed:
					'z-index': settings.overlay_zindex,
					'position': settings.overlay_position,
					'top': settings.overlay_top + 'px',
					'left': settings.overlay_left + 'px',
					'width': settings.overlay_width,
					'height': settings.overlay_height,
					// Set customizable defaults:
					'background': settings.overlay_background,
					'opacity': settings.overlay_opacity
				});

				$('.' + customPopupNameShadow).css({
					// Set the defaults that should not have been changed:
					'z-index': settings.shadow_zindex,
					'position': settings.shadow_position,
					// Set customizable defaults:
					'border': settings.shadow_border,
					'border-radius': settings.shadow_borderradius,
					'box-shadow': settings.shadow_boxshadow,
					'background': settings.shadow_background,
					'opacity': settings.shadow_opacity
				});

				$('.' + customPopupName).css({
					// Set the defaults that should not have been changed:
					'display': 'block',
					'z-index': settings.popup_zindex,
					'position': settings.popup_position,
					// Set customizable defaults:
					'width': settings.popup_width + 'px',
					'height': settings.popup_height + 'px'
				});

				// Overwrite default positioning of popup if user changed it.
				popup_width = document.getElementById(customPopupName).offsetWidth;
				popup_height = document.getElementById(customPopupName).offsetHeight;
				popup_y_pos = (settings.popup_top !== default_y_pos) ? settings.popup_top : window_height/2 - popup_height/2;
				popup_x_pos = (settings.popup_left !== default_x_pos) ? settings.popup_left : window_width/2 - popup_width/2;

				$('.' + customPopupName).css({
					'top': popup_y_pos + 'px',
					'left': popup_x_pos + 'px'
				});

				// Set shadow position, width and height according to the popup's position, width and height.
				var shadow_border = parseInt(settings.shadow_border);
				var shadow_width = popup_width + settings.shadow_offset_width*2 + shadow_border;
				var shadow_height = popup_height + settings.shadow_offset_height*2 + shadow_border;
				var shadow_y_pos = (settings.popup_top !== default_y_pos) ? settings.popup_top - settings.shadow_offset_height - shadow_border - shadow_border/2 : window_height/2 - shadow_height/2 - parseInt(settings.shadow_border);
				var shadow_x_pos = (settings.popup_left !== default_x_pos) ? settings.popup_left - settings.shadow_offset_width - shadow_border - shadow_border/2 : window_width/2 - shadow_width/2 - parseInt(settings.shadow_border);

				$('.' + customPopupNameShadow).css({
					'top': shadow_y_pos + 'px',
					'left': shadow_x_pos + 'px',
					'width': shadow_width + 'px',
					'height': shadow_height + 'px'
				});

				// Close options for the popup.
				if (settings.close_on_popupCloser == 'yes'){
					$('.' + customPopupNameCloser).on('click', function(){
						$('.' + customPopupNameContainer).fadeOut(settings.popup_fadeout);
					});
				}
				if (settings.close_on_backgroundClick == 'yes'){
					$('.' + customPopupNameLockPage).on('click', function(){
						$('.' + customPopupNameContainer).fadeOut(settings.popup_fadeout);
					});
				}
				if (settings.close_on_ESC == 'yes'){
					$(document).keypress(function(e){
						if (e.keyCode == 27){
							$('.' + customPopupNameContainer).fadeOut(settings.popup_fadeout);
						}
					});
				}
			}

			// Detect if a trigger will be used to launch the popup, otherwise load popup on pageload.
			var testTrigger = '$(".' + customPopupNameTrigger + '")';

			return this.each(function(){
				if (settings.trigger == 'pageload'){
					setTimeout(function(){
						launchPopup()
					}, settings.trigger_delay);
				}
				else if (settings.trigger == testTrigger){
					$('.' + customPopupNameTrigger).click(function(){
						setTimeout(function(){
							launchPopup()
						}, settings.trigger_delay);
					});
				}
				else alert('Error identifying trigger! You\'re trying to access an invalid element. (Use default settings to get rid of this error.)');
			});
		}
	});
})(jQuery);