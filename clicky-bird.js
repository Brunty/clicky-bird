if (Meteor.isClient) {

  // counter starts at 0
  Session.setDefault('level', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('level');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      // Session.set('level', getLevel();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup
  });
}
