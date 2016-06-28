"use strict";
//Mobile Number validator
var IsMobValid = function(mobNo){
    var mobregex = /^[0]?[789]\d{9}$/;
    var matchflag =false;
    if(mob_regex.test(mobNo)){
            matchflag = true;
            break;
    }
    return matchflag;
};
//Name Validator
var IsNameCorrect = function(name){
    //var nameregex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i;
    var nameregex = /^[a-z ,.'-]+$/i;
    if (name.length > 36){
        alert("Name too big");
        return false;
    }
    else if (nameregex.test(name)){
        alert("Name should contain only alphanumeric characters and hyphen");
        return false;
    }
    else
        return true;
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
            for(var i=0;i<optionList.length;i++){
                var options=('<option value="' + optionList[i].id+ '">' + optionList[i].name + '</option>');
                $("#TeamList").append(options);
            }
        },
        error: function(data){
            console.log('error' + data);
        }

    });
});


//Function for Creating New Team
var postTeam = function(){
    var teamName = document.getElementById("teamName").value;
    var pointOfContact = document.getElementById("pointOfContact").value;
    var JSONObject =  {
        name: teamName
        // pointOfContact:pointOfContact
    }
    var SrEngMan = document.getElementById("SrEngMan").value;
    if(SrEngMan) {
        JSONObject['SEM'] = SrEngMan;
    }
    var EngMan = document.getElementById("EngMan").value;
    if(EngMan){
        JSONObject['EM'] = EngMan;
    }
    var teamLead = document.getElementById("teamLead").value;
    if(teamLead){
        JSONObject['TL'] = teamLead;
    }
    var projectManager =  document.getElementById("projectManager").value;
    if(projectManager){
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
        error: function(xhr, error, data ){
            console.log(xhr, error, data);
        }
    });
    $('#teamName').val('');
    $('#pointOfContact').val('');
    $('#SrEngMan').val('');
    $('#EngMan').val('');
    $('#teamLead').val('');
    $('#projectManager').val('');    
};
//Function for Creating Profile
var postProfile = function(){
    var empName = document.getElementById("empName").value;
    var empId = document.getElementById("empId").value;
    var email = document.getElementById("email").value;
    var mobileNo = document.getElementById("mobileNo").value;
    var Erole = document.getElementById("Erole").value;
    var empteamName = document.getElementById("empteamName").value;
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
    var result = $.ajax({
        url:"http://139.59.3.93:8080/employees?key=b42b5ee6-385b-11e6-ac61-9e71128cae77",
        type:"post",
        data: JSONObject,
        success: function (data) {
            //debugger
            console.log(data);
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
};