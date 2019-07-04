document.addEventListener('DOMContentLoaded', () => {
  let xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'https://frontend.camp.dev.unit6.ru/get-slides', false);
  xhr.send();
  
  if(xhr.status != 200){
    alert(xhr.status + ': ' + xhr.statusText);
  }else{
    let arBanners = JSON.parse(xhr.responseText);
  
    arBanners = arBanners.filter(el => {
      return el.active;
    });
    
    // arBanners = arBanners.filter(el => {
    //   let date = new Date();
    //   let todayStart = +new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //   let todayEnd = +new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  
    //   return todayStart >= el.startDate && todayEnd <= el.endDate;
    // });
  
    arBanners.sort((el1, el2) => {
      if(el1.order > el2.order) return 1;
      if(el1.order < el2.order) return -1;
    });

    let banerBlock = document.querySelector('.b-slide');

    if(arBanners.length){
      banerBlock.querySelector('.b-slide__image').style.backgroundImage = 'url(' + arBanners[0].image.substring(1, arBanners[0].image.length) + ')';
      banerBlock.querySelector('.b-slide__title').textContent = arBanners[0].title;
      banerBlock.querySelector('.b-slide__text').textContent = arBanners[0].text;
    }

    let sliderDot = document.querySelector('.b-slider__dot:not(.b-slider__dot--selected)');
    
    for(let i = 0; i < arBanners.length - 2; ++i){
      let sliderDotClone = sliderDot.cloneNode(true);

      document.querySelector('.b-slider__dots').appendChild(sliderDotClone);
    }

    let sliderDots = document.querySelectorAll('.b-slider__dot');

    for(let i = 0; i < sliderDots.length; ++i){
      sliderDots[i].addEventListener('click', (e) => {
        let target = e.target;
        let banner = arBanners[i];
        
        if(!target.classList.contains('b-slider__dot--selected')){
          for(let j = 0; j < sliderDots.length; ++j){
            sliderDots[j].classList.remove('b-slider__dot--selected');
          }

          target.classList.add('b-slider__dot--selected');
          banerBlock.querySelector('.b-slide__image').style.backgroundImage = 'url(' + banner.image.substring(1, banner.image.length) + ')';
          banerBlock.querySelector('.b-slide__title').textContent = banner.title;
          banerBlock.querySelector('.b-slide__text').textContent = banner.text;
        }
      });
    }
  }
})