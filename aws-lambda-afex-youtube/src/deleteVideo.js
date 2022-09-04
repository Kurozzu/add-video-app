"use strict"

const AWS = require('aws-sdk')

const deleteVideo = async (event, ctx, callback) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const {id} = event.pathParameters

        await dynamodb.delete({
            TableName: 'videos',
            Key: {
                id
            }
        }).promise()

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: 'Video eliminado' })
        })

    } catch(error) {
        console.log(error)
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ message: error.message })
        })
    }
}

module.exports = {
    deleteVideo
}