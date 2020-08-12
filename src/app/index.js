const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
  console.log('Hello, World!!')
})


exports.start = async () => {
  try {
    this.server = await app.listen(8000)
  } catch (err) {
    console.log(err);
  }
}