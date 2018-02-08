function getAjax(url, content, callback) {
//	content.timeStamp = parseInt(Date.parse(new Date()) / 1000 / 86400) * 86400 - 28800
//	console.log(url)
	$.ajax({
		type: "get",
		url: url,
		data: content,
		success: function(data) {
			if(data.code == 1) callback(data)
			else alert(data.msg)
		}
	});
}

function postAjax(url, content, callback) {
//	content.timeStamp = parseInt(Date.parse(new Date()) / 1000 / 86400) * 86400 - 28800
	// 处理post 请求 特殊情况
	var urls = url + "?"
    if (content) {
    	for (var Key in content){
	      urls = urls +'&'+''+Key+'='+content[Key]+'';
	    }
    }
	$.ajax({
		type: "post",
		url: urls,
		data: content,
		success: function(data) {
			if(data.code == 1) callback(data)
			else alert(data.msg)
		}
	});
}

var urlSearch = location.search
var params = new Object()
if(urlSearch.indexOf("?") == 0) {
	var paramsString = urlSearch.substr(1)
	var paramLink = paramsString.split("&linkUrl=")
	params.linkUrl = paramLink[1]
	var paramsStrings = paramLink[0].split("&")
	for(var i = 0; i < paramsStrings.length; i++) {
		params[paramsStrings[i].split("=")[0]] = paramsStrings[i].split("=")[1];
	}
}

function clearBracket(aString) {
	if (aString.indexOf("(") >= 0) {
		aString = aString.replace("(", "")
		aString = aString.replace(")", "")
	}
	return aString
}


function getUserInfo (callback) {
	$.ajax({
		type: "get",
		url: "/community/user/profile",
		success: function(data) {
			if (data.code === 1) {
				callback(data.data.full_name)
			}else {
				callback("wrongmsg")
			}
		}
	});
}
