//Model
const userSchema = require('../../model/User');

const userUniqueControl = (userName) => {
    return new Promise((resolve, reject) => {
        userSchema.findOne({ 'userName' : userName }, (error, data) => {
            if(error)
                reject(error)
    
            resolve(data)
    
        })

    });
    
}

module.exports = userUniqueControl;