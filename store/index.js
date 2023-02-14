import videos from "../assets/videos.json";

export const state = () => ({
  videos: videos,
  watchedVideos:[],
  data:[],
  step:1,
  likesStats:{
    categories:{},
    tags:{},
  }
})

export const getters = {
  getStep: (s) => s.step,
  getData: (s) => s.data,
  getLikesStats: (s) => s.likesStats,
  getRandomVideos: (state, getters) => (amount) => getRandom(getters.getUnwatchedVideos, amount),
  getVideoRecommendation(state){
    return state.videos;
  },
  getAllVideos(state) {
    return getRandom(state.videos,state.videos.length);
  },
  getUnwatchedVideos: (s) => getRandom(s.videos,s.videos.length).filter(x => !s.watchedVideos.includes(x.id)),
}

export const mutations = {
  incrementStep(state) {
    state.step ++;
  },
  incrementTag(state, {tag, value }) {
    state.likesStats.tags[tag] = (state.likesStats.tags[tag] || 0) + value ;
  },
  incrementCategory(state, {category, value }) {
    state.likesStats.categories[category] = (state.likesStats.categories[category] || 0) + value ;
  },
  addToWatched(state, id) {
    state.watchedVideos.push(id);
  },
  addToData(state, data) {
    if(Array.isArray(data))
      state.data = [...state.data, ...data];
    else
      state.data.push(data);
  }
}

export const actions = {
  async incrementStep(context) {
    // make request
    context.commit('incrementStep')
  },
  async incrementCategory(context, {category, value=1}) {
    context.commit('incrementCategory', {category, value})
  },
  async incrementTag(context, {tag, value=1}) {
    context.commit('incrementTag', {tag, value})
  },
  async watched(context, videoId) {
    context.commit('addToWatched', videoId);
  },
  addToData(context, data) {
    context.commit('addToData', data);
  }
}


function getRandom(arr, n = arr.length) {

  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
