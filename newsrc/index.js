'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _express = _interopRequireDefault(require('express'))

var _bodyParser = _interopRequireDefault(require('body-parser'))

var _dotenv = _interopRequireDefault(require('dotenv'))

var _controllers = require('./controllers')

var _makeCallback = _interopRequireDefault(require('./express-callback/makeCallback'))

var _swaggerUiExpress = _interopRequireDefault(require('swagger-ui-express'))

var _swaggerJsdoc = _interopRequireDefault(require('swagger-jsdoc'))

var _serverlessHttp = _interopRequireDefault(require('serverless-http'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

_dotenv.default.config()

const app = (0, _express.default)()

const router = _express.default.Router()

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Message Api for the General Mobile application',
      contact: {
        name: 'Adewumi Sunkanmi',
        email: 'sunkanmiadewumi1@gmail.com',
        phone_number: '0703185081'
      },
      description: `This api was designed to handle every request from to the Generals Mobile application.
       
      TECHNOLOGY USED :

      > Language - Nodejs,

      > Framework - Express.js,

      > Version Control - Git and Git Hub,

      > Database - MongoDB,

      > ODM(Object Document Mapper) - MongoDB driver,

      > Testing tool-Jest,

      > Convention - eslint,

      > Documentation - Swagger,
      `,
      servers: ['http://localhost:9000']
    }
  },
  apis: ['index.js']
}
const swaggerDocs = (0, _swaggerJsdoc.default)(swaggerOptions)

app.use(_bodyParser.default.json())
app.use(_bodyParser.default.urlencoded({
  extended: false
}))
const PORT = process && process.env && process.env.PORT || '3000'
const endpoint = process && process.env && process.env.endpoint || '/messageapi'
app.listen(PORT, () => {
  console.log(`Message Miscroservice Listening at Port ${PORT}`)
})
router.use(`/docs`, _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocs))
router.get(`${endpoint}/`, (req, res) => {
  res.status(200).send('hitting me')
}) // app.all('/*', (req, res) => {
//   res.send('hello from' + process.pid)
// })

router.get(`${endpoint}/l`, (req, res) => {
  console.log('listening')
})
/**
* @swagger
* /getmessage/:id :
*    get:
*       tags:
*         - Handles fetching a particular message
*       parameters:
*         - name : id
*           description: This is the unique identifires that would be used to query the database
*           required: true
*
*       description:  >
*          This endpoint returns a particular message object based on the id that was passed as a parameter,,
*           this would return a status 200 if a mesage was found and 400 if not
*       responses:
*         '200':
*             description:
*                The request is succesfull and the message is returned
*             content:
*                application/json
         '500':
             description: An internal server Error occured

*
*/

router.get(`${endpoint}/getmessage/:id`, (0, _makeCallback.default)(_controllers.getMessageController))
/**
* @swagger
* /.netlify/functions/index/messageapi/listmessages :
*    get:
*       tags:
*         - Handles the fetching of all the message objects
*       description: This endpoint returns all messages stored
*       responses:
*         '200':
*             description: The request is succesfull and all messages is returned
         '500':
             description: An internal server Error occured
*
*/

router.get(`${endpoint}/listmessages`, (0, _makeCallback.default)(_controllers.listMessagesController))
/**
* @swagger
* /.netlify/functions/index/messageapi/editmessage/:id :
*    patch:
*       tags:
*         - Handles editing a particular message
*       parameters:
*         - name : id
*           description: This is the unique identifier that would be used to quesry the message object to edit
*           required: true
*       description: This endpoint provide the functionality to edit message
*       responses:
*         '200':
*             description: The request is succesfull the message was edited successfully
*             content : application/json
         '500':
             description: An internal server Error occured
*
*/

router.patch(`${endpoint}/editmessage/:id`, (0, _makeCallback.default)(_controllers.editMessageController))
/**
* @swagger
* /.netlify/functions/index/messageapi/deletemessage/:id :
*    delete:
*       tags:
*          - Handles the deletion of a message
*       parameters:
*         - name : id
*           description: This is the identifier  that would be used to fetch the message that would be deleted
*           required: true
*       description: This endpoint handles the deletion of message from the database
*       responses:
*         '200':
*             description: this returns an object that  indicates a successfull deletion
*             content: application/json
*
         '500':
             description: An internal server Error occured
*
*/

router.delete(`${endpoint}/deletemessage/:id`, (0, _makeCallback.default)(_controllers.deleteMessageController))
/**
* @swagger
* /.netlify/functions/index/messageapi/addmessage:
*    post:
*       tags:
*          - Handles the adding of message to the database
*       description: This endpoint handles the addition of message to the database
*       responses:
*         '200':
*             description: this returns an object that contains the new message just added
*             content: application/json
*
         '500':
             description: An internal server Error occured
*
*/

router.post(`${endpoint}/addmessage`, (0, _makeCallback.default)(_controllers.putMessageController))
/**
* @swagger
* /.netlify/functions/index/messageapi/downloadmessage/:id/:play :
*    get:
*       tags:
*         - Handles downloading of message or streaming a message
*       parameters:
*         - name : id
*           description: This is the unique identifier that would be used to query the database
*           required: true
*         - name : play
*           description: This sholud be set to **true** if you want the message to play
*           required: false
*
*       description:  >
*          This endpoint returns a particular message object
*          based on the id that was passed as a parameter, and gives a page to download the message locally or play the message
*       responses:
*         '200':
*             description:
*                This means a successful request andit return a static HTML page either to download or play the message based on the play parameter
*             content:
*                application/json
         '500':
             description: An internal server Error occured

*
*/

router.post(`${endpoint}/feedback`, (0, _makeCallback.default)(_controllers.handlesFeedBackController))
router.get(`${endpoint}/download/:id/:play`, (0, _makeCallback.default)(_controllers.downloadMesageController))
app.use('/.netlify/functions/index', router)

module.exports.handler = (0, _serverlessHttp.default)(app)
