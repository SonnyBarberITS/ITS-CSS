// Get IP address of user
$.getJSON("https://jsonip.com?callback=?", function(data) {

    var userIP = data.ip;

    var storeIP_TEST = '46.244.28.9'; //194.75.64.36 or when hotspotting from mobile 82.132.228.112
    var storeIP_Leyton = '81.143.219.150'; //81.143.219.150
    var storeIP_Walthamstow = '5.2.121.30'; //213.120.215.234
    var storeIP_Harlow = '87.224.72.223';

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


    // ==================================================================================================




    if (userIP == storeIP_Leyton || userIP == storeIP_Walthamstow || userIP == storeIP_Harlow || userIP == storeIP_TEST) {

        $('head:first').prepend('<link rel="stylesheet" href="https://its-london-css-js.s3-eu-west-1.amazonaws.com/css/retail/retail-its.min.css" type="text/css" />');
        $('head').append('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">');
        $('head').append('<link rel="stylesheet" href="https://use.typekit.net/mrh2xsk.css">');
        $("<div class='retail-nav-icons'><div class='retail-nav-icon-home'><a href='javascript:history.back()'><img src='https://its-london.s3-eu-west-1.amazonaws.com/CMS/retail-store-screen/img/back.png'></a></div><div class='retail-nav-icon-back'><a href='https://www.its.co.uk/'><img src='https://its-london.s3-eu-west-1.amazonaws.com/CMS/retail-store-screen/img/home.png'></a></div><div class='retail-nav-icon-search'><a class='retail-home-start-search' href='/Retail-Home.htm'><img src='https://its-london.s3-eu-west-1.amazonaws.com/CMS/retail-store-screen/img/search.png'></a></div></div>").prependTo('#Main');

        // unwrap new prod detail page
        $('.prod-buying-section-container').removeClass('.prod-buying-section-container');

        var stockCheck = $('#StoreStockValue span').html($(this).find(':selected').val());
        var stockCheckNull = $('.StockCheckResult').text();

        // store Stock check has empty Value
        if (stockCheckNull === '') {
            $('#StoreStockValue > h2').addClass('emptyValue');
        };

        // With stockCheck value only display 1 decimal place
        $(stockCheck).each(function() {
            var stockCheckString = $('.StockCheckResult').text($('.StockCheckResult').text().substr(0, 2));

            // Remove any decimal points from value
            $('.StockCheckResult').html($('.StockCheckResult').html().split(".").join(""));
        });

        $(document).ready(function() {

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


                // if a store is out of stock on a product
                var retailText = $('.StockCheckResult').text();
                var retailOos = '0';
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

            });


            // If variant selector is visible then hide stock status message
            if ($('.VarQty > .fbtVariantOptions').is(':visible')) {
                $('#StoreStockValue').hide();
            };

            //display variant selector before stock status message
            $('.VarQty').prependTo($('#StoreStockcheck'));
        });

        // =====================================================================================================

        // REMOVE ANYTHING AFTER - SYMBOL IS DISPLAYED
        $('.fbtVariantOptions select option').each(function() {
            var retailUrl = $(this).text();

            console.log(retailUrl);

            retailUrl.split('- In Stock')[0];
            var retailUrlNew = (retailUrl.split('- In Stock')[0]);
            $(this).text(retailUrlNew);
        });




        // ==============================================================================

        // IF PRODUCT IS OUT OF STOCK IN THE MAIN STORE
        $(document).ready(function() {
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

                    // if each store value is 0 then add out of stock message (NOT MAIN)
                    var stockCheckLeyton = $('.check-rstore-leyton').val();
                    var stockCheckWalthamstow = $('.check-rstore-leyton').val();;
                    var stockCheckHarlow = $('.check-rstore-leyton').val();;
                    var stockCheckDebden = $('.check-rstore-leyton').val();;

                    var allStoreArray = [stockCheckLeyton, stockCheckWalthamstow, stockCheckHarlow, stockCheckDebden];


                    // if a store is out of stock on a product
                    var retailText = $('.StockCheckResult').text();
                    var retailOos = '0';

                    var stockCheckMain = $('.check-rstore-main:selected').val();
                    var stockValZero = 0;
                    var stockMainOostext = $('#StoreStockValue h2').hasClass('retail-oos-text');




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
                        $('#StoreStockValue h3').removeClass('retail-oos-main-text');
                        $('#StoreStockValue h3').removeClass('retail-oos-text');
                        $('#storeStockSelect .check-rstore-main').css('color', '#d09402');
                        $('#storeStockSelect .check-rstore-main').text('Delivery to store or you');
                    };

                    //

                    if (stockMainOostext == true && stockCheckMain == stockValZero) {
                        $('#StoreStockValue h3').attr("class", "retail-oos-main-text").stop();
                    } else {

                        $('#StoreStockValue h3').removeClass("retail-oos-main-text").stop();

                    };

                    if (stockCheckMain > stockValZero) {
                        $('#StoreStockValue h3').attr("class", "retail-inStock-main-text").stop();
                    } else {
                        $('#StoreStockValue h3').removeClass("retail-inStock-main-text").stop();
                    }


                });

            });


            // CLICK SEARCH ICON
            var clicks = 0;
            $(".retail-home-search").on("click keyup", function retailSearchClicked(event) {
                if (clicks == 0) {
                    event.preventDefault();
                    $(".retail-home-welcome").hide("slow");
                    $(".retail-home-search").addClass("retail-home-search-small");
                    $(".retail-home-categories").addClass("retail-home-categories-small");
                    $("#ctl00_slider_cmrRetailhome > section.retail-home-search-container > input").css("display", "block");
                    $("#ctl00_slider_cmrRetailhome > section.retail-home-search-container > input").select();
                    $('#ctl00_slider_cmrRetailhome > section.retail-home-search-container > input[type="text"]').val("");
                    $(".retail-home-start-search").addClass("retail-search-get-results");
                    $(".retail-home-search-small h2").text("Get Results");
                    console.log("first click")
                } else {
                    $(".retail-search-get-results").click(function() {
                        console.log("2nd click");
                        $(".Search > #ctl00_H_ps1_cc > a").click()
                    });
                }++clicks
            });


            // SEARCH BOX HOME RETAIL
            $(".retail-home-search").keyup(function(e) {

                var val = $(this).val();
                val = val.replace(/[^\w]+/g, " ");

                $(".searchBox").val(val);


            });
        });
    };
});
