import { SystemState } from '../types'

export const getTabs = (state: SystemState) => {
    return state.navigator.tabs
}
export const getCurrentTapIndex = (state: SystemState) => state.navigator.currentTapIndex
export const getCurrentTap = (state: SystemState) => state.navigator.tabs[state.navigator.currentTapIndex]


