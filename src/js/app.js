//APP.JS...
var toload=[];

function loaded(d){
    toload.splice(toload.indexOf(d.target),1);
    if(toload.length==0){
        SetPage('home');
        $('.footer').show();
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
            'images/Quiz.svg',
            'images/NLP Model.svg',
            'images/Predicates.svg',
            'images/Practice.svg',
            'images/Feedback.svg',
        ]
    }
);
window.addEventListener('beforeunload', function(event){
  event.returnValue = 'Are you sure you want to leave?';
});
function SetPage(page){
    $('.page').hide();
    $('#'+page).show();
    $('.navbar-item').removeClass('navLink-active');
    $('#nav'+page).addClass('navLink-active');
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
