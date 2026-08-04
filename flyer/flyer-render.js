(function () {
  var sheet = document.getElementById("sheet");
  var tpl = document.getElementById("tile-template");
  var url = typeof HUB_URL !== "undefined" ? HUB_URL : "https://grow-local-business.netlify.app/";

  for (var i = 0; i < 4; i++) {
    sheet.appendChild(tpl.content.cloneNode(true));
  }

  document.querySelectorAll(".qr-target").forEach(function (el) {
    new QRCode(el, {
      text: url,
      width: 120,
      height: 120,
      colorDark: "#0E1613",
      colorLight: "#F2EFE6",
      correctLevel: QRCode.CorrectLevel.M
    });
  });
})();
