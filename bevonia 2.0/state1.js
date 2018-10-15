var demo = {}, skel1, skelCollide;
var centerX = 533, centerY = 250;
var platforms1, traps1;

enemyBat = function(index,game,x,y,tweenX,tweenY){
        
        this.bat = game.add.sprite(x,y,'bat');
        this.bat.anchor.setTo(0.5,0.5);
        this.bat.name = index.toString();
        game.physics.enable(this.bat,Phaser.Physics.ARCADE);
        this.bat.body.immovable = true;
        this.bat.body.collideWorldBounds = true;
        
        this.batTween = game.add.tween(this.bat).to({
            x: this.bat.x + tweenX
        }, 2000, 'Linear', true, 0,100,true);
        
    }

enemySkel = function(index,game,x,y,tweenX,tweenY){
        
        this.skel = game.add.sprite(x,y,'skeleton');
        this.skel.anchor.setTo(0.5,0.5);
        this.skel.name = index.toString();
        game.physics.enable(this.skel,Phaser.Physics.ARCADE);
        this.skel.body.immovable = true;
        this.skel.body.collideWorldBounds = true;
        
        this.skelTween = game.add.tween(this.skel).to({
            x: this.skel.x + tweenX
        }, 2000, 'Linear', true, 0,100,true);
}

enemySpider = function(index,game,x,y,tweenX,tweenY){
        
        this.spider = game.add.sprite(x,y,'spider');
        this.spider.anchor.setTo(0.5,0.5);
        this.spider.name = index.toString();
        game.physics.enable(this.spider,Phaser.Physics.ARCADE);
        this.spider.body.immovable = true;
        this.spider.body.collideWorldBounds = true;
        
        this.spiderTween = game.add.tween(this.spider).to({
            y: this.spider.y + tweenY
        }, 2000, 'Linear', true, 0,100,true);
}

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
        game.load.spritesheet("barHolder", "assets/sprites/barHolder.png", 32, 96);
        game.load.image('inventory','assets/sprites/inventory.png',200,55)
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
            
        // Chest
        chest = game.add.sprite(2025, 992, "chest");
        chest.anchor.set(0.5,0.5)
        chest.animations.add("closed", [0], 0, true);
        chest.animations.add("open", [1], 0, true);
        chestClosed = true  
        
        // Set up power and mana bars
        barHolder = game.add.sprite(0, 0, "barHolder");
        healthBar = game.add.sprite(32, 8, "healthBar");
        manaBar = game.add.sprite(32, 72, "manaBar");
        barHolder.fixedToCamera = true; healthBar.fixedToCamera = true; manaBar.fixedToCamera = true;
        
        // Bevonia set up
        bevonia = game.add.sprite(128, 128, "bevonia");
        game.physics.enable(bevonia);
        
        bevonia.body.gravity.y = 1200;
        game.camera.follow(bevonia);
        
        // Initialize technical variables
        bevonia.health = 1;
        bevonia.mana = 1;
        
        bevonia.armored = "";
        bevonia.looking = 1;
        bevonia.stabbing = false;
        
        bevonia.has_sword = false;
        bevonia.has_key = false;
        
        bevonia.stabTimer = 0;
        bevonia.damageFactor = .25;
        
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
        bevoniaStab.anchor.setTo(bevonia.anchor.x, bevonia.anchor.y);
        bevoniaStab.animations.add("hide",[0], 0, true);
        bevoniaStab.animations.add("stab",[1, 2, 3], 0, true);
        bevoniaStab.animations.add("ARMOREDstab",[4, 5, 6], 0, true);
        bevoniaStab.animations.play("hide", 0, true);
        game.physics.enable(bevoniaStab);
        
        //health potion placed in chest
        healthPotion1 = game.add.sprite(0, 0,'healthPotion')
        healthPotion1.anchor.set(0.5,0.5)
        healthPotion1.scale.set(0.65,0.65)
        game.physics.enable(healthPotion1)
        healthPotion1.kill()
        
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
        
        
        
        new enemyBat(0, game,1020,370,100,0);
        new enemySkel(0,game,1020,500,100,0);
        new enemySpider(0,game,1050,600,0,100);
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia, platforms1);
        skelCollide = game.physics.arcade.collide(skel1,platforms1);
        game.physics.arcade.collide(healthPotion1,platforms1)
        
        
        
        
        // Powerup interactions
        // Sword
        if (game.physics.arcade.overlap(bevonia, sword)) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)){sword.kill();
            bevonia.has_sword = true;}
        }
        if (game.physics.arcade.overlap(bevonia, armor)) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)){armor.kill();
            bevonia.armored = "ARMORED";}
        }
        if (game.physics.arcade.overlap(bevonia, key)) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)){key.kill();
            bevonia.has_key = true;}
        }
        if (game.physics.arcade.overlap(bevonia, chest) && bevonia.has_key && chestClosed) {
            chestClosed = false
            chest.animations.play("open", 0, true);
            healthPotion1.reset(2025,975)
            healthPotion1.body.gravity.y = 1000
            healthPotion1.body.velocity.y = -250
        }
        if (game.physics.arcade.overlap(bevonia, door)) {
            game.state.start("state1");
        }
//      pick up health potion
        if(game.physics.arcade.overlap(bevonia, healthPotion1)){
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)) healthPotion1.kill()
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
        else if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            bevonia.body.velocity.x = -300
            bevonia.animations.play(bevonia.armored + 'run', 8, true)
            bevonia.scale.x = -1
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
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
        // THE METHOD OF SUBBING OUT SPRITES IS WHAT CAUSED THE SKELETON COLISSION GLITCH
        bevoniaStab.body.x = bevonia.body.x;
        bevoniaStab.body.y = bevonia.body.y;
        if (bevonia.has_sword && game.input.keyboard.isDown(Phaser.Keyboard.L) && (bevonia.stabTimer < game.time.now)) {
            bevoniaStab.scale.setTo(1, 1);
            bevonia.stabTimer = game.time.now + 300;
            bevoniaStab.scale.x = bevonia.looking;
            bevonia.stabbing = true;
        }
        else if (bevonia.stabTimer > game.time.now) {
            bevonia.animations.play("hide", 1, false);
            bevoniaStab.animations.play(bevonia.armored + "stab", 18, false);
            if (grounded) {
                console.log("grounded");
                bevonia.body.velocity.x = 0;
            }
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
        
//        if(checkOverlap(bevonia,enemy1.bat)){
//           bevonia.kill()
//            game.state.start(game.state.current);
//        }
    }
}

function checkOverlap(spriteA, spriteB){
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    
    return Phaser.Rectangle.intersects(boundsA,boundsB);
}

function skeletonBehavior(skel,xBoundLeft,xBoundRight){
    if(skelCollide) skel.body.velocity.x = -skel.body.velocity.x
    //skel.body.velocity.x = -50
    
}

