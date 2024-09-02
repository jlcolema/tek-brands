function memCartAddonsTracking() {
  var gaTracking = setInterval(function () {
    if (typeof (ga) !== 'undefined') {
      clearInterval(gaTracking);
      ga('create', 'UA-3161293-24', { name: 'tiCart' });
      ga('tiCart.set', 'dimension1', 'VWO-32 TI Control');
      ga('tiCart.send', 'event', 'VWO', 'VWO-32', 'TI Control', { nonInteraction: 1 });

      var continueCta = document.querySelector('.continue-shopping');
      if (continueCta) {
        continueCta.addEventListener('click', function () {
          ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'Continue Shopping', { nonInteraction: 1 });
        });
      }

      var updateCta = document.querySelector('input[name="update"]');
      if (updateCta) {
        updateCta.addEventListener('click', function () {
          ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'Update', { nonInteraction: 1 });
        });
      }

      var checkoutCta = document.querySelectorAll('input[name="checkout"]');
      if (checkoutCta.length) {
        checkoutCta.forEach(function (button) {
          button.addEventListener('click', function () {
            ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'Check Out', { nonInteraction: 1 });
          });
        })
      }

      // shoppay
      document.addEventListener('click', function (e) {
        if (e.target.matches('div[data-testid="ShopifyPay-button"]')) {
          ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'Shop Pay', { nonInteraction: 1 });
        } else if (e.target.matches('form[action*="payments.amazon.com"]')) {
          ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'Amazon Pay', { nonInteraction: 1 });
        } else if (e.target.matches('div[data-testid="GooglePay-button"]')) {
          ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'Google Pay', { nonInteraction: 1 });
        } else if (e.target.matches('div[data-testid="FacebookPay-button"]')) {
          ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'MetaPay', { nonInteraction: 1 });
        }
      });

      // paypal
      // Select the node that will be observed for mutations
      const targetNode = document.body;

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        var payPalModal = document.querySelector('.paypal-checkout-sandbox');
        if (document.body.contains(payPalModal)) {
          ga('tiCart.send', 'event', 'Cart', 'CTA - Click', 'PayPal', { nonInteraction: 1 });
          observer.disconnect();
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    }
  }, 100);
}

function cartDeclutter() {
  if (typeof (cartdeclutterloaded) === 'undefined') {
    window.cartdeclutterloaded = 'true';

    // add your JavaScript changes here
    memCartAddonsTracking();
  }
}

try {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cartDeclutter();
  } else {
    document.addEventListener('DOMContentLoaded', cartDeclutter);
  }
} catch (err) {
  var e = {
    dev: 'U024L8WH0',
    vwotest: '32',
    vwodesc: 'MEM-Cart-ButtonDeclutter-V1-Mar2023 | TI Control',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };

  var x = new XMLHttpRequest;
  x.open("POST", "https://us-central1-tixray.cloudfunctions.net/err", !0), x.send(JSON.stringify(e));
}
