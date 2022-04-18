import { END_NAV, NAV_BACK, NAV_NEXT } from './navigator/actionTypes'
import { ALTER_ALBUM, ALTER_SINGER, ALTER_SONG } from './userChoices/actionTypes'


interface NavNextAction {
  type: typeof NAV_NEXT
}
interface NavBackAction {
  type: typeof NAV_BACK
}
interface NavEndAction {
  type: typeof END_NAV
}

export type NavActionTypes = NavNextAction | NavBackAction | NavEndAction

interface AlterSinger {
  type: typeof ALTER_SINGER
  payload: {
    id: number,
    choice: boolean
  }
}
interface AlterAlbum {
  type: typeof ALTER_ALBUM,
  payload: {
    id: number,
    choice: boolean
  }
}
interface AlterSong {
  type: typeof ALTER_SONG,
  payload: {
    id: number,
    choice: { choosen: boolean, price: number }
  }
}

export type UserChoicesActionTypes = AlterSinger | AlterAlbum | AlterSong


export type Tap = {
  index: number,
  text: string,
  component: any
}

export interface NavigatorState {
  currentTapIndex: number,
  tabs: Tap[]
}

export type GeneralChoicesDec = { [key: number]: boolean }
export type SongsChoicesDec = { [key: number]: { choosen: boolean, price: number } }
export interface userChoicesState {
  singers: GeneralChoicesDec,
  albums: GeneralChoicesDec,
  songs: SongsChoicesDec,
  songsCount: number,
  accumelatedPrice: number
}


export interface SystemState {
  navigator: NavigatorState,
  userChoices: userChoicesState
}

export type SupmittionData = { name: string, email: string, phone: string } | null
