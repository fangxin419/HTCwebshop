; (function ($) {
    "use strict";
    let details = {
        init: function () {
            details.url = "http://localhost/haitaocheng/data/goods.json";
            details.goodId = document.location.href.split('?')[1];
            details.getAjax();
        },
        getAjax: function () {
            $.ajax({
                url: this.url,
                success: function (res) {
                    details.res = res;
                    details.getGood();
                }
            });
        },
        getGood: function () {
            let t = false;
            for (let i = 1; i < details.res.length; i++) {
                if (details.goodId == details.res[i].goodsId) {
                    details.res = details.res[i];
                    t = true;
                    break;
                }
            }
            if (t) {
                details.display();
            } else {
                console.error('数据解析错误!');
            }

        },
        display: function () {
            $('title').html(details.res.name);
            $('.bigpic').html(`<img src="${details.res.url}"/>`);
            $('.goodN').eq(0).html(`<span>${details.res.name}</span>`);
            $('.goodN').eq(1).html(`<a href="#">${details.res.name}</a>`);
            $('.nprice').html(`<em>￥${details.res.price}</em>`);
            $('.proslogan').html(`<p>${details.res.tip}</p>
                             <img src="${details.res.url}"/>`);
        }
    }
    details.init();
})(jQuery);