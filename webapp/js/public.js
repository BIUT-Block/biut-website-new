$(function () {
  //点击切换中文
  $("#i18nZh").click(function () {
    sessionStorage.setItem("lang", 'zh');
    $(this).addClass("check-color")
    $("#i18nEn").removeClass("check-color")
    loadProperties('zh');
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72.pdf")
    getNes(0)
  })

  //点击切换英文
  $("#i18nEn").click(function () {
    sessionStorage.setItem("lang", ' ');
    $(this).addClass("check-color")
    $("#i18nZh").removeClass("check-color")
    loadProperties(' ');
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72-english.pdf")
    getNes(1)
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
    $("#i18nZh").addClass("check-color")
    $("#i18nEn").removeClass("check-color")
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72.pdf")
    getNes(0)
    loadProperties('zh')
  } else {
    $("#i18nZh").removeClass("check-color")
    $("#i18nEn").addClass("check-color")
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72-english.pdf")
    getNes(1)
    loadProperties(' ')
  }

  //新闻列表页面hover
  $("#newsList").on("mouseenter", ".new-list", function () {
    $(this).children("figure").addClass("news-active")
    $(this).children("figure").children(".dynamics-active").show()
  });

  $("#newsList").on("mouseleave", ".new-list", function () {
    $(this).children("figure").removeClass("news-active")
    $(this).children("figure").children(".dynamics-active").hide()
  })

  $("#closeMask").click(function(){
    $("#newsMask").css("display","none")
  })
});

//获取新闻数据
function getNes(lang) {
  $.ajax({
    url: "http://biut.io:8080/api/v0/content/getList",
    type: "GET",
    dataType: "json",
    success: function (result) {
      $("#newsList").html("")
      let res = result.data.docs
      var html = ""
      if (res.length > 6) {
        if (lang == 0) {
          for (var l = 1; l < 6; l = l + 2) {
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay='+ .5*l +'s onclick="newsDetails(`' + res[l].id + '`)">'
              + '<figure>'
              + '<img src="http://biut.io:8080' + res[l].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<figcaption>'
              + '<section>'
              + '<p class="newstitle">' + res[l].title + '</p>'
              + '</section>'
              + '<section>'
              + '<p class="subnewstitle">' + res[l].stitle + '</p>'
              + '</section>'
              + '<time class="newstime">' + res[l].date.substring(0, 10) + '</time>'
              + '</figcaption>'
              + '</figure>'
            '</li>'
          }
        } else {
          for (var k = 0; k < 5; k = k + 2) {
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay='+ .5*k +'s onclick="newsDetails(`' + res[k].id + '`)">'
              + '<figure>'
              + '<img src="http://biut.io:8080' + res[k].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<figcaption>'
              + '<section>'
              + '<p class="newstitle">' + res[k].title + '</p>'
              + '</section>'
              + '<section>'
              + '<p class="subnewstitle">' + res[k].stitle + '</p>'
              + '</section>'
              + '<time class="newstime">' + res[k].date.substring(0, 10) + '</time>'
              + '</figcaption>'
              + '</figure>'
            '</li>'
          }
        }

      } else {
        if (lang == 0) {
          for (var i = 1; i < res.length; i = i + 2) {
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay='+ .5*i +'s onclick="newsDetails(`' + res[i].id + '`)">'
              + '<figure>'
              + '<img src="http://biut.io:8080' + res[i].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<figcaption>'
              + '<section>'
              + '<p class="newstitle">' + res[i].title + '</p>'
              + '</section>'
              + '<section>'
              + '<p class="subnewstitle">' + res[i].stitle + '</p>'
              + '</section>'
              + '<time class="newstime">' + res[i].date.substring(0, 10) + '</time>'
              + '</figcaption>'
              + '</figure>'
            '</li>'
          }
        } else {
          for (var a = 0; a < res.length; a = a + 2) {
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay='+ .5*a +'s onclick="newsDetails(`' + res[a].id + '`)">'
              + '<figure>'
              + '<img src="http://biut.io:8080' + res[a].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<figcaption>'
              + '<section>'
              + '<p class="newstitle">' + res[a].title + '</p>'
              + '</section>'
              + '<section>'
              + '<p class="subnewstitle">' + res[a].stitle + '</p>'
              + '</section>'
              + '<time class="newstime">' + res[a].date.substring(0, 10) + '</time>'
              + '</figcaption>'
              + '</figure>'
            '</li>'
          }
        }

      }
      $("#newsList").append(html);
    }
  });
}

//查看新闻详情
function newsDetails(params) {
  $("#newsMask").css("display","block")
  $.ajax({
    url: 'http://biut.io:8080/api/v0/content/getContent?id=' + params,
    type: 'GET',
    data: 'json',
    success: function (result) {
      var doc = result.data.doc;
      var docTitle = doc.title; //标题
      var docSubTitle = doc.stitle; //副标题
      var clickNum = doc.clickNum;//点击次数
      var newsTime = doc.date;//时间
      
      var commentsHTML = doc.comments;
      $("#newsTitle").html(docTitle)
      $("#reading").html(clickNum)
      $("#newsTime").html(newsTime)
      $("#newsContent").html(commentsHTML)
      console.log(commentsHTML);
    }
  });
}

new WOW().init();

//监听浏览器是否缩放
window.onresize = function temp() {
  let flg = ismobile()
  if (this.detectZoom() != 100 && !flg) {
    document.getElementById("zoomMessage").style.display = "block"
  } else {
    document.getElementById("zoomMessage").style.display = "none"
  }
}

//移动端的时候会
function ismobile() {
  var mobileArry = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
  var ua = navigator.userAgent;
  var res = mobileArry.filter(function (arr) {
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