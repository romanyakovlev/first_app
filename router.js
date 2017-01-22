var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controllers = require('./controllers');

var news = new controllers.news();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', news.getAllNews);
router.post('/addNews', news.addNews);
router.post('/deleteNews', news.deleteNews);
router.post('/updateNews', news.updateNews);

module.exports = router;
