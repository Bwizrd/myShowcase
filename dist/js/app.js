var toload=[];function loaded(e){toload.splice(toload.indexOf(e.target),1),0==toload.length&&(SetPage("home"),$(".footer").show())}function SetPage(e){$(".page").hide(),$("#"+e).show(),$(".navbar-item").removeClass("navLink-active"),$("#nav"+e).addClass("navLink-active")}function fitToContainer(e){e.style.width="100%",e.style.height="100%",e.width=e.offsetWidth,e.height=e.offsetHeight}!function(e){for(var a in e.images){var t=new Image;toload.push(t),t.onload=loaded,t.src=e.images[a]}}({images:["images/wdr.png","images/amex.png","images/Quiz.svg","images/NLP Model.svg","images/Predicates.svg","images/Practice.svg","images/Feedback.svg"]}),window.addEventListener("beforeunload",function(e){e.returnValue="Are you sure you want to leave?"});