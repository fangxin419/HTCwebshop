; (function ($) {
    "use strict";
    let goods = {
        init: function () {
            goods.url = "http://localhost/haitaocheng/data/goods.json";
            goods.goodId = document.location.href.split('?')[1];
            goods.getAjax();
        },
        getAjax: function () {
            $.ajax({
                url: this.url,
                success: function (res) {
                    goods.res = res;
                    goods.getGood();
                }
            });
        },
        getGood: function () {
            let t = false;
            for (let i = 0; i < goods.res.length; i++) {
                if (goods.goodId == goods.res[i].goodsId) {
                    goods.res = goods.res[i];
                    t = true;
                    break;
                }
            }
            if (t) {
                goods.display();
            } else {
                console.error('数据解析错误!');
            }

        },
        display: function () {
            $('title').html(goods.res.name);
            $('.bigpic').html(`<img src="${goods.res.url}"/>`);
            $('.photoglass').html(`<img src="${goods.res.url}" class="lookphoto" />`);
            $('.goodN').eq(0).html(`<span>${goods.res.name}</span>`);
            $('.goodN').eq(1).html(`<a href="#">${goods.res.name}</a>`);
            $('.nprice').html(`<em>￥${goods.res.price}</em>`);
            $('.proslogan').html(`<p>${goods.res.tip}</p>
                             <img src="${goods.res.url}"/>`);
        }
    }
    goods.init();
})(jQuery);