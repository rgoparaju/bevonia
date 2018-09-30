var bossPlats, Bevonia, speed = 10;

demo.state4 = function(){}
demo.state4.prototype = {
    preload: function(){
        // Load environmental assets
        game.load.tilemap("finalboss", "assets/tilemaps/finalboss.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("environment", "assets/tilemaps/environment.png");
        
        // Load player
        game.load.spritesheet("bevonia", "assets/spritesheets/Bevonia.png", 32, 48);
        
        // Load "dragon"
        game.load.spritesheet("dragon", "assets/spritesheets/dragoncrap.png");
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        console.log("state4");
        
        game.world.setBounds(0, 0, 2026, 608);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Add map
        var bossMap = game.add.tilemap("finalboss");
        bossMap.addTilesetImage("environment");
        
        var bossBG = bossMap.createLayer("background");
        bossPlats = bossMap.createLayer("platforms");
        bossMap.setCollision(1, true, "platforms");
        
        // Add, setup Bevonia
        Bevonia = game.add.sprite(1272, 490, "bevonia");
        Bevonia.anchor.setTo(.5, .5);
        Bevonia.animations.add("run", [2, 3, 4, 5], 10, true);
        Bevonia.animations.add("jump", [1], 0, true);
        Bevonia.animations.add("idle", [0], 0, true);
        game.physics.enable(Bevonia);
        game.camera.follow(Bevonia);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 608);
        
        Bevonia.body.gravity.y = 1100;
        
        
        
    },
    update: function(){
        game.physics.arcade.collide(Bevonia, bossPlats);
        
        
        // Player movement
        // Direction
        bevoFace = game.input.keyboard.isDown(Phaser.Keyboard.D) -game.input.keyboard.isDown(Phaser.Keyboard.A);     
        // Running
        if(bevoFace == 0) {
            Bevonia.animations.play("idle", 0, false);
        }
        else {
            Bevonia.x += bevoFace * speed;
            Bevonia.scale.setTo(bevoFace, 1);
            Bevonia.animations.play("run", 8, true);
        }
            
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.W) && Bevonia.body.blocked.down) {
            Bevonia.body.velocity.y -= 550;
        }
        if(!Bevonia.body.blocked.down) {
            Bevonia.animations.play("jump", 1, true);
        }   
    }
}