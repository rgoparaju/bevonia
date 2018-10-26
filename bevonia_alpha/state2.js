var bevonia;
var map2;
demo.state2 = function () {};
demo.state2.prototype = {
    preload: function () {
        // LOAD TILEMAP
        game.load.tilemap("level2", "assets/tilemaps/level2.json", null, Phaser.Tilemap.TILED_JSON);
        
    },
    create: function () {
        // CREATE ENVIRONMENT
        game.stage.backgroundColor = "#00ff00"
        
        map2 = game.add.tilemap("level2");
        map2.addTilesetImage("floorV4");
        map2.addTilesetImage("spikes");
        
        game.world.setBounds(0, 0, 2912, 1952);
        
        platforms2 = map2.createLayer("platforms");
        traps2 = map2.createLayer("traps");
        
        map2.setCollision(1, true, "platforms");
        map2.setCollision([2, 3, 4, 5, 6, 8], true, "traps");
        
        bevonia = new Bevonia(128, 128, 1952);
        bars = new Bars(bevonia);
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms2);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
    }
}