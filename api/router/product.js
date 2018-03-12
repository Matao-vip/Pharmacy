const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

module.exports={
    reg(app){
        // 获取首页商品数据接口
        app.get('/indexgoods',(req,res)=>{
            db.mongodb.select('indexgoods').then((result)=>{
                res.send(apiResult(result && result.length>0,result));
            })
        })
        // 获取分类页商品数据接口
        app.get('/categorys',(req,res)=>{
            db.mongodb.select('categorys').then((result)=>{
                res.send(apiResult(result && result.length>0,result));
            })
        })
        // 获取列表页商品数据接口
        app.get('/products',(req,res)=>{
            let category_id=req.query.category_id*1;
            db.mongodb.select('products',{category_id}).then(result=>{
                 res.send(apiResult(result && result.length>0,result));
            })
        })
        // 后台获取全部商品数据接口
        app.get('/admingetpro',(req,res)=>{
            var goods=[];
            db.mongodb.select('indexgoods').then((goods1)=>{
                goods=goods.concat(goods1);
                db.mongodb.select('products').then((goods2)=>{
                    goods=goods.concat(goods2);
                    res.send(apiResult(true,goods));
                })
            })
        })
        // 获取详情页商品数据接口
        app.get('/apro',(req,res)=>{
            let id = req.query.id;
            let _id = db.mongodb.objectid(id);
            db.mongodb.select('indexgoods',{_id}).then(result1=>{
                console.log(result1.length);
                if(result1.length == 0){
                    db.mongodb.select('products',{_id}).then((result2)=>{
                        res.send(apiResult(true,result2));
                    })
                }else{
                    res.send(apiResult(true,result1));
                }
            })
        })
        // 根据商品名模糊查询接口
        app.get('/fuzzy',(req,res)=>{
            let field = req.query.field.trim();
            if(field){
                let proname = new RegExp("^.*"+field+".*$",'ig');
                var data=[];
                db.mongodb.select('indexgoods',{proname}).then(data1=>{
                    data = data.concat(data1);
                    db.mongodb.select('products',{proname}).then((data2)=>{
                        data=data.concat(data2);
                        res.send(apiResult(data && data.length > 0,data));
                    })
                })
            }
        })
    }
}