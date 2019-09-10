; (function ($) {
    let allimg = $('img');
    let arr = Array.from(allimg);
    //首次载入加载图片
    console.log(allimg);
    onscroll = function () {
        lazy();
    }
    lazy();
    function lazy() {
        for (let i = 0; i < arr.length; i++) {
            if ($('html').scrollTop() > $(arr[i]).offset().top - $(window).height()) {
                // arr[i].src = arr[i].getAttribute("abc-src");
                // arr.splice(i, 1);
                // i--;
            }
        }
    }
})(jQuery);