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
// placeholde
function placeHolder () {
  // $("#reg-phone").val("手机号")
  // $("#reg-sms_code").val("验证码")
  // $("#reg-password").val("密码")

  // $("#reg-real_name").val("用户姓名")
  // $("#reg-company").val("公司名称")
  // $("#reg-city").val("选择城市")
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

 function cityGet () {

    getAjax('/community/address/selector', '', function(res) {
      console.log(res)
  })
 }

$("#delegate-btn").on('click', function () {
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
$("#reg-registbtn").on('click', function (event) {
      event.preventDefault();
      // _phone
      var _phones = $.trim($("#reg-phone").val())
      var _sms_code = $.trim($("#reg-sms_code").val()) 
      var _password = $.trim($("#reg-password").val())

      var _real_name = $.trim($("#reg-real_name").val())
      var _company = $.trim($("#reg-company").val())
      var _area = $.trim($("#reg-city").val())
      
      if (_phones.length < 1) {
        alert('请输入手机号')
        return
      }
      else if (_sms_code.length < 1) {
        alert('请输入验证码')
        return
      }
      else if (_password.length < 1) {
        alert('请输入密码')
        return
      }
      else if (_real_name.length < 1) {
        alert('请输入姓名')
        return
      }
      else if (_company.length < 1) {
        alert('请输入公司名称')
        return
      }
      else if (_area.length < 1) {
        alert('请选择城市')
        return
      }
      else if (!$("#reg-checked").attr("checked")) {
        alert('必须同意注册协议')
        return
      }

      var commpany_type = $(".type-selected").text()
      var _resetobj = {
        phone: _phones,
        sms_code:_sms_code,
        password: _password,
        real_name:_real_name,
        company:_company,
        area:_area,
        company_type: commpany_type       
      }

      postAjax('http://www.yhcqp.com/community/user/reg', _resetobj, function(res) {
        if (res.code === 1) {
          alert('注册成功，前往登录')
          location.href = "./login.html"
        }
        else alert(res.msg)
      })
})

//初始化页面
!function initHtml(){
  buildTypes();
  placeHolder();
  cityGet();
	$(".type").first().attr("class","type-selected")
}()