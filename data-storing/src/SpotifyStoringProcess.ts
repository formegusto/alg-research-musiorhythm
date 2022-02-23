import { AxiosInstance } from "axios";
import { Playlists } from "./types/playlist";
import { TracksRoot } from "./types/tracks";
import qs from "qs";
import { AudioFeatures } from "./types/audioFeatures";
import { AnalysisRoot } from "./types/audioAnalysis";

class SpotifyStoringProcess {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getPlaylistsItems(playlistName: string): Promise<Playlists> {
    const res = await this.client.get(
      `/browse/categories/${playlistName}/playlists`
    );

    return res.data.playlists as Playlists;
  }

  async getTracksByPlaylist(playlistId: string): Promise<TracksRoot> {
    const res = await this.client.get(
      `/playlists/${playlistId}/tracks?${qs.stringify({
        market: "KR",
      })}`
    );

    return res.data as TracksRoot;
  }

  async getAudioFeatures(trackId: string): Promise<AudioFeatures> {
    const res = await this.client.get(`/audio-features/${trackId}`);

    return res.data as AudioFeatures;
  }

  async getAudioAnalysis(trackId: string): Promise<AnalysisRoot> {
    const res = await this.client.get(`/audio-analysis/${trackId}`);

    return res.data as AnalysisRoot;
  }
}

export default SpotifyStoringProcess;
