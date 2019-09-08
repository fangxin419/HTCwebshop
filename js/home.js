$(function () {
    $("#btnAddEmail").click(function () {
        addportalEmail($("#txtEmail").val());
    });
    $("#btnTopAddEmail").click(function () {
        addportalEmail($("#txtTopEmail").val());
    });

});


//订阅Email
function addportalEmail(email) {
    //var email = $("#txtEmail").val();
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!reg.test(email)) {
        $.HTC.Error("请输入正确的邮箱地址！", 1500);
        return;
    }
    $.get("/Handler.ashx?action=addemail&email=" + email + "&t=" + Math.random(), function (ret) {
        if (ret == 1) {
            $.HTC.Success("恭喜！订阅成功！", 2000);
        } else {
            $.HTC.Success("您已订阅！", 2000);
        }
    });
}

//收藏
function addFavorite2() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}

//登陆弹窗 true刷新页面;false 不刷新页面
function PopupLogin(obj) {
    var userID = $.cookie('User::UserID');
    if (userID == 0 || userID == null || userID == undefined) {
        $.layer({
            type: 2,
            shadeClose: true,
            title: "登陆",
            area: ['360px', '450px'],
            iframe: { src: PassportUrl + '/PopupLogin.aspx?ref=' + window.location.href, scrolling: 'no' },
            end: function () {
                if (obj) {
                    location.reload();
                } else {
                    loginStatus();
                    return true;
                }
            }
        })
        return false;
    } else {
        return true;
    }
}
