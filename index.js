const q = document.querySelector.bind(document)
const qa = document.querySelectorAll.bind(document)


// body1

var body1_swiper = new Swiper('.body1-swiper', {
    slidesPerView:3,
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
        1: {
            slidesPerView: 1.5,
            centeredSlides: true,
        },
        1080: {
            slidesPerView: 3,
        },
    }
})

qa('.b').forEach(item => {
    item.addEventListener('click', (e) => {
        // console.log(e.target.id);
        console.log(item);
        body1_click = e.target.id
        // e.target.classList.remove('b-click')
        
        body1_swiper.removeAllSlides()
        gsap.fromTo('.body1-swiper',{autoAlpha:0},{autoAlpha:1,duration:.5})
        body1_card_data[body1_click].forEach(i => {
            body1_swiper.appendSlide(`
                <div class="swiper-slide">
                    <div class="card body1-card">
                        <img src="${i.img}" alt="" class="card-img-top body1-card-img lightbox-click">
                        <div class="card-body">
                            <h1 class="card-title f4 text-center fw">${i.title}</h1>
                            <p class="card-text lep taj f8">${i.text}</p>
                        </div>
                    </div>
                </div>
                `
            )
        })
        // b_click(e.target)
        lightbox_click()
    })
});
// function b_click(){
//     e.target.classList.remove('b-click')
//     e.target.classList.add('b-click')
// }


// body2

var body2_swiper = new Swiper('.body2-swiper',{
    slidesPerView:3,
    spaceBetween: 10,
    breakpoints: {
        1: {
            slidesPerView: 1.5,
            centeredSlides: true,
        },
        1080: {
            slidesPerView: 3,
        },
    },
    navigation: {
        prevEl: '.body2-swiper-prev',
        nextEl: '.body2-swiper-next',
    }
})




$(window).on('scroll', function () {
    // progression
    // const pro1 =$(document).height() - $(window).innerHeight()
    // const proV = $(window).scrollTop() / pro1
    // $('.progression').css('width',proV*100+'%')
    // nav
    // if (scrollY > 10) {
    //     $('.navbar').addClass('fill_nav')
    // }
    // else {
    //     $('.navbar').removeClass('fill_nav')
    // }
    // hori
    const win_w = $(window).innerWidth()
    if (win_w > 992) {
        const hori1 = $("#body3").innerHeight() - $(window).innerHeight()
        const hori2 = $(window).scrollTop() - $("#body3").offset().top
        const val = hori2 / hori1
        // console.log(hori2,hori1)
        if (val > 0 && val < 1) {
            $('#body3').addClass('fx')
        }
        if (val < 0) {
            $('#body3').removeClass('fx')
            $('#body3').removeClass('b0')
        }
        if (val > 1) {
            $('#body3').removeClass('fx')
            $('#body3').addClass('b0')
        }
        if (val >= 0 && val < 0.26) {
            $('.hori_fixed').css('background', 'black')
            $('.hori_blur').css('backdrop-filter', 'blur(0px)')
        }
        if (val >= 0.26 && val < 0.49) {
            $('.hori_fixed').css('background', 'var(--color2)')
            $('.hori_blur').css('backdrop-filter', 'blur(25px)')
        }
        if (val >= 0.49 && val < 0.71) {
            $('.hori_fixed').css('background', 'var(--color1)')
            $('.hori_blur').css('backdrop-filter', 'blur(25px)')
        }
        if (val >= 0.71 && val < 0.94) {
            $('.hori_fixed').css('background', 'var(--color2)')
            $('.hori_blur').css('backdrop-filter', 'blur(25px)')
        }
        if (val >= 0.94 && val < 1) {
            $('.hori_fixed').css('background', 'var(--color1)')
            $('.hori_blur').css('backdrop-filter', 'blur(25px)')
        }
        set(val)
    }
    if (win_w < 992) {
        $('.body3_absolute').css('transform', 'translateX(0px)')
        $('#body3').removeClass('fx')
        $('#body3').removeClass('b0')
    }
})

const handler = () => {
    const height = $('#body2').offset().top - $(window).innerHeight() * 0.75
    if ($(window).scrollTop() > height) {
        $(window).unbind('scroll', handler)
        // count()
    }
}
$(window).bind('scroll', handler)
function set(v) {
    if (v > 1) {
        v = 1
    }
    if (v < 0) {
        v = 0
    }
    const hori3 = $("#body3").innerHeight() - $(window).innerWidth()
    $('.body3_absolute').css('transform', 'translateX(' + hori3 * v * -1 + 'px)')
}




// body5

var body5_swiper = new Swiper('.body5-swiper', {
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 10,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.body5-pagination',
        clickable: true,
    },
    navigation: {
        prevEl: '.body5-prev',
        nextEl: '.body5-next',
    }
})


var mess_data = []
function mess_submit(e) {
    if (q('.body5-right input').value != '') {
        alert('留言已送出，已為您送到後端')
        e.preventDefault()
        mess_data.push({
            name: q('.mess-name').value,
            email: q('.mess-email').value,
            text: q('.mess-text').value,
        })
        localStorage.setItem('mess-data', JSON.stringify(mess_data))
        body5_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="forum">
                <div>
                    <h1 class="f6 fw lep color1 forum-name">${q('.mess-name').value}</h1>
                    <p class="f7 text-end">${q('.mess-email').value}</p>
                </div>
                <div class="forum-content p-3">
                    <p class="f7 m-0">
                        ${q('.mess-text').value}
                    </p>
                </div>
            </div>
        </div>
        `)
        q('.mess-name').value = ''
        q('.mess-email').value = ''
        q('.mess-text').value = ''
        body5_swiper.slideTo(body5_swiper.slides.length - 1, 0)
        body5_swiper.autoplay.start()
    }
}
window.addEventListener('load', () => {
    var local_data = JSON.parse(localStorage.getItem('mess-data')) || []
    local_data.forEach(item => {
        body5_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="forum">
                <div>
                    <h1 class="f6 fw lep color1 forum-name">${item.name}</h1>
                    <p class="f7 text-end">${item.email}</p>
                </div>
                <div class="forum-content p-3">
                    <p class="f7 m-0">
                        ${item.text}
                    </p>
                </div>
            </div>
        </div>
        `)
    })
    mess_data = mess_data.concat(local_data)
})


// lightbox
function lightbox_click(){
    qa('.lightbox-click').forEach(item => {
        item.addEventListener('click', (e) => {
            console.log(1);
            q('.lightbox-img').src = e.target.src
            gsap.fromTo('.lightbox', { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 })
            q('.lightbox').style.display = 'flex'
            document.body.style.overflowY = 'hidden'
        })
    })
}
lightbox_click()
q('.lightbox-x').addEventListener('click', () => {
    gsap.to('.lightbox', {
        autoAlpha: 0,
        duration: .3,
        onComplete: () => {
            q('.lightbox').style.display = 'none'
        }
    })
    document.body.style.overflowY = 'auto'
})
q('.lightbox').addEventListener('click', () => {
    gsap.to('.lightbox', {
        autoAlpha: 0,
        duration: .3,
        onComplete: () => {
            q('.lightbox').style.display = 'none'
        }
    })
    document.body.style.overflowY = 'auto'
})
