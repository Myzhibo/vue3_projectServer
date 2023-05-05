/*
1.  npm install express
npm install http-proxy-middleware
npm i fs //读取文件
npm install body-parser //req.body

2.  run:  node server.js
*/
var express = require('express')
var proxy = require('http-proxy-middleware')
var fs = require('fs')
var app = express();


var bodyParser = require('body-parser')     // "body-parser" : "~1.13.2"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next)=>{
    console.log('有人请求, 请求的资源是: ', request.url)
    // console.log('请求来着于: ', request.get('Host'))
    next()
})

app.get('/',(req, res)=>{
console.log('ok');
res.send("123")
console.log('--->> ',req)
})

//读取文件
app.get('/readfile',(req, res)=>{
        fs.readFile('a.txt', 'utf8', function(err, dataStr) {
            if(err) {
                //如果读取文件失败,则err的值为错误对象,dataStr的值为 undefined
                return console.log('读取文件失败!' + err.message);
            } else {
                //如果读取文件成功 则err的值为null
                console.log('读取文件成功!' + dataStr);
            }
        })
    res.send("123")
})
//读取图片
app.get('/slider',(req, res)=>{
        fs.readFile('logo.png', 'binary', function(err, dataStr) {
            if(err) {
                //如果读取文件失败,则err的值为错误对象,dataStr的值为 undefined
                return console.log('读取文件失败!' + err.message);
            } else {
                //如果读取文件成功 则err的值为null
                console.log('读取文件成功!' + dataStr);
                res.send(dataStr)
            }
        })
})
// app.get('/slider',(req, res)=>{
//     const imageData = fs.readFileSync('logo.png', { encoding: 'base64' });
//     res.send(imageData);
// });

//aside
app.get('/aside',(req, res)=>{
    res.send([
                {title: '电影'},
                {title: '电视剧'},
                {title: '综艺'},
                {title: '动漫'},
                {title: '纪录片'},
            ])
})
//hot
app.get('/hotvideo',(req, res)=>{
    res.send([
                {pic: '衣服',title: 'NBA🔥湖人惊魂胜勇士',desc: '浓眉哥30+23统治比赛'},
                {pic: '衣服',title: '直击五一返程现场',desc: '多地人和车排起长队 网友：凌晨出门照堵不误'},
                {pic: '衣服',title: '漫长的季节-9.5分封神',desc: '近八年国产剧最高评分'},
                {pic: '衣服',title: '流浪地球2',desc: '跨星际输送核武器'},
                {pic: '衣服',title: '中国乒乓',desc: '国乒重回巅峰'},
                {pic: '衣服',title: '王牌对王牌8官宣',desc: '王牌家族回归'}
            ])
})

// login
app.post('/login',(req, res)=>{
    console.log('--->> ',req.body)
    if(req.body.username =='admin' && req.body.password =='123'){
        
        //随机生成token
        var Mock = require("mockjs");               //npm i mockjs
        var Random = Mock.Random;
        var token =  Random.id() // 身份证号

        res.send(token)
    }else{
        res.send(false)
    }

})












app.listen(5002, (err)=>{   //此时启动服务器:  http://localhost:5002/
console.log('error: ',err)
})   