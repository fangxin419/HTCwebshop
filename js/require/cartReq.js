require.config({
    baseUrl: "js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths: {
        "jq": "jquery-1.8.3.min",
        "jc": "jquery.cookie",
        "c": "cart",
        "h": "require/header"
    }
})

require(["jq", "jc", "c", "h"], function (_, _, c, h) {
    new c.car({
        goods: h.head.goods,
        info: h.head.info,
        headDis: h.head.display
    });
});
