if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.bird.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.bird.events({
    'click': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 2);
    }
  });

  setInterval(function() {
    Session.set('counter', Session.get('counter') > 0 ? Session.get('counter') - 1 : 0);
  }, 110);
}