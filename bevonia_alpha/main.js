var game = new Phaser.Game(1066, 500, Phaser.AUTO);
game.state.add("art", demo.art);
game.state.add("classes", demo.classes);
game.state.add("title", demo.title);
game.state.add("cutscene", demo.cutscene);
game.state.add("state0", demo.state0);
game.state.add("state1", demo.state1);
game.state.add("state2", demo.state2);
game.state.add("state3", demo.state3);
game.state.add("state4", demo.state4);
game.state.start("art");