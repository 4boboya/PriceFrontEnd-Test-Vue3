import { IHotGame, IGame, IResApiGame, ISiteGameDtos, IWSData, IWSPlayByPlay } from "@/type/Game"
import { IStringDict } from "@/type/Global"
import vuex from "@/store"

export const tidyData = (gameDtos: Array<IResApiGame>): void => {
    const hotGames: IHotGame = {};
    const gameMapping: IStringDict = {};
    gameDtos.forEach((item: IResApiGame) => {
        hotGames[item.gameID] = {} as IGame;
        hotGames[item.gameID].GameID = item.gameID;
        hotGames[item.gameID].GameDate = item.gameDate.replace("-", "*").replace(/20.+\*/, "").replace("-", "/");
        hotGames[item.gameID].GameTime = item.gameTime;
        hotGames[item.gameID].League = item.league;
        hotGames[item.gameID].TeamH = item.team1;
        hotGames[item.gameID].TeamA = item.team2;
        hotGames[item.gameID].ScoreH = item.score1;
        hotGames[item.gameID].ScoreA = item.score2

        item.siteGameDtos.forEach((siteGame: ISiteGameDtos) => {
            if (siteGame.site.includes('bet365')) {
                gameMapping[siteGame.gameID] = item.gameID
            }
        })
    })
    vuex.dispatch("HotGame/SetHotGames", hotGames)
    vuex.dispatch("HotGame/SetSiteGameMapping", gameMapping)
}

export const tidyWSData = (wsDataStr: string): void => {
    if (wsDataStr.includes('DeCompress Error')) return
    const wsData = JSON.parse(wsDataStr);
    const siteGames: Array<IWSData> = wsData.SiteGames;
    const hotGameDatas: IHotGame = JSON.parse(JSON.stringify(vuex.getters["HotGame/GetHotGames"])) as IHotGame
    if (siteGames.length <= 0) return
    const gameMapping = vuex.getters["HotGame/GetSiteGameMapping"]
    siteGames.forEach((siteGame: IWSData) => {
        const GID = gameMapping[siteGame.GameID]
        if (GID == undefined) return
        hotGameDatas[GID].ScoreH = getScore(hotGameDatas[GID].ScoreH, siteGame.Score1)
        hotGameDatas[GID].ScoreA = getScore(hotGameDatas[GID].ScoreA, siteGame.Score2)
        if ((siteGame.Site == "bet365.com" || siteGame.Site == "ku888") && siteGame.GameStatus == 'InProgress' && siteGame.PlayByPlay != null) {
            siteGame.PlayByPlay.forEach((playByPlay: IWSPlayByPlay) => {
                if (playByPlay.Key != 'Time') return
                hotGameDatas[GID].GameDate = ''
                hotGameDatas[GID].GameTime = playByPlay.Value
            })
        }
    })

    vuex.dispatch("HotGame/SetHotGames", hotGameDatas) 
}

const getScore = (original: number, newSorce: number): number => {
    if (original > newSorce) return original
    else return newSorce
}