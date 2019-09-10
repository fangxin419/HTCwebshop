define(function () {
    class Shop {
        constructor(options) {
            this.id = document.location.href.split('?')[1];
            this.goods = options.goods;
            this.headDis = options.headDis;
            this.info = options.info;
            this.admin = '';
            this.load();
        }
        load() {
            $('.minNum').on('click', function () {
                if ($('.numtxt').val() != 1) {
                    $('.numtxt').val($('.numtxt').val() - 1)
                }
            });
            $('.maxNum').on('click', function () {
                $('.numtxt').val(parseInt($('.numtxt').val()) + 1);
            });
            $('.addcart').on('click', () => {
                for (let i = 0; i < this.info.length; i++) {
                    if (this.info[i].s == 1) {
                        this.admin = this.info[i];
                        break;
                    }
                }
                if (this.admin == '') {
                    let t = confirm("请先登录!");
                    if (t) {
                        window.location = "http://localhost/haitaocheng/server.html";
                    }
                } else {
                    alert('加入购物车成功!');
                    this.setCookie();
                    this.headDis();
                }
            });
        }
        setCookie() {
            if (this.goods.length < 1) {
                this.goods.push({
                    id: this.id,
                    num: $('.numtxt').val()
                })
            } else {
                let i;
                let off = this.goods.some((val, index) => {
                    i = index;
                    return val.id == this.id;
                })
                if (off) {
                    this.goods[i].num = parseInt(this.goods[i].num) + parseInt($('.numtxt').val());
                } else {
                    this.goods.push({
                        id: this.id,
                        num: $('.numtxt').val()
                    })
                }
            }
            $.cookie('goods', JSON.stringify(this.goods), { expires: 1000 });
        }
    }
    return {
        shop: Shop
    }
});