import { $priceCenterSite } from './html';
import { IReqApiLiveGame } from '@/type/Live'
export const HotGame = async () => {
    const hotGameData = await $priceCenterSite('GET', '/game/hotgame', {});
    return hotGameData;
}

export const LiveGame = async (requestData: IReqApiLiveGame) => {
    const liveGameData = await $priceCenterSite('GET', '/game/gamedata', {query: requestData});
    return liveGameData;
}