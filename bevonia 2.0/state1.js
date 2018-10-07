var demo = {};
demo.state1 = function(){}
demo.state1.prototype = {
    preload: function(){
        // LOAD ASSETS
        // Tile map
//        game.load.tilemap("level1", "assets/tilemaps/level1.json", null, Phaser.Tilemap.TILED_JSON);
//        game.load.image("brick", "assets/sprites/wall sprite 2.png");
//        game.load.image("spikes", "assets/sprites/deathSpikes.png");
        game.load.image('bg1', 'assets/sprites/test background v2.png', 2000, 650);
        
        // Bevonia
        game.load.spritesheet("bevonia", "assets/sprites/Bevonia.png", 32, 48);
        game.load.spritesheet("armoredBevonia", "assets/sprites/bevoniaArmored.png", 32, 48);
        game.load.spritesheet("stabBevonia", "assets/sprites/bevoThrust", 48, 48);   
        
        // Enemies
        game.load.spritesheet("bat", "assets/sprites/bat.png", 32, 32);
        game.load.spritesheet("chest", "assets/sprites/chest.png", 64, 64);
        game.load.spritesheet("spider", "assets/sprites/spider.png", 48, 48); 
        
        // Items
        game.load.spritesheet("helmet", "assets/sprites/helmet.png", 32, 48);
        game.load.spritesheet("key", "assets/sprites/key.png", 32, 48);
        game.load.spritesheet("sword", "assets/sprites/sword.png", 32, 64);   
        
        // Misc.
        game.load.spritesheet("healthBar", "assets/sprites/healthBar.png", 256, 16);
        game.load.spritesheet("manaBar", "assets/sprites/manaBar.png", 256, 16);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physcis.ARCADE);
        
        console.log("state1");
        
        // Display settings
        game.world.setBounds(0, 0, 2000, 500);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Add background
        game.add.sprite(0, 0, "bg1");
        
        // Create map
        var map1 = game.add.tilemap("level1");
        map.addTilesetImage("brick");
        map.addTilesetImage("spikes");
        
        
        
    },
    update: function(){}
}