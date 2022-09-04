"use strict"

const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const axios = require('axios')

const createVideo = async (event, ctx, callback) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const { url } = JSON.parse(event.body)
        const id = v4()
        const key = url.includes('list=') ? url.split("v=")[1].split("&list")[0] : url.split("v=")[1]
        const newVideo = new Object()

        await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${key}&key=AIzaSyC5CPFHBFKtzPXSV0pMdG_djB5bjFYOkYI&part=snippet,contentDetails,player`)
        .then(res => {
            let snippet = res.data.items[0].snippet
            let contentDetails = res.data.items[0].contentDetails
            let player = res.data.items[0].player

            newVideo.id = id
            newVideo.title = snippet.title
            newVideo.thumbnails = snippet.thumbnails
            newVideo.description = snippet.description
            newVideo.url = url
            newVideo.key = key
            newVideo.embed = "https:"+player.embedHtml.replace("\\", '').split(" ")[3].split("=")[1].replace(new RegExp('\"', 'g'), '')
            newVideo.duration = contentDetails.duration.replace("PT", "")
                                    .replace("H", ":")
                                    .replace("M", ":")
                                    .replace("S", "")
        });

        await dynamodb.put({
            TableName: 'videos',
            Item: newVideo
        }).promise().catch(err => {
            console.log("err promise: ", err)
        })

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(newVideo)
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
    createVideo
}