$(function () {
  //点击切换中文
  $("#i18nZh").click(function(){
    sessionStorage.setItem("lang", 'zh');
    $(this).addClass("check-color")
    $("#i18nEn").removeClass("check-color")
    loadProperties('zh');
    $(".whitepaper").attr("href","https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72.pdf")
  })

  //点击切换英文
  $("#i18nEn").click(function(){
    sessionStorage.setItem("lang", ' ');
    $(this).addClass("check-color")
    $("#i18nZh").removeClass("check-color")
    loadProperties(' ');
    $(".whitepaper").attr("href","https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72-english.pdf")
  })

  //移动端导航栏
  $('#navbar-toggle').on('click', function (event) {
    $(this).toggleClass('open');
    $("#toggle-head").toggleClass('open-nav')
    $("#tabNav").toggleClass('tab-nav')
    $('html,body').toggleClass('over-h')
  });

  //刷新页面保持中英文切换高亮文字
  let langS = sessionStorage.getItem("lang")
  if (langS == "zh") {
    $("#i18nEn").removeClass("check-color")
    $("#i18nZh").addClass("check-color")
    $(".whitepaper").attr("href","https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72.pdf")
  } else {
    $("#i18nZh").removeClass("check-color")
    $("#i18nEn").addClass("check-color")
    $(".whitepaper").attr("href","https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72-english.pdf")
  }

  //获取新闻列表数据 0 中文 1 英文
  getNes('1')
});

//获取新闻数据
function getNes (lang) {
  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: "",
    data: {"langType": lang},
    success: function (data) {
      console.log(data)
    },
    error: function (e) {
      console.log(e)
    }
  });
}

new WOW().init();

//监听浏览器是否缩放
window.onresize = function temp() {
  let flg = ismobile ()
  if (this.detectZoom() != 100 && !flg) {
    document.getElementById("zoomMessage").style.display = "block"
  } else {
    document.getElementById("zoomMessage").style.display = "none"
  }
}

//移动端的时候会
function ismobile () {
  var mobileArry = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
  var ua = navigator.userAgent;
  var res=mobileArry.filter(function(arr) {
  return ua.indexOf(arr) > 0;
  });
  return res.length > 0;
}

// 屏幕大小缩放
function detectZoom() {
  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  }
  else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }

  return ratio;
}

//i18n 语言切换方法
var lang = sessionStorage.getItem("lang");
if (lang === null) {
  lang = "zh";
}
loadProperties(lang);
$("#lang").val(lang);
function loadProperties(types) {
  $.i18n.properties({
    name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
    path: '../dist/i18n/',   //注意这里路径是你属性文件的所在文件夹
    mode: 'map',
    language: types,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
    callback: function () {
      $("[data-locale]").each(function () {
        $(this).html($.i18n.prop($(this).data("locale")));
      });
      $("[data-placeholder]").each(function () {
        $(this).attr('placeholder', $.i18n.prop($(this).data("placeholder")));
      });
    }
  });
}