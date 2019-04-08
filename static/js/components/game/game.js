// const HP = 3
//
// export default class Game {
//     constructor(mode = 'offline', canvas) {
//         this.player = null;
//         this.interval = null;
//         this.gameState = null;
//
//         switch (mode) {
//             case 'online': {
//
//                 break;
//             }
//             case 'offline': {
//
//                 break;
//             }
//             default:
//                 throw new Error('Invalid game mode ' + mode);
//         }
//
//     }
//
//     // startGame() {
//     //     this.gameState = {
//     //         player: {
//     //             // TODO: get player's position
//     //             xpos: this.player.xpos,
//     //             hp: HP
//     //         }
//     //     };
//     //
//     //         this.ghosts =  {};
//     //     };
//     //
//     //     this.interval = setInterval(() => this.gameLoop(), 100);
//     // }
//
//     gameLoop() {
//         if (this.player.hp <= 0) {
//             this.stopGame();
//         }
//     }
//
//     stopGame() {
//         this.player = null;
//     }
//
//     /**
//      * @param {object} data - ghost.object
//      * */
//     moveObjectTo(data) {
//         if (data.speed > 0) {
//             this.gameState.xpos += data.speed * 1 // TODO: тики тут вместо единицы
//         } else if (data.speed < 0) {
//             this.gameState.xpos -= data.speed * 1 // TODO: тики тут вместо единицы
//         } else if (data.speed === 0) {
//             // TODO: остановка моба перед игроком
//         }
//     }
// }