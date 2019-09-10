require.config({
    baseUrl: "js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths: {
        "jq": "jquery-1.8.3.min",
        "jc": "jquery.cookie",
        "d": "display",
        "h": "require/header"
    }
})

require(["jq", "jc", "d", "h"], function (_, _, _, _) {
});
