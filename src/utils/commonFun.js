export const commonFun ={
    // 时间戳转成日期
    getTime(data) {
        var time = new Date(data)
        var y = time.getFullYear()
        var m = time.getMonth() + 1
        var d = time.getDate()
        var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
        var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
        var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
      }
}   


