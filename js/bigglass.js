; (function ($) {
    // var smallObj = document.getElementById('small');
    // var moveObj = document.getElementById('move');
    // var bigObj = document.getElementById('big');
    // var girlObj = document.getElementById('look_girl');

    // console.log($('.photoshow').width() , $('.photoshow').offset().left);
    $('.photoshow').on('mousemove', function () {
        $('.photoglass').css({
            top: $('.photoshow').offset().top,
            left: $('.photoshow').width() + $('.photoshow').offset().left + 10
        });
        let moveL = event.clientX - $('.photoshow').offset().left - $('.move').width() / 2;
        let moveT = event.clientY - $('.photoshow').offset().top - $('.move').height() / 2;
        let maxL = $('.photoshow').width() - $('.move').width();
        let maxT = $('.photoshow').height() - $('.move').height();
        if (moveL < 0) moveL = 0;
        if (moveL > maxL) moveL = maxL;
        if (moveT < 0) moveT = 0;
        if (moveT > maxT) moveT = maxT;
        console.log(moveL, moveT);
        $('.move').css({
            left: moveL,
            top: moveT
        });
        $('.lookphoto').css({
            left: (moveL / maxL) * ($('.photoglass').width() - $('.lookphoto').width()),
            top: (moveT / maxT) * ($('.photoglass').height() - $('.lookphoto').height())
        });

    });

    // smallObj.onmousemove = function (eve) {
    //     var e = eve || window.event;
    //     var mouseX = e.clientX;
    //     var mouseY = e.clientY;
    //     var maxL = smallObj.offsetWidth - moveObj.offsetWidth;
    //     var maxT = smallObj.offsetHeight - moveObj.offsetHeight;
    //     var moveL = mouseX - smallObj.offsetLeft - moveObj.offsetWidth / 2;
    //     var moveT = mouseY - smallObj.offsetTop - moveObj.offsetHeight / 2;
    //     if (moveL < 0) moveL = 0;
    //     if (moveL > maxL) moveL = maxL;
    //     if (moveT < 0) moveT = 0;
    //     if (moveT > maxT) moveT = maxT;
    //     moveObj.style.left = moveL + 'px';
    //     moveObj.style.top = moveT + 'px';

    //     bigObj.style.left = smallObj.offsetLeft + smallObj.offsetWidth + 'px';

    //     var bigX = (moveL / maxL) * (bigObj.offsetWidth - girlObj.offsetWidth);
    //     var bigY = (moveT / maxT) * (bigObj.offsetHeight - girlObj.offsetHeight);
    //     girlObj.style.left = bigX + 'px';
    //     girlObj.style.top = bigY + 'px';
    //     // console.log(maxT);

    // }

    $('.photoshow').on('mouseover', function () {
        $('.move').show();
        $('.photoglass').show();
    });
    $('.photoshow').on('mouseleave', function () {
        $('.move').hide();
        $('.photoglass').hide();
    });
})(jQuery);