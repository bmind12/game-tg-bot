enum GameStatus {
    started = 'started',
    notStarted = 'notStarted',
}

enum Player {
    Bot,
    User,
}

;(global as Global).GameStatus = GameStatus
;(global as Global).Player = Player
