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

    // Delete User link click
    $('#listOfusers table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

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
            userTableContent += '<td><a href="#" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
            userTableContent += '<td>' + this.email + '</td>';
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
            projectTableContent += '<td><a href="#" class="linkshowproject" rel="' + this.projectname + '" title="Show Details">' + this.projectname + '</a></td>';
            projectTableContent += '<td>' + this.email + '</td>';
            projectTableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML projectTable
        $('#listOfprojects').html(projectTableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

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
            console.log(professions);
        };
        if($('#inputUserProfessionDesigner').is(':checked')){
            professions+='Designer ';
            console.log(professions);
        };
        if($('#inputUserProfessionEntrepreneur').is(':checked')){
            professions+='Entrepreneur ';
            console.log(professions);
        };
        // If it is, compile all user info into one object
        console.log(professions);
        var newUser = {
            'profession': professions.toString(),
            'username': $('#addUser fieldset input#inputUserName').val(),
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
        // If it is, compile all Project info into one object
        console.log(professions);
        var newProject = {
            'pic': professions.toString(),
            'name': $('#addProject fieldset input#inputProjectName').val(),
            'description': $('#addProject fieldset input#inputProjectEmail').val(),
            'author': $('#addProject fieldset input#inputProjectFullname').val(),
            'resume': $('#addProject fieldset input#inputProjectResumeLink').val(),
            'bio': $('#addProject fieldset input#inputProjectBio').val(),
            'skills': $('#addProject fieldset input#inputProjectSkills').val()
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
// // Delete User
// function deleteUser(event) {

//     event.preventDefault();

//     // Pop up a confirmation dialog
//     var confirmation = confirm('Are you sure you want to delete this user?');

//     // Check and make sure the user confirmed
//     if (confirmation === true) {

//         // If they did, do our delete
//         $.ajax({
//             type: 'DELETE',
//             url: '/users/deleteuser/' + $(this).attr('rel')
//         }).done(function( response ) {

//             // Check for a successful (blank) response
//             if (response.msg === '') {
//             }
//             else {
//                 alert('Error: ' + response.msg);
//             }

//             // Update the table
//             populateTable();

//         });

//     }
//     else {

//         // If they said no to the confirm, do nothing
//         return false;

//     }

// };