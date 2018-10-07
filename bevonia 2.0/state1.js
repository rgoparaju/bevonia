var demo = {};
var centerX = 533, centerY = 250;
var platforms1, traps1;
demo.state1 = function(){}
demo.state1.prototype = {
    preload: function(){
        // LOAD ASSETS
        // Tile map
        game.load.tilemap("level1", "assets/tilemaps/level1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("platforms", "assets/sprites/wall sprite 2.png", 32, 32);
        game.load.image("spikes", "assets/sprites/deathSpikes.png");
        game.load.image('bg1', 'assets/sprites/test background v5.png', 2624, 1344);
        
        // Bevonia
        game.load.spritesheet("bevonia", "assets/sprites/Bevonia.png", 32, 48);
        game.load.spritesheet("armoredBevonia", "assets/sprites/bevoniaArmor.png", 32, 48);
        game.load.spritesheet("stabBevonia", "assets/sprites/bevoThrust.png", 48, 48);   
        
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
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        console.log("state1");
        
        // Display settings
        game.world.setBounds(0, 0, 2624, 1344);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Add background
        background1 = game.add.sprite(0, 0, "bg1");
        game.physics.enable(background1);
        background1.body.immovable = true;
        
        // Create map
        var map1 = game.add.tilemap("level1");
        map1.addTilesetImage("platforms");
        map1.addTilesetImage("spikes");
        
        platforms1 = map1.createLayer("platforms");
        traps1 = map1.createLayer("traps");
        
        map1.setCollision(1, true, "platforms");
        map1.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps");
        
        // Bevonia set up
        bevonia = game.add.sprite(128, 128, "bevonia");
        game.physics.enable(bevonia);
        
        bevonia.body.gravity.y = 1200;
        //bevonia.body.collideWorldBounds = true
        game.camera.follow(bevonia);
//        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, centerY - 200, 600, 400);
        
        bevonia.anchor.setTo(.5, .5);
        bevonia.animations.add('run', [2, 3, 4, 5], 0, true);
        bevonia.animations.add('jump', [1], 0, true);
        bevonia.animations.add('idle', [0], 0, true);
        
        
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia, platforms1);
        
        
        // Bevonia movement
        bevoFace = game.input.keyboard.isDown(Phaser.Keyboard.D) -game.input.keyboard.isDown(Phaser.Keyboard.A);
        grounded = bevonia.body.blocked.down
        if(bevoFace == 0) {
            bevonia.animations.play('idle',0,false)
            bevonia.body.velocity.x = 0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            bevonia.body.velocity.x = -300
            bevonia.animations.play('run', 8, true)
            bevonia.scale.x = -1
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            bevonia.body.velocity.x = 300
            bevonia.animations.play('run', 8, true)
            bevonia.scale.x = 1
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.W) && grounded){
            bevonia.body.velocity.y = -650
        }
        if(!grounded) bevonia.animations.play('jump', 1, true)
        
        if (game.physics.arcade.collide(bevonia, traps1)) {
            game.state.start(game.state.current);
        }
    }
}
