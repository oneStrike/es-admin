import { systemConfigApi, systemUpdateApi } from './core';
import { badgesPageApi as appUsersBadgesPageApi } from './core/app-users/badges';

export * from './core';
export * as Api from './core';



export {
  appPageDeleteApi as appPageBatchDeleteApi,
  appPageDetailApi as appPageDetailByIdApi,
  authorUpdateRecommendedApi as authorUpdateIsRecommendedApi,
  keyPublicApi as authPublicKeyApi,
  tokenRefreshApi as authRefreshTokenApi,
  categorySwapSortOrderApi as categoryOrderApi,
  comicChapterContentClearApi as chapterContentClearApi,
  comicChapterContentDeleteApi as chapterContentDeleteApi,
  comicChapterContentListApi as chapterContentListApi,
  comicChapterContentMoveApi as chapterContentMoveApi,
  comicChapterCreateApi as chapterCreateApi,
  comicChapterDeleteApi as chapterDeleteApi,
  comicChapterDetailApi as chapterDetailApi,
  comicChapterPageApi as chapterPageApi,
  comicChapterSwapSortOrderApi as chapterSwapSortOrderApi,
  comicChapterUpdateApi as chapterUpdateApi,
  itemListApi as dictionaryAllItemsApi,
  itemCreateApi as dictionaryCreateItemApi,
  itemDeleteApi as dictionaryDeleteItemApi,
  itemSwapSortOrderApi as dictionaryItemOrderApi,
  itemPageApi as dictionaryItemsApi,
  itemUpdateApi as dictionaryUpdateItemApi,
  itemUpdateStatusApi as dictionaryUpdateItemStatusApi,
  experienceRulesCreateApi as experienceRulesRulesCreateApi,
  experienceRulesDeleteApi as experienceRulesRulesDeleteApi,
  experienceRulesDetailApi as experienceRulesRulesDetailApi,
  experienceRulesPageApi as experienceRulesRulesPageApi,
  experienceRulesUpdateApi as experienceRulesRulesUpdateApi,
  pointsRulesCreateApi as pointsRulesRulesCreateApi,
  pointsRulesDetailApi as pointsRulesRulesDetailApi,
  pointsRulesPageApi as pointsRulesRulesPageApi,
  pointsRulesUpdateApi as pointsRulesRulesUpdateApi,
  statsFullApi as statisticsFullApi,
  apiHealthApi as systemHealthApi,
  apiReadyApi as systemReadyApi,
  tagSwapSortOrderApi as tagOrderApi,
  passwordChangeApi as userChangePasswordApi,
  systemUserProfileApi as userInfoApi,
  systemUserDetailApi as userInfoByIdApi,
  systemUserPageApi as userPageApi,
  systemUserCreateApi as userRegisterApi,
  passwordResetApi as userResetPasswordApi,
  comicCreateApi as workCreateApi,
  comicDeleteApi as workDeleteApi,
  comicDetailApi as workDetailApi,
  comicPageApi as workPageApi,
  comicUpdateApi as workUpdateApi,
  comicUpdateHotApi as workUpdateHotApi,
  comicUpdateNewApi as workUpdateNewApi,
  comicUpdateRecommendedApi as workUpdateRecommendedApi,
  comicUpdateStatusApi as workUpdateStatusApi,
} from './core';

export {
  badgesAssignApi as appUsersBadgesAssignApi,
  badgesPageApi as appUsersBadgesPageApi,
  badgesRevokeApi as appUsersBadgesRevokeApi,
  appUsersPasswordResetApi,
  recordPageApi as appUsersPointRecordPageApi,
  profileUpdateApi as appUsersProfileUpdateApi,
} from './core';

export {
  badgesAssignApi,
  badgesCreateApi,
  badgesDeleteApi,
  badgesDetailApi,
  badgesPageApi,
  badgesRevokeApi,
  badgesUpdateApi,
  badgesUpdateStatusApi,
} from './core/growth/badges';

export async function badgesUsersApi(params: Record<string, any>) {
  return appUsersBadgesPageApi({
    userId: params.userId ?? 0,
    ...params,
  } as any);
}

export async function configGetApi() {
  return systemConfigApi();
}

export async function configUpdateApi(params: any) {
  await systemUpdateApi(params);
  return systemConfigApi();
}

export async function configResetApi() {
  return systemConfigApi();
}

export async function configHistoryApi() {
  return [] as any[];
}

export async function configRestoreApi(_params: { id: number }) {
  return true;
}

export async function configDeleteApi(_params: { id: number }) {
  return true;
}

export {
  profileUpdateApi,
  profileUpdateApi as userUpdateInfoApi,
} from './core/system-user/profile';
