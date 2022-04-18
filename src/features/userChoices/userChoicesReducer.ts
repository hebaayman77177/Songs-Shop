/* eslint-disable @typescript-eslint/default-param-last */

import { ALTER_ALBUM, ALTER_SINGER, ALTER_SONG } from './actionTypes'
import { SongsChoicesDec, UserChoicesActionTypes, userChoicesState } from '../types'
import _ from "lodash"

const initialState: userChoicesState = {
  singers: {},
  albums: {},
  songs: {},
  songsCount: 0,
  accumelatedPrice: 0
}

const alterSinger = (state: userChoicesState, singerId: number, choice: boolean): userChoicesState => {
  const newState = _.cloneDeep(state)
  newState.singers[singerId] = choice
  newState.albums = {};
  newState.songs = {}
  newState.accumelatedPrice = 0;
  newState.songsCount = 0
  return newState
}

const alterAlbum = (state: userChoicesState, albumId: number, choice: boolean): userChoicesState => {
  const newState = _.cloneDeep(state)
  newState.albums[albumId] = choice
  newState.songs = {}
  newState.accumelatedPrice = 0;
  newState.songsCount = 0
  return newState
}


const calculateAccumelated = (songsDec: SongsChoicesDec): {
  songsCount: number,
  accumelatedPrice: number
} => {
  let songsCount = 0, accumelatedPrice = 0;
  for (const [, choice] of Object.entries(songsDec)) {
    if (choice.choosen) {
      songsCount += 1;
      accumelatedPrice += choice.price
    }
  }
  return { songsCount, accumelatedPrice }
}

const alterSong = (state: userChoicesState, songId: number, choice: {
  choosen: boolean,
  price: number
}): userChoicesState => {
  const newState = _.cloneDeep(state)
  newState.songs[songId] = choice
  const { songsCount, accumelatedPrice } = calculateAccumelated(newState.songs)
  newState.songsCount = songsCount;
  newState.accumelatedPrice = accumelatedPrice;
  return newState
}



export default (state = initialState, action: UserChoicesActionTypes) => {
  switch (action.type) {
    case ALTER_SINGER:
      return alterSinger(state, action.payload.id, action.payload.choice)
    case ALTER_ALBUM:
      return alterAlbum(state, action.payload.id, action.payload.choice)
    case ALTER_SONG:
      return alterSong(state, action.payload.id, action.payload.choice)
    default:
      return state
  }
}
