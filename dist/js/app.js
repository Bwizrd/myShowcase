var toload=[];function loaded(e){toload.splice(toload.indexOf(e.target),1),0==toload.length&&(SetPage("home"),$(".footer").show(),""!==window.location.hash&&("session"==window.location.hash.substr(1,7).toLowerCase()&&(SetPage("training"),setTrainingContent(window.location.hash.substr(8))),"exercise"==window.location.hash.substr(1,8).toLowerCase()&&(SetPage("practice"),setTrainingContent(window.location.hash.substr(9)))))}function SlowReload(){window.slowreload||(window.addEventListener("beforeunload",function(e){e.returnValue="Are you sure you want to leave?"}),window.slowreload=!0)}function SetPage(e){if($(".page").hide(),$("#"+e).show(),$(".navbar-item").removeClass("navLink-active"),$("#nav"+e).addClass("navLink-active"),$("video").each(function(e,n){n.pause()}),e!=window.currentPage)switch(window.currentPage=e,window.currentPage){case"quiz":DrawGraph(window.results)}}function setTrainingContent(e){$(".training-content").hide(),$(".training-content.item-"+e).show(),$(".menu-item-active").removeClass("menu-item-active"),$(".menu-item-"+e).addClass("menu-item-active"),$(".page > .columns > .column").removeClass("menu-list-active"),$("video").each(function(e,n){n.pause()})}function ToggleSessionMenu(){$(".page > .columns > .column").toggleClass("menu-list-active")}function fitToContainer(e){e.style.width="100%",e.style.height="100%",e.width=e.offsetWidth,e.height=e.offsetHeight}!function(e){for(var n in e.images){var i=new Image;toload.push(i),i.onload=loaded,i.src=e.images[n]}}({images:["images/wdr.png","images/amex.png","images/Home.png","images/Learning.png","images/Training.png","images/Quiz.png","images/Resources.png","images/Practice.png","images/Feedback.png"]});