$(document).ready(function(){
// Getting references to the playlist input
    var playlistVar = $("#playlist-name");

// Adding event listeners to the form to create a new object
$(document).on("submit", "#add-playlist", handleAddPlaylistPress);

// Getting the initial list of playlists
getPlaylists();

// A function to handle what happens when the form is submitted to create a new playlist
function handleAddPlaylistPress(event){
    event.preventDefault();
// Don't do anything if the name fields hasn't been filled out
if (!playlistInput.val().trim().trim()) {
    return;
}


// Calling the insertPlaylist function and passing in the value of the name input
insertPlaylist({
    name: playlistVar
      .val()
      .trim()
  });
}
  
// A function for creating an pl. Calls getPlaylists upon completion
function insertPlaylist(playlistData) {
    $.post("/api/playlists", playlistData)
      .then(getPlaylists);
  }

// Function for creating a new list row for PLs
function createPlaylistRow(playlistData) {
    var newPl = $("<tr>");
    newPl.data("playlist", playlistData);
    newPl.append("<td>" + playlistData.name + "</td>");
    if (playlistData.Posts) {
      newPl.append("<td> " + playlistData.Posts.length + "</td>");
    } else {
      newPl.append("<td>0</td>");
    }
    newPl.append("<td><a href='/playlistDetails?playlist_id=" + playlistData.id + "'>Go to Playlist</a></td>");
    newPl.append("<td><a href='/cms?playlist_id=" + playlistData.id + "'>Create Playlist</a></td>");
    return newPl;
  }

// Function for retrieving playlists and getting them ready to be rendered to the page
function getPlaylists() {
    $.get("/api/userplaylists", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlaylistRow(data[i]));
      }
      renderPlaylistList(rowsToAdd);
      playlistVar.val("");
    });
  }
// A function for rendering the list of playlists to the page
function renderPlaylistList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    }
//need to add button that so users can click a playlist and be transfered to the playlist details?
});


//_______________________________________________________________________________________



// what do you want to do? Populate list of users, class: userName-list

$(document).ready(function(){
    var userNameVar =$("#username-list");

// adding event listener to the form to create a new object
$(document).on("submit", "#add-username", handleAddUserNameList);

// Getting initial list of usernames
getUserNameList();

// A function to handle what happens when the form is cubmitted to create new user list 
function handleAddUserNameList(event){
  event.preventDefault();

// Don't do anything if the name fields not filled
if (!userNameInput.val().trim()) {
  return;
}

// Calling the insertUs
insertUserNameList({
    name: userNameVar
      .val()
      .trim()
  });
}

// A function for creating a userName list. Calls get /api/users upon completion
function insertUserNameList(userNameData) {
  $.post("/api/users", userNameData)
  .then(getUserNameList);
}

// Function for creating a new list row for UserNameList
function createUserNameRow(userNameData) {
  var newUNL = $("<tr>");
  newUNL.data("playlist", userNameData);
  newUNL.append("<td>" + userNameData.name + "</td>");
  if (userNameData.Posts) {
    newUNL.append("<td> " + userNameData.Posts.length + "</td>"); 
  } else {
    newUNL.append("<td>0</td>");
  }
  newUNL.append("<td><a href='/userNameListDetails?user_id=" + userNameData.id + "'>Go to User Name List</a></td>");
  newUNL.append("<td><a href='cms?username_id=" + userNameData.id + "'>Create User Name List</a></td>");
  return newUNL;
  }

// Function for retrieving user name list and getting them ready to be rendered to the page
function getUserNameList() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUsernameRow(data[i]));
      }
      renderUserNameList(rowsToAdd);
      userNameVar.val("");
    });
}

// A function for rendering the list of user names to the page
function renderUserNameList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    }
  }
});


