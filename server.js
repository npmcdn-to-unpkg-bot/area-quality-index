'use strict';

let koa     = require('koa'),
    serve   = require('koa-static'),
    router  = require('koa-router')();

router.get('/api/area/:code',
    function *(next) {
        console.log(this.params);
        this.body = 'hello world';
    }
);

let app = koa();

app.use(router.routes());
app.use(serve(__dirname + '/'));
app.listen(3000);
console.log('server running on port 3000');
