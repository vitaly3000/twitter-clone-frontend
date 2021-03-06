import { LoadingStatus } from '../../types';
import {
  FetchTagsActionInterface,
  SetTagsActionInterface,
  SetTagsLoadingStateActionInterface,
  TagsActionsType,
} from './contracts/actionTypes';
import { TagsState } from './contracts/state';

export const setTags = (
  payload: TagsState['items'],
): SetTagsActionInterface => ({
  type: TagsActionsType.SET_TAGS,
  payload,
});
export const setTagsLoadingState = (
  payload: LoadingStatus,
): SetTagsLoadingStateActionInterface => ({
  type: TagsActionsType.SET_LOADING_STATE,
  payload,
});
export const fetchTags = (): FetchTagsActionInterface => ({
  type: TagsActionsType.FETCH_TAGS,
});
