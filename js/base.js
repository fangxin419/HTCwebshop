$(function() {
    // 类目展示
    $(".navigation").hover(function() {
        0 == $("#index").length && ($(this).find('h2').addClass("active").next(".navigationcon").stop(!0, !0).show())
    }, function() {
        0 == $("#index").length && ($(this).find('h2').removeClass("active").next(".navigationcon").stop(!0, !0).slideUp(200))
    });
    jQuery("#catalog .item").hover(function() {
        $(this).addClass('itemhover').find('.subcat').fadeIn(500)
    }, function() {
        $(this).removeClass('itemhover').find('.subcat').fadeOut(500)
    });
    jQuery(".navbar .ucenter").hover(function() {
        $(this).addClass('onhover').find('ul').show()
    }, function() {
        $(this).removeClass('onhover').find('ul').hide()
    });
    jQuery(".navbar .sitemap").hover(function() {
        $(this).addClass('onhover').find('.sitemapnav').show()
    }, function() {
        $(this).removeClass('onhover').find('.sitemapnav').hide()
    });
    jQuery(".navbar .order").hover(function() {
        $(this).addClass('onhover').find('.ordernav').show();
    }, function() {
        $(this).removeClass('onhover').find('.ordernav').hide();
    });
});


$(function () {
    var baseJs={
        init:function () {
            baseJs.indexbanner();
            baseJs.hotbrandhover();
            baseJs.hotbrandtab();
            baseJs.seotab();
            baseJs.hotsalehover();
            baseJs.fixnav("ptabt","fixtabt");
            baseJs.fixnav("bdnav","fixtabt");
            baseJs.fixnav("navwrapper","fixnav");
        },
        indexbanner:function(){
            jQuery("#banner").slide({ titCell: ".hd ul", mainCell: ".bd ul", autoPage: true, autoPlay: true, interTime: 4000 });
        },
        hotbrandhover:function(){
            jQuery(".rebrandlist li").hover(function () {
                $(this).addClass('active').find('h6').slideDown()
            }, function () {
                $(this).removeClass('active').find('h6').slideUp()
            });
        },
        hotbrandtab:function(){
            jQuery(".indexrecom").slide({ titCell: ".rtabt li", mainCell: ".rtabcon", delayTime: 50 });
        },
        seotab:function(){
            jQuery("#mtab").slide({ titCell: ".mtabt li", mainCell: ".mtabcon", delayTime: 0 });
        },
        hotsalehover:function(){
            jQuery("#ihotsalecon li").each(function () {
                $(this).hover(function () {
                    $(this).siblings().find("img").stop().fadeTo("fast", 0.6);
                },
                    function () {
                        $(this).siblings().find("img").stop().fadeTo("fast", 1);
                    });
            });
        },
        fixnav:function (fixn,className) {
            var fixednav=$('.'+fixn);
            if(fixednav[0]){
                var fixtabOffset=fixednav.offset().top;
                $(window).scroll(function(){
                    if($(window).scrollTop()>fixtabOffset){
                        fixednav.addClass(className);
                    }else{
                        fixednav.removeClass(className);
                    };
                });
            }
        }
    }
    baseJs.init();
});