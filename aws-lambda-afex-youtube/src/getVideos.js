"use strict"

const AWS = require('aws-sdk')

const getVideos = async (event, ctx, callback) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const result = await dynamodb.scan({
            TableName: "videos"
        }).promise().catch(err => {
            console.log("err promise: ", err)
        })

        console.log("result: ", result)

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                videos: result.Items
            })
        })
    } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ message: error.message })
        })
    }
}

module.exports = {
    getVideos
}