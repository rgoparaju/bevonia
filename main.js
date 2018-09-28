var game = new Phaser.Game(1500, 608, Phaser.AUTO);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('state4', demo.state4);
game.state.start('state4');
