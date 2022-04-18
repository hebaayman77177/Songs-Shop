import { SystemState } from '../types'
export const getSingerChoices = (state: SystemState) => state.userChoices.singers
export const getAlbumChoices = (state: SystemState) => state.userChoices.albums
export const getSongsChoices = (state: SystemState) => state.userChoices.songs
export const getTotalPrice = (state: SystemState) => state.userChoices.accumelatedPrice
export const getNumOfSongs = (state: SystemState) => state.userChoices.songsCount


