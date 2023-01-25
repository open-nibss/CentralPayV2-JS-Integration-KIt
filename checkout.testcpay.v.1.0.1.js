  /** @format */
var sha256Script = document.createElement('script');
sha256Script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.js');
document.head.appendChild(sha256Script);

function CentralpayCheckout(data) {
  const { secretKey, amount, currency, merchantId, productDescription, productId, responseUrl, transactionId, paymentMode } = data;
  const dataToHash = merchantId + productId + productDescription + amount + currency + transactionId + responseUrl + secretKey;
  const hash = sha256(dataToHash);
  const payload = { amount, currency, merchantId, productDescription, productId, responseUrl, transactionId,  hash };

  const stringifiedData = 'merchantid='+merchantId+'&amount='+amount+'&currency='+currency+'&productDescription='+encodeURIComponent(productDescription)+'&productId='+productId+'&responseUrl='+encodeURIComponent(responseUrl)+'&transactionId='+transactionId+'&paymentMode='+paymentMode+'&hash='+hash;


  //========================================================================================
  /*                                                                                      *
   *                                      local host                                      *
   *                                                                                      */
  //========================================================================================
  // const url = `http://localhost:3000/?q=${encodeURIComponent(stringifiedData)}`;
  // window.location.replace(url);
  
  //========================================================================================
  /*                                                                                      *
   *                                Test Environment                                      *
   *                                                                                      */
  //========================================================================================
  const url = `https://test-centralpay2.nibss-plc.com.ng/?${stringifiedData}`;
  window.location.replace(url);

  //========================================================================================
  /*                                                                                      *
   *                                Production Environment                                *
   *                                                                                      */
  //========================================================================================
  // const url = `https://centralpay2.nibss-plc.com.ng/?q=${encodeURIComponent(stringifiedData)}`;
  // window.location.replace(url);
}
