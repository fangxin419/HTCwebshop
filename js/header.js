; (function ($) {
    class Header {
        constructor() {
            this.info = $.cookie("info") ? JSON.parse($.cookie("info")) : [];
            this.goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : [];
            this.admin = "";
            this.display();
            this.load();
        }
        display() {
            this.admin = '';
            for (let i = 0; i < this.info.length; i++) {
                if (this.info[i].s == 1) {
                    this.admin = this.info[i];
                    break;
                }
            }
            if (this.admin != '') {
                $('.cart strong').html(this.goods.length);
                $('#userinfo').html(`<span class='tip'>会员&nbsp${this.admin.name}</span>&nbsp;欢迎回来 <a class="exit">[退出登录]</a>`);
            } else {
                $('.cart strong').html(0);
                $('#userinfo').html(`Hi，欢迎来到海淘橙 <a href='server.html?0'>[登录]</a>
                                    <a href='server.html?1'>[注册]</a>
                                    <span class='tip'> 注册有礼</span>`);
            }
        }
        setCookie() {
            $.cookie("info", JSON.stringify(this.info), {
                expires: 365
            });
        }
        load() {
            $('#userinfo').on('click', '.exit', () => {
                this.admin = '';
                for (let i = 0; i < this.info.length; i++) {
                    if (this.info[i].s == 1) {
                        this.info[i].s = 0;
                        break;
                    }
                }
                this.setCookie();
                this.display();
            });
            $('.cart').on('click', 'a', () => {
                if (this.admin == '') {
                    event.preventDefault();
                    window.location = 'http://localhost/haitaocheng/server.html?0';
                }
            });
        }
    }
    new Header();
})(jQuery);