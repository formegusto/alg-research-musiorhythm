import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";
import SpotifyStoringProcess from "./SpotifyStoringProcess";
import mongooseInit from "./models";
import TracksModel from "./models/tracks";

dotenv.config();

(async function _process() {
  try {
    await mongooseInit();

    const TOKEN_URL = "https://accounts.spotify.com/api/token";
    const BASE_URL = "https://api.spotify.com/v1";

    const { CLIENT_ID, CLIENT_SECRET } = process.env;
    const basicToken =
      "Basic " +
      Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64");

    const res = await axios.post(
      `${TOKEN_URL}`,
      qs.stringify({
        grant_type: "client_credentials",
        scopes: "playlist-read-private",
      }),
      {
        headers: {
          Authorization: basicToken,
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = res.data.access_token;
    const client = axios.create({
      baseURL: BASE_URL,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const sa = new SpotifyStoringProcess(client);

    const playList = await sa.getPlaylistsItems("toplists");
    const playListId = playList.items[0].id;

    const tracks = await (await sa.getTracksByPlaylist(playListId)).items;
    if (tracks.length !== 0) {
      for (let i = 0; i < tracks.length; i++) {
        const saveTracks = await TracksModel.create(tracks[i]);
        const trackId = saveTracks.track.id;
        console.log(trackId);

        const features = await sa.getAudioFeatures(trackId);
        const analysis = await sa.getAudioAnalysis(trackId);

        console.log(features.id);
        console.log(analysis.meta);
      }
    }
  } catch (err: any) {
    console.error(err.response.data);
  }
})();
