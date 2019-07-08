$(function(){
  $("#newsMore").click(function(){
    alert("点击了加载更多的新闻列表")
  })
})

/**
 * 轮播图
 */
var swiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  // nextButton: '.swiper-button-next',
  // prevButton: '.swiper-button-prev',
  parallax: true,
  speed: 600,
  //grabCursor : true,
  loop: true,
  autoplay: 5000,
  autoplayDisableOnInteraction: false,
});