navigator.id.watch({
  loggedInUser: loggedInUser,

  onlogin: function(assertion) {
    $.ajax({
      type: 'POST',
      url: '/auth/verify',
      data: {assertion: assertion},
      success: function(res, status, xhr) {
        console.log("login successful");
        console.log(res);
      },
      error: function(res, status, xhr) {
        console.log("login failed");
        console.log(res);
      }
    });
  },

  onlogout: function() {
    $.ajax({
      type: 'POST',
      url: '/auth/logout',
      success: function(res, status, xhr) {
        console.log("logged out");
      }
    });
  }
});
