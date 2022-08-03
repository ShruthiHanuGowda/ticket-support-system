
const userModel = require('../models/userSchema').userModel;

class UserDataService {
    async addUsers(data) {
        if(Object.values(data).length !== 0) return await userModel.create(data);
    }

    async updateUser(data, id) {
        const _id = await userModel.findOne({ _id: id });
        if(_id) return await userModel.updateOne({ _id: _id }, { $set: data });
    }

    async deleteUser(id) {
        return await userModel.deleteOne({ _id: id }); 
    }
}

module.exports = new UserDataService();