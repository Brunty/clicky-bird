if (Meteor.isClient) {
  //// counter starts at 0
  //Session.setDefault('counter', 0);
  //
  Template.bird.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
  //
  //Template.bird.events({
  //  'click': function () {
  //    // increment the counter when button is clicked
  //    Session.set('counter', Session.get('counter') + 2);
  //  }
  //});

  draw = function(position) {
    var canvas = $("#bird-canvas");
    var context = document.getElementById('bird-canvas').getContext('2d');
    canvas.attr('width', $(window).width());
    canvas.attr('height', $(window).height());

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width(), canvas.height());

    drawLevel(context,44,0);

    var bird = new Image();
    bird.src = "/bird.svg";
    bird.width = 45;
    bird.height = 52;

    context.fillStyle = 'red';
    context.drawImage(bird, 20, canvas.height() - bird.height - position, bird.width, bird.height);
  };
}
