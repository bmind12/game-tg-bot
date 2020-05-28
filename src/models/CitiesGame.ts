import rfdc from 'rfdc'
import Game from './Game'
import GameRecord from './GameRecord'
import { getLastCityFromHistory } from '../app/helpers'

const CITIES_MOCK: Cities = {
    a: ['aloha', 'ambient'],
    b: ['book', 'back', 'bright'],
    c: ['call', 'cell', 'city'],
    t: ['taoa', 'ttaob', 'ttaa', 'ttob', 'ttac', 'ttacb'],
}

export default class CitiesGame extends Game {
    private gameRecord: GameRecord
    private history: GameHistory = []

    constructor(id: number) {
        super()

        this.gameRecord = new GameRecord(id)
    }

    async start(): Promise<string> {
        const game = await this.get()
        const citiesNamed = game.history.length

        if (citiesNamed > 0) {
            return (
                BotReply.AlreadyStarted + getLastCityFromHistory(game.history)
            )
        }

        const botMove = this.handleBotMove(game?.cities)

        return botMove
    }

    async status(): Promise<Partial<GameItem>> {
        try {
            const { status, history } = await this.get()

            return { history, status }
        } catch (error) {
            console.error(error)
        }
    }

    async end(): Promise<void> {
        await this.gameRecord.delete()
    }

    private async get(): Promise<GameItem> {
        let record = await this.gameRecord.get()

        if (!record) {
            record = await this.gameRecord.add(
                GameStatus.started,
                this.history,
                rfdc()(CITIES_MOCK)
            )
        }

        this.history = record.history

        return record
    }

    private async update(data: Partial<GameItem>): Promise<void> {
        await this.gameRecord.update(data)
    }

    private async updateHistory(
        player: Player,
        cities: Cities,
        city: string
    ): Promise<void> {
        this.history.push([player, city])

        await this.update({
            cities,
            history: this.history,
        })
    }

    private handleBotMove(cities, lastLetter = 'a'): string {
        // TODO: implement random pick
        const city = cities?.[lastLetter]?.pop()

        if (!city) return this.handleLost(true)

        this.updateHistory(Player.Bot, cities, city)

        return city
    }

    private handleLost(botLost: boolean): string {
        this.update({ status: GameStatus.notStarted })

        return botLost ? BotReply.Lost : BotReply.YouLost
    }

    async handleUserMove(city: string): Promise<string> {
        const game = await this.get()
        const firstLetter = city[0]
        const cities = game.cities
        const citiesOnLetter = game.cities[firstLetter.toLowerCase()]

        if (!citiesOnLetter || citiesOnLetter.length === 0) {
            return this.handleLost(false) + firstLetter.toUpperCase()
        }

        const cityIndex = citiesOnLetter.findIndex(
            (cityItem) => city.toUpperCase() === cityItem.toUpperCase()
        )

        if (cityIndex === -1) {
            return BotReply.NoSuchCity
        }

        const lastLetter = citiesOnLetter.splice(cityIndex, 1)[0].slice(-1)
        await this.updateHistory(Player.User, cities, city)

        return this.handleBotMove(cities, lastLetter)
    }
}
