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
    //   let today = +new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
    //   return today >= el.startDate && today <= el.endDate;
    // });
  
    arBanners.sort((el1, el2) => {
      if(el1.order > el2.order) return 1;
      if(el1.order < el2.order) return -1;
    });

    // let sliderDot = document.querySelectorAll('.b-slider__dot');
    // sliderDot.addEventListener('click', () => {
      
    // });
  }
})