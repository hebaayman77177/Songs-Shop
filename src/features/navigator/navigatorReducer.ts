/* eslint-disable @typescript-eslint/default-param-last */

import Checkout from '../../components/Checkout/Checkout'
import ChooseAlbums from '../../components/ChooseAlbums/ChooseAlbums'
import ChooseSongers from '../../components/ChooseSingers/ChooseSingers'
import ChooseAlbumSongs from '../../components/ChooseAlbumSongs/ChooseAlbumSongs'
import { NavActionTypes, NavigatorState } from '../types'
import _ from "lodash"
import { END_NAV, NAV_BACK, NAV_NEXT } from './actionTypes'

const initialState: NavigatorState = {
  currentTapIndex: 0,
  tabs: [
    { index: 0, text: "Choose Songers", component: ChooseSongers },
    { index: 1, text: "Choose Albums", component: ChooseAlbums },
    { index: 2, text: "Choose Songs", component: ChooseAlbumSongs },
    { index: 3, text: "Checkout", component: Checkout }
  ]
}

const setBack = (currentState: NavigatorState): NavigatorState => {
  const newState = _.cloneDeep(currentState)
  if (currentState.currentTapIndex == 0) return newState
  else {
    newState.currentTapIndex = newState.currentTapIndex - 1
    return newState
  }
}
const setNext = (currentState: NavigatorState): NavigatorState => {
  const newState = _.cloneDeep(currentState)
  if (currentState.currentTapIndex == newState.tabs.length - 1) return newState
  else {
    newState.currentTapIndex = newState.currentTapIndex + 1
    return newState
  }
}
const endNav = (currentState: NavigatorState): NavigatorState => {
  const newState = _.cloneDeep(currentState)
  newState.currentTapIndex = newState.tabs.length
  return newState
}



export default (state = initialState, action: NavActionTypes) => {
  switch (action.type) {
    case NAV_BACK:
      return setBack(state)
    case NAV_NEXT:
      return setNext(state)
    case END_NAV:
      return endNav(state)
    default:
      return state
  }
}
