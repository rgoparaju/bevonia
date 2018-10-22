var game = new Phaser.Game(1066, 500, Phaser.AUTO);
game.state.add("state1", demo.state1)
game.state.add('state4', demo.state4);
game.state.add('title', demo.title);
game.state.start('title');