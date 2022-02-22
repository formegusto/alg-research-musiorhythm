import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";

dotenv.config();

(async function _process() {
  try {
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

    const catItems = await client.get("/browse/categories/toplists/playlists");
    const playlistId = catItems.data.playlists.items[0].id;

    const tracks = await client.get(
      `/playlists/${playlistId}/tracks?${qs.stringify({
        fields: "items(track(id, name, artists))",
        market: "KR",
      })}`
    );

    console.log(tracks.data.items);
  } catch (err) {
    console.error(err);
  }
})();
