; (function ($) {
    let head = {
        init: function () {
            head.info = $.cookie("info") ? JSON.parse($.cookie("info")) : [];
            head.goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : [];
            console.log(head.info);
            head.admin = "";
            head.display();
            head.load();
        },
        display: function () {
            for (let i = 0; i < head.info.length; i++) {
                if (head.info[i].s == 1) {
                    head.admin = head.info[i];
                    break;
                }
            }
            if (head.admin != '') {
                $('.cart strong').html(head.goods.length);
                $('#userinfo').html(`<span class='tip'>会员&nbsp${head.admin.name}</span>&nbsp;欢迎回来 <a class="exit">[退出登录]</a>`);
            } else {
                $('.cart strong').html(0);
                $('#userinfo').html(`Hi，欢迎来到海淘橙 <a href='server.html?0'>[登录]</a>
                                    <a href='server.html?1'>[注册]</a>
                                    <span class='tip'> 注册有礼</span>`);
            }

        },
        setCookie: function () {
            $.cookie("info", JSON.stringify(head.info), {
                expires: 365
            });
        },
        load: function () {
            $('#userinfo').on('click', '.exit', function () {
                head.admin = '';
                for (let i = 0; i < head.info.length; i++) {
                    if (head.info[i].s == 1) {
                        head.info[i].s = 0;
                        break;
                    }
                }
                head.setCookie();
                head.display();
            });
            $('.cart').on('click', 'a', function () {
                if (head.admin == '') {
                    event.preventDefault();
                    window.location = 'http://localhost/haitaocheng/server.html?0';
                }
            });
        }
    }
    head.init();
})(jQuery);