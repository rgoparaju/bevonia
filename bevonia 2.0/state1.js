var demo = {}, skel1, skelCollide;
var centerX = 533, centerY = 250;
var platforms1, traps1;
demo.state1 = function(){}
demo.state1.prototype = {
    preload: function(){
        // LOAD ASSETS
        // Tile map and other environment assets
        game.load.tilemap("level1", "assets/tilemaps/level1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("platforms", "assets/sprites/wall sprite 2.png", 32, 32);
        game.load.image("spikes", "assets/sprites/deathSpikes.png");
        game.load.image('bg1', 'assets/sprites/test background v5.png', 2624, 1344);
        game.load.image("door", "assets/sprites/door.png", 32, 96);
        
        // Bevonia
        game.load.spritesheet("bevonia", "assets/sprites/Bevonia.png", 32, 48);
        game.load.spritesheet("armoredBevonia", "assets/sprites/bevoniaArmor.png", 32, 48);
        game.load.spritesheet("stabBevonia", "assets/sprites/bevoThrust.png", 48, 48);   
        
        // Enemies
        game.load.spritesheet("bat", "assets/sprites/bat.png", 32, 32);
        game.load.spritesheet("spider", "assets/sprites/spider.png", 48, 48);
        game.load.spritesheet("skeleton", "assets/sprites/skeleton.png", 32, 64);
        
        // Items
        game.load.spritesheet("helmet", "assets/sprites/helmet.png", 32, 32);
        game.load.spritesheet("key", "assets/sprites/key.png", 32, 32);
        game.load.spritesheet("sword", "assets/sprites/sword.png", 32, 64);   
        game.load.spritesheet("chest", "assets/sprites/chest.png", 64, 64);
        
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
        
        door = game.add.sprite(2592, 1088, "door");
        game.physics.enable(door);
        
        // Bevonia set up
        bevonia = game.add.sprite(128, 128, "bevonia");
        game.physics.enable(bevonia);
        
        bevonia.body.gravity.y = 1200;
        game.camera.follow(bevonia);
        
        // Initialize technical variables
        bevonia.has_sword = false;
        bevonia.armored = "";
        bevonia.has_key = false;
        bevonia.looking = 1;
        bevonia.stabbing = false;
        
        bevonia.anchor.setTo(.5, .5);
        bevonia.animations.add('run', [2, 3, 4, 5], 0, true);
        bevonia.animations.add('jump', [1], 0, true);
        bevonia.animations.add('idle', [0], 0, true);
        bevonia.animations.add("hide", [6], 0, true);
        bevonia.animations.add("ARMOREDrun", [9, 10, 11, 12], 0, true);
        bevonia.animations.add("ARMOREDjump", [8], 0, true);
        bevonia.animations.add("ARMOREDidle", [7], 0, true);
        
        // Bevonia melee attack sprite
        bevoniaStab = game.add.sprite(128, 128, "stabBevonia");
        bevoniaStab.anchor.setTo(.5, .5);
        bevoniaStab.animations.add("hide",[0], 0, true);
        bevoniaStab.animations.add("stab",[1], 0, true);
        bevoniaStab.animations.add("ARMOREDstab",[2], 0, true);
        bevoniaStab.animations.play("hide", 0, true);
        game.physics.enable(bevoniaStab);
        
        
        // Set up powerups
        // Sword
        sword = game.add.sprite(350, 510, "sword");
        sword.animations.add('spin', [0, 1], 0, true);
        sword.animations.play("spin", 4, true);
        // Armor
        armor = game.add.sprite(1311, 880, "helmet");
        armor.animations.add("spin", [0, 1, 2, 3], 0, true);
        armor.animations.play("spin", 4, true);        
        // Key
        key = game.add.sprite(1977, 1260, "key");
        key.animations.add("spin", [0,1, 2, 3, 4, 5, 6, 7]);
        key.animations.play("spin", 4, true);        
        // Chest
        chest = game.add.sprite(2560, 176, "chest");
        chest.animations.add("closed", [0], 0, true);
        chest.animations.add("open", [1], 0, true);
        
        powerups = [sword, armor, key, chest];
        game.physics.enable(powerups);
        
        //first skeleton
        skel1 = game.add.sprite(500,850,'skeleton')
        skel1.animations.add('walking',[0,1,2,3],0,true)
        skel1.anchor.set(0.5,0.5);
        skel1.animations.play('walking',4,true)
        game.physics.enable(skel1);
        skel1.body.collideWorldBounds = true;
        skel1.body.velocity.x = 200;
        skel1.body.gravity.y = 100;
        skeletonCollide = game.physics.arcade.collide(skel1,platforms1)
//        skeletonBehavior(skel1,50,1000)
        
        //first bat
        bat1 = game.add.sprite(1070, 377, 'bat');
        bat1.animations.add('flying',[1,2,3],0,true);
        bat1.anchor.set(0.5,0.5);
        bat1.animations.play('flying',4,true);
        game.physics.enable(bat1);
        bat1.body.collideWorldBounds = true;
        bat1.body.velocity.y = 100;
        batCollide = game.physics.arcade.collide(bat1,platforms1);
        
        // First spider
        spider1 = game.add.sprite(1358, 328, "spider");
        spider1.animations.add("walking", [0, 1, 2], 0, true);
        spider1.anchor.setTo(.5, .5);
        spider1.animations.play("walking", 6, true);
        game.physics.enable(spider1);
        spider1.body.velocity.x = 100;
        game.physics.arcade.collide(spider1, platforms1);
        
        enemies = [skel1, bat1, spider1];
        
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia, platforms1);
        skelCollide = game.physics.arcade.collide(skel1,platforms1);
        
        
        
        
        // Powerup interactions
        // Sword
        if (game.physics.arcade.overlap(bevonia, sword)) {
            sword.kill();
            bevonia.has_sword = true;
        }
        if (game.physics.arcade.overlap(bevonia, armor)) {
            armor.kill();
            bevonia.armored = "ARMORED";
        }
        if (game.physics.arcade.overlap(bevonia, key)) {
            key.kill();
            bevonia.has_key = true;
        }
        if (game.physics.arcade.overlap(bevonia, chest) && bevonia.has_key) {
            chest.animations.play("open", 0, true);
        }
        if (game.physics.arcade.overlap(bevonia, door)) {
            game.state.start("state4");
        }
        
        // Bevonia movement
        bevoFace = game.input.keyboard.isDown(Phaser.Keyboard.D) - game.input.keyboard.isDown(Phaser.Keyboard.A);
        grounded = bevonia.body.blocked.down;
        if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            bevonia.looking = 1;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            bevonia.looking = -1;
        }
        
        
        // Walking
        if(bevoFace == 0) {
            bevonia.animations.play(bevonia.armored + 'idle',0,false)
            bevonia.body.velocity.x = 0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            bevonia.body.velocity.x = -300
            bevonia.animations.play(bevonia.armored + 'run', 8, true)
            bevonia.scale.x = -1
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            bevonia.body.velocity.x = 300
            bevonia.animations.play(bevonia.armored + 'run', 8, true)
            bevonia.scale.x = 1
        // Jumping and falling
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.W) && grounded){
            bevonia.body.velocity.y = -650
        }
        if(!grounded) bevonia.animations.play(bevonia.armored + 'jump', 1, true)
        if(bevonia.body.velocity.y > 1200) bevonia.body.velocity.y = 1200;
        // Dying
        if (game.physics.arcade.collide(bevonia, traps1) || bevonia.body.y > 1344) {
            game.state.start(game.state.current);
        }
        // Melee attack
        bevoniaStab.body.x = bevonia.body.x;
        bevoniaStab.body.y = bevonia.body.y;
        if (bevonia.has_sword && game.input.keyboard.isDown(Phaser.Keyboard.L)) {
            bevoniaStab.scale.x = bevonia.looking;
            bevonia.stabbing = true;
            bevoniaStab.animations.play(bevonia.armored + "stab", 1, false);
            bevonia.animations.play("hide", 1, false);
        }
        else {
            bevoniaStab.animations.play("hide", 1, true);
            bevonia.stabbing = false;
        }
        
        //SKELETON PATROL
        if (skel1.x > 750){
            skel1.body.velocity.x = -300;
            skel1.scale.x = -1
        } else if (skel1.x < 75) {
            skel1.body.velocity.x = 300;
            skel1.scale.x = 1
        }
        
        //Bat Patrol
        if (bat1.y > 833){
            bat1.body.velocity.y = -100;
        } else if (bat1.y < 377){
            bat1.body.velocity.y = 100;
        }
        
        // Spider patrol
        if (spider1.body.x > 1597) {
            spider1.body.velocity.x = -100;
            spider1.scale.x = 1
        }
        else if (spider1.body.x < 1312) {
            spider1.body.velocity.x = 100;
            spider1.scale.x = -1
        }
            
        // Bevonia enemy interaction
        if (game.physics.arcade.collide(bevoniaStab, skel1) && bevonia.stabbing) {
            skel1.kill();
        }
        if (game.physics.arcade.collide(bevoniaStab, bat1) && bevonia.stabbing) {
            bat1.kill();
        }
        if (game.physics.arcade.collide(bevoniaStab, spider1) && bevonia.stabbing) {
            spider1.kill();
        }
        else if (game.physics.arcade.collide(bevonia, enemies) && !bevonia.stabbing) {
            game.state.start(game.state.current);
        }        
    }
}

function skeletonBehavior(skel,xBoundLeft,xBoundRight){
    if(skelCollide) skel.body.velocity.x = -skel.body.velocity.x
    //skel.body.velocity.x = -50
    
}

