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
const getAllUserData = async(req, res ,next) =>{
    console.log("getAllUserData")
    const data = await userModel.find();

    return successResponseWithData(res, 'users array', data);
}
// app.post('/', async (req, res) => {
//     console.log("addd userr")
//     const data = req.body;
//     try {
//         if(data) {
//             const user_resp = await userDataService.addUsers(data);    
//             return successResponseWithData(res, 'user added', user_resp);
//         } else return successResponse(res, 'user couldnt be added');
//     } catch(ex) {
//         ErrorResponse(res, 'something went wrong '+ex.message);
//     }
// });

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

const addUser = async (req,res) =>{
    const {name,email,department,position,role,password}= req.body;
    let user ;
        try{
            user = new userModel({
                name,
                email,
                department,
                position,
                role,
                password
    
            });
            await user.save();
        }catch(err){
            console.log(err);
    
        }
        if(!user){
            return res.status(500).json({message:'unable to add'})
        }
        return res.status(201).json({user,message:'User Add Susscesfully'});

}
 exports.addUser= addUser;
 exports.getAllUserData =getAllUserData;
//   module.exports = app;