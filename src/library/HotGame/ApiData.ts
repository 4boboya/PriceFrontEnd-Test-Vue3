import { IHotGame, IGame, IResApiGame, ISiteGameDtos, ITidyHotGameDataRes } from "@/type/Live"
import { IStringDict } from "@/type/Global"

export const tidyData = (gameDtos: Array<IResApiGame>): ITidyHotGameDataRes => {
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
    return { hotGames: hotGames, gameMapping: gameMapping }
}