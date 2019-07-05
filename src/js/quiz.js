var bgColorCanvas = '#fff',
  dColorFill = '#333',
  aColorFill = '#338',
  vColorFill = '#383',
  kColorFill = '#833'
dTextColorFill = '#888',//digital text colour
  aTextColorFill = '#33d',//auditry text colour
  vTextColorFill = '#3d3',
  kTextColorFill = '#d33'
  ;
var blurb = '<p></p>';


var currentQuestion = 1;

function DrawGraph(r) {
  var ctx = document.getElementById('canvasResults');
  if (!ctx) return;
  ctx = ctx.getContext('2d');
  if (!ctx) return;
  fitToContainer(ctx.canvas);
  ctx.fillStyle = bgColorCanvas;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var m = Math.min(ctx.canvas.width, ctx.canvas.height) - 2,
    m2 = m / 2,
    m4 = m / 4;;

  ctx.save();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.arc(0, 0, m2, 0, Math.PI * 2);
  ctx.stroke();
  //draw pie
  var ang = 0;
  for (var g in r) {
    switch (r[g].type) {
      case 'D':
        ctx.fillStyle = dColorFill;
        break;
      case 'A':
        ctx.fillStyle = aColorFill;
        break;
      case 'V':
        ctx.fillStyle = vColorFill;
        break;
      case 'K':
        ctx.fillStyle = kColorFill;
        break;
    }
    ctx.beginPath();
    var an = r[g].count * Math.PI * 2;
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, m2, ang, ang + an);

    ctx.fill();
    ctx.stroke();
    ang += an;
  }
  //write labels
  ctx.font = (m * 0.1) + 'px serif';
  ctx.textBaseline = 'middle';
  var ang = 0, txt = '';
  for (var g in r) {
    switch (r[g].type) {
      case 'D':
        ctx.fillStyle = dTextColorFill;
        txt = 'Digital';
        break;
      case 'A':
        ctx.fillStyle = aTextColorFill;
        txt = 'Auditory';
        break;
      case 'V':
        ctx.fillStyle = vTextColorFill;
        txt = 'Visual';
        break;
      case 'K':
        ctx.fillStyle = kTextColorFill;
        txt = 'Kinaesthetic';
        break;
    }
    txt += ' ' + Math.round(r[g].count * 100) + '%';
    var an = r[g].count * Math.PI * 2, a2 = ang + an / 2;

    var text = ctx.measureText(txt);
    ctx.fillText(txt, Math.cos(a2) * m4 - text.width / 2, Math.sin(a2) * m4);
    ang += an;
  }

  ctx.restore();
  $(window).unbind('resize').resize(function () { DrawGraph(r); });

}

function CreateQuestionButton(it, label, questions, bAllButtons) {
  var cz = '';
  if (!bAllButtons) cz = ' onlyNext';
  var qb = $('<a id="qb' + it + '" class="button is-large is-info qbtn' + cz + '">' + label + '</a>').data('it', it).click(function (event) {
    $('#quiz').scrollTop(0);
    SlowReload();
    var jq = $('#question_container' + currentQuestion);
    $('.question_container').hide();
    //$('.qbtn').removeClass('btn-');
    var i = $(event.target)/*.removeClass('btn-outline-primary').addClass('btn-success')*/.data('it');
    currentQuestion = i;
    if (!bAllButtons) $('.qbtn').hide();
    $('#qb' + (currentQuestion + 1)).show();
    $('#question_container' + (currentQuestion)).show();
    if (i == questions.length) {
      /*update results page*/
      var res = {
        "A": 0,
        "V": 0,
        "K": 0,
        "D": 0,
        "T": 0
      };
      var as = $('.question'), n = 0;
      for (var a = 0; a < as.length; a++) {
        var answers = $('#question' + (a + 1)).children();
        for (var o = 0; o < answers.length; o++) {
          n = 4 - o;
          n *= n;
          res[$(answers[o]).data('type')] += n;
          res.T += n;
        }
      }

      var html = '';
      var r = [
        { "type": "A", "count": res.A / res.T },
        { "type": "V", "count": res.V / res.T },
        { "type": "K", "count": res.K / res.T },
        { "type": "D", "count": res.D / res.T }
      ];
      r.sort(function (a, b) { return b.count - a.count });
      var pt = 0, p = 0;
      for (var g in r) {
        switch (r[g].type) {
          case 'D':
            html += 'Digital: ';
            break;
          case 'A':
            html += 'Auditory: ';
            break;
          case 'V':
            html += 'Visual: ';
            break;
          case 'K':
            html += 'Kinaesthetic ';
            break;
        }
        p = Math.round(r[g].count * 100);
        pt += p;
        if (g == r.length - 1) {
          if (pt != 100) {
            //alert('arp..!! ' + (pt-100) + '%');
            p -= (pt - 100);
          }
        }
        html += +p + '% <br/>';
      }
      //$('#question_container'+(i+1))
      $('#textResults').html(html);
      $('#quizTitle').html('Your prefered representation system');

      DrawGraph(r);
    }
    //console.log(jq.data('question').sortable("toArray"));
  });
  return qb;
}

$(function () {
  var questions =
    [
      {
        "q": "This quiz allows you to better understand how you create your own internal experience through your preferred representational system.<br/>There is usually one modality (typically visual, auditory or kinaesthetic) that is your preferred system for creating your inner worlds.<br/>It doesn’t matter which one it is, but it becomes very useful for you to know which one is your preferred system (known as your “preferred representational system”).<br/><br/>During the next few slides, you need to reorder the statements from most accurate at the top, to least accurate at the bottom.",
        "a": {}
      },
      {
        "q": "I base important decisions on:",
        "a": {
          "K": "A gut feeling.",
          "A": "What sounds the best.",
          "V": "What looks best to me.",
          "D": "Precise review and study of the issues.",
        }
      },
      {
        "q": "During a disagreement, I am most likely to be influenced by:",
        "a": {
          "A": "The other person’s tone of voice.",
          "V": "Whether or not I can see the other person’s point of view.",
          "D": "Understanding the other person’s process.",
          "K": "Whether or not I feel I am in touch with the other person’s true feelings.",
        }
      },
      {

        "q": "I most easily communicate what is going on with me by:",
        "a": {
          "V": "The way I dress and look.",
          "K": "The feelings I share.",
          "D": "The words I choose.",
          "A": "The tone of my voice.",
        }
      },
      {
        "q": "It is easiest for me to:",
        "a": {
          "A": "Find the ideal volume and tuning on a stereo system.",
          "D": "Select the most intellectually relevant point concerning an interesting subject.",
          "K": "Select the most comfortable furniture.",
          "V": "Select rich, attractive colour combinations.",
        }
      },
      {
        "q": "Order the following statements from most accurate at the top, to least accurate at the bottom.",
        "a": {
          "A": "I am very attuned to the sounds of my surroundings.",
          "D": "I am very adept at making sense of new facts and data.",
          "K": "I am very sensitive to the way articles of clothing feel on my body.",
          "V": "I have a strong response to colours and to the way a room looks.",
        }
      },
      {
        "q": "People really know me best when they…",
        "a": {
          "K": "Experience what I am feeling.",
          "V": "See at my perspective.",
          "A": "Listen carefully to what I have to say and how it is said.",
          "D": "Are interested in the meaning of what I’m doing or saying.",
        }
      },
      {
        "q": "I am more likely to:",
        "a": {
          "A": "Want understanding of the facts you tell me.",
          "V": "Picture the overview or plan.",
          "D": "Sequence the information you give me to make sense of it all.",
          "K": "Get a handle on the feeling of the project.",
        }
      },
      {
        "q": "Describing myself I'd say…",
        "a": {
          "V": "Showing it to me makes it believable.",
          "A": "The sincere tone of your voice makes it believable.",
          "K": "When it feels right, it’s believable.",
          "D": "When it makes sense, it’s believable.",
        }
      },
      {
        "q": "In times of stress I'm most challenged with…",
        "a": {
          "D": "Trusting the people or situation.",
          "A": "Being diplomatic.",
          "K": "Separating what my feelings are from what other people are feeling.",
          "V": "Being flexible and changing plans easily.",
        }
      },
      {
        "q": "Order the following statements from most accurate at the top, to least accurate at the bottom.",
        "a": {
          "D": "I easily receive inner inspirations.",
          "A": "I can tell easily where new ideas fit.",
          "K": "I easily follow the direction of the tried and true methods.",
          "V": "I easily organize and plan the timing of things.",
        }
      },
      {
        "q": "I decide which gym to join because:",
        "a": {
          "A": "The music sounds good.",
          "D": "It makes sense based on the location.",
          "K": "I get a good feeling when I walk in the door.",
          "V": "I like the looks of the equipment.",
        }
      },
      {
        "q": "When meeting new people I prefer to:",
        "a": {
          "V": "Meet someone face to face.",
          "A": "Over the telephone.",
          "D": "Get a sense of who they are.",
          "K": "Touch base to get a feeling of who they are.",
        },
      }
    ]
    ;
  //loop questions json
  //for(var question in questions){
  for (var it = 0; it <= questions.length; it++) {
    //add next buttons
    var bAllButtons = false;
    if (it > 0) {
      if (bAllButtons) {
        var label = it;
      } else {
        var label = 'Submit Answer and Continue';
        if (it == 1) label = 'Start';
      }
      if (it == questions.length) label = 'Results';
      qb = CreateQuestionButton(it, label, questions, bAllButtons);
      $('#quizButtons').append(qb);
      if (it > 1) qb.hide();
      if (it == questions.length) qb.addClass('qbtn-end');
    }

    if (it == questions.length) {
      //add results container
      var qContainer = $('<div id="question_container' + it + '" class="container-fluid question_container"></div>');
      if (it > 1) qContainer.hide();
      qContainer.append($('<div class="results"><canvas id="canvasResults"></canvas><p id="textResults"></p></div>'));
      $('#quizBox').append(qContainer);
      continue;
    }
    var question = questions[it].q;
    //options in question
    var options = questions[it].a;

    //create question container
    var qContainer = $('<div id="question_container' + it + '" class="container-fluid question_container"></div>');
    if (it > 0) qContainer.hide();//hide if not first question

    var row = $('<div class="row qrow"></div>');
    qContainer.append(row);

    row.append($('<h1>' + question + '</h1>'));

    //create list group
    var q = $('<div id="question' + it + '" class="question list-group col is-size-6-touch">');
    qContainer.data('it', it);
    row.append(q);

    //add options
    for (var type in options) {
      q.append($('<div class="list-group-item"><i class="fas fa-arrows-alt-v"></i><h2>' + options[type] + '</h2></div>').data('type', type));
    }

    $('#quizBox').append(qContainer);

    if (it == 0) {
      q.append($(blurb));
      continue;
    }

    var questionDom = document.getElementById('question' + it);

    // Example 1 - Simple list
    new Sortable(questionDom, {
      animation: 150,
      ghostClass: 'blue-background-class'
    });
  }
});