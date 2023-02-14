import videos from '../assets/videos.json';
import {readdirSync} from "fs"
const dir = '../static/video_src'
const files = readdirSync(dir).map(x => x.slice(0, -4))
const ids = videos.map(x => x.id)

const videosWithoutFile = ids.filter(x => !files.includes(x))
const filesWithoutVideos = files.filter(x => !ids.includes(x))


console.log(videosWithoutFile)
console.log(filesWithoutVideos)
