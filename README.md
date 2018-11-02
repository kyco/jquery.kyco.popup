kyco Popup
==========
#### Version: 1.1.2

A minimalistic and lightweight (2.13KB) modal plugin.

Take a look at the [demo](http://www.kycosoftware.com/projects/demo/popup).


How to install
--------------

    Download or clone the repo

Include the minified JS file after including jQuery:

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="jquery.kyco.popup.min.js"></script>

For default styling include the CSS file:

    <link rel="stylesheet" href="jquery.kyco.popup.css">

Create a `div` to hold your popup contents and give it a distinctive class name, e.g. `defaultPopup`. Then initiate the popup. To launch it or to close it you need to call the respective methods. See below:

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

Option | Description | Example
-------|-------------|--------
`zIndex` | The z-index of the popup. By default the popup will be appended to the body no matter where you place it in your markup. | `10`
`position`| The position of the popup. | `'fixed'` or `'absolute'`
`top`| CSS property styling. | `'auto'`
`right`| CSS property styling. | `'auto'`
`bottom`| CSS property styling. | `'auto'`
`left`| CSS property styling. | `'auto'`
`boxSizing`| Default box-sizing value the popup should use. | `'border-box'`
`delay` | The time (in ms) before the popup appears once it has been triggered. | `0`
`fadeDuration` | The time (in ms) it takes for the popup to fade in.. | `0`
`overlayBackground` | The colour of the overlay which covers the screen while the popup is active. | `'#fff'`
`overlayOpacity` | The opacity of the overlay. | `0.3`
`callback` | A function which can be called after initiation, opening or closing the modal. | `function() {}`


Support
-------

For bugs or improvements please use the [issues tab](https://github.com/kyco/jquery.kyco.popup/issues) or email [support@kyco.io](mailto:support@kyco.io).
