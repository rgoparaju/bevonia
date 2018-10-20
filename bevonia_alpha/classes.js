// Don't worry about these two until the first 4 are good
// TROLL



// DRAGON

//////////////////////////////////
//ALL OBJECT CLASSES PLACED HERE//
//////////////////////////////////
//NOTES
//1. Enemies and Bevonia have an attribute self which is its body attribute's parent; be careful of this when directing enemies to respond to Bevonia's position


var Bevonia;
var Bat, Skeleton, Spider;
// object variables

demo.classes = function () {};
demo.classes.prototype = {
    create: function () {
        // Attacks when player proximity deceeds some constant
        // DOESN'T STOP ATTACKING UNTIL DEAD
        Bat = function (x, y, player) {
            // Technical variables
            var radiusSquared = 655;
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
            // CURRENTLY THIS IS NOT EFFECTIVE, I'M MOVING ON FOR NOW BUT IT NEEDS TO BE ADDRESSED ONCE BEVONIA EXISTS
            this.watch = function () {
                if ((this.player.self.body.x * this.player.self.body.x) + (this.player.self.body.y * this.player.self.body.y) < radiusSquared) {
                    this.self.animations.play("fly", 12, true);
                    this.attack();
                }
            }
            // Finds vector pointing from bat to player
            this.attack = function () {
                this.self.body.velocity.x = velocity * ((this.player.self.body.x - this.self.body.x) / (this.player.self.body.x - this.self.body.x));
                this.self.body.velocity.y = velocity * ((this.player.self.body.y - this.self.body.y) / (this.player.self.body.y - this.self.body.y));
            }
            
        };
        // Can patrol any interval over any flat surface
        Spider = function () {
          
        };
        // Patrols horizontal interval
        // WILL HAVE ATTRIBUTE AGGRO
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
        
        
        
        //
        //
        // ALL THE ITEM CLASSES
        //
        //
        console.log("items defined");
        
        Bevonia = function (x, y) {
            // TECHNICAL VARIABLES
            var speed = 300;
            var weight = 1200;
            
            this.armored = "";
            
            // Status bars
            // Action booleans
            // Possession booleans
            // Timers WE CAN DO BETTER
            //
            //
            //
            
            
            // SETUP
            // Spawn
            this.self = game.add.sprite(x, y, "bevonia");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            //this.self.body.gravity.y = weight;
            
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
            // BEVONIA STAB STUFF
            //
            
            // MOVEMENT
            // Running
            this.move = function () {
                if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.D) || !(game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.D)){
                    this.self.body.velocity.x = 0;
                    this.self.animations.play(this.armored + "idle", 0, true);
                
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
            
            
            // Sword swinging
            // NEED BEVONIA STAB STUFF FIRST
            
            
            // Spell casting
            
            
            // Dying
            
            // INTERACTIONS
            // Items
            
            
            // Enemies
            
            
            console.log("princess successfully created");
        }
            
        
        console.log("princess captured");
        
        
        game.state.start("state1");
    
    }
}