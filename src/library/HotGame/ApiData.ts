import { IHotGame, IGame, IResApiGame, ISiteGameDtos } from "@/type/Game"
import { IStringDict } from "@/type/Global"
import vuex from "@/store"

export const tidyData = (gameDtos: Array<IResApiGame>) => {
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