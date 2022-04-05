// function myFunction() {
//   const ORIGINAL_SCRIPT = `<script>
//     console.log("DEBUG HERE! :D");
//     $("div.panel.panel-default.product-right-sidebar > div > div.button-add-cart-action > a").css("background-color","#FFB500");
//     $("body > div.main-custom-container > div.container > div > div.col-md-9 > div.full-width.sticky_header > div > div > h1").css("background-color","#FFB500");
//     $("#sidebar-right > div > div.sticky_column > div.panel.panel-default.product-right-sidebar > div > div.product-price-box > div:nth-child(1) > span.new-price.non-discounted").css("background-color","#FFB500");
//   </script>
//   `

//   let responseHtml = document.body.toString()

//   responseHtml = responseHtml.replace(`</body>`, `${ORIGINAL_SCRIPT} </body>`)
//   if (responseHtml) return responseHtml
// }
// myFunction();

console.log("DEBUG Loaded from git :D");
$("div.panel.panel-default.product-right-sidebar > div > div.button-add-cart-action > a").css("background-color","#FFB500");
$("body > div.main-custom-container > div.container > div > div.col-md-9 > div.full-width.sticky_header > div > div > h1").css("background-color","#FFB500");
$("#sidebar-right > div > div.sticky_column > div.panel.panel-default.product-right-sidebar > div > div.product-price-box > div:nth-child(1) > span.new-price.non-discounted").css("background-color","#FFB500");
