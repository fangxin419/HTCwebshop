; (function ($) {
    "use strict";
    let goods = {
        init: function () {
            goods.url = "http://localhost/haitaocheng/data/goods.json";
            goods.gbox1 = $('.reporlist');
            goods.gbox2 = $('.plist');
            goods.getAjax();
        },
        getAjax: function () {
            $.ajax({
                url: this.url,
                success: function (res) {
                    goods.res = res;
                    goods.getGoods();
                }
            });
        },
        getGoods: function () {
            goods.gbox1.eq(0).html(goods.display1(1, 6));
            goods.gbox1.eq(1).html(goods.display1(7, 6));
            goods.gbox2.eq(0).html(goods.display2(13, 8));
            goods.gbox2.eq(1).html(goods.display2(21, 2));
            goods.gbox2.eq(2).html(goods.display2(23, 2));
            goods.gbox2.eq(3).html(goods.display2(25, 2));
            goods.gbox2.eq(4).html(goods.display2(27, 2));
            goods.gbox2.eq(5).html(goods.display2(29, 2));
        },
        display1: function (min, num) {
            let str = '';
            for (let i = min - 1, j = 1; i < min + num - 1; i++ , j++) {
                str += `<li>
                            <a href="http://localhost/haitaocheng/goods.html?${goods.res[i].goodsId}" target="_blank" >
                                <h6>${goods.res[i].name}</h6>
                                <div class="pic">
                                    <span class="img-inner">
                                        <img src="${goods.res[i].url}" height="120" width="120">
                                    </span>
                                </div>
                                <div class="price">
                                    <span class="newprice"><em>海淘价：</em>￥<strong>${goods.res[i].price}</strong></span>
                                    <span class="oldprice"><del>￥</del></span>
                                </div>
                                <span class="no">${j}</span>
                            </a>
                        </li>`;
            }
            return str;
        },
        display2: function (min, num) {
            let str = '';
            for (let i = min - 1; i < min + num - 1; i++) {
                str += `<li>
                            <a href="http://localhost/haitaocheng/goods.html?${goods.res[i].goodsId}" target="_blank" >
                                <img src="${goods.res[i].url}" height="150" width="150">
                                <h6>${goods.res[i].name}</h6>
                                <p><span class="newprice"><em>海淘价：</em>￥<strong>${goods.res[i].price}</strong></span></p>
                            </a>
                        </li>`;
            }
            return str;
        }
    }
    goods.init();
})(jQuery);