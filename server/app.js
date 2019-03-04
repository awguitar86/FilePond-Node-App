const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const port = 8080;
const Converter = require("csvtojson").Converter;
const converter = new Converter({});

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(cookieParser())
app.use(fileUpload())
app.use('/public', express.static(__dirname + '/public'))

app.post('/upload', (req, res, next) => {
  console.log(req.files.file);
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function () {
      // if (err) {
      //   return res.status(500).send(err)
      // }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    }
  )
  console.log(`${__dirname}/public/files/${fileName}`);
})

app.get('./getFile', (req, res, next) => {
  const file = `${__dirname}/public/files/Fall2019.csv`;
  file.then( promise => res.status(200).send(promise)).catch( err => res.status(500).send(err));
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () =>
    console.log(`===================================\n Server is listening on port ${port}.\n===================================`
));

module.exports = app
