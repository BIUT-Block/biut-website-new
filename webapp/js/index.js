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
  $("#idPeak").html("33118")
  $("#idxHeight1").html("0")
  $("#idxHeight2").html("0")
  $("#idxAffairs1").html("0")
  $("#idxAffairs2").html("0")

  let currentTsp = rd(10, 30);
  $("#idxCurrent").html(currentTsp);


  //新闻列表
  $.ajax({
    url: "http://biut.io:8080/api/v0/content/getList",
    type: "GET",
    dataType: "json",
    success: function (result) {
      console.log("1")
      console.log(result)
      //var img = "http://localhost:8080" + result.data.docs[0].sImg
      var img = "http://biut.io:8080" + result.data.docs[0].sImg
      $("#newsActive1 > *:nth(0)").attr("src", img);
    }
  });


  $.ajax({
    url: 'https://api.coinegg.im/api/v1/kline/region/eth?coin=sec',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      console.log("2")
      console.log(result);
      let rate = (Number(result[0][1]) - Number(result[result.length-1][1])) / Number(result[0][1]);
      $(".ethRiseFall").html((rate*100).toFixed(2));
    },
    error: function (err) {
      console.log("3")
      console.log(err)
    }
  });

  $.ajax({
    url: 'http://scan.biut.io/nodeinfoapi',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      $('#idxNetwork').html(result.length)
    }
  });

  $.ajax({
    url: 'http://scan.biut.io/alltx',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var totalUsers = []
      $('#idxAffairs1').html(result.sectx.length);
      $("#idxAffairs2").html(result.sentx.length);
      
      for (var i = 0; i < result.sectx.length; i++) {
        if (totalUsers.indexOf(result.sectx[i].TxFrom) === -1) {
          totalUsers.push(result.sectx[i].TxFrom);
        }
        if (totalUsers.indexOf(result.sectx[i].TxTo) === -1) {
          totalUsers.push(result.sectx[i].TxTo);
        }
      }
      for (var j = 0; j < result.sentx.length; j++) {
        if (totalUsers.indexOf(result.sentx[j].TxFrom) === -1) {
          totalUsers.push(result.sentx[i].TxFrom);
        }
        if (totalUsers.indexOf(result.sentx[j].TxTo) === -1) {
          totalUsers.push(result.sentx[i].TxTo);
        }
      }
      $('#idxAccount').html(totalUsers.length)
    }
  })

  $.ajax({
    url: 'http://scan.biut.io/blockchain',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      $("#idxHeight1").html(result.secblockchain.length - 1)
      $("#idxHeight2").html(result.senblockchain.length - 1)
    }
  })

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

function rd(n,m){
  var c = m-n+1;  
  return Math.floor(Math.random() * c + n);
}

function heartPackage (ws) {

}