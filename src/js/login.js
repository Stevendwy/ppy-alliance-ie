!function () {
  getAjax('http://www.yhcqp.com/system/members', "", function (res) {
    if(!res.data) return
      let companysDOM = document.getElementById('companys')
      let companys = res.data
      let companysLength = companys.length
      for(let i = 0, j = (parseInt(companys.length / 6) + 1) * 6; i < j; i ++) {
        let isEmpty = i >= companysLength
        let company = isEmpty ? { name: '敬请期待' } : companys[i]

        let li = ""
        let className = ""
        if(parseInt(i / 6) % 2 === 1) {
          className = "even-row"
          if(isEmpty) className += ' empty'
        }
        else {
          className = "uneven-row"
          if(isEmpty) className += " empty"
        }
        li = "<li class=\"" + className + "\">" + company.name + "</li>"
        companysDOM.innerHTML += li
      }
  })
}()

var local = ["ppy-alliance-username","ppy-alliance-password"]
var _username = localStorage.getItem(local[0]) || $('#username').val()
var  _password = localStorage.getItem(local[1]) || $('#password').val() 
  $('#username').val(_username)
  $('#password').val(_password)
$('#username').bind('input propertychange', function() {  
    _username = $('#username').val() 
});

$('#password').bind('input propertychange', function() {  
    _password = $('#password').val()
});

 /*===============*/
 //login
 $("#login-btn").on('click', function(event) {
      event.preventDefault();
      if(_username.length < 1) {
          alert('请输入用户名')
          return
      }
      if(_password.length < 1) {
          alert('请输入密码')
          return
      }
      var _url = "http://www.yhcqp.com/community/login"
      var _obj = {
          username: _username,
          password: _password
      }

      postAjax(_url, _obj, function(res) {
        if ($('#remeber-password').attr('checked')) {
            localStorage.setItem(local[0],_username)
            localStorage.setItem(local[1],_password)
        }
          // location.href = "/"
      })
 }); 
 // regist
 $("#regist-btn").on('click', function(event) {
   event.preventDefault();
   location.href='/regist.html'
 });
 // forget
 $("#forget-btn").on('click',  function(event) {
   event.preventDefault();
   $("#login").css("display","none")
   $("#forget").css("display","flex")
 });

 $("#back-btn").on('click', function(event) {
   event.preventDefault();
   $("#login").css("display","flex")
   $("#forget").css("display","none")
 });

 // check
 var _phone = localStorage.getItem('ppy-alliance-username') || $.trim($("#phone-reset").val())
 $("#check-btn").on('click', function(event) {
    event.preventDefault();
    var isLoop = false
    var loopTime = 60
    
    if(this.isLoop || _phone.length < 11) return
    else this.isLoop = true

    var _passobj = { 
      action: 'findpwd',      
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
 
 // 重置密码
  $("#submit-btn").on('click', function(event) {
      event.preventDefault();
      // _phone
      var _sms_code = $.trim($("#code-reset").val()) 
      var _password = $.trim($("#pass-reset").val())
      var _checkPassword = $.trim($("#checkpass-reset").val())
      
      if(_phone.length < 11) {
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
          phone: _phone,
          sms_code:_sms_code,
          password: _password
      }

      postAjax('/community/user/find_pwd', _resetobj, function(res) {
        alert('修改密码成功')
        $("#login").css("display","flex")
        $("#forget").css("display","none")
      })
 }); 
