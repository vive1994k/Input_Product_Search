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
    var teamId = document.getElementById("teamId").value;
    var teamName = document.getElementById("teamName").value;
    var pointOfContact = document.getElementById("pointOfContact").value;
    var SrEngMan = document.getElementById("SrEngMan").value;
    var EngMan = document.getElementById("EngMan").value;
    var teamLead = document.getElementById("teamLead").value;
    var projectManager =  document.getElementById("projectManager").value;
    if(IsNameCorrect(SrEngMan));
    if(IsNameCorrect(EngMan));
    if(IsNameCorrect(teamLead));
    if(IsNameCorrect(projectManager));
    var JSONObject = {"id": teamId,"name": teamName,"pointOfContact": pointOfContact,"SEM": SrEngMan,"EM": EngMan,"TL": teamLead,"PM": projectManager};
    var result = $.ajax({
    	url:"",
    	type:"post",
    	data: JSON.stringify(JSONObject),
    	contentType: 'json',
    	headers: {
                "Content-Type": 'application/json'
        },
        success: function (data) {
            debugger
            console.log(data);
        },
       	error: function(error){
        	debugger
        }
    });
    $('#teamId').val('');
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
    var Eremarks =  document.getElementById("Eremarks").value;
    var JSONObject = {  "name": empName ,"empId": empId,"email": email,"mobile": mobileNo,"Erole": role,"team": empteamName,"aboutMe": Eremarks};
    var result = $.ajax({
    	url:"",
    	type:"post",
    	data: JSON.stringify(JSONObject),
    	contentType: 'json',
    	headers: {
                "Content-Type": 'application/json'
        },
        success: function (data) {
            debugger
            console.log(data);
        },
       	error: function(error){
        	debugger
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

