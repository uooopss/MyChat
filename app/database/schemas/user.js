'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
//для хеширования и хранения паролей

const SALT_WORK_FACTOR = 10;
//фактор работы или количество раундов обработки данных. используется в хэшировании

var userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: { type: String, default: null }
})

userSchema.pre('save', function(next) {
    var user = this;

    //если пароль изменили меняем хэш
    if(!user.isModified('password')) return next();

    //генерируем наш salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        //пароль будет использовать новый хэш составленный из salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);

            //переписываем наш прошлый хэш новым
            user.password = hash;
            next();
        });
    });
});

//метод для сравнения введенного пороля и пороля в базе данных
userSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function (err, res) {
        if(err) return callback(err);
        callback(null, res);
    });
};

//создаем модель юзер
var userModel = mongoose.model('user', userSchema);

module.exports = userModel;