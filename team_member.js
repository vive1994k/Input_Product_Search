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
    //var nameregex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i;
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
    var url = "http://139.59.3.93:8080/teams?key=b42b5ee6-385b-11e6-ac61-9e71128cae77";
    $.ajax({
        url: url,
        type: 'get',
        dataType:"json",
        success: function(data){
            console.log(data);
            var T_list = data;
            var optionList = T_list.payload.teams;
            // Locally storing list of teams
            //localStorage.setItem('locallyStoredTeams',JSON.stringify(optionList));
            //console.log(JSON.parse(localStorage.getItem('locallyStoredTeams')));
            for(var i=0;i<optionList.length;i++){
                var options=('<option value="' + optionList[i].id+ '">' + optionList[i].name + '</option>');
                $("#TeamList").append(options);
                $("#deleteTeamName").append(options);
                $("#empteamName").append(options);
            }
        },
        error: function(data){
            console.log('error' + data);
        }
    });
});
//Get Profiles with roles
$(document).ready(function(){
    var url = "http://139.59.3.93:8080/employees?key=b42b5ee6-385b-11e6-ac61-9e71128cae77";
    $.ajax({
        url: url,
        type: 'get',
        dataType: "json",
        success:function(data){
            console.log(data);
            var empResponse = data;
            var empList = empResponse.payload.employees;
            console.log(empList.length);
            //Locally storing list of employees 
            //localStorage.setItem('locallyStoredEmployees',JSON.stringify(empList));
            for(var i=0;i<empList.length;i++) {
                var options=('<option value="' + empList[i].id+ '">' + empList[i].name + '</option>');
                $("#deleteProfileName").append(options);
                if(empList[i].role === 'SEM') {
                    $("#SrEngManList").append(options);
                }
                else if(empList[i].role === 'EM') {
                    $("#EngManList").append(options);
                }
                else if(empList[i].role === 'TL') {
                    $("#teamLeadList").append(options);
                }
                else if(empList[i].role === 'PM') {
                    $("#projectManagerList").append(options);
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
        if(pointOfContact){
            JSONObject['pointOfContact'] = pointOfContact;
        }
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
        console.log(JSONObject);
        //console.log(JSON);
        var result = $.ajax({
            url:"http://139.59.3.93:8080/teams?key=b42b5ee6-385b-11e6-ac61-9e71128cae77",
            type:"post",
            data: JSONObject,
            success: function (data) {
                console.log(data);
            },
            error: function(xhr, error, data ) {
                console.log(xhr, error, data);
            }
        });
        $('#teamName').val('');
        $('#pointOfContact').val('');   
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
            url:"http://139.59.3.93:8080/employees?key=b42b5ee6-385b-11e6-ac61-9e71128cae77",
            type:"post",
            data: JSONObject,
            success: function (xhr, error, data) {
                //debugger
                console.log(xhr, error, data);
            },
            error: function(xhr, error, data ){
                // debugger
                console.log(xhr, error, data);
            }
        });
        $('#empName').val('');
        $('#empId').val('');
        $('#email').val('');
        $('#mobileNo').val('');
        $('#Erole').val('');
        $('#empteamName').val('');
        $('#Eremarks').val(''); 
        }
    }
    else {
        alert('Enter All required fields');  
    } 
};
//Function to delete a particular team
var deleteTeam = function() {
    var team2delete = document.getElementById("deleteTeamName").value;
    if(team2delete) {
        $.ajax();
    }
    else {
        alert("I think You forgot to select a Team");
    }
}
//Function to delete a particular Profile
var deleteProfile = function() {
    var profile2delete = document.getElementById("deleteProfileName").value;
    if(profile2delete) {
        $.ajax();
    }
    else {
        alert("I think You forgot to select a Profile");
    }
}