; (function ($) {
    "use strict";
    let shop = {
        init: function () {
            shop.info = $.cookie("info") ? JSON.parse($.cookie("info")) : [];
            shop.url = "http://localhost/haitaocheng/data/goods.json";
            shop.id = document.location.href.split('?')[1];
            shop.num = $('.numtxt');
            shop.admin = '';
            shop.load();
        },
        load: function () {
            $('.minNum').on('click', function () {
                if (shop.num.val() != 1) {
                    shop.num.val(shop.num.val() - 1)
                }
            });
            $('.maxNum').on('click', function () {
                shop.num.val(parseInt(shop.num.val()) + 1);
            });
            $('.addcart').on('click', function () {
                for (let i = 0; i < shop.info.length; i++) {
                    if (shop.info[i].s == 1) {
                        shop.admin = shop.info[i];
                        break;
                    }
                }
                if (shop.admin == '') {
                    let t = confirm("请先登录!");
                    if (t) {
                        window.location = "http://localhost/haitaocheng/server.html";
                    }
                } else {
                    alert('加入购物车成功!');
                    shop.setCookie();
                }
            });
        },
        setCookie: function () {
            shop.goods = $.cookie('goods') ? JSON.parse($.cookie('goods')) : [];

            if (shop.goods.length < 1) {
                console.log(1);
                shop.goods.push({
                    id: shop.id,
                    num: shop.num.val()
                })
            } else {
                let i;
                let off = shop.goods.some((val, index) => {
                    i = index;
                    return val.id == shop.id;
                })
                if (off) {
                    shop.goods[i].num = parseInt(shop.goods[i].num) + parseInt(shop.num.val());
                } else {
                    shop.goods.push({
                        id: shop.id,
                        num: shop.num.val()
                    })
                }
            }
            $.cookie('goods', JSON.stringify(shop.goods), { expires: 1000 });
            console.log(JSON.parse($.cookie('goods')));
        }
    }
    shop.init();
})(jQuery);