const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: '',
        required: false
    },
    dob: {
        type: Date,
        required: false,
        default: ''
    },
    bio: {
        type: String,
        required: false,
        default: '',
        maxlength: 200
    },
    profileImageURL: {
        type: String,
        default: "",
        required: false
    },
    coverImageURL: {
        type: String,
        default: "",
        required: false
    },
    followers: {
        type: Array,
        required: false,
        default: []
    },
    following: {
        type: Array,
        required: false,
        default: []
    },
    posts: {
        type: Array,
        required: false,
        default: []
    },
    isPrivate: {
        type: Boolean,
        required: false,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
});

UserSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next();
  });
  
  // fire a function before doc saved to db
  UserSchema.pre('save', function (next) {
    console.log('user about to be created & saved', this);
    next();
  });

module.exports = mongoose.model('user', UserSchema);