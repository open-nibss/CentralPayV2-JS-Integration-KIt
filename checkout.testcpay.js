/** @format */
var sha256Script = document.createElement('script');
sha256Script.setAttribute(
  'src',
  'https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.js'
);
document.head.appendChild(sha256Script);

function CentralpayCheckout(data) {
  const {
    secretKey,
    amount,
    currency,
    merchantId,
    productDescription,
    productId,
    responseUrl,
    transactionId,
  } = data;
  const dataToHash =
    merchantId +
    productId +
    productDescription +
    amount +
    currency +
    transactionId +
    responseUrl +
    secretKey;
  const hash = sha256(dataToHash);
  const payload = { ...data, hash };

  const stringifiedData = JSON.stringify(payload, function (key, val) {
    if (typeof val === 'function') {
      return val.toString();
    }
    return val;
  });

  const iframe = document.createElement('iframe');
  iframe.setAttribute(
    'style',
    'position:fixed;top:0;left:0;border:none;width:100%;height:100%;z-index:10000;'
  );
  iframe.setAttribute('id', `iframe`);
  iframe.setAttribute('allowTransparency', 'true');
  iframe.setAttribute('name', 'checkout');
  //========================================================================================
  /*                                                                                      *
   *                                      local host                                      *
   *                                                                                      */
  //========================================================================================
  // iframe.setAttribute(
  //   'src',
  //   `http://localhost:3000/?q=${encodeURIComponent(stringifiedData)}`
  // );

 
  //========================================================================================
  /*                                                                                      *
   *                                Test Environment                                      *
   *                                                                                      */
  //========================================================================================
  iframe.setAttribute(
    'src',
    `https://test-centralpay2.nibss-plc.com.ng/?q=${encodeURIComponent(
      stringifiedData
    )}`
  );

  document.body.appendChild(iframe);
}
