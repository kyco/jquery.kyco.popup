kyco Popup
==========
####Version: 1.1.2

A minimalistic and lightweight (2.13KB) modal plugin.

Take a look at the [demo](http://www.kycosoftware.com/projects/demo/popup).


How to install
--------------

Download or clone and include the minified js file after including jquery:

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="jquery.kyco.popup.min.js"></script>

For default styling include the CSS file from the src directory:

	<link rel="stylesheet" href="jquery.kyco.popup.css">

Create a div to hold your modal/popup contents and give it a distinctive class name,
e.g. defaultPopup. Then initiate the popup. To launch it or to close it you need to
call the respective methods. See below:

	<div class="defaultPopup">
		Default popup.<br>
		This is some text. You can do whatever you want in this popup.<br>
		It closes if you click into the background or the "Close" button.<br>
		<span class="defaultPopupCloser">Close</span>
	</div>
	
	<script>
		$(document).ready(function() {
			$('.defaultPopup').kycoPopup(); // Initiate the default popup.

			$('.defaultPopup').kycoPopup('open'); // Launch on page load.

			// Attach triggers to overlay and close button.
			$('.defaultPopupOverlay, .defaultPopupCloser').click(function() {
				$('.defaultPopup').kycoPopup('close');
			});
		});
	</script>

What a customisation looks like:

	<button class="jsPopupTrigger">Click me to trigger popup</button>

	<div class="triggeredPopup">
		Triggered popup.<br>
		Popup closes only on "Close" button click.<br>
		This is some text. You can do whatever you want in this popup.<br>
		<span class="triggeredPopupCloser">Close</span>
	</div>
	
	<script>
		$(document).ready(function() {
			// Initiate the triggered popup.
			$('.triggeredPopup').kycoPopup({
				position: 'absolute',
				top: 50,
				left: 50,
				overlayBackground: '#000',
				overlayOpacity: 0.6,
				callback: function() {
					console.log('initiated ', $(this))
				}
			});

			// Launch on trigger.
			$('.jsPopupTrigger').click(function() {
				$('.triggeredPopup').kycoPopup('open', {
					callback: function() {
						console.log('opened ', $(this))
					}
				});
			});

			// Attach triggers to overlay and close button.
			$('.triggeredPopupCloser').click(function() {
				$('.triggeredPopup').kycoPopup('close', {
					callback: function() {
						console.log('closed ', $(this))
					}
				});
			});
		});
	</script>


Configuration - kycoPopup({ *options* })
----------------------------------------

	zIndex: 10,

The z-index of the popup. By default the popup will be appended to the body
no matter where you place it in your markup.

	position: 'fixed',

The position of the popup, usually 'fixed' or 'absolute'.

	top: 'auto',
	right: 'auto',
	bottom: 'auto',
	left: 'auto',

Used to manually override the auto centering of the popup, e.g. top: 50.

	boxSizing: 'border-box',

Default box-sizing value the popup should use.

	delay: 0,

The time (in ms) before the popup appears once it has been triggered.

	fadeDuration: 0,

The time (in ms) it takes for the popup to fade in.

	overlayBackground: '#fff',

The colour of the overlay which covers the screen while the popup is active.

	overlayOpacity: .3,

The opacity of the overlay.

	callback: function() {}

A function which can be called after initiation, opening or closing the modal.


Styling
-------

By default there is no styling supplied. You can grab the stylesheet from the demo
for some very basic styling.


Support
-------

For bugs or improvements please use the [issues tab](https://github.com/kyco/jquery.kyco.popup/issues)
or email [support@kycosoftware.com](mailto:support@kycosoftware.com).
