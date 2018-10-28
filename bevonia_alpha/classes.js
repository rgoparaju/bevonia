// Don't worry about these two until the first 4 are good
// TROLL



// DRAGON

//////////////////////////////////
//ALL OBJECT CLASSES PLACED HERE//
//////////////////////////////////
//NOTES
//1. Enemies and Bevonia have an attribute self which is its body attribute's parent; be careful of this when directing enemies to respond to Bevonia's position


// Object variables
var Bat, Skeleton, Spider;
var Bevonia;

demo.classes = function () {};
demo.classes.prototype = {
    create: function () {
    ///////////
    //ENEMIES//
    ///////////
        // Attacks when player within certain radius
        // Continues attacking until dead
        Bat = function (x, y, player) {
            // Technical variables
            var velocity = 212;
            this.player = player;
            
            // Setup
            this.self = game.add.sprite(x, y, "bat");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            
            // Animate
            this.self.animations.add("sleep", [0]);
            this.self.animations.add("fly", [1, 2, 3, 4]);
            this.self.animations.play("sleep", 0, true);
            
            // Behavior
            // BEHAVIOR STILL A LITTLE BUGGY PLEASE HELP
            // Checks for player within 4 tile (128px) radius, returns true if satisfied
            this.watch = function () {
                var dy = this.self.body.y - this.player.self.body.y;
                dy *= dy;
                var dx = this.self.body.x - this.player.self.body.x;
                dx *= dx;
                
                var condition = dx + dy < 16384
                if (condition) {
                    this.attack()
                    this.self.animations.play("fly", 12, true);
                }
                return condition;
            }

            // Finds unit vector from bat to player, scaled vector by bat velocity
            // Bat doesn't rest until it is dead
            this.attack = function () {
                console.log('bat is attacking')
                var xComp = this.player.self.body.x - this.self.body.x;
                var yComp = this.player.self.body.y - this.self.body.y;
                
                var norm = Math.sqrt(xComp * xComp + yComp * yComp);
                
                xComp /= norm;
                yComp /= norm;
                
                console.log([xComp, yComp]);
                
                this.self.body.velocity.x = velocity * xComp;
                this.self.body.velocity.y = velocity * yComp;
            }     
        };
        
        // Patrols vertical or horizonal interval
        // directionStr is allowed to be "x" or "y"
        Spider = function (x, y, lowBound, upBound, directionStr, scaleX) {
            // Technical variables
            this.lowBound = lowBound;
            this.upBound = upBound;
            this.direction = directionStr;
            var velocity = 200;
            
            // Setup
            this.self = game.add.sprite(x, y, "spider_" + this.direction);
            this.self.anchor.setTo(0.5, 0.5);
            this.self.scale.x = scaleX;
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            if (this.direction == "x") {
                this.self.body.velocity.x = -velocity;
            }
            else {
                this.self.body.velocity.y = -velocity;
            }
            
            // Animate
            this.self.animations.add("crawl", [0, 1, 2]);
            this.self.animations.play("crawl", 7, true);
            
            // Behavior
            // BUGGY
            this.patrol = function () {
                if (this.direction == "x") {
                    if (this.self.body.x > this.upBound) {
                        console.log("greater");
                        this.self.scale.x = 1;
                        this.self.body.velocity.x = -velocity;
                    }
                    else if (this.self.body.x < this.lowBound) {
                        console.log("lesser");
                        this.self.scale.x = -1;
                        this.self.body.velocity.x = velocity;
                    }
                }
                else {
                    if (this.self.body.y > this.upBound) {
                        this.self.scale.y = 1;
                        this.self.body.velocity.y = -velocity;
                    }
                    else if (this.self.body.y < this.lowBound) {
                        this.self.scale.y = -1;
                        this.self.body.velocity.y = velocity;
                    }
                }
            }
        };
        
        // Patrols horizontal interval
        Skeleton = function (x, y, lowBound, upBound) {
            // Technical variables
            var velocity = 300;
            this.lowBound = lowBound;
            this.upBound = upBound;
            
            // Setup
            this.self = game.add.sprite(x, y, "skeleton");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            this.self.body.velocity.x = velocity;
            
            // Animate
            this.self.animations.add("patrol", [0, 1, 2, 3]);
            this.self.animations.play("patrol", 4, true);
    
            // Behavior
            this.patrol = function () {
                if (this.self.body.x > this.upBound) {
                    this.self.scale.x = -1;
                    this.self.body.velocity.x = -velocity;
                }
                else if (this.self.body.x < this.lowBound) {
                    this.self.scale.x = 1;
                    this.self.body.velocity.x = velocity;
                }
            }
        };
        console.log("enemies defined");

        
        /////////
        //ITEMS//
        /////////
        // Items get argument player so interaction functions can get put in item
        // classes insead of Bevonia class; reduces clutter
        
        Sword = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "sword");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.player = player;
            
            // Animate
            this.self.animations.add("spin", [0, 1]);
            this.self.animations.play("spin", 5, true);
            
            // Interaction with player
            this.interactWith = function () {
                this.player.hasSword = true;
                this.self.kill();
            }
        }
        
        Armor = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "helmet");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.player = player
            
            this.self.animations.add("spin", [0, 1, 2, 3]);
            this.self.animations.play("spin", 5, true);
            
            this.interactWith = function () {
                this.player.armored = "ARMORED";
                this.player.damageFactor = .125;
                this.self.kill();
            }
        }
        
        HealthPotion = function(x,y,player){
            this.self = game.add.sprite(x,y,'healthPotion')
            this.self.anchor.setTo(0.5,0.5)
            this.self.scale.setTo(0.6,0.6)
            game.physics.enable(this.self)
            this.self.body.gravity.y = 1200
            this.player = player
            
            this.interactWith = function(){
                if(this.player.health < 1){
                    console.log('health potion picked up')
                    this.self.kill()
                    this.player.health += 0.25
                    if(this.player.health >= 1) this.player.health = 1
                }
                else console.log('health full')
            }
        }
        ManaPotion = function(x,y,player){
            this.self = game.add.sprite(x,y,'manaPotion')
            this.self.anchor.setTo(0.5,0.5)
            this.self.scale.setTo(0.6,0.6)
            game.physics.enable(this.self)
            this.self.body.gravity.y = 1200
            this.player = player
            
            this.interactWith = function(){
                if(this.player.mana < 1){
                    console.log('mana potion picked up')
                    this.self.kill()
                    this.player.mana += 0.25
                    if(this.player.mana >= 1) this.player.mana = 1
                }
                else console.log('mana full')
            }
        }
        
        // Works
        Key = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "key");
            this.self.anchor.setTo(0.5, 0.5);
            this.player = player;
            game.physics.enable(this.self);
            
            this.self.animations.add("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
            this.self.animations.play("spin", 5, true);
            
            this.interactWith = function () {
                this.player.hasKey = true;
                this.self.kill();
            }
        }
        
        // Works
        Chest = function (x, y, contentsArray, player, itemsArray) {
            // Setup
            this.self = game.add.sprite(x, y, "chest");
            this.self.anchor.setTo(0.5, 0.5);
            this.contents = contentsArray;
            this.player = player;
            this.closed = true;
            
            game.physics.enable(this.self);
            
            this.self.animations.add("open", [1]);
            
            this.interactWith = function () {
                if (this.closed) {
                    console.log("Chest Opened");
                    this.self.animations.play("open", 1, false);
                    this.player.hasKey = false;
                    var i; for (i = 0; i < this.contents.length; i++) {
                        game.physics.enable(this.contents[i].self);
                        this.contents[i].self.body.x = this.self.body.x + 90;
                        this.contents[i].self.body.y = this.self.body.y - 5;
                        this.contents[i].self.anchor.setTo(0.5,0.5);
                        this.contents[i].self.body.collideWorldBounds = true;
                        
                    }
                    this.closed = false;
                }
            }
        }
        
        // Doesn't exist yet
        Scroll = function (x, y, typeStr, player) {
            // Setup
            this.self = game.add.sprite(x, y, typeStr + "scroll");
            this.self.anchor.setTo(0.5, 0.5);
        }
        
        Door = function (x, y, targetStateStr, player) {
            // Setup
            this.self = game.add.sprite(x, y, "door");
            this.player = player;
            this.targetState = targetStateStr;
            game.physics.enable(this.self);
            
            this.interactWith = function () {
                game.state.start(this.targetState);
            }
            
        }
        console.log("items defined");
        
        
        /////////////////
        //SPELL OBJECTS//
        /////////////////
        aoeItem = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "aoeObject");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.player = player;
            
            // Animate
            this.self.animations.add("tempt", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            this.self.animations.play("tempt", 6, true);
            
            // Interaction
            this.interactWith = function () {
                this.player.hasAOE = true;
                this.self.kill();
            }     
        }
        
        aoeProjectile = function (player) {
            this.player = player;
            x0 = this.player.self.body.x;
            y0 = this.player.self.body.y;
            this.self = game.add.sprite(x0, y0, "aoeProjectile");
            
            console.log(this.self)
            
            this.self.anchor.set(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.animations.add("exist", [1, 2]);
            this.self.animations.play("exist", 10, true);
            
            
            
        }
        
        
        
        
        ////////////
        //TUTORIAL//
        ////////////
        tutorialGhost = function (x, y, player, messageStr) {
            // Technical variables
            this.player = player;
            this.message = messageStr;
            
            // Setup
            this.self = game.add.sprite(x, y, "ghost");
            game.physics.enable(this.self);
            
            // Animate
            this.self.animations.add("hide", [1]);
            this.self.animations.add("appear", [0, 1, 2, 3]);
            this.self.animations.play("hide", 1, true);
            
            // Check for player within 4 tile (128px) radius and responds accordingly
            this.manifest = function () {
                var dy = this.self.body.y - this.player.self.body.y;
                dy *= dy;
                var dx = this.self.body.x - this.player.self.body.x;
                dx *= dx;
                this.text = "";
                if (dx + dy < 16384) {
                    this.self.animations.play("appear", 9, true);
                    this.text = game.add.text(290, 4, this.message);
                }
                else {
                    this.self.animations.play("hide", 1, true);
                    
                }
            }
        }
        console.log("haunting commenced");
        
        
        ///////////
        //BEVONIA//
        ///////////
        Bars = function (player) {
            // Technical variables
            this.player = player;
            
            // Setup
            this.holder = game.add.sprite(0, 0 , "barHolder");
            this.healthBar = game.add.sprite(32, 8, "healthBar");
            this.manaBar = game.add.sprite(32, 72, "manaBar");
            
            this.holder.fixedToCamera = true;
            this.healthBar.fixedToCamera = true;
            this.manaBar.fixedToCamera = true;
            
            // Keeps track of, display's players health and mana
            this.displayStats = function () {
                this.healthBar.scale.x = this.player.health;
                this.manaBar.scale.x = this.player.mana;
            }
        }
        
        Inventory = function (player) {
            // Technical variables
            this.player = player;
            
            // Setup
            this.self = game.add.sprite(866, 0, "inventory");
            this.self.fixedToCamera = true;
        }
        
        
        
        Bevonia = function (x, y, deathY) {
        // TECHNICAL VARIABLES
            // Physics
            var speed = 300;
            var weight = 1200;
            this.deathY = deathY;
            
            // Strings
            this.armored = "";
            
            // Status bars
            this.health = 1;
            this.mana = 1;
            
            // Action booleans
            this.vulnerable = true;
            this.stabbing = false;
            this.aoeExists = false;
            
            // Possession variables
            this.hasSword = false;
            this.hasKey = false;
            this.damageFactor = .25;
            this.hasAOE = false;
            
            // Timers
            this.stabTimer = 0;
            this.aoeTimer = 0;
            this.invincibilityTimer = 0;
            this.invincibilityPeriod = 2000;
        
        // AUDIO
            this.jumpSound = game.sound.add("jump");
            this.aoeSound = game.sound.add('aoe');
            this.castSound = game.sound.add('cast');
            
            
        // SETUP
            // Spawn
            this.self = game.add.sprite(x, y, "bevonia");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.body.gravity.y = weight;
            
            // Camera
            game.camera.follow(this.self);
            
            // Animate
            this.self.animations.add("run", [2, 3, 4, 5], 0, true);
            this.self.animations.add("jump", [1], 0, true);
            this.self.animations.add("idle", [0], 0, true);
            this.self.animations.add("ARMOREDrun", [9, 10, 11, 12], 0, true);
            this.self.animations.add("ARMOREDjump", [8], 0, true);
            this.self.animations.add("ARMOREDidle", [7], 0, true);
            this.self.animations.add("hide", [6], 0, true);
            
        // BEVONIA STAB SPRITE STUFF 
            // Setup
            this.stabSprite = game.add.sprite(x, y, "stabBevonia");
            this.stabSprite.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.stabSprite);
            
            // Animate
            this.stabSprite.animations.add("hide",[0], 0, true);
            this.stabSprite.animations.add("stab",[1, 2, 3], 0, true);
            this.stabSprite.animations.add("ARMOREDstab",[4, 5, 6], 0, true);
            this.stabSprite.animations.play("hide", 1, true);
        
            // Melee attack
            this.stab = function () {
                if (this.hasSword && game.input.keyboard.isDown(Phaser.Keyboard.L) && this.stabTimer < game.time.now) {
                    this.stabTimer = game.time.now + 310;
                    this.stabbing = true;
                }
                else if (this.stabTimer > game.time.now) {
                    this.self.animations.play("hide", 1, false);
                    this.stabSprite.animations.play(this.armored + "stab", 18, false);
                    if (this.grounded) {
                        this.self.body.velocity.x = 0;
                    }
                }
                else {
                    this.stabSprite.animations.play("hide", 1, true);
                    this.stabbing = false;
                }
            }
            
            // Spell casting
            this.castAOE = function () {
                if (this.hasAOE && game.input.keyboard.isDown(Phaser.Keyboard.K) && this.aoeTimer < game.time.now && this.mana > 0.2) {
                    console.log("IM WORKING HAHA");
                    this.aoeTimer = game.time.now + 1000;
                    this.aoeExists = true;
                    this.playerAOE = new aoeProjectile(this);
                    this.castSound.play();
                    
                    // Physics settings here cause it's not working in the class function
                    this.playerAOE.self.body.velocity.x = this.self.scale.x * 400;
                    this.playerAOE.self.body.velocity.y = -150;
                    this.playerAOE.self.body.gravity.y = 1200;
                    
                    this.mana -= .2;   
                }
            } 
            
        // MOVEMENT
            // Running
            this.run = function () {
                // Keep stab sprite with actual sprite
                this.stabSprite.body.x = this.self.body.x;
                this.stabSprite.body.y = this.self.body.y;
                this.stabSprite.scale.x = this.self.scale.x
                
                // Actual movement conditions
                if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.A) || !game.input.keyboard.isDown(Phaser.Keyboard.D) && !game.input.keyboard.isDown(Phaser.Keyboard.A)){
                    this.self.body.velocity.x = 0;
                    this.self.animations.play(this.armored + "idle", 0, true);
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                    this.self.body.velocity.x = -speed;
                    this.self.animations.play(this.armored + 'run', 8, true);
                    this.self.scale.x = -1;
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                    
                    this.self.body.velocity.x = speed;
                    this.self.animations.play(this.armored + 'run', 8, true);
                    this.self.scale.x = 1;
                }
            }
            
            // Jumping
            this.jump = function () {
                this.grounded = this.self.body.blocked.down;
                if (this.grounded) { 
                    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                        this.self.body.velocity.y -= 650;
                        this.jumpSound.play();
                    }
                }
                else {
                    this.self.animations.play(this.armored + "jump", 1, true);
                    if (this.self.body.velocity.y > 1000) {
                        this.self.body.velocity.y = 1000;
                    }
                }
            }           
            
        // INTERACTIONS
            // Enemy interaction
            this.manageVulnerability = function () {
                if (!this.vulnerable && game.time.now > this.invincibilityTimer) {
                    this.vulnerable = true;
                }
            }
            this.die = function () {
                if (this.health <= 0 || this.self.body.y > this.deathY) {
                    game.state.start(game.state.current);
                }
            }

            console.log("princess successfully created");
        }
            
        
        console.log("princess captured");
        
        
        game.state.start("title");
    
    }
}
