require.config({
    baseUrl: "js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths: {
        "jq": "jquery-1.8.3.min",
        "jc": "jquery.cookie",
        "s": "shop",
        "h": "require/header"
    }
})

require(["jq", "jc", "s", "h"], function (_, _, s, h) {
    new s.shop({
        goods: h.head.goods,
        info: h.head.info,
        headDis: h.head.display
    });
});
