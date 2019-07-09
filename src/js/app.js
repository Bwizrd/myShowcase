//APP.JS...
var toload=[];

function loaded(d){
    toload.splice(toload.indexOf(d.target),1);
    if(toload.length==0){
        SetPage('home');
        $('.footer').show();
        //setInterval(function(){
          if(window.location.hash!==''){
            if(window.location.hash.substr(1,7).toLowerCase()=='session'){
              SetPage('training');
              setTrainingContent(window.location.hash.substr(8))
            }
            if(window.location.hash.substr(1,8).toLowerCase()=='exercise'){
              SetPage('practice');
              setTrainingContent(window.location.hash.substr(9))
            }
          }
        //}, 300);
    }
}

(function preload(data){
    for(var i in data.images){
        var img=new Image();
        toload.push(img);
        img.onload=loaded;
        img.src=data.images[i];
    }
})(
    {
        "images":[
            'images/wdr.png',
            'images/amex.png',
            /*'images/Quiz.svg',
            'images/NLP Model.svg',
            'images/Predicates.svg',
            'images/Practice.svg',
            'images/Feedback.svg',*/
            'images/Home.png',
            'images/Learning.png',
            'images/Training.png',
            'images/Quiz.png',
            'images/Resources.png',
            'images/Practice.png',
            'images/Feedback.png',
        ]
    }
);
function SlowReload(){
  if(window.slowreload)return;
  window.addEventListener('beforeunload', function(event){
    event.returnValue = 'Are you sure you want to leave?';
  });
  window.slowreload=true;
}
function SetPage(page){
    $('.page').hide();
    $('#'+page).css("display", "flex");
    $('.navbar-item').removeClass('navLink-active');
    $('#nav'+page).addClass('navLink-active');
    $('video').each(function(id,dom) {
      dom.pause();
    });
    if(page!=window.currentPage){
      /*switch (page) {
        case 'training':
            if(window.currentPage!='training' && window.currentPage!='practice')
              window.location.hash='Session1';
            else
              window.location.hash='Session'+window.currentSession;
            break;
        case 'practice':
            if(window.currentPage!='training' && window.currentPage!='practice')
              window.location.hash='Exercise1';
            else
              window.location.hash='Exercise'+window.currentSession;
            break;
          break;
        default:
          window.location.hash='';
      }*/
      window.currentPage=page;
      switch(window.currentPage){
        case 'quiz':
          DrawGraph(window.results);
      }
    }
}



function setTrainingContent(session) {
  //     window.carousels[0].show(session);
  //    /*var jq = $(".carousel");
  //    if (jq[0] && jq[0].bulmaCarousel){
  //     jq[0].bulmaCarousel.show(session)
  //    }*/
  $(".training-content").hide();
  $(".training-content.item-" + session).show();
  $(".menu-item-active").removeClass("menu-item-active");
  $(".menu-item-" + session).addClass("menu-item-active");
  $(".page > .columns > .column").removeClass('menu-list-active');
  $('video').each(function (id, dom) {
    dom.pause();
  });
  /*window.currentSession=session;
  switch (window.currentPage) {
    case 'training':
      window.location.hash = 'Session' + session
      break;
    case 'practice':
      window.location.hash = 'Exercise' + session
      break;
  }*/
}
function ToggleSessionMenu() {
  $(".page > .columns > .column").toggleClass('menu-list-active');
}




function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

/*
$('.navLink').click(function(event){
    $('.navLink').removeClass('navLink-active');
    $(event.target).closest('.navLink').addClass('navLink-active');
})*/
