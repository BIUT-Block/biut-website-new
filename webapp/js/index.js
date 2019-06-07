$(function () {
  //微信图片hover效果
  $('#biutWx').mouseover(function () {
    
  })
  $('#biutWx').mouseout(function () {
   
  })

  $('#biutWx').hover(function(){
    $('#biutWxActiveImg').slideDown();
    $('#biutWxImg').attr('src', '../images/index/weixins.png')
  },function(){
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
  
  //新闻页面hover效果
  $('#newsActive1').mouseover(function () {
    $(this).addClass("news-active")
    $("#dynamics-active1").show()
  })
  $('#newsActive1').mouseout(function () {
    $(this).removeClass("news-active")
    $("#dynamics-active1").hide()
  })

  $('#newsActive2').mouseover(function () {
    $(this).addClass("news-active")
    $("#dynamics-active2").show()
  })
  $('#newsActive2').mouseout(function () {
    $(this).removeClass("news-active")
    $("#dynamics-active2").hide()
  })

  $('#newsActive3').mouseover(function () {
    $(this).addClass("news-active")
    $("#dynamics-active3").show()
  })
  $('#newsActive3').mouseout(function () {
    $(this).removeClass("news-active")
    $("#dynamics-active3").hide()
  })

  $("#indexTime").html(systemTime())

  //价格数据
  $("#btcPrice").html("0.00006970")
  $(".btnRiseFall").html("+ " + "5.7" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".btnRiseFalls").html("5.7" + '%')

  $("#ethPrice").html("0.00006970")
  $(".ethRiseFall").html("+ " + "5.7" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".ethRiseFalls").html("5.7" + '%')

  $("#usdtPrice").html("0.00006970")
  $(".useTRiseFall").html("+ " + "5.7" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".useTRiseFalls").html("5.7" + '%')
  
  //网络节点数据
  $("#idxNetwork").html("0")
  $("#idxAccount").html("0")
  $("#idxCurrent").html("0")
  $("#idPeak").html("0")
  $("#idxHeight1").html("0")
  $("#idxHeight2").html("0")
  $("#idxAffairs1").html("0")
  $("#idxAffairs2").html("0")

  var webSocketClient = new WebSocket("wss://api.fcoin.com/v2/ws")
  webSocketClient.onopen = function () {
    webSocketClient.send(JSON.stringify({"cmd":"sub","args":["ticker.secbtc", "ticker.seceth", "ticker.sec"],"id":"sec_official"}))
  }

  webSocketClient.onmessage = function (evt) {
    var data = JSON.parse(evt.data)
    switch(data.type) {
      case 'ticker.seceth':
        $("#ethPrice").html(data.ticker[0])
        $("#usdtPrice").html(data.ticker[3] / 1000)
        break;
      default:
        break;
    }
  }

  var ping = setTimeout(function () {
    webSocketClient.send(JSON.stringify({"cmd": "ping", "args": [new Date().getTime()], "id": "sec_official"}))
    ping = setTimeout(function () {
      webSocketClient.send(JSON.stringify({"cmd": "ping", "args": [new Date().getTime()], "id": "sec_official"}))
    }, 3500)
  }, 35000)

});

//获取系统时间
function systemTime () {
  var now = new Date()
	let year = now.getFullYear()
	let mounth = now.getMonth() + 1
	let date = now.getDate()
	let day =	now.getDay()
	let hours =	now.getHours()
	let minutes =	now.getMinutes()
  let seconds =	now.getSeconds()
  var x = year + "/" +getNow(mounth) + "/" +getNow(date) + " " + getNow(hours) + ":" +getNow(minutes) + ":" +getNow(seconds)
  return x
}

function getNow(s) {
  return s < 10 ? '0' + s: s;
}

function onOpen (ws) {
  
}

function heartPackage (ws) {

} 