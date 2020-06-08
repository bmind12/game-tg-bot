enum BotReply {
    Lost = 'Я проиграл 😭',
    AlreadyStarted = 'Игра уже началась, последний город был: ',
    DontKnowCommand = 'Я не знаю команду 😞.',
    NotStartedYet = 'Игра еще не началась, начни игру командой /start',
    WrongLetter = 'Нужно назвать город начинающийся на букву: ',
    NoSuchCity = 'Такого города нет',
    YouLost = 'Ты проиграл, больше нет городов на букву ',
}

enum CollectionName {
    Cities = 'cities',
    Games = 'games',
}

enum GameStatus {
    started = 'started',
    notStarted = 'notStarted',
}

enum Player {
    Bot,
    User,
}

;(global as Global).BotReply = BotReply
;(global as Global).CollectionName = CollectionName
;(global as Global).GameStatus = GameStatus
;(global as Global).Player = Player
