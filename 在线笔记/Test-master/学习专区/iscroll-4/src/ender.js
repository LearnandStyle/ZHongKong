!function ($, iScroll) {
  $.ender({
    iScroll: function (options) {
      return new iScroll(this[0], options)
    }
  }, true)
}(ender, require('在线笔记/Test-master/学习专区/iscroll-4/src/iscroll').iScroll)