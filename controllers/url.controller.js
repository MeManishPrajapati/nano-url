const { ObjectId } = require('mongodb');
const UrlModel = require('../models/Url.model')

exports.getOriginalUrl = async (req, res) => {
    const { nano_url } = req.params;
    const stored_url = await UrlModel.findOne({
        nano_url
    })
    if(stored_url){
        return res.redirect(302, stored_url.url);
    }
    res.status(404).json({
        not_Found: true,
        failed: true
    })
}


const checkIfUrlExist = async (url) => {
    const existing_url = await UrlModel.findOne({
        url
    })
    return existing_url
}

exports.generateNanoUrl = async (req, res) => {
    const exist = await checkIfUrlExist(req.body.url);
    if(exist){
        return res.json({
            success: true,
            exist: true,
            ...exist.toJSON()
        })
    }
    const objectId = new ObjectId();
    // Convert the ObjectId to Base64
    const base64Id = Buffer.from(objectId.toHexString(), 'hex').toString('base64')
    .replace(/\//g, '_')    // Replace '/' with '_'
    .replace(/\+/g, '-')    // Replace '+' with '-'
    .replace(/=+$/, '');    // Remove any trailing '=' characters
    
    const new_entry = new UrlModel({
        _id: objectId,
        nano_url: base64Id,
        url: req.body.url
    })

    const saved_url = await new_entry.save();

    res.json({
        success: true,
        ...saved_url.toJSON()
    })
}