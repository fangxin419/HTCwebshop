class Goods {
    constructor() {
        this.url = "http://localhost/haitaocheng/data/goods.json";
        this.goodId = document.location.href.split('?')[1];
        this.getAjax();
    }
    getAjax() {
        $.ajax({
            url: this.url,
            success: (res) => {
                this.res = res;
                this.getGood();
            }
        });
    }
    getGood() {
        let t = false;
        for (let i = 0; i < this.res.length; i++) {
            if (this.goodId == this.res[i].goodsId) {
                this.res = this.res[i];
                t = true;
                break;
            }
        }
        if (t) {
            this.display();
        } else {
            console.error('数据解析错误!');
        }

    }
    display() {
        $(".topbar").load("http://localhost/haitaocheng/header.html .topbarcon");
        $(".hdwraper").load("http://localhost/haitaocheng/header.html #top");
        $("#footer").load("http://localhost/haitaocheng/footer.html");
        $('title').html(this.res.name);
        $('.bigpic').html(`<img src="${this.res.url}"/>`);
        $('.photoglass').html(`<img src="${this.res.url}" class="lookphoto" />`);
        $('.goodN').eq(0).html(`<span>${this.res.name}</span>`);
        $('.goodN').eq(1).html(`<a href="#">${this.res.name}</a>`);
        $('.nprice').html(`<em>￥${this.res.price}</em>`);
        $('.proslogan').html(`<p>${this.res.tip}</p>
                         <img src="${this.res.url}"/>`);
    }
}
new Goods();