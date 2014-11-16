// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Add User button click
    $('#btnAddUser').on('click', addUser);
    $('#btnUpdateUser').on('click', updateUser);
    // Add Project button click
    $('#btnAddProject').on('click', addProject);
    // $('#btnUpdateProject').on('click', updateProject);

    // Login button
    $('#btnLogin').on('click', userLogin);
    // Menu
    $('#editprofile').on('click', editProfile);
    $('#postproject').on('click', postProject);
    $('#signout').on('click', userLogout);

    if(window.localStorage.loggedIn == "true"){
        $('#btnLogout').show().on('click', userLogout);
        populateTable();
    }else{
        $('#btnLogout').hide();
    }
    if(window.localStorage.username != ""){
        $('.username').html(window.localStorage.username);
    }
    if(window.location.href.indexOf("single-project.html#") > -1){
        var objectID = window.location.hash.substr(1);

        $.getJSON( '/projects/get/' + objectID, function( data ) {
            $('#projectname').html(data.name);
            $('#projectauthor').html(data.author);
            $('#projectdescription').html(data.description);
            $('#projectlookingfor').html(data.lookingFor);
            $('#projectskills').html(data.skills);
            var src = "images/userpics/" +data.pic;
            $('#pic').attr("src", src);
            $('#projecttags').html(data.tags);
            $('#projecttime').html(data.time);
        });
    }
    if(window.location.href.indexOf("single-profile.html#") > -1){
        var username = window.location.hash.substr(1);

        $.getJSON( '/users/get/' + username, function( data ) {
            console.log(data);
            $('#userfullname').html(data.fullname);
            $('#userdescription').html(data.bio);
            $('#userprofession').html(data.profession);
            $('#userskills').html(data.skills);
            $('#userresume').html(data.resume);
            $('#useremail').html(data.email);
            var src = "images/userpics/" +data.pic;
            $('#pic').attr("src", src);
        });

    }

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var userTableContent = '';
    var projectTableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {
        // Stick our user data array into a userlist variable in the global object
        userListData = data;
        // For each item in our JSON, add a userTable row and cells to the content string
        $.each(data, function(){

                userTableContent +=
                                    '<div class="entry">' +
                                    '<a href="/single-profile.html#' +
                                    this.username  +
                                    '">' +'<img src="images/userpics/' +
                                    this.pic +
                                    '" class="thumb"></a><div class="info"><p><strong>' +
                                    this.fullname +
                                    '</strong></p><a href="#" class="color-green">' +
                                    this.profession +
                                    '</a><p>Skills: ' +
                                    this.skills +
                                    '</p></div></div>';

        });
        // Inject the whole content string into our existing HTML userTable
        $('#entries').html(userTableContent);
    });
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/projectlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        projectListData = data;

        // For each item in our JSON, add a projectTable row and cells to the content string
        $.each(data, function(){
            projectTableContent += '<div class="entry">' +
                                    '<a href="/single-project.html#' +
                                    this._id  +
                                    '">' +'<img src="images/userpics/' +
                                    this.pic +
                                    '" class="thumb"></a><div class="info"><p><strong>' +
                                    this.name +
                                    '</strong></p><a href="#" class="color-green">' +
                                    this.lookingFor +
                                    '</a><p>Skills: ' +
                                    this.skills +
                                    '</p><p class="info">Description: ' +
                                    this.description +
                                    '</p></div></div>';
        });

        // Inject the whole content string into our existing HTML projectTable
        $('#projectEntries').html(projectTableContent);
    });
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        var professions = "";
        if($('#inputUserProfessionDeveloper').is(':checked')){
            professions+='Developer ';
        };
        if($('#inputUserProfessionDesigner').is(':checked')){
            professions+='Designer ';
        };
        if($('#inputUserProfessionEntrepreneur').is(':checked')){
            professions+='Entrepreneur ';
        };
        // If it is, compile all user info into one object
        var newUser = {
            // 'profession': professions.toString(),
            'username': $('#addUser input#inputUserName').val(),
            'password': $('#addUser input#inputUserPassword').val(),
            'email': $('#addUser input#inputUserEmail').val(),
            // 'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            // 'resume': $('#addUser fieldset input#inputUserResumeLink').val(),
            // 'bio': $('#addUser fieldset input#inputUserBio').val(),
            // 'skills': $('#addUser fieldset input#inputUserSkills').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Do stuff after user is added successfully
                window.localStorage.loggedIn = true;
                window.localStorage.username = $('#addUser input#inputUserName').val();
                window.location = "profile-settings.html#" + window.localStorage.username;
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
// Update User
function updateUser() {
    var name = window.localStorage.username;
    // event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#updateUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        var professions = "";
        if($('#inputUserProfessionDeveloper').is(':checked')){
            professions+='Developer ';
        };
        if($('#inputUserProfessionDesigner').is(':checked')){
            professions+='Designer ';
        };
        if($('#inputUserProfessionEntrepreneur').is(':checked')){
            professions+='Entrepreneur ';
        };
        // If it is, compile all user info into one object
        var newUser = {
            'profession': professions.toString(),
            'username': $('#updateUser input#inputUserName').val(),
            'password': $('#updateUser input#inputUserPassword').val(),
            'email': $('#updateUser input#inputUserEmail').val(),
            'fullname': $('#updateUser input#inputUserFullname').val(),
            'resume': $('#updateUser input#inputUserResumeLink').val(),
            'bio': $('#updateUser input#inputUserBio').val(),
            'skills': $('#updateUser input#inputUserSkills').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'PUT',
            data: newUser,
            url: '/users/update/' + name,
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Do stuff after user is added successfully
                window.location = "single-profile.html#" + window.localStorage.username;
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                // alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
// Add Project
function addProject(event) {
    event.preventDefault();
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProject input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        var lookingFor = "";
        if($('#inputProjectLookingForDesigner').is(':checked')){
            lookingFor+='Designer ';
        };
        if($('#inputProjectLookingForDeveloper').is(':checked')){
            lookingFor+='Developer ';
        };
        // If it is, compile all Project info into one object
        var newProject = {
            'name': $('#addProject input#inputProjectName').val(),
            'description': $('#addProject input#inputProjectDescription').val(),
            'author': $('#addProject input#inputProjectAuthor').val(),
            'skills': $('#addProject input#inputProjectSkills').val(),
            'tags': $('#addProject input#inputProjectTags').val(),
            'lookingFor': lookingFor,
            'time': $('#addProject input#inputProjectTime').val()
        }

        // Use AJAX to post the object to our addProject service
        $.ajax({
            type: 'POST',
            data: newProject,
            url: '/projects/addproject',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProject input').val('');

                // Do stuff after user is added successfully
                window.location = "projects.html";
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
// JUST FOR HACKATHON!
// FOR FUN... DO NOT USE IT IN PRODUCTION.

function userLogin(event){
    event.preventDefault();
    var username = $("#inputLoginUsername").val();
    var password = $("#inputLoginPassword").val();
    var url = "/users/get/" + username;
    $.getJSON(url, function( data ){
        var logged = false;
        if(!data){logged=false;
            alert("Incorrect username/password, try again...");
        }
        else if(data.password == password){
            logged=true;
            $('#btnLogout').show();
            window.localStorage.loggedIn = logged;
            window.localStorage.username = username;
            window.location = "projects.html";
        }
        else{ logged=false
            alert("Incorrect username/password, try again...");
        }

    });
}
function editProfile(){
    window.location = "profile-settings.html";
}
function userLogout(event){
    event.preventDefault();
    $(this).hide();
    window.localStorage.loggedIn = false;
    window.localStorage.username = "";
    window.location = "index.html";
}
function postProject(){
    window.location = "project-create.html";
}