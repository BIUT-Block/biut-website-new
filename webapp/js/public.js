$(function () {
  //新闻列表页面hover
  $("#newsList").on("mouseenter", ".new-list", function () {
    $(this).children("figure").addClass("news-active")
    $(this).children("figure").children(".dynamics-active").show()
  });

  $("#newsList").on("mouseleave", ".new-list", function () {
    $(this).children("figure").removeClass("news-active")
    $(this).children("figure").children(".dynamics-active").hide()
  })

  $("#closeMask").click(function () {
    $("#newsMask").css("display", "none")
    $("body").removeClass('ov-h')
  })

  //微信图片点击效果
  $("#biutWx").click(function () {
    $('#biutWxActiveImg').slideDown();
  }), $("#biutWxActiveImg").click(function (e) {
    e.stopPropagation(),
      $('#biutWxActiveImg').slideUp();
  })

  //微信图片hover效果
  $('#biutWx').hover(function () {
    $('#biutWxActiveImg').slideDown();
    $('#biutWxImg').attr('src', '../images/index/weixins.png')
  }, function () {
    $('#biutWxActiveImg').slideUp();
    $('#biutWxImg').attr('src', '../images/index/weixin.png')
  })

  //微博图片hover效果
  $('#biutWb').mouseover(function () {
    $('#biutWbImg').attr('src', '../images/index/weibos.png')
  })
  $('#biutWb').mouseout(function () {
    $('#biutWbImg').attr('src', '../images/index/weibo.png')
  })

  //推特图片hover效果
  $('#biutTw').mouseover(function () {
    $('#biutTwImg').attr('src', '../images/index/twiters.png')
  })
  $('#biutTw').mouseout(function () {
    $('#biutTwImg').attr('src', '../images/index/twiter.png')
  })

  //plan图片hover效果
  $('#biutPl').mouseover(function () {
    $('#biutPlImg').attr('src', '../images/index/planes.png')
  })
  $('#biutPl').mouseout(function () {
    $('#biutPlImg').attr('src', '../images/index/plane.png')
  })

  //facebooks图片hover效果
  $('#biutFb').mouseover(function () {
    $('#biutFbImg').attr('src', '../images/index/facebooks.png')
  })
  $('#biutFb').mouseout(function () {
    $('#biutFbImg').attr('src', '../images/index/facebook.png')
  })

  //monkey图片hover效果
  $('#biutMk').mouseover(function () {
    $('#biutMkImg').attr('src', '../images/index/monkeys.png')
  })
  $('#biutMk').mouseout(function () {
    $('#biutMkImg').attr('src', '../images/index/monkey.png')
  })

  //懒加载
  $("img").lazyload({
    threshold: 200,
    effect: "fadeIn",
    failure_limit: 20,
    skip_invisible: false
  });

  //时间列表
  $("#timeLists li").click(function () {
    $(this).siblings().removeClass("time-check").find("img").attr("src", "../images/about/aboutRs.png")
    $("#timeLists").children(":first").find("img").attr("src", "../images/about/aboutR.png")
    $(this).addClass("time-check").find("img").attr("src", "../images/about/aboutC.png")
    let idx = $(this).index()
    let lang = 1
    if (sessionStorage.getItem("lang") == "zh") {
      lang = 0
    }
    getDateilsTime(idx, lang)
  })

  let sts = sessionStorage.getItem("status");
  if (sts == 1) {
    $(".headerImg").css("display", "block")
    $(".login").css("display", "none")
  }
  //点击切换中文
  $("#i18nZh").click(function () {
    sessionStorage.setItem("lang", 'zh');
    $(this).addClass("check-color")
    $("#i18nEn").removeClass("check-color")
    loadProperties('zh');
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72.pdf")
    getNes(0)
    getMember(0)
    getTimeList(0)
    getDateilsTime(0, 0)
  })

  //点击切换英文
  $("#i18nEn").click(function () {
    sessionStorage.setItem("lang", ' ');
    $(this).addClass("check-color")
    $("#i18nZh").removeClass("check-color")
    loadProperties(' ');
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72-english.pdf")
    getNes(1)
    getMember(1)
    getTimeList(1)
    getDateilsTime(0, 1)
  })

  //移动端导航栏
  $('#navbar-toggle').on('click', function (event) {
    $(this).toggleClass('open');
    $("#toggle-head").toggleClass('open-nav')
    $("#tabNav").toggleClass('tab-nav')
  });

  //刷新页面保持中英文切换高亮文字
  let langS = sessionStorage.getItem("lang")
  if (langS == "zh") {
    $("#i18nZh").addClass("check-color")
    $("#i18nEn").removeClass("check-color")
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72.pdf")
    getNes(0)
    getMember(0)
    getTimeList(0)
    getDateilsTime(0, 0)
    loadProperties('zh')
  } else {
    $("#i18nZh").removeClass("check-color")
    $("#i18nEn").addClass("check-color")
    $(".whitepaper").attr("href", "https://www.secblock.io/themes/dorawhite/doc/biut-whitepaper-v3.72-english.pdf")
    getNes(1)
    getMember(1)
    getTimeList(1)
    getDateilsTime(0, 1)
    loadProperties(' ')
  }

  //点击上一页
  $("#prevNews").click(function () {
    alert("点击了上一页")
  })

  //点击下一页
  $("#nextNews").click(function () {
    alert("点击了下一页")
  })

  //加载更多
  $("#newsMore").click(function(){
    alert("点击了加载更多的新闻列表")
  })
});

$(window).scroll(function (event) {
  var winTop = document.documentElement.scrollTop || document.body.scrollTop
  var visualH = document.documentElement.clientHeight
  var visualW = document.documentElement.clientWidth
  let flg = ismobile()
  if (flg) {
    if (winTop > 40) {  //距离顶部大于40px时
      $('#header-nav').addClass('public-head-bg');
    } else {
      $('#header-nav').removeClass('public-head-bg');
    }
  } else {
    if (winTop > 80) {
      $("#header-nav").addClass('nav-bg')
    } else {
      $("#header-nav").removeClass('nav-bg')
    }
  }
});

//获取新闻数据
function getNes(lang) {
  $.ajax({
    url: "https://biut.io:18080/api/v0/content/getList",
    type: "GET",
    dataType: "json",
    success: function (result) {
      $("#newsList").html("")
      let res = result.data.docs
      var html = "";
      if (res.length > 6) {
        if (lang == 0) {
          for (var l = 1; l < 6; l = l + 2) {
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay=' + .5 * l + 's onclick="newsDetails(`' + res[l].id + '`)">'
              + '<figure>'
              + '<img src="https://biut.io:18080' + res[l].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<span class="tipsTxt">' + res[l].tags[1].name + '</span>'
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
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay=' + .5 * k + 's onclick="newsDetails(`' + res[k].id + '`)">'
              + '<figure>'
              + '<img src="https://biut.io:18080' + res[k].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<span class="tipsTxt">' + res[k].tags[1].name + '</span>'
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
        // 弹窗新闻
        if (lang == 0) {
          for (var i = 1; i < res.length; i = i + 2) {
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay=' + .5 * i + 's onclick="newsDetails(`' + res[i].id + '`)">'
              + '<figure>'
              + '<img src="https://biut.io:18080' + res[i].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<span class="tipsTxt">' + res[i].tags[1].name + '</span>'
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
            html += '<li class="col-md-4 col-sm-12 col-xs-12 new-list wow cntanimate2" data-wow-delay=' + .5 * a + 's onclick="newsDetails(`' + res[a].id + '`)">'
              + '<figure>'
              + '<img src="https://biut.io:18080' + res[a].sImg + '" alt=""/>'
              + '<img src="../images/index/dynamicsActive.png" class="dynamics-active" alt="" hidden/>'
              + '<span class="tipsTxt">' + res[a].tags[1].name + '</span>'
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

      // 新闻列表
      $("#footNewsList").html("")
      var htmls = ""
      if (lang == 0) {
        for (var tim = 1; tim < res.length; tim = tim + 2) {
          htmls += '<li onclick="newsDetails(`' + res[tim].id + '`)">'
            + "<section class='foot-news-tit'>"
            + '<h4>' + res[tim].title + '</h4>'
            + '<time>' + res[tim].date + '</time>'
            + '</section>'
            + "<p class='foot-news-txt'>" + res[tim].stitle + '</p>'
            + '</li>'
        }
      } else {
        for (var tims = 0; tims < res.length; tims = tims + 2) {
          htmls += '<li onclick="newsDetails(`' + res[tims].id + '`)">'
            + "<section class='foot-news-tit'>"
            + '<h4>' + res[tims].title + '</h4>'
            + '<time>' + res[tims].date + '</time>'
            + '</section>'
            + "<p class='foot-news-txt'>" + res[tims].stitle + '</p>'
            + '</li>'
        }
      }
      $("#footNewsList").append(htmls);

    }
  });
}


//查看新闻详情
function newsDetails(params, id1, id2) {
  $("#newsMask").css("display", "block")
  $("body").addClass('ov-h')
  $.ajax({
    url: 'https://biut.io:18080/api/v0/content/getContent?id=' + params,
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
      $("#newsMaskContent img").each(function () {
        let imgUrl = $(this).attr("src")
        $(this).attr("src", `http://biut.io:8080` + imgUrl)
      })
    }
  });
}

//获取成员列表
function getMember(lang) {
  $.get("../data/member.json", function (data) {
    $("#memberList").html("")
    let item = data.list
    var html = ""
    if (lang == 0) {
      for (var i = 1; i < item.length; i = i + 2) {
        html += '<li class="col-md-3 col-sm-4 col-xs-6 wow bounceInUp"  data-wow-delay=' + .05 * i + 's>'
          + '<figure>'
          + '<img src="' + item[i].img + '" alt="">'
          + '<figcaption>'
          + '<h4>' + item[i].tit + '</h4>'
          + '<p>' + item[i].txt + '</p>'
          + '</figcaption>'
          + '</figure>'
          + '</li>';
      }
    } else {
      for (var k = 0; k < item.length; k = k + 2) {
        html += '<li class="col-md-3 col-sm-4 col-xs-6 wow bounceInUp"  data-wow-delay=' + .05 * k + 's>'
          + '<figure>'
          + '<img src="' + item[k].img + '" alt="">'
          + '<figcaption>'
          + '<h4>' + item[k].tit + '</h4>'
          + '<p>' + item[k].txt + '</p>'
          + '</figcaption>'
          + '</figure>'
          + '</li>'
      }
    }
    $("#memberList").append(html);
  })
}

//获取时间列表
function getTimeList(lang) {
  $.get("../data/timeList.json", function (data) {
    $("#timeList").html("")
    let item = data.dateList
    var html = ""
    if (lang == 0) {
      for (var i = 1; i < item.length; i = i + 2) {
        html += '<li>'
          + '<section>'
          + '<p class="foot-history-time">' + item[i].time + '</p>'
          + '<p class="foot-history-txt">' + item[i].txt + '</p>'
          + '</section>'
          + '</li>'
      }
    } else {
      for (var k = 0; k < item.length; k = k + 2) {
        html += '<li>'
          + '<section>'
          + '<p class="foot-history-time">' + item[k].time + '</p>'
          + '<p class="foot-history-txt">' + item[k].txt + '</p>'
          + '</section>'
          + '</li>'
      }
    }
    $("#timeList").append(html);
  })
}

//获取详情的时间列表 idx 0 2017 1 2018 2 2019
function getDateilsTime(idx, lang) {
  $.get("../data/timdDetails.json", function (data) {
    let item = data.time2017
    if (idx == 1) {
      item = data.time2018
      detailsList(item, lang)
      return
    } else if (idx == 2) {
      item = data.time2019
      detailsList(item, lang)
    } else {
      item = data.time2017
      detailsList(item, lang)
    }
  })
}

function detailsList(item, lang) {
  $("#timeDetails").html("")
  var html = ""
  if (lang == 0) {
    for (var i = 1; i < item.length; i = i + 2) {
      html += '<li>'
        + '<span>' + item[i].time + '</span>'
        + '<span>' + item[i].txt + '</span>'
        + '</li>'
    }
  } else {
    for (var k = 0; k < item.length; k = k + 2) {
      html += '<li>'
        + '<span>' + item[k].time + '</span>'
        + '<span>' + item[k].txt + '</span>'
        + '</li>'
    }
  }
  $("#timeDetails").append(html);
}

var ModalHelper = (function (bodyCls) {
  var scrollTop;
  return {
    afterOpen: function () {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls);
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');


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