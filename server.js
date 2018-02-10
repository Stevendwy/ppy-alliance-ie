const express = require('express')
const app = express()
const superagent = require('superagent')
const bodyParser = require('body-parser');

// const target = 'http://www.yhcqp.com'
const target = 'http://yhcqp.youfan.pub'

let cookie = ''

superagent
  .post(target + '/community/login')
  // .send({username: '15689799395', password: '123123'})
  .send({username: '18337125987', password: 'aa123456'})
  .end((err, res) => {
    // console.log(res.body)
    if(res.body.code === 1) console.log('登录成功')
    else console.log(res.body)
    // 获取 Cookie, beta 处理有问题, 需要如下处理才能登陆
    cookie = res.header['set-cookie'].toString()
    cookie = cookie.replace(/(Path=\/),/g, '$1;') // 莫名的一个逗号, 需要处理成 ';'
  })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname))
app.get('/*', (req, res) => {
  agentGet(req, res)
})

app.post('/*', (req, res) => {
  agentPost(req, res)
})

app.delete('/*', (req, res) => {
  agentDelete(req, res)
})

function agentPost(req, res) {
  superagent
    .post(target + req.url)
    .set('Content-Type', 'application/json;charset=UTF-8')    
    .set('Cookie', cookie)
    .send(req.body)
    .end((err, sRes) => {
      if(sRes.body.code !== 1) console.log(sRes.body)
      // console.log(sRes.body)
      res.set('Content-Type', 'application/json');      
      res.send(JSON.stringify(Object.assign(sRes.body, { isLocal: true }))) // 测试标记
      // res.end(JSON.stringify(sRes.body))
    })
}

function agentGet(req, res) {
  superagent
    .get(target + req.url)
    .set('Content-Type', 'application/json;charset=UTF-8')    
    .set('Cookie', cookie)
    .send(req.query)
    .end((err, sRes) => {
      // console.log(sRes.body)
      res.set('Content-Type', 'application/json');      
      res.send(JSON.stringify(Object.assign(sRes.body, { isLocal: true })))
    })
}

function agentDelete(req, res) {
  superagent
    .delete(target + req.url)
    .set('Content-Type', 'application/json;charset=UTF-8')    
    .set('Cookie', cookie)
    .send(req.body)
    .end((err, sRes) => {
      // console.log(sRes.body)
      res.set('Content-Type', 'application/json');      
      res.send(JSON.stringify(Object.assign(sRes.body, { isLocal: true })))
    })
}

app.listen(8881, '0.0.0.0', (err) => {
  if(err) console.log(err)
  else console.log('run on 0.0.0.0:8881')
})

