//金额格式化
function numFormat(num) {
    var c = (num.toString().indexOf('.') !== -1) ?
        num.toLocaleString() :
        num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
}
// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter) {
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}
//手机号
function checkPhone() {
    var phone = document.getElementById('phone').value;
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
        alert("手机号码有误，请重填");
        return false;
    }
}

//每n个字符插入一个符号
"The quick brown fox jumps over the lazy dogs.".replace(/(.{5})/g, "$1$")