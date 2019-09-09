; (function ($) {
    // msg = {
    //     name: '姓名',
    //     pass: '密码',
    //     s: '登录状态'
    // }
    let server = {
        init: function () {
            server.status = document.location.href.split('?')[1];
            server.status = server.status || 0;
            server.info = $.cookie("info") ? $.cookie("info") : [];
            server.error = '';
            server.off = false;
            server.state();
            server.load();
        },
        state: function () {
            if (server.status == 0) {
                server.logState();
            }
            if (server.status == 1) {
                server.regState();
            }
        },
        showError: function () {
            $('.info').html(server.error);
            $('.m-err-msg').removeClass('hide');
        },
        hideError: function () {
            $('.m-err-msg').addClass('hide');
        },
        logState: function () {
            server.hideError();
            $('.p-passport-r').hide();
            $('.p-passport-l').show();
            $('.nav-reg').removeClass('active');
            $('.nav-log').addClass('active');
            $('.p-title').html('会员登录');
            $('.p-other-i').html('您还不是海淘橙会员？');
            $('.go-reglog').html('立即注册');
        },
        regState: function () {
            server.hideError();
            $('.p-passport-l').hide();
            $('.p-passport-r').show();
            $('.nav-log').removeClass('active');
            $('.nav-reg').addClass('active');
            $('.p-title').html('会员注册');
            $('.p-other-i').html('您已经是海淘橙会员？');
            $('.go-reglog').html('立即登录');
        },
        load: function () {
            $('.nav-log').on('click', server.logState);
            $('.nav-reg').on('click', server.regState);
            $('.go-reglog').on('click', function () {
                server.status = (server.status + 1) % 2;
                server.state();
            });
            $('.name-l').blur(function () {
                // if($(this).val()){

                // }
            });
            $('.pass-l').blur(function () {

            });
            $('.name-r').blur(function () {
                server.off = true;
                for (let i = 0; i < server.info.length; i++) {
                    if ($(this).val() == server.info[i].name) {
                        server.error = '该用户名已存在!';
                        server.showError();
                        server.off = false;
                        break;
                    }
                }
            });
            $('.pass1-r').blur(function () {
                server.off = true;
                if ($(this).val().length < 8 || $(this).val().length > 20) {
                    server.error = '密码不符合,密码长度为8-20位!';
                    server.showError();
                    server.off = false;
                }
            });
            $('.pass2-r').blur(function () {
                server.off = true;
                if ($('.pass1-r').val() != '' && $(this).val() != $('.pass1-r').val()) {
                    server.error = '两次密码不一致,请重新设置!';
                    server.showError();
                    server.off = false;
                }
            });
            $('.log-btn').on('click', function () {
                let name = $('.name-l').val();
                let pass = $('.pass-l').val();
                for (let i = 0; i < server.info.length; i++) {
                    if (name == server.info[i] && pass == server.info[i]) {
                        server.info[i].s == 1;
                        window.location = "http://localhost/haitaocheng/index.html";
                        break;
                    }
                }
                server.error = '请输入正确的用户名或密码!';
                server.showError();
            });
            $('.reg-btn').on('click', function () {
                server.hideError();
                let name = $('.name-r').val();
                let pass = $('.pass1-r').val();
                for (let i = 0; i < server.info.length; i++) {
                    if ($(this).val() == server.info[i].name) {
                        server.error = '该用户名已存在!';
                        server.showError();
                        server.off = false;
                        break;
                    }
                }
                if (server.off) {
                    server.info.push({
                        name: name,
                        pass, pass,
                        s: 0
                    });
                    $.cookie("info", JSON.stringify(server.info), {
                        expires: 365
                    });
                    server.status = 0;
                    server.state();
                }
            });
        }
    };
    server.init();
})(jQuery);