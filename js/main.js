/**
 * Created by Abby on 2017/6/15.
 */
$(function (e) {
  //浏览器版本是否低于IE9
  var lessThenIE9 = function () {
    var UA = navigator.userAgent,
      isIE = UA.indexOf('MSIE') > -1,
      v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
    return v < 9;
  }();
  if(lessThenIE9){
    $('body').html('<div class="IESupport">您的浏览器版本过低，为了获得最佳体验，建议您升级或选用其他浏览器！ </div>');
  }
  //回到顶部
  //下拉时显示回到顶部按钮
  $(window).scroll(function(){
    if ($(window).scrollTop()>100){
      $(".SuspensionBox").fadeIn(1500);
    } else {
      $(".SuspensionBox").fadeOut(1500);
    }
    if($(window).scrollTop()>320){
      $('.header').css('position','fixed');
    }else{
      $('.header').css('position','relative');
    }
  });
  //当点击跳转链接后，回到页面顶部位置
  $(".backTop").click(function(e){
    var html=$('html'),
        body=$('body');
    if (html.scrollTop()) {
      html.animate({ scrollTop: 0 }, 500);
      return false;
    }
    body.animate({ scrollTop: 0 }, 500);
    return false;
  });
  $(".qrcBox").hover(function(e){
    $(this).find('.qrc').fadeToggle(400);
  });
  //banner
  var banner = new Swiper ('.banner-container', {
    loop: true,
    autoplay : 3000,
    speed: 600,
    pagination : '.pagination',
    paginationClickable :true
  });
  $('.banner .arrowLeft').on('click', function(e){
    e.preventDefault();
    banner.swipePrev()
  });
  $('.banner .arrowRight').on('click', function(e){
    e.preventDefault();
    banner.swipeNext()
  });
  var product = new Swiper('.product-container',{
    loop: true,
    speed: 600
  });
  $('.product .arrowLeft').on('click', function(e){
    e.preventDefault();
    product.swipePrev()
  });
  $('.product .arrowRight').on('click', function(e){
    e.preventDefault();
    product.swipeNext();
  });
  //solution
  var solution = new Swiper ('.solution-container', {
    speed: 600,
    paginationClickable :true,
    resizeReInit : true,
    slidesPerView: 4
  });
  $('.solution .arrowLeft').on('click', function(e){
    e.preventDefault();
    solution.swipePrev()
  });
  $('.solution .arrowRight').on('click', function(e){
    e.preventDefault();
    solution.swipeNext()
  });
  $('.solution .swiper-wrapper').height(parseInt($('.solution  .swiper-slide .cont').height())+2);
  $('.solution .swiper-slide').height(parseInt($('.solution  .swiper-slide .cont').height())+2);

  //solution
  var solutionTwo = new Swiper ('.solutionTwo-container', {
    speed: 600,
    paginationClickable :true,
    resizeReInit : true,
    loop: true,
    slidesPerView: 5
  });
  $('.solutionTwo .arrowLeft').on('click', function(e){
    e.preventDefault();
    solutionTwo.swipePrev()
  });
  $('.solutionTwo .arrowRight').on('click', function(e){
    e.preventDefault();
    solutionTwo.swipeNext()
  });
  $('.solutionTwo .swiper-wrapper').height(parseInt($('.solutionTwo  .swiper-slide a').height())+2);
  $('.solutionTwo .swiper-slide').height(parseInt($('.solutionTwo  .swiper-slide a').height())+2);



});
