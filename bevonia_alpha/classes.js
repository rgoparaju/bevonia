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
                    this.self.animations.play("fly", 12, true);
                }
                return condition;
            }

            // Finds unit vector from bat to player, scaled vector by bat velocity
            // Bat doesn't rest until it is dead
            this.attack = function () {
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
            
            // Animate
            this.self.animations.add("spin", [0, 1]);
            this.self.animations.play("spin", 5, true);
            
            // Interaction with player
            this.interactWith = function (player) {
                player.hasSword = true;
                game.kill(this.self);
            }
        }
        
        Armor = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "helmet");
            this.self.anchor.setTo(0.5, 0.5);
            
            this.self.animations.add("spin", [0, 1, 2, 3]);
            this.self.animations.play("spin", 5, true);
        }
        
        Potion = function (x, y, typeStr, player) {
            // Setup
            this.self = game.add.sprite(x, y, typeStr + "Potion");
            this.self.anchor.setTo(0.5, 0.5);
        }
        
        Key = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "key");
            this.self.anchor.setTo(0.5, 0.5);
            
            this.self.animations.add("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
            this.self.animations.play("spin", 5, true);
        }
        
        Chest = function (x, y, contentsArray, player) {
            // Setup
            this.self = game.add.sprite(x, y, "chest");
            this.self.anchor.setTo(0.5, 0.5);
            
            this.self.animations.add("open", [1]);
            }
        
        Scroll = function (x, y, typeStr, player) {
            // Setup
            this.self = game.add.sprite(x, y, typeStr + "scroll");
            this.self.anchor.setTo(0.5, 0.5);
        }
        
        Door = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "door");
            this.self.anchor.setTo(0.5, 0.5);
        }
        console.log("items defined");
        
        
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
        
        
        
        Bevonia = function (x, y) {
        // TECHNICAL VARIABLES
            // Physics
            var speed = 300;
            var weight = 1200;
            
            // Strings
            this.armored = "";
            
            // Status bars
            this.health = 1;
            this.mana = 1;
            
            // Action booleans
            this.vulnerable = true;
            
            // Possession variables
            this.hasSword = false;
            this.hasKey = false;
            this.damageFactor = .25;
            
            // Timers
            this.stabTimer = 0;
            this.stabPeriod = 1000;
            this.invincibilityTimer = 0;
            this.invincibilityPeriod = 2000;
            
            
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
            this.self.animations.add("hide", [0], 0, true);
            
            //
            // BEVONIA STAB SPRITE STUFF
            //
            
        // MOVEMENT
            // Running
            this.run = function () {
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
                    }
                }
                else {
                    this.self.animations.play(this.armored + "jump", 1, true);
                    if (this.self.body.velocity.y > 1000) {
                        this.self.body.velocity.y = 1000;
                    }
                }
            }
            
            // Sword swinging
            // NEED BEVONIA STAB SPRITE STUFF FIRST
            
            
            // Spell casting
            
            
            // Dying
            
        // INTERACTIONS
            // Enemy interaction
            this.manageVulnerability = function () {
                if (!this.vulnerable && game.time.now > this.invincibilityTimer) {
                    this.vulnerable = true;
                }
            }
            this.die = function () {
                if (this.health <= 0 || this.self.body.y > 1320) {
                    game.state.start(game.state.current);
                }
            }

            console.log("princess successfully created");
        }
            
        
        console.log("princess captured");
        
        
        game.state.start("title");
    
    }
}