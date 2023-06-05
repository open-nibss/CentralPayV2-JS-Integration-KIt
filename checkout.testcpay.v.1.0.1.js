/** @format */
var sha256Script = document.createElement('script');
sha256Script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.js');
document.head.appendChild(sha256Script);

function CentralpayCheckout(data) {
  const { secretKey, amount, currency, merchantId, productDescription, productId, responseUrl, transactionId, paymentMode, logo } = data;
  const dataToHash = merchantId + productId + productDescription + amount + currency + transactionId + responseUrl + secretKey;
  const hash = sha256(dataToHash);

  const payload = { ...data, hash };
  const stringifiedData = JSON.stringify(payload, function (key, val) {
    if (typeof val === 'function') {
      return val.toString();
    }
    return val;
  });

  const constructUrl = () => {
    let url = ""
    if (merchantId) {
      url += `merchantid=${merchantId}`
    }
    if (productId) {
      url += `&productId=${productId}`
    }
    if (productDescription) {
      const encodedProductDescription = encodeURIComponent(productDescription);
      url += `&productDescription=${encodedProductDescription}`;
    }
    if (amount) {
      url += `&amount=${amount}`
    }
    if (currency) {
      url += `&currency=${currency}`
    }
    if (transactionId) {
      url += `&transactionId=${transactionId}`
    }
    if (responseUrl) {
      url += `&responseUrl=${responseUrl}`;
    }
    if (hash) {
      url += `&hash=${hash}`
    }
    if (logo) {
      url += `&logo=${logo}`
    }
    if (paymentMode) {
      const formattedPaymentMode = paymentMode.replace(/ /g, '%20')
      url += `&paymentMode=${formattedPaymentMode}`;
    }

    return url
  }


  //========================================================================================
  /*                                                                                      *
   *                                      local host                                      *
   *                                                                                      */
  //========================================================================================
  // const url = `http://localhost:3000/?${constructUrl()}`;
  // window.location.replace(url);
  //========================================================================================
  /*                                                                                      *
   *                                Test Environment                                      *
   *                                                                                      */
  //========================================================================================
  // const url = `https://test-centralpay2.nibss-plc.com.ng/?${constructUrl()}`
  // window.location.replace(url);


  //========================================================================================
  /*                                                                                      *
   *                                Production Environment                                *
   *                                                                                      */
  //========================================================================================
  const url = `https://centralpay2.nibss-plc.com.ng/?${constructUrl()}`;
  window.location.replace(url);
}
