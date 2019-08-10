
const mongoose = require('mongoose'); //apothikevo to mongoose

const postSchema = mongoose.Schema({  //apothikevo to pos tha ine to schema mou sto database tins mongo
  title :  { type: String, require: true },
  content: { type: String, require: true }
});

module.exports = mongoose.model('Post', postSchema); //kano export to Post me to Schema tou gia na mpori na xrisiopithi k ekso apo afto to file



