demo.state4 = function () {};
demo.state4.prototype = {
    preload: function () {
        // LOAD TILEMAP
        game.load.tilemap("dragonRoom", "assets/tilemaps/dragonLairTEMP.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("wall sprite 2", "assets/tilesets_backgrounds/wall sprite 2.png");
        
        // LOAD DRAGON SPRITE
        game.load.spritesheet("dragon", "assets/sprites/betterDragon.png", 128, 256);
        
    },
    create: function () {
        game.stage.backgroundColor = "#ba0000";
        
        var map5 = game.add.tilemap("dragonRoom");
        map5.addTilesetImage("wall sprite 2");
        
        game.world.setBounds(0, 0, 1088, 512);
        
        platforms5 = map5.createLayer("platforms DRAGON");
        map5.setCollision(1, true, "platforms DRAGON");
        
        bevonia = new Bevonia(48, 32, 512);
        bars = new Bars(bevonia);
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms5);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        bevonia.castPrecise();
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}