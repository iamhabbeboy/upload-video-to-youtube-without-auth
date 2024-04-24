const { google } = require("googleapis");
import fs from "fs";
const client = new google.auth.OAuth2(
  "<CLIENT_ID>",
  "<CLIENT_SECRET>",
  "http://localhost",
);
client.setCredentials({
  refresh_token: "<REFRESH_TOKEN",
});

const youtube = google.youtube({
  version: "v3",
  auth: client,
});

async function uploadVideo() {
  try {
    const video = await youtube.videos.insert({
      part: "snippet,status",
      resource: {
        snippet: {
          title: "Matrix",
          description: "This is a sample youtube video",
          tag: "",
        },
        status: {
          privacyStatus: "private", //private, Unlisted
        },
      },
      media: {
        body: fs.createReadStream(
          "mixkit-a-laptop-and-four-screens-running-green-text-scripts-50749-medium.mp4",
        ),
      },
    });
    console.log("Video uploaded successfully!");
    console.log(video);
  } catch (e) {
    console.log("Error occured while uploading video: ", e);
  }
}

uploadVideo();
