const express = require("express");
const https = require("node:https");


/**
 * 
 * @param {express.Request} req
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const getTimeZoneController = (req, res, next) => {
    const { query } = req.query;

    https.get(`https://savvytime.com/api/search/timezone?query=${query}`, (response) => {

        const result = []

        response.on("data", (chunk) => result.push(chunk))

        response.on("end", () => {
            const data = JSON.parse(Buffer.concat(result).toString())
            console.log(data);

            res.status(200).json(data);
        })

        response.on("error", (err) => {
            console.log(err)
            res.status(response.statusCode || 500).json(err)
        })

    })
}


module.exports = { getTimeZoneController }