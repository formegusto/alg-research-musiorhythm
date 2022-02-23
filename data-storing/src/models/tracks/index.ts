import { model, Schema } from "mongoose";
import { Item } from "../../types/tracks";

const schema = new Schema<Item>(
  {
    added_at: { type: String },
    is_local: { type: Boolean, required: true },
    primary_color: { type: String },
    track: { type: Object, required: true },
    video_thumbnail: { type: Object, required: false },
  },
  {
    collection: "tracks",
  }
);

const TracksModel = model("tracks", schema);
export default TracksModel;
