/*
* @Author: steven
* @Date:   2018-02-01 18:30:03
* @Last Modified by:   steven
* @Last Modified time: 2018-02-02 13:41:59
*/

function selectCity (){
	
}

// 创建生成类型列表
function buildTypes (){
  	var companys = ['汽配商', '修理厂', '4S店', '其他'];
  	var companysLength = companys.length
      for(var i = 0, j = companysLength; i < j; i ++) {
        var classname  = "type" 
        var btn = "<button class=\"" + classname + "\">" + companys[i] + "</button>"
        $("#reg-types").prepend(btn) 
      }
     $(".type").on('click', function() {
		$("#reg-types button").attr("class","type")
		$(this).attr("class","type-selected")
	});
}


// sms_code
 $("#check-btn").on('click', function(event) {
 	var _phone = $.trim($("#reg-phone").val())
    var isLoop = false
    var loopTime = 60

    if(this.isLoop || _phone.length < 11) return
    else this.isLoop = true
    var _passobj = { 
      action: 'register',      
    } 
     _passobj.phone = _phone
    getAjax('/community/base/sms_code', _passobj, function(res) {
          var checkLoop = setInterval(function() {
            var _loopTime = --loopTime + 's'

            $("#check-btn").text(_loopTime)
            if(loopTime < 1) {
              loopTime = 60
              $("#check-btn").text("获取验证码")
              isLoop = false
              clearInterval(checkLoop)
            }
          }, 1000)
      })
 });

$("#reg-checked").on('click', function () {
  $(".delegate-container").css("display","block");
})

$(".d-close").on("click", function () {
  $(".delegate-container").css("display","none");
})

$(".d-check").on("click", function () {
  $(".delegate-container").css("display","none");
  $("#reg-checked").attr("checked",true);
})

//注册按钮确定
$("#reg-checked").on('click', function (event) {
      event.preventDefault();
      // _phone
      var _phones = $.trim($("#reg-phone").val())
      var _sms_code = $.trim($("#reg-sms_code").val()) 
      var _password = $.trim($("#reg-password").val())
      var _checkPassword = $.trim($("#checkpass-reset").val())
      
      if(_phones.length < 11) {
        alert('请输入手机号')
        return
      }else if(_sms_code.length < 1) {
        alert('请输入验证码')
        return
      }else if(_password.length < 1) {
        alert('请输入密码')
        return
      }else if(_checkPassword !== _password) {
        alert('请输入相同的确认密码')
        return
      }

      var _resetobj = {
          phone: _phones,
          sms_code:_sms_code,
          password: _password
      }

      postAjax('/community/user/find_pwd', _resetobj, function(res) {
        alert('修改密码成功')
        $("#login").css("display","flex")
        $("#forget").css("display","none")
      })
})

//初始化页面
!function initHtml(){
	buildTypes()
	$(".type").first().attr("class","type-selected")
}()