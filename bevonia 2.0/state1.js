var demo = {}, skel1, skelCollide, numOfItemsInInv = 0;
var centerX = 533, centerY = 250;
var platforms1, traps1;


enemyBat = function (index, game, x, y, tweenX, tweenY) {
        
    this.bat = game.add.sprite(x, y, 'bat');
    this.bat.anchor.setTo(0.5, 0.5);
    this.bat.name = index.toString();
    game.physics.enable(this.bat, Phaser.Physics.ARCADE);
    this.bat.body.immovable = true;
    this.bat.body.collideWorldBounds = true;
    
    this.batTween = game.add.tween(this.bat).to({
        x: this.bat.x + tweenX
    }, 2000, 'Linear', true, 0, 100, true);
        
}

enemySkel = function(index, game, x, y, tweenX, tweenY){
    
    this.skel = game.add.sprite(x, y, 'skeleton');
    this.skel.anchor.setTo(0.5, 0.5);
    this.skel.name = index.toString();
    game.physics.enable(this.skel, Phaser.Physics.ARCADE);
    this.skel.body.immovable = true;
    this.skel.body.collideWorldBounds = true;
    
    this.skelTween = game.add.tween(this.skel).to({
        x: this.skel.x + tweenX
    }, 2000, 'Linear', true, 0, 100, true);
}

enemySpider = function(index, game, x, y, tweenX, tweenY){
        
    this.spider = game.add.sprite(x, y, 'spider');
    this.spider.anchor.setTo(0.5, 0.5);
    this.spider.name = index.toString();
    game.physics.enable(this.spider,Phaser.Physics.ARCADE);
    this.spider.body.immovable = true;
    this.spider.body.collideWorldBounds = true;
    
    this.spiderTween = game.add.tween(this.spider).to({
        y: this.spider.y + tweenY
    }, 2000, 'Linear', true, 0, 100, true);
}

demo.state1 = function () {}
demo.state1.prototype = {
    preload: function () {
        // LOAD ASSETS
        // Tile map and other environment assets
        game.load.tilemap("level1", "assets/tilemaps/level1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("platforms", "assets/sprites/wall sprite 2.png", 32, 32);
        game.load.image("spikes", "assets/sprites/deathSpikes.png");
        game.load.image('bg1', 'assets/sprites/test background v5.png', 2624, 1344);
        game.load.image("door", "assets/sprites/door.png", 32, 96);
        
        // Hints
        game.load.image("hint", "assets/sprites/hint.png");
        game.load.image("K", "assets/sprites/K.png");
        game.load.image("E", "assets/sprites/E.png");
        game.load.image("L", "assets/sprites/L.png");
        
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
        game.load.image("healthPotion", "assets/sprites/health potion.png");
        
        // Spells
        game.load.spritesheet('aoeProjectile', "assets/sprites/AoE Projectile.png", 32, 32);
        game.load.spritesheet("aoeBlast", "assets/sprites/AoE Blast.png", 96, 96);
        
        game.load.spritesheet("precise", "assets/sprites/precise.png", 32, 16)
        
        // Misc.
        game.load.spritesheet("healthBar", "assets/sprites/healthBar.png", 256, 16);
        game.load.spritesheet("manaBar", "assets/sprites/manaBar.png", 256, 16);
        game.load.spritesheet("barHolder", "assets/sprites/barHolder.png", 32, 96);
        game.load.image('inventory','assets/sprites/inventory.png',267,55)
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
        
        inventory = game.add.sprite(350,15,'inventory')
        inventory.fixedToCamera = true
        
        // Hints
        game.add.sprite(352, 150, "hint");
        game.add.sprite(421, 510, "E");
        game.add.sprite(241, 510, "L");
        game.add.sprite(128, 752, "K");
        
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
        bevonia.castTimer = 0;
        bevonia.damageFactor = .25;
        
        aoeExists = false;
        preciseExists = false;
        preciseNextCast = true;
        
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
        bat1.animations.add('flying',[1,2,3,4],0,true);
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
        
        
        
//        new enemyBat(0, game,1020,370,100,0);
//        new enemySkel(0,game,1020,500,100,0);
//        new enemySpider(0,game,1050,600,0,100);
        
    },
    update: function () {
        //game.physics.arcade.collide(bevonia, platforms1);
        skelCollide = game.physics.arcade.collide(skel1,platforms1);
        game.physics.arcade.collide(healthPotion1,platforms1)
        game.physics.arcade.collide(bevonia, platforms1)
        
        // Powerup interactions
        // Sword
        if (game.physics.arcade.overlap(bevonia, sword)) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
            sword.kill();
            bevonia.has_sword = true;            
            tempSword = game.add.sprite((378 + numOfItemsInInv*(35)),42,'sword')
            tempSword.anchor.setTo(0.5,0.5)
            tempSword.fixedToCamera = true
            tempSword.scale.setTo(0.5,0.5)
            numOfItemsInInv += 1
            }
        }
        if (game.physics.arcade.overlap(bevonia, armor)) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
            armor.kill();
            bevonia.armored = "ARMORED";


            bevonia.damageFactor = .125;


            bevonia.damageFactor = .125;

            tempArmor = game.add.sprite((378 + numOfItemsInInv*(35)),42,'helmet')
            tempArmor.anchor.setTo(0.5,0.5)
            tempArmor.fixedToCamera = true
//            tempArmor.scale.setTo(0.5,0.5)
            numOfItemsInInv += 1;
            }
        }
        if (game.physics.arcade.overlap(bevonia, key)) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
            key.kill();
            bevonia.has_key = true;
            tempKey = game.add.sprite((378 + numOfItemsInInv*(35)),42,'key')
            tempKey.anchor.setTo(0.5,0.5)
            tempKey.fixedToCamera = true
//            tempKey.scale.setTo(0.5,0.5)
            numOfItemsInInv += 1
            }
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
            numOfItemsInInv = 0
        }
//      pick up health potion
        if(game.physics.arcade.overlap(bevonia, healthPotion1)){
            if(game.input.keyboard.isDown(Phaser.Keyboard.E)) {
                healthPotion1.kill(); 
                tempPotion = game.add.sprite((378 + numOfItemsInInv*(35)),42,'healthPotion')
                tempPotion.anchor.setTo(0.5,0.5)
                tempPotion.scale.setTo(0.6,0.6)
                tempPotion.fixedToCamera = true
                numOfItemsInInv += 1}
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
            numOfItemsInInv = 0
        }
        // Melee attack
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
        // Spell casting
        // Area of Effect (AoE)
        if(game.input.keyboard.isDown(Phaser.Keyboard.K) && game.time.now >= aoeNextCast && bevonia.mana != 0) {
            aoeNextCast = game.time.now + aoeCastRate;
            bevonia.mana -= .25; manaBar.scale.x = bevonia.mana;
            aoeExists = true;
            aoe = game.add.sprite(bevonia.x, bevonia.y, "aoeProjectile");
            aoe.anchor.setTo(.5, .5);
            game.physics.enable(aoe);
            aoe.animations.add("exist", [0, 1]);
            //castSound.play();
            aoe.animations.play("exist", 10, true);
            aoe.body.velocity.x = bevonia.scale.x * 500;
            aoe.body.velocity.y = -150;
            aoe.body.gravity.y = 1200;
        }
        if(aoeExists) {     
            if (game.physics.arcade.collide(aoe, enemies) || game.physics.arcade.collide(aoe, platforms1)) {
                var boom = game.add.sprite(aoe.x, aoe.y, "aoeBlast");
                game.camera.shake(.02, 300);
                game.physics.enable(boom);
                boom.anchor.setTo(.5, .5);
                boom.scale.setTo(1.5, 1.5);
                boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                //aoeSound.play();
                aoe.kill();
                boom.animations.play("explode", 9, false);
                
            }
        }

//        // Precise spell
//        if (game.input.keyboard.isDown(Phaser.Keyboard.J) && preciseNextCast) {
//            preciseNextCast = false;
//            var precise = game.add.sprite(bevonia.x, bevonia.y, "precise");
//            game.physics.enable(precise);
//            precise.anchor.setTo(.5, .5);
//            precise.animations.add("exist", [0, 1]);
//            precise.animations.play("exist", 100, true);
//            precise.body.velocity.x = bevonia.scale.x * 700;
//        }
//        if (!game.input.keyboard.isDown(Phaser.Keyboard.J)){
//            preciseNextCast = true;
//        }
//
//        if(game.physics.arcade.overlap(precise, enemies) || game.physics.arcade.collide(precise, platforms1)){
//            precise.kill()
//        }
        
            
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
        if ((game.physics.arcade.overlap(bevoniaStab, skel1) && bevonia.stabbing) || (game.physics.arcade.overlap([boom], skel1))) {
            skel1.kill();
        }
        if ((game.physics.arcade.overlap(bevoniaStab, bat1) && bevonia.stabbing) || (game.physics.arcade.overlap(([boom], bat1)))) {
            bat1.kill();
        }
        if ((game.physics.arcade.overlap(bevoniaStab, spider1) && bevonia.stabbing) || (game.physics.arcade.overlap(([boom], spider1)))) {
            spider1.kill();
        }
        else if (game.physics.arcade.collide(bevonia, enemies) && !bevonia.stabbing) {
            bevonia.health -= bevonia.damageFactor;
            bevonia.body.velocity.x = -1 * bevonia.scale.x * 20;
            healthBar.scale.x = bevonia.health;
        }
        
        if (bevonia.health == 0) {
            game.state.start(game.state.current);
            numOfItemsInInv = 0
            console.log('test')
        }
        else if(game.physics.arcade.collide(bevoniaStab, enemies) && !bevonia.stabbing){
            game.state.start(game.state.current);
            numOfItemsInInv = 0
            console.log('test')
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

aoeInstance = function(playerX, playerY, direction) {};
aoeInstance.prototype = {
    // Constructor
    castAoe: function () {
        this.exist = game.sprite.add(playerX, playerY, "aoeProjectile");
        this.anchor.setTo(.5, .5);
        game.physics.enable(this);
        this.animations.add("exist", [0, 1]);
        this.animations.play("exist", 10, true);
        this.body.velocity.x = direction * 500;
        this.body.velocity.y = -150;
        this.body.gravity.y = 1200;
    },
    blastAoe: function () {
        this.blast = game.add.sprite(this.exist.x, this.exist.y, "aoeBlast");
        this.blast.anchor.setTo(.5, .5);
        this.blast.scale.setTo(1.5, 1.5);
        this.blast.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
        this.exist.kill();
        this.blast.animations.play("explode", 8, false);
    }  
};
