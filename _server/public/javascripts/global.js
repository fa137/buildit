// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Add User button click
    $('#btnAddUser').on('click', addUser);
    // Add Project button click
    $('#btnAddProject').on('click', addProject);
    // Login button
    $('#btnLogin').on('click', userLogin);
    $('#btnLogout').on('click', userLogout);
    if(window.localStorage.loggedIn == "true"){
        $('#btnLogout').show().on('click', userLogout);
    }else{
        $('#btnLogout').hide();
        console.log($('#btnLogout'));
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
            userTableContent += '<tr>';
            userTableContent += '<td><a href="/users/get/' +this.username + '" title="Show Details">' + this.username + '</a></td>';
            userTableContent += '<td>' + this.fullname + '</td>';
            userTableContent += '<td>' + this.profession + '</td>';
            userTableContent += '<td>' + this.skills + '</td>';
            userTableContent += '<td>' + this.resume + '</td>';
            userTableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML userTable
        $('#listOfusers').html(userTableContent);
    });
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/projectlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        projectListData = data;

        // For each item in our JSON, add a projectTable row and cells to the content string
        $.each(data, function(){
            projectTableContent += '<tr>';
            projectTableContent += '<td><a href="/projects/get/' +this._id+ '" title="Show Details">' + this.name + '</a></td>';
            projectTableContent += '<td>' + this.description + '</td>';
            projectTableContent += '<td>' + this.author + '</td>';
            projectTableContent += '<td>' + this.skills + '</td>';
            projectTableContent += '<td>' + this.tags + '</td>';
            projectTableContent += '<td>' + this.lookingFor + '</td>';
            projectTableContent += '<td>' + this.time + '</td>';
            projectTableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML projectTable
        $('#listOfprojects').html(projectTableContent);
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
            'profession': professions.toString(),
            'username': $('#addUser fieldset input#inputUserName').val(),
            'password': $('#addUser fieldset input#inputUserPassword').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'resume': $('#addUser fieldset input#inputUserResumeLink').val(),
            'bio': $('#addUser fieldset input#inputUserBio').val(),
            'skills': $('#addUser fieldset input#inputUserSkills').val()
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
            'name': $('#addProject fieldset input#inputProjectName').val(),
            'description': $('#addProject fieldset input#inputProjectDescription').val(),
            'author': $('#addProject fieldset input#inputProjectAuthor').val(),
            'skills': $('#addProject fieldset input#inputProjectSkills').val(),
            'tags': $('#addProject fieldset input#inputProjectTags').val(),
            'lookingFor': lookingFor,
            'time': $('#addProject fieldset input#inputProjectTime').val()
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
                $('#addProject fieldset input').val('');

                // Do stuff after user is added successfully

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
        if(!data){logged=false;}
        else if(data.password == password){
            logged=true;
            $('#btnLogout').show();
            window.localStorage.loggedIn = logged;
        }
        else{ logged=false}

    });
}

function userLogout(event){
    event.preventDefault();
    $(this).hide();
    window.localStorage.loggedIn = false;
}