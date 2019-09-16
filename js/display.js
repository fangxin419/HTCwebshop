; (function ($) {
    class Display {
        constructor() {
            this.url = "data/goods.json";
            this.getAjax();
        }
        getAjax() {
            $.ajax({
                url: this.url,
                success: (res) => {
                    this.res = res;
                    this.getGoods();
                }
            });
        }
        getGoods() {
            $('.reporlist').eq(0).html(this.display1(1, 6));
            $('.reporlist').eq(1).html(this.display1(7, 6));
            $('.plist').eq(0).html(this.display2(13, 8));
            $('.plist').eq(1).html(this.display2(21, 2));
            $('.plist').eq(2).html(this.display2(23, 2));
            $('.plist').eq(3).html(this.display2(25, 2));
            $('.plist').eq(4).html(this.display2(27, 2));
            $('.plist').eq(5).html(this.display2(29, 2));

            let allimg = $('[data-src]');
            this.arr = Array.from(allimg);
            onscroll = () => {
                this.lazyload();
            }
            this.lazyload();
        }
        display1(min, num) {
            let str = '';
            for (let i = min - 1, j = 1; i < min + num - 1; i++ , j++) {
                str += `<li>
                            <a href="goods.html?${this.res[i].goodsId}">
                                <h6>${this.res[i].name}</h6>
                                <div class="pic">
                                    <span class="img-inner">
                                    <img style="background:url(images/lazy_loading.gif) no-repeat center" data-src="${this.res[i].url}" height="120" width="120">
                                    </span>
                                </div>
                                <div class="price">
                                    <span class="newprice"><em>海淘价：</em>￥<strong>${this.res[i].price}</strong></span>
                                    <span class="oldprice"><del>￥</del></span>
                                </div>
                                <span class="no">${j}</span>
                            </a>
                        </li>`;
            }
            return str;
        }
        display2(min, num) {
            let str = '';
            for (let i = min - 1; i < min + num - 1; i++) {
                str += `<li>
                            <a href="goods.html?${this.res[i].goodsId}">
                            <img style="background:url(images/lazy_loading.gif) no-repeat center" data-src="${this.res[i].url}" height="150" width="150">
                                <h6>${this.res[i].name}</h6>
                                <p><span class="newprice"><em>海淘价：</em>￥<strong>${this.res[i].price}</strong></span></p>
                            </a>
                        </li>`;
            }
            return str;
        }
        lazyload() {
            for (let i = 0; i < this.arr.length; i++) {
                if ($('html').scrollTop() > $(this.arr[i]).offset().top - $(window).height()) {
                    this.arr[i].src = $(this.arr[i]).attr("data-src");
                    this.arr.splice(i, 1);
                    i--;
                }
            }
        }
    }
    new Display();
})(jQuery);