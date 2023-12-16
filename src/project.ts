import { makeProject } from "@motion-canvas/core";

import graph from "./scenes/graph?scene";
import table from "./scenes/table?scene";
import example from "./scenes/example?scene";

import audio from "../audio/audio.mp3";

export default makeProject({
    scenes: [graph, table, example],
    audio,
});
