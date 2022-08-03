
const { 
    successResponse, 
    successResponseWithData,
    ErrorResponse
} = require('../helpers/apiResponse');
const userDataService = require('../services/userDataService');
const express = require('express');
const { userModel } = require('../models/userSchema');
const app = express.Router();

app.get('/', async (req, res) => {
    const data = await userModel.find();

    return successResponseWithData(res, 'users array', data);
});

app.post('/', async (req, res) => {
    const data = req.body;
    try {
        if(data) {
            const user_resp = await userDataService.addUsers(data);
    
            return successResponseWithData(res, 'user added', user_resp);
        } else return successResponse(res, 'user couldnt be added');
    } catch(ex) {
        ErrorResponse(res, 'something went wrong '+ex.message);
    }
});

app.put('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        if(_id) {
            const data = req.body;
            const user_resp = await userDataService.updateUser(data, _id);
    
            return successResponseWithData(res, 'user updated', user_resp);
        } else return successResponse(res, 'sorry user couldnt be updated');
    } catch(ex) {
        ErrorResponse(res, 'something went wrong '+ex.message);
    }
});

app.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        if(_id) {
            const user_resp = await userDataService.deleteUser(_id);
    
            return successResponseWithData(res, 'user deleted', user_resp);
        } else return successResponse(res, 'sorry user couldnt be deleted');
    } catch(ex) {
        ErrorResponse(res, 'something went wrong '+ex.message);
    }
});

module.exports = app;