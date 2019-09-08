; (function ($) {
    class Car {
        constructor() {
            this.url = "http://localhost/haitaocheng/data/goods.json";
            this.goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : [];
            this.tbody = document.querySelector("tbody");
            this.qx = document.querySelector('.qx');
            this.remove = document.querySelector(".remove");
            this.price = document.querySelector(".price");
            this.allNum = document.querySelector(".num");
            this.money = 0;
            this.load();
            this.addEvent();
        }
        load() {
            $.ajax({
                url: this.url,
                success: (res) => {
                    this.res = res;
                    this.display();
                }
            })
        }
        display() {
            let str = "";
            if (this.goods.length < 1) {
                $('.cartmain2').hide();
                $('.cartmain').show();
            } else {
                $('.cartmain').hide();
                $('.cartmain2').show();
            }
            for (let i = 0; i < this.res.length; i++) {
                for (let j = 0; j < this.goods.length; j++) {
                    if (this.res[i].goodsId == this.goods[j].id) {
                        str += `<tr index="${this.res[i].goodsId}">
                                    <td><input type="checkbox" class="cb" /></td>
                                    <td><img class="center-block" src="${this.res[i].url}"></td>
                                    <td>${this.res[i].name}</td>
                                    <td><i>￥</i><span>${this.res[i].price}</span></td>
                                    <td>
                                        <div class="numselect">
                                            <a class="minNum">-</a>
                                            <input type="text" class="numtxt" value="${this.goods[j].num}" />
                                            <a class="maxNum">+</a>
                                        </div>
                                    </td>
                                    <td><i>￥</i><span>${this.res[i].price * this.goods[j].num}</span></td>
                                    <td class="delete">删除</td>
                                </tr>`
                    }
                }
            }
            this.tbody.innerHTML = str;
            this.qx.checked = true;
            this.qxClick();
        }
        qxClick() {
            this.money = 0;
            this.num = 0;
            for (let i = 0; i < this.goods.length; i++) {
                this.tbody.children[i].children[0].children[0].checked = this.qx.checked;
                if (this.qx.checked) {
                    this.money += parseInt(this.tbody.children[i].children[5].children[1].innerHTML);
                    this.num += parseInt(this.tbody.children[i].children[4].children[0].children[1].value);
                }
            }
            this.price.innerHTML = '￥' + this.money;
            this.allNum.innerHTML = '已选 <em>' + this.num + '</em> 件';
        }
        changNum(tar) {
            this.val = tar.parentNode.children[1].value;
            this.id = tar.parentNode.parentNode.parentNode.getAttribute("index");
            this.td = tar.parentNode.parentNode.parentNode.children;
            console.log(this.td);
            this.setCookie((i) => {
                this.goods[i].num = this.val;
                this.td[5].children[1].innerHTML = this.val * this.td[3].children[1].innerHTML;
                this.setNum();
                this.setMoney();
            })
        }
        addEvent() {
            this.tbody.addEventListener("click", (eve) => {
                let e = eve || window.event;
                let tar = e.target || e.srcElement;
                if (tar.className == "delete") {
                    this.id = tar.parentNode.getAttribute("index");
                    tar.parentNode.remove();
                    this.setCookie((i) => {
                        this.goods.splice(i, 1);
                        this.setNum();
                        this.setMoney();
                        if (this.goods.length < 1) {
                            $('.cartmain2').hide();
                            $('.cartmain').show();
                        }
                    });
                }
                //复选框选中算价格
                if (tar.className == 'cb') {
                    let off = true;
                    this.td = tar.parentNode.parentNode.children;
                    for (let i = 0; i < this.goods.length; i++) {
                        if (this.tbody.children[i].children[0].children[0].checked != true) {
                            off = false;
                        }
                    }
                    if (off) {
                        this.qx.checked = true;
                    }
                    if (this.td[0].children[0].checked == true) {
                        this.money += parseInt(this.td[5].children[1].innerHTML);
                        this.num += parseInt(this.td[4].children[0].children[1].value);
                        this.price.innerHTML = '￥' + this.money;
                        this.allNum.innerHTML = '已选 <em>' + this.num + '</em> 件';
                    } else {
                        this.qx.checked = false;
                        this.money -= parseInt(this.td[5].children[1].innerHTML);
                        this.num -= parseInt(this.td[4].children[0].children[1].value);
                        this.price.innerHTML = '￥' + this.money;
                        this.allNum.innerHTML = '已选 <em>' + this.num + '</em> 件';
                    }
                }
                if (tar.className == 'minNum') {
                    if (tar.parentNode.children[1].value != 1) {
                        tar.parentNode.children[1].value -= 1;
                    }
                    this.changNum(tar);
                }

                if (tar.className == 'maxNum') {
                    tar.parentNode.children[1].value = parseInt(tar.parentNode.children[1].value) + 1;
                    this.changNum(tar);
                }
            });

            this.qx.onclick = this.qxClick.bind(this);

            this.remove.onclick = () => {
                let t = confirm("确认清空购物车吗?");
                if (t) {
                    $.cookie("goods", null);
                    $('.cartmain2').hide();
                    $('.cartmain').show();
                }
            }
        }
        setNum() {
            this.num = 0;
            for (let i = 0; i < this.goods.length; i++) {
                if (this.tbody.children[i].children[0].children[0].checked) {
                    this.num += parseInt(this.tbody.children[i].children[4].children[0].children[1].value);
                }
            }
            console.log(this.num);
            this.allNum.innerHTML = '已选 <em>' + this.num + '</em> 件';
        }
        setMoney() {
            this.money = 0;
            for (let i = 0; i < this.goods.length; i++) {
                if (this.tbody.children[i].children[0].children[0].checked) {
                    this.money += parseInt(this.tbody.children[i].children[5].children[1].innerHTML);
                }
            }
            this.price.innerHTML = '￥' + this.money;
        }

        setCookie(fn) {
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == this.id) {
                    fn(i);
                }
            }
            $.cookie("goods", JSON.stringify(this.goods), {
                expires: 1000
            });
        }
    }
    new Car();
})(jQuery);