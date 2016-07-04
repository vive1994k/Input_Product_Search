"use strict";
//Mobile Number validator
var IsValidMobile = function(mobNo) {
    var mobregex = /^[0]?[789]\d{9}$/;
    var matchflag = false;
    if(mobregex.test(mobNo)) {
            matchflag = true;
    }
    return matchflag;
};
//Name Validator
var IsValidName = function(name){
    var nameregex = /^[a-z ,.'-]+$/i;
    if (name.length > 36){
        alert("Name too big");
        return false;
    }
    else if (nameregex.test(name) === false){
        alert("Name should contain only alphanumeric characters and hyphen");
        return false;
    }
    else
        return true;
};
//email validator 
var IsValidemail = function(email){
    var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var matchflag = false;
    if(emailregex.test(email)) {
        matchflag = true;
    }
    return matchflag;
};
//Getting List of teams And Updating List of teams
$(document).ready(function(){
    var url = "http://139.59.3.93/teams?key=b42b5ee6-385b-11e6-ac61-9e71128cae77";
    $.ajax({
        url: url,
        type: 'get',
        dataType:"json",
        success: function(data){
            console.log(data);
            var T_list = data;
            var optionList = T_list.payload.teams;
            for(var i=0;i<optionList.length;i++){
                var options=('<option value="' + optionList[i].id+ '">' + optionList[i].name + '</option>');
                $("#TeamList").append(options);
                $("#deleteTeamName").append(options);
                $("#empteamName").append(options);
                $("#update_teamName").append(options);
                $("#update_empteamName").append(options);
            }
        },
        error: function(data){
            console.log('error' + data);
        }
    });
});
//Get Profiles with roles
$(document).ready(function(){
    var url = "http://139.59.3.93/employees?key=b42b5ee6-385b-11e6-ac61-9e71128cae77";
    $.ajax({
        url: url,
        type: 'get',
        dataType: "json",
        success:function(data){
            console.log(data);
            var empResponse = data;
            var empList = empResponse.payload.employees;
            console.log(empList.length);
            for(var i=0;i<empList.length;i++) {
                var options = ('<option value="' + empList[i].id + '">' + empList[i].name + '</option>');
                var empIdoptions = ('<option value="' + empList[i].id + '">' + empList[i].empId + '</option>');
                $("#deleteProfileName").append(empIdoptions);
                $("#update_empId").append(empIdoptions);
                if(empList[i].role === 'SEM') {
                    $("#SrEngManList").append(options);
                    $("#update_SrEngManList").append(options);
                }
                else if(empList[i].role === 'EM') {
                    $("#EngManList").append(options);
                    $("#update_EngManList").append(options);                    
                }
                else if(empList[i].role === 'TL') {
                    $("#teamLeadList").append(options);
                    $("#update_teamLeadList").append(options);
                }
                else if(empList[i].role === 'PM') {
                    $("#projectManagerList").append(options);
                    $("#update_projectManagerList").append(options);
                }
            }
        },
        error: function(data) {
            console.log('error' + data);
        }

    });
});
//Function for Creating New Team
var postTeam = function() {
    var teamName = document.getElementById("teamName").value;
    if(teamName) {
        var JSONObject =  {
            name: teamName
        }
        var pointOfContact = document.getElementById("pointOfContact").value;
        var SrEngMan = document.getElementById("SrEngManList").value;
        if(SrEngMan) {
            JSONObject['SEM'] = SrEngMan;
        }
        var EngMan = document.getElementById("EngManList").value;
        if(EngMan) {
            JSONObject['EM'] = EngMan;
        }
        var teamLead = document.getElementById("teamLeadList").value;
        if(teamLead) {
            JSONObject['TL'] = teamLead;
        }
        var projectManager =  document.getElementById("projectManagerList").value;
        if(projectManager) {
            JSONObject['PM'] = projectManager;
        }
        var emailflag = true;
        if(pointOfContact) {
            if(IsValidemail(pointOfContact)) {
                JSONObject['pointOfContact'] = pointOfContact;
                }
            else {
                alert("Invalid Email address");
                emailflag = false;
            }
        } 
        if(emailflag){
            console.log(JSONObject);
            //console.log(JSON);
            $.ajax({
                url:"http://139.59.3.93/teams?key=b42b5ee6-385b-11e6-ac61-9e71128cae77",
                type:"post",
                data: JSONObject,
                success: function (xhr, success, data) {
                    console.log(data);
                    alert('Team created successfully');
                    location.reload();
                },
                error: function(xhr, error, data ) {
                    console.log(xhr, error, data);
                }
            });
        }
    }
    else {
        alert('Enter Team name');
    }
        
};
//Function for Creating Profile
var postProfile = function() {
    var empName = document.getElementById("empName").value;
    var empId = document.getElementById("empId").value;
    var email = document.getElementById("email").value;
    var mobileNo = document.getElementById("mobileNo").value;
    var Erole = document.getElementById("Erole").value;
    var empteamName = document.getElementById("empteamName").value;
    if(empName && empId && email && mobileNo && empteamName && Erole) {
        if(IsValidName(empName) === false) {
        }
        else if(IsValidemail(email) === false) {
            alert("Enter Valid email");
        }
        else if(IsValidMobile(mobileNo) === false) {
            alert("Enter valid mobile number");
        }
        else {
            var JSONObject = {
                name : empName,
                empId : empId,
                email : email,
                mobile : mobileNo,
                role : Erole,
                team : empteamName
            }
            var Eremarks =  document.getElementById("Eremarks").value;
            if(Eremarks){
                JSONObject['aboutMe'] = Eremarks
            }
            console.log(JSONObject);
            var result = $.ajax({
                url:"http://139.59.3.93/employees?key=b42b5ee6-385b-11e6-ac61-9e71128cae77",
                type:"post",
                data: JSONObject,
                success: function (xhr, success, data) {
                    console.log(xhr, success, data);
                    alert(xhr.message);
                    location.reload();
                },
                error: function(xhr, error, data ){
                    console.log(xhr, error, data);
                }
            });
        }
    }
    else {
        alert('Enter All required fields');  
    } 
};
//Function to help update team
var getTeamDetails = function(){
    var teamId = document.getElementById("update_teamName").value;
    var url = "http://139.59.3.93/teams/" + teamId + "?key=b42b5ee6-385b-11e6-ac61-9e71128cae77";
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: function(data){
            var individualTeam = data.payload.team;
            //console.log(individualTeam);
            $("#update_pointOfContact").val(individualTeam.pointOfContact);
        },
        error: function(xhr, error, data){
            console.log(xhr, error, data);
        }
    });
};
//Funtion to update a team Information
var updateTeam = function() {
    var teamId = document.getElementById("update_teamName").value;
    if(teamId) {
        var JSONObject =  {
            id: teamId
        }
        var pointOfContact = document.getElementById("update_pointOfContact").value;
        var SrEngMan = document.getElementById("update_SrEngManList").value;
        if(SrEngMan) {
            JSONObject['SEM'] = SrEngMan;
        }
        var EngMan = document.getElementById("update_EngManList").value;
        if(EngMan) {
            JSONObject['EM'] = EngMan;
        }
        var teamLead = document.getElementById("update_teamLeadList").value;
        if(teamLead) {
            JSONObject['TL'] = teamLead;
        }
        var projectManager =  document.getElementById("update_projectManagerList").value;
        if(projectManager) {
            JSONObject['PM'] = projectManager;
        }
        var emailflag = true;
        if(pointOfContact) {
            if(IsValidemail(pointOfContact)){
                JSONObject['pointOfContact'] = pointOfContact;
            }
            else{
                alert("Enter Valid point of contact");
                emailflag = false;
            }
        }
        if(emailflag){
            $.ajax({
                url:"http://139.59.3.93/teams/"+teamId+"?key=b42b5ee6-385b-11e6-ac61-9e71128cae77",
                type:"put",
                data: JSONObject,
                success: function (xhr, success, data) {
                    console.log(data);
                    alert(xhr.message);
                    location.reload();
                },
                error: function(xhr, error, data ) {
                    console.log(xhr, error, data);
                }
            });
            $('#pointOfContact').val('');   
        }
    }
    else {
        alert('Select Team name');
    }   
};
//Function to help update profile
var getemployeeDetails = function(){
    var employeeId = document.getElementById("update_empId").value;
    var url = "http://139.59.3.93/employees/" + employeeId + "?key=b42b5ee6-385b-11e6-ac61-9e71128cae77";
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: function(data){
            console.log(data);
            console.log(data.payload.employee);
            var individualEmployee = data.payload.employee;
            console.log(individualEmployee.id);
            $("#update_empName").val(individualEmployee.name);
            $("#update_email").val(individualEmployee.email);
            $("#update_mobileNo").val(individualEmployee.mobile);
            $("#update_Erole").val(individualEmployee.role);
            updateteamSelector();
        },
        error: function(xhr, error, data){
            console.log(xhr, error, data);
        }
    });
};
//Function to update profile
var updateProfile = function(){
    var employeeId = document.getElementById("update_empId").value;
    if(employeeId) {
        var JSONObject = {
            id: employeeId
        }
        var teamName = document.getElementById("update_empteamName").value;
        if(teamName) {
            JSONObject['team'] = teamName;
        }
        var Erole = document.getElementById("update_Erole").value;
        if(Erole) {
            JSONObject['role'] = Erole;
        } 
        var Eremarks = document.getElementById("update_Eremarks").value;
        if(Eremarks) {
            JSONObject['aboutMe'] = Eremarks;
        }
        var empName = document.getElementById("update_empName").value;
        var email = document.getElementById("update_email").value;
        var mobileNo = document.getElementById("update_mobileNo").value;
        var validationflag = true;
        if(empName) {
            if(IsValidName(empName)) {
                JSONObject['name'] = empName;
            }
            else {
                validationflag = false;
            }
        }
        if(email) {
            if(IsValidemail(email)) {
                JSONObject['email'] = email;
            }
            else {
                validationflag = false;
                alert("Invalid email address");
            }
        }
        if(mobileNo) {
            if(IsValidMobile) {
                JSONObject['mobile'] = mobileNo;
            }
            else {
                validationflag = false;
                alert("Something is wrong with the mobile number");
            }
        }
        if(validationflag) {
            var url = "http://139.59.3.93/employees/" + employeeId + "?key=b42b5ee6-385b-11e6-ac61-9e71128cae77"
            $.ajax({
                url: url,
                type: 'put',
                data: JSONObject,
                success: function(data){
                    console.log(data);
                    alert("profile updated");
                    location.reload();
                },
                error: function(data){
                    console.log(data);
                }   
            });
        }
    }
    else {
        alert("First select Profile to edit");
    }

};
//Function to allow multiselect for team names in add profile
var teamSelector = function(){
    var role = document.getElementById("Erole").value;
    console.log('here');
    if(role ==='SEM'){
        document.getElementById("empteamName").multiple = true;
    }
    else{
        document.getElementById("empteamName").multiple = false;
    }
};
//Function to allow muliselect for team names in update profile
var updateteamSelector = function(){
    var role = document.getElementById("update_Erole").value;
    if(role ==='SEM'){
        document.getElementById("update_empteamName").multiple = true;
    }
    else{
        document.getElementById("update_empteamName").multiple = false;
    }
};