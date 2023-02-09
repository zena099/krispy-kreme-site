
/* header */
$(document).ready(function(){
    let topFixed = $(".header_bottom").offset();
    $(window).scroll(function(){
        let scrollY = $(document).scrollTop()
        let barThis = $(".header_bottom")
        let fixNext = $("#content1")

        if(scrollY > topFixed.top) {
            barThis.addClass("fix");
            fixNext.addClass("top_55");
        }else{
            barThis.removeClass("fix");
            fixNext.addClass("top_55");
        }
    });
})

/* full-page */
window.addEventListener("wheel", function(e){ //사용할 이벤트는 wheel, 휠을 굴렸을 때 스크롤이 되지 않으려면 wheel의 기본 이벤트인 scroll을 제거
    e.preventDefault();
    },{passive : false});

    // passive : 스크롤 성능 향상을 위한 옵션으로 true일 경우, 스크롤을 위해 블록되는 것을 방지한다. 이 경우 preventDefault를 사용할 수 없다

var $html = $("html");
var page = 1; //뷰포트에 표시되는 페이지 번호
var lastPage = $(".f_page").length; // 마지막 페이지의 번호
$html.animate({scrollTop:0},10); //문서(페이지)가 로드되면 첫 페이지 시작

$(window).on("wheel", function(e){ 
    //이벤트 핸들러로 마우스 휠을 굴리면 발생하는 이벤트
    //jQuery는 이벤트 메서드를 바인딩하게 되면 첫 매개변수로 무조건 이벤트 객체가 들어온다.
if($html.is(":animated")) return; //함수 중단,  
//animate 메서드로 생성된 스크롤 효과가 쌓이지 않도록 스크롤이 진행되는 동안 발생하는 wheel이벤트는 무시한다.
//return명령문은 함수 실행을 종료하고 주어진 값을 함수 호출 지점으로 반환
if(e.originalEvent.deltaY > 0){
    if(page == lastPage) return;
    page++;
}else if(e.originalEvent.deltaY < 0){ //jQuery Event 객체의 originalEvent 속성을 이용하여 원래의 dom 이벤트 객체에 접근 // wheel이벤트 발생시 브라우저가 전달해주는 이벤트 객체
    if(page == 1) return;
    page--;
}
var posTop = (page-1) * $(window).height(); //이동할 페이지의 번호에 스크롤할 위치 계산
$html.animate({scrollTop : posTop}); // 계산한 위치로 이동
});

/* banner slider */
$(function(){
    let container = $('.slide_wrap'),
        slideGroup = container.find('.slide_list'),
        slides = slideGroup.find('li'),
        nav = container.find('.slide_control'),
        slideCount = slides.length,
        currentIndex = 0,
        duration = 500,
        easing = 'easeInOutExpo',
        interval = 3500,
        timer;

        slides.each(function(i){
            let newLeft = i * 100 + '%';
            $(this).css({left:newLeft});
        });

        
        function goToSlide(index){
            slideGroup.animate({left:-100*index + '%'}, duration, easing);
            currentIndex=index;

            updateNav();
        }

        function updateNav(){
            let navPrev = nav.find('.prev');
            let navNext = nav.find('.next');

            if(currentIndex == 0){
                navPrev.addClass('disabled');
            }else{
                navPrev.removeClass('disabled');
            }

            if(currentIndex == slideCount - 1){
                navNext.addClass('disabled');
            }else{
                navNext.removeClass('disabled');
            }
        }


        nav.find('a').click(function(e){
            e.preventDefault();
            if($(this).hasClass('prev')){
                goToSlide(currentIndex - 1);
            }else{
                goToSlide(currentIndex + 1);
            }
        });

        updateNav();

        function startTimer(){
            timer = setInterval(function(){
                let nextIndex=(currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            },interval);
        }

        startTimer();

        function stopTimer(){
            clearInterval(timer);
        }

        container.mouseenter(function(){
            stopTimer();
        }).mouseleave(function(){
            startTimer();
        });
});

/* menu_slider */

// $(function(){
//     $('.menu_slider').bxSlider({
//         auto:true,
//         speed:500,
//         pause:1500,
//         mode:'horizontal',
//         pager:true,
//         minSlides: 1 
//     });
// });




$(function(){
    $('.menu_slider').slick({
        slide: 'div',
        dots:true,
        infinite: true,
        slidesToShow: 4, //요소 배치 개수
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        // speed:500,
        // fade:true,
        // cssEase:'linear',
        responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
        ]
    });
});

/* 사이트맵-아코디언 */


// $(function(){
//     function handleWindowSize(){
//         let windowWidth = window.innerWidth;
//         if (windowWidth <= 714){
//             $('.map_wrapper').accordion();
//         }
//     }

//     window.addEventListener("resize", handleWindowSize);
// });



// $(function(){
//     $(window).on('resize', function(){
//         if(window.innerWidth <= 714){
//             $('.map_wrapper').accordion();
//         }
//     });
// });

// $(window).resize(function (){
//     // width값을 가져오기
//     var width_size = window.outerWidth;
    
//     // 800 이하인지 if문으로 확인
//     if (width_size <= 800) {
//       alert('현재 브라우저 크기가 <= 800px');
//     }
//   })


//   $(window).resize(function(){
//     let width_size = window.outerWidth;

//     if(width_size <= 714){
//         $('.map_wrapper').accordion();
//     }
//   });

// $(window).on('resize', function(){
//     if(window.innerWidth <= 714){
//         $(function(){
//             $('.map_wrapper').accordion();
//         });
//     }
// });

// $(function(){
//     $('.map_list > h2').click(function(){
//         $(this).next().slideToggle();
//         $(this).next().siblings('map_list2').slideUp();
//     })
// });




// $(function(){
//     $(window).on('resize', function(){
//         if(window.innerWidth <= 714){
//             $('h2').on('click', function(){
//                 $('.map_list2').slideUp(100);
//                 $(this).next('.map_list2').slideDown(100);
//             });
//         }
//     });
// });


    // $(window).on('resize', function(){
    //     if( $(window).innerWidth <= 714){
    //         $('.map_wrapper').accordion();
    //     }
    // });

// $(function(){
//     $(window).on('resize', function(){
//         if(window.innerWidth <= 714){
//             $('.map_list').click(function(){
//                 $(this).find('.map_list2').slideToggle();
//                 $(this).next().siblings('.map_list2').slideUp();
//             })
//         }
//     });
// });


// $(function(){
//     $('.map_list > h2').click(function(){
//         $(this).next().slideToggle();
//         $(this).next().siblings('map_list2').slideUp();
//     })
// });


// $(window).on('resize', function(){
//     if(window.innerWidth <= 714){
//         $(function(){
//             $('.site_map > ul > li').click(function() {
//                 if ( $(this).hasClass('active') ) {
//                     $(this).find('ul').stop().slideUp(300);
//                     $(this).removeClass('active');
//                 }
//                 else {
//                     $(this).find('ul').stop().slideDown(300);
//                     $(this).addClass('active');
//                 }
//             });
//         });
//     }
// });

// $(window).on('resize', function(){
//     if(window.innerWidth <= 714){
//         $('.site_map .map_list').click(function(){
//             $('.site_map .map_list').slideUp();
//             if($(this).find('ul').is(':hidden')){
//                 $(this).find('ul').slideDown();
//             }else{
//                 $(this).find('ul').slideUp();
//             }
//         });
//     }
// });

// $(function(){
//     $('.site_map .map_list').click(function(){
//        if($(this).hasClass('active')){
//         $(this).find('.map_list ul').stop().slideUp(300);
//         $(this).removeClass('active');
//        } else {
//         $(this).find('.map_list ul').stop.slideDown(300);
//         $(this).addClass('active');
//        }
//     });
// });

// $(function(){
//     $('.site_map > ul > li').click(function() {
//         if ( $(this).hasClass('active') ) {
//             $(this).find('ul').stop().slideUp(300);
//             $(this).removeClass('active');
//         }
//         else {
//             $(this).find('ul').stop().slideDown(300);
//             $(this).addClass('active');
//         }
//     });
// });

// if($(window).width()>= 714){
//     $(function(){
//         $('.site_map > ul > li').click(function(){
//             if ($(this).children('ul').is(':visible')){
//                 $(this).children('ul').slideUp();
//             }else {
//                 $(this).children('ul').slideDown();
//             }  
//         });
//     });
// }
// $(window).resize(function(){
//     if($(window).width() < 714){
//         $(function(){
//     $('.site_map .map_list').click(function(){
//        if($(this).hasClass('active')){
//         $(this).find('.map_list ul').stop().slideUp(300);
//         $(this).removeClass('active');
//        } else {
//         $(this).find('.map_list ul').stop.slideDown(300);
//         $(this).addClass('active');
//        }
//     });
// });
//     }
// });

    
