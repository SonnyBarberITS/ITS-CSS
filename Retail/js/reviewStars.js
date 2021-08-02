function applySavingBlockText(){
  $(".savingBlockText").text(function () {
								return $(this).text().replace(".00", " ");
							});

}

function ApplyStarRating() {
    jQuery('.starRating').stars();
}

function ScrollTop() {
    $('html').scrollTop(0);
}

function ApplyOoSGrey() {
    $('#pdList li:contains("Out Of Stock")').each(function AppendProducts() {
        $(this).find('.hypsmallImage > img').addClass('hypsmallImageOut');
        $(this).find('.ProdImage .hypsmallImage .imgMain').css('opacity', '0.3');
    });
}

function emptyFreebie() {

    $('#pdList li').each(function(){
		if ($('.webOffers > span').is(':empty')){

 			$(this).find('.webOffers > span').addClass('plEmptyFreebie');
		}
	});

}

function catRefListing() {
  $('.ProductHead').each(function() {
    $(this).find('.CatRefGridList').appendTo($(this).find('.desc'));
  });
}

// When variant selected hide magic 360 image
function variantSelectOption()

{
    $('.fbtVariantOptions > li > select').change(function(event) {

        console.log('The select option has been changed');
        $('#360Content').hide();

        $('.button360 a, .btnOpenMagic360Embedded').on('click', function() {
            $('#360Content').show();
        });
    });
}

variantSelectOption();



function retailGetIp() {



    // Get IP address of user
    $.getJSON("https://jsonip.com?callback=?", function(data) {

        var userIP = data.ip;

        var storeIP_TEST = '82.132.235.93'; //194.75.64.36 or when hotspotting from mobile 82.132.228.112
        var storeIP_Leyton = '81.143.219.150'; //81.143.219.150
        var storeIP_Walthamstow = '5.2.121.30'; //213.120.215.234
        var storeIP_Harlow = '87.224.72.223';

        // unwrap new prod detail page
        $('.prod-buying-section-container').removeClass('.prod-buying-section-container');


        // If statement to change the amount in stock depending on store location
        if (userIP == storeIP_Leyton) {
            $('.StockCheckResult').replaceWith($('.StockCheckLeyton').addClass('StockCheckResult'));

            var myVal = $(".StockCheckLeyton").text();
            $('.retail-home-welcome h2 > span').text('LEYTON');
            console.log('You are at the leyton store');


        } else if (userIP == storeIP_Walthamstow) {

            $('.StockCheckResult').replaceWith($('.StockCheckWalthamstow').addClass('StockCheckResult'));
            var myVal = $(".StockCheckWalthamstow").text();
            $('.retail-home-welcome h2 > span').text('WALTHAMSTOW');
            console.log('You are at the Walthamstow store');

        } else if (userIP == storeIP_Harlow) {

            $('.StockCheckResult').replaceWith($('.StockCheckHarlow').addClass('StockCheckResult'));
            var myVal = $(".StockCheckHarlow").text();
            $('.retail-home-welcome h2 > span').text('HARLOW');
            console.log('You are at the Harlow store');

        } else if (userIP == storeIP_TEST) {

            $('.StockCheckResult').replaceWith($('.StockCheckHarlow').addClass('StockCheckResult'));
            var myVal = $(".StockCheckHarlow").text();
            $('.retail-home-welcome h2 > span').text('HEAD OFFICE');
            console.log('you are at the head office but using the Debden stock levels');

        } else {
            console.log('You are not in any of the stores');
        };

        // =====================================================================================




        if (userIP == storeIP_Leyton || userIP == storeIP_Walthamstow || userIP == storeIP_Harlow || userIP == storeIP_TEST) {

            var stockCheck = $('#StoreStockValue span').html($(this).find(':selected').val());
            var stockCheckNull = $('.StockCheckResult').text();

            // store Stock check has empty Value
            if (stockCheckNull === '') {
                $('#StoreStockValue > h2').addClass('emptyValue');
            };

            // With stockCheck value only display 1 decimal place
            $(stockCheck).each(function() {

                var stockCheckString = $(this).text();
                console.log(stockCheckString);
                stockCheckString = stockCheckString.substr(0, stockCheckString.lastIndexOf("."));
                $(this).text(stockCheckString);
            });

        }


        if (userIP == storeIP_Leyton || userIP == storeIP_Walthamstow || userIP == storeIP_Harlow || userIP == storeIP_TEST) {
            $('head:first').prepend('<link rel="stylesheet" href="https://its-london-css-js.s3-eu-west-1.amazonaws.com/css/retail/retail-its.min.css" type="text/css" />');
            $('head').append('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">');
            $('head').append('<link rel="stylesheet" href="https://use.typekit.net/mrh2xsk.css">');
            //display variant selector before stock status message
            $('.VarQty').prependTo($('#StoreStockcheck'));


            // $("<div class='retail-nav-icons'><div class='retail-nav-icon-home'><a href='javascript:history.back()'><img src='https://its-london.s3-eu-west-1.amazonaws.com/CMS/retail-store-screen/img/back.png'></a></div><div class='retail-nav-icon-back'><a href='https://www.its.co.uk/'><img src='https://its-london.s3-eu-west-1.amazonaws.com/CMS/retail-store-screen/img/home.png'></a></div><div class='retail-nav-icon-search'><a class='retail-home-start-search' href=''><img src='https://its-london.s3-eu-west-1.amazonaws.com/CMS/retail-store-screen/img/search.png'></a></div></div>").prependTo('#Main');

            // REMOVE ANYTHING AFTER : SYMBOL IS DISPLAYED
            $('.fbtVariantOptions select option').each(function() {
                var retailUrl = $(this).text();

                console.log(retailUrl);

                retailUrl.split('- In Stock')[0];
                var retailUrlNew = (retailUrl.split('- In Stock')[0]);
                $(this).text(retailUrlNew);
            });

            // IF PRODUCT IS OUT OF STOCK IN THE MAIN STORE
            $(document).ready(function() {
                // if a store is out of stock on a product
                var retailText = $('.StockCheckResult').text();
                var retailOos = '0';

                var stockCheckMain = $('.check-rstore-main:selected').val();
                var stockValZero = 0;
                var stockMainOostext = $('#StoreStockValue h2').hasClass('retail-oos-text');

                // If product is a bom
                $('.retail-bom-display').each(function() {

                    var retailBomText = $(this).find('.retailBomCode:contains("BOM")');

                    if (retailBomText.length > 0) {
                        $(this).find('.retailBomCode').addClass('retail-bom-true');
                        $('#StoreStockcheck').hide();

                    } else {
                        $(this).find('.retailBomCode').removeClass('retail-bom-true');
                        $(this).find('.retailBomCode').addClass('retail-bom-false');
                        $('#StoreStockcheck').show();
                    }

                });


                // OUT OF STOCK & INSTOCK MESSAGE APPLIES

                if (retailText == retailOos) {
                    console.log('This store is out of stock on this product');

                    // Main Stock Text Change
                    $(this).css('color', 'red')
                    $('#StoreStockValue h2').removeClass('retail-oos-main-text');
                    $('#StoreStockValue h2').addClass('retail-oos-text');

                    // Store Dropdown Text Change
                    $('#storeStockSelect .check-rstore-main').css('color', '#d09402');
                    $('#storeStockSelect .check-rstore-main').text('Delivery to store or you');

                } else {
                    $(this).css('color', '#1ca902')
                    $('#StoreStockValue h2').removeClass('retail-oos-main-text');
                    $('#StoreStockValue h2').removeClass('retail-oos-text');
                    $('#storeStockSelect .check-rstore-main').css('color', '#d09402');
                    $('#storeStockSelect .check-rstore-main').text('Delivery to store or you');
                };

                //

                if (stockMainOostext == true && stockCheckMain == stockValZero) {
                    $('#StoreStockValue h2').attr("class", "retail-oos-main-text").stop();
                } else {

                    $('#StoreStockValue h2').removeClass("retail-oos-main-text").stop();

                };

                if (stockCheckMain > stockValZero) {
                    $('#StoreStockValue h2').attr("class", "retail-inStock-main-text").stop();
                } else {
                    $('#StoreStockValue h2').removeClass("retail-inStock-main-text").stop();
                }



                // CLICK SEARCH ICON
                $(".retail-home-search").click(function(event) {

                    event.preventDefault();
                    $('.retail-home-welcome').hide('slow');
                    $('.retail-home-search').addClass('retail-home-search-small');
                    $('.retail-home-categories').addClass('retail-home-categories-small');
                    $('retail-home-search').show();
                    $('.retail-home-search').select();

                });

            });

        } else {
            console.log('This IP address is not a store IP address');
        }
    });



}




// =========================================================================================



function retailChangeOption() {

    var oosDisplayMessage = "Out of stock here, check below for stock elsewhere";
    var mainStockCheckVal = 0;




    // Stock Checker Change Event
    $('#storeStockSelect').change(function retailOos() {




        // Hide store stock value
        $('#StoreStockValue').show();
        var stockCheck = $('#StoreStockValue span').html($(this).find(':selected').val()); // Display Availibilty as a value on DOM

        // With stockCheck value only display 1 decimal place
        $(stockCheck).each(function() {
            var stockCheckString = $(this).text();
            console.log(stockCheckString);
            stockCheckString = stockCheckString.substr(0, stockCheckString.lastIndexOf("."));
            $(this).text(stockCheckString);


            // if a store is out of stock on a product
            var retailText = $('.StockCheckResult').text();
            var retailOos = '0';

            var stockCheckMain = $('.check-rstore-main:selected').val();
            var stockValZero = 0;
            var stockMainOostext = $('#StoreStockValue h2').hasClass('retail-oos-text');


            // OUT OF STOCK & INSTOCK MESSAGE APPLIES

            if (retailText == retailOos) {
                console.log('This store is out of stock on this product');

                // Main Stock Text Change
                $(this).css('color', 'red')
                $('#StoreStockValue h2').removeClass('retail-oos-main-text');
                $('#StoreStockValue h2').addClass('retail-oos-text');

                // Store Dropdown Text Change
                $('#storeStockSelect .check-rstore-main').css('color', '#d09402');
                $('#storeStockSelect .check-rstore-main').text('Delivery to store or you');

            } else {
                $(this).css('color', '#1ca902')
                $('#StoreStockValue h2').removeClass('retail-oos-main-text');
                $('#StoreStockValue h2').removeClass('retail-oos-text');
                $('#storeStockSelect .check-rstore-main').css('color', '');
                $('#storeStockSelect .check-rstore-main').text('Delivery to store or you');
            };

            //

            if (stockMainOostext == true && stockCheckMain == stockValZero) {
                $('#StoreStockValue h2').attr("class", "retail-oos-main-text").stop();
            } else {

                $('#StoreStockValue h2').removeClass("retail-oos-main-text").stop();

            };

            if (stockCheckMain > stockValZero) {
                $('#StoreStockValue h2').attr("class", "retail-inStock-main-text").stop();
            } else {
                $('#StoreStockValue h2').removeClass("retail-inStock-main-text").stop();
            }


            //============================================================================================================

        });

    });

};

function EndRequestHandler(sender, args) {

    $('.MagicZoomPlusItem > a').on('click', function() {
        ShowMagicZoom();
    });

    variantSelectOption();
    ApplyOoSGrey();
    emptyFreebie();
    catRefListing();

    applySavingBlockText()
    ApplyStarRating();
    ScrollTop();

    retailGetIp();
    retailChangeOption();
}

Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
ApplyStarRating();
