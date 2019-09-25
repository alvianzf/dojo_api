var mongoose = require('mongoose');
const data = require('../seeds/users');
var argon2 = require('argon2');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{timestamps: true});

async function hashPass(password) {
  try {
    const hash = await argon2.hash(password)
    return hash

  } catch (err) {
    console.log(err);
  }
}


userSchema.statics.userSeed = function(){

    let users = this
    inserted = new users(data)

    hashed = hashPass('12345').then(hash => {inserted.password = hash})

    users.find().then(res => {
        if(!res.length > 0) {
            inserted.save().then(docs => console.log('seeded', docs)).catch(err => console.log('error', err.message))
        } else {
          console.log('data already available!', res);
        }
    }).catch(err => console.log('error', err))
}
mongoose.model('Users', userSchema);
