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
            var counter = 0;
            this.soundTimer = 0;
            
            // Setup
            this.self = game.add.sprite(x, y, "bat");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            this.batSound = game.sound.add('batSound');
            this.batDeath = game.sound.add('batDeath');
            this.batSound.loop = true;
            
            // Animate
            this.self.animations.add("sleep", [0]);
            this.self.animations.add("fly", [1, 2, 3, 4]);
            this.self.animations.play("sleep", 0, true);
            
            // Behavior
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
                else this.returnToCeiling()
                return condition;
            }

            // Finds unit vector from bat to player, scaled vector by bat velocity
            // Bat doesn't rest until it is dead
            this.attack = function () {
                var xDiff = this.player.self.body.x - this.self.body.x;
                var yDiff = this.player.self.body.y - this.self.body.y;
//                if ((xDiff * xDiff + yDiff * yDiff) < 147456 && this.soundTimer < game.time.now){
//                    this.batSound.play();
//                    this.soundTimer = game.time.now + 576;
//                }
                if (xDiff * xDiff + yDiff * yDiff > 147456) {
                    this.batSound.stop();
                }
                
            if (this.self.alive == false && counter == 0){
                this.batDeath.play();
                this.batSound.stop();
                counter++;
                
            }
            if (this.self.alive == false){
                this.batSound.stop();
            }
                //console.log('bat is attacking')
                var xComp = this.player.self.body.x - this.self.body.x;
                var yComp = this.player.self.body.y - this.self.body.y;
                
                var norm = Math.sqrt(xComp * xComp + yComp * yComp);
                
                xComp /= norm;
                yComp /= norm;
                
                if (xComp < 0) {
                    this.self.scale.x = 1;
                }
                else if (xComp > 0) {
                    this.self.scale.x = -1;
                }
                
                this.self.body.velocity.x = velocity * xComp;
                this.self.body.velocity.y = velocity * yComp;
            }
            
            this.returnToCeiling = function(){
                if(!this.self.body.blocked.up){
                    this.self.body.velocity.y = -100
//                    console.log('bat flying to ceiling')
                }
                if(this.self.body.blocked.up) {
                    this.self.animations.play("sleep", 0, true)
                    this.self.body.velocity.x = 0
                    this.self.body.velocity.y = 0
//                    console.log('bat at ceiling')
                }
            }
            this.manageVulnerability = function () {}
            this.die = function () {
                this.self.kill();
            }
        };
        
        // Patrols vertical or horizonal interval
        // directionStr is allowed to be "x" or "y"
        Spider = function (x, y, lowBound, upBound, directionStr, scaleX, player) {
            
            // Technical variables
            this.lowBound = lowBound;
            this.upBound = upBound;
            this.direction = directionStr;
            this.player = player;
            var velocity = 200;
            this.hitCount = 0;
            this.vulnerable = false;
            var counter = 0;
            this.soundTimer = 0;
            
            // Setup
            this.spiderSound = game.sound.add('spiderSound');
            this.spiderDeath = game.sound.add('spiderDeath');
            this.gotHit = game.sound.add("spiderHit");
            this.spiderSound.loop = true;
            this.self = game.add.sprite(x, y, "spider_" + this.direction);
            this.self.anchor.setTo(0.5, 0.5);
            this.self.scale.x = scaleX;
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            //console.log(Math.abs(this.player.self.body.x - this.self.body.x));
            if (this.direction == "x") {
                this.self.body.velocity.x = -velocity;
            }
            else {
                this.self.body.velocity.y = -velocity;
            }
            
            
//            else {
//                this.spiderSound.stop();
//            }
            
            // Animate
            this.self.animations.add("crawl", [0, 1, 2]);
            this.self.animations.play("crawl", 7, true);
            
            // Behavior
            this.patrol = function () {
                var xDiff = this.player.self.body.x - this.self.body.x;
                var yDiff = this.player.self.body.y - this.self.body.y;
                if ((xDiff * xDiff + yDiff * yDiff) < 147456 && this.soundTimer < game.time.now){
                    this.spiderSound.play();
                    this.soundTimer = game.time.now + 2014
                }
                else if (xDiff * xDiff + yDiff * yDiff > 147456) {
                    this.spiderSound.stop();
                }
                
                if (this.self.alive == false && counter == 0){
                    this.spiderDeath.play();
                    this.spiderSound.stop();
                    counter++;
                }
                if (this.self.alive == false){
                        this.spiderSound.stop();
                }
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
            this.manageVulnerability = function () {
                if (game.time.now > this.invincibilityTimer) {
                    this.vulnerable = false;
                }
            }
            this.die = function () {
                if (this.hitCount >= 4) {
                    this.self.kill();
                }
                else {
                    this.gotHit.play();
                }
            }
        };
        
        // Patrols horizontal interval
        Skeleton = function (x, y, lowBound, upBound, player) {
            // Technical variables
            var velocity = 300;
            this.lowBound = lowBound;
            this.upBound = upBound;
            this.player = player;
            this.hitCount = 0;
            this.vulnerable = false;
            this.soundTimer = 0;

            this.invincibilityTimer = 0

            var counter = 0;

            
            // Setup
            this.self = game.add.sprite(x, y, "skeleton");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            this.self.body.gravity.y = 1200;
            this.self.body.velocity.x = velocity;
            this.skeletonSound = game.sound.add('skeletonSound');
            this.skeletonDeath = game.sound.add('skeletonDeath');
            this.gotHit = game.sound.add("skeletonHit");
            this.skeletonSound.loop = true;
            
            // Animate
            this.self.animations.add("patrol", [0, 1, 2, 3]);
            this.self.animations.play("patrol", 8, true);
    
            // Behavior
            this.patrol = function () {
                var xDiff = this.player.self.body.x - this.self.body.x;
                var yDiff = this.player.self.body.y - this.self.body.y;
                if ((xDiff * xDiff + yDiff * yDiff) < 147456 && this.soundTimer < game.time.now){
                    this.skeletonSound.play();
                    this.soundTimer = game.time.now + 2143;
                }
                else if (xDiff * xDiff + yDiff * yDiff > 147456) {
                    this.skeletonSound.stop();
                }
            if (this.self.alive == false && counter == 0){
                this.skeletonDeath.play();
                this.skeletonSound.stop();
                counter++;
            }
                if (this.self.alive == false){
                this.skeletonSound.stop();
            }
                if (this.self.body.x > this.upBound) {
                    this.self.scale.x = -1;
                    this.self.body.velocity.x = -velocity;
                }
                else if (this.self.body.x < this.lowBound) {
                    this.self.scale.x = 1;
                    this.self.body.velocity.x = velocity;
                }
            }
            this.manageVulnerability = function () {
                if (game.time.now > this.invincibilityTimer) {
                    this.vulnerable = false;
                }
            }
            this.die = function () {
                console.log(this.hitCount);
                if (this.hitCount >= 2) {
                    this.self.kill();
                }
                else {
                    this.gotHit.play();
                }
            }
        };
        console.log("enemies defined");
        
        Troll = function (x, y, loX, hiX, loY, hiY, player) {
            // Technical variables
            var velocity = 310;
            this.player = player;
            this.asleep = true;
            this.loX = loX; this.hiX = hiX;
            this.loY = loY; this.hiY = hiY;
            this.hitCount = 0;
            this.vulnerable = false;
            this.invincibilityTimer = 0;
            
            // Setup
            this.self = game.add.sprite(x, y, "troll");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            this.self.body.velocity.x = 0;
            
            // Animate
            this.self.animations.add("sleep", [0]);
            this.self.animations.add("chase", [1, 2, 3])
            this.self.animations.play("sleep", 1, "true");
            this.roar = game.sound.add('trollRoar');
            
            // Behavior
            this.patrol = function () {
                var xSatisfied = this.player.self.body.x > this.loX && this.player.self.body.x < this.hiX;
                var ySatisfied = this.player.self.body.y > this.loY && this.player.self.body.y < this.hiY;
                if (xSatisfied && ySatisfied && this.asleep) {
                    this.asleep = false;
                    this.roar.play();
                    this.self.body.velocity.x = -velocity;
                    this.self.animations.play("chase", 10, true);
                }
            }
            this.manageVulnerability = function () {
                if (game.time.now > this.invincibilityTimer) {
                    this.vulnerable = false;
                }
            }
            this.die = function () {
                if (this.hitCount >= 10) {
                    this.self.kill();
                }
            }
        }
        

        
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
            this.interactSound = game.sound.add('schlang');
            
            // Interaction with player
            this.interactWith = function () {
                this.player.hasSword = true;
                this.interactSound.play();
                this.self.kill();
            }
            
            this.equip = function(){
                console.log('test')
                this.player.hasSword = true
                return true
            }
            
            Sword.prototype.toString = function(){
                return 'Sword'
            }
        }
        
        Armor = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "helmet");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.interactSound = game.sound.add('clunk');
            this.player = player
            
            this.self.animations.add("spin", [0, 1, 2, 3]);
            this.self.animations.play("spin", 5, true);
            
            this.interactWith = function () {
                this.player.armored = "ARMORED";
                this.player.damageFactor = .125;
                this.interactSound.play();
                this.self.kill();
            }
        }
        
        HealthPotion = function(x,y,player){
            this.self = game.add.sprite(x,y,'healthPotion')
            this.self.anchor.setTo(0.5,0.5)
            this.self.scale.setTo(0.6,0.6)
            game.physics.enable(this.self)
            this.interactSound = game.sound.add('clink');
            this.self.body.gravity.y = 1200
            this.player = player
            
            this.self.animations.add("tempt", [0, 1]);
            this.self.animations.play("tempt", 6, true);
            
            this.interactWith = function(){
                console.log('health potion picked up')
                this.interactSound.play();
                this.self.kill()
                return true

            }
            
            this.equip = function(){
                    if(this.player.health < 1){
                    console.log('health potion picked up')
                        
                    this.self.kill()
                    this.player.health += 0.25
                    if(this.player.health >= 1) this.player.health = 1
                    return true
                }
                else console.log('health full')
            }
            
            HealthPotion.prototype.toString = function(){
                return 'Health Potion'
            }
        }
        ManaPotion = function(x,y,player){
            this.self = game.add.sprite(x,y,'manaPotion')
            this.self.anchor.setTo(0.5,0.5)
            
            this.self.scale.setTo(0.6,0.6)
            game.physics.enable(this.self)
            this.interactSound = game.sound.add('clink');
            this.self.body.gravity.y = 1200
            this.player = player
            
            this.self.animations.add("tempt", [0, 1]);
            this.self.animations.play("tempt", 6, true);
            
            this.interactWith = function(){
                console.log('mana potion picked up')
                this.interactSound.play();
                this.self.kill()
                return true

            }
            this.equip = function(){
                if(this.player.mana < 1){
                 console.log('mana potion picked up')
                 this.self.kill()
                 this.player.mana += 0.25
                 if(this.player.mana >= 1) this.player.mana = 1
                 return true
             }
             else console.log('mana full')
            }
            
            ManaPotion.prototype.toString = function(){
                return 'Mana Potion'
            }
        }
        
        // Works
        Key = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "key");
            this.self.anchor.setTo(0.5, 0.5);
            this.player = player;
            game.physics.enable(this.self);
            this.jangle = game.add.sound("jangle");
            
            this.self.animations.add("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
            this.self.animations.play("spin", 5, true);
            
            this.interactWith = function () {
                this.player.keySprite = game.add.sprite(370, 8, "key");
                this.player.keySprite.fixedToCamera = true;
                this.jangle.play();
                this.player.hasKey = true;
                this.self.kill();
            }
        }
        SilverKey = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "silverKey");
            this.self.anchor.setTo(0.5, 0.5);
            this.player = player;
            this.jangle = game.add.sound("jangle");
            game.physics.enable(this.self);
            
            this.self.animations.add("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
            this.self.animations.play("spin", 5, true);
            
            this.interactWith = function () {
                this.player.silverKeySprite = game.add.sprite(370, 72, "silverKey");
                this.player.silverKeySprite.fixedToCamera = true;
                this.jangle.play();
                this.player.hasSilverKey = true;
                this.self.kill();
            }
        }
        
        // Works
        Chest = function (x, y, contentsArray, player) {
            // Setup
            this.self = game.add.sprite(x, y, "chest");
            this.self.anchor.setTo(0.5, 0.5);
            this.contents = contentsArray;
            this.player = player;
            this.closed = true;
            this.lockedSound = game.add.sound("locked");
            this.unlockSound = game.add.sound("unlock");
            this.soundTimer = 0;
            
            game.physics.enable(this.self);
            
            this.self.animations.add("open", [1]);
            
            this.interactWith = function () {
                if (this.closed && this.player.hasKey) {
                    this.player.keySprite.kill();
                    console.log("Chest Opened");
                    this.self.animations.play("open", 1, false);
                    this.player.hasKey = false;
                    this.unlockSound.play();
                    var i; for (i = 0; i < this.contents.length; i++) {
                        game.physics.enable(this.contents[i].self);
                        this.contents[i].self.body.x = this.self.body.x + 90;
                        this.contents[i].self.body.y = this.self.body.y + 10;
                        this.contents[i].self.anchor.setTo(0.5,0.5);
                        this.contents[i].self.body.collideWorldBounds = true;   
                    }
                    this.closed = false;
                }
                else if (this.closed && this.soundTimer < game.time.now){
                    this.lockedSound.play();
                    this.soundTimer = game.time.now + 500;
                }
            }
        }

        
        Door = function (x, y, targetStateStr, player) {
            // Setup
            this.self = game.add.sprite(x, y, "door");
            this.player = player;
            this.targetState = targetStateStr;
            game.physics.enable(this.self);
            this.self.animations.add("open", [1], 0, true);
            this.lockedSound = game.add.sound("locked");
            this.unlockSound = game.add.sound("unlock");
            this.soundTimer = 0;
            
            this.interactWith = function () {
                if (this.player.hasSilverKey) {
                    this.player.silverKeySprite.kill();
                    this.self.animations.play("open", 1, false);
                    this.unlockSound.play();
                    game.sound.stopAll();
                    game.state.start(this.targetState);
                }
                else if (this.soundTimer < game.time.now) {
                    this.lockedSound.play();
                    this.soundTimer = game.time.now + 500;
                }
            }
            
        }
        console.log("items defined");
        
        
        /////////////
        //INVENTORY//
        /////////////
        Inventory = function(player){
            this.player = player
            this.numOfItemsInInventory = 0
            this.numOfHealthPotions = 0
            this.numOfManaPotions = 0
            this.contents = []
            
            this.healthTimer = 0
            this.manaTimer = 0
            
            this.drink = game.add.sound('glug')
            
            this.healthText = game.add.text(330,8,'- ' + this.numOfHealthPotions,{fontsize: '25px', fill: '#ffffff'})
            this.healthText.fixedToCamera = true
            this.manaText = game.add.text(330,72,'- ' + this.numOfManaPotions,{fontsize: '25px', fill: '#ffffff'})
            this.manaText.fixedToCamera = true
            
            this.add = function(item) {
                console.log('item is transferred to inventory')
                this.contents.push(item)
                this.numOfItemsInInventory++
                if(item.toString() == 'Health Potion') this.numOfHealthPotions++
                if(item.toString() == 'Mana Potion') this.numOfManaPotions++
//                for(var x = 0; x < this.contents.length; x++) console.log(this.contents[x])
                console.log(this.contents)
//                console.log(this.numOfItemsInInventory)
//                console.log(this.numOfHealthPotions + ' health')
//                console.log(this.numOfManaPotions + ' mana')
                this.display()
            }
            
            this.display = function(){
                displayHealth = game.add.sprite(300,8,'healthPotion')
//                displayHealth.anchor.setTo(0.5,0.5)
                displayHealth.scale.setTo(0.6,0.6)
                displayHealth.fixedToCamera = true
                displayMana = game.add.sprite(300,72,'manaPotion')
//                displayMana.anchor.setTo(0.5,0.5)
                displayMana.scale.setTo(0.6,0.6)
                displayMana.fixedToCamera = true
                
                
                this.healthText.text = '- ' + this.numOfHealthPotions
                this.manaText.text = '- ' + this.numOfManaPotions    
            }
            this.display()
            
            this.selector = function(){
                var canUseHealth = true;
                var canUseMana = true;
                if(game.input.keyboard.isDown(Phaser.Keyboard.ONE) && this.numOfHealthPotions != 0 && this.healthTimer < game.time.now){
                    // Find health potion index in this.contents
                    var index = 0
                    for(var x = 0; x < this.contents.length; x++){
                        if(this.contents[x] instanceof HealthPotion){
                            index = x
                        }
                    }
                    // Use found health potion
                    if(this.contents[index].equip()){
                        this.contents.splice(index,1)
                        this.numOfHealthPotions--
                        this.display()
                        this.drink.play()
//                        console.log(this.contents)
                    }
                    this.healthTimer = game.time.now + 500
                }
                
                if(game.input.keyboard.isDown(Phaser.Keyboard.TWO) && this.numOfManaPotions != 0 && this.manaTimer < game.time.now){
                    // Find mana potion index in this.contents
                    var index = 0
                    for(var x = 0; x < this.contents.length; x++){
                        if(this.contents[x] instanceof ManaPotion){
                            index = x
                        }
                    }
                    // Use found mana potion
                    if(this.contents[index].equip()){
                        this.contents.splice(index,1)
                        this.numOfManaPotions--
                        this.display()
                        this.drink.play()
//                        console.log(this.contents)
                    }
                    this.manaTimer = game.time.now + 500
                    
                }
                
                

            }

        }
        
        //CHECKPOINTS
        Checkpoint = function(x,y,player){
            this.self = game.add.sprite(x,y,'flag')
            this.self.anchor.setTo(0.5,0.5)
            game.physics.enable(this.self)
            this.activated = false
            this.player = player
            this.self.animations.add("fallen", [0], 0, false);
            this.self.animations.add("wave", [1,2,3,4], 0, false);
            this.self.animations.play("fallen", 0, true);
            
//            this.replacementInventory = new Inventory(this.player)
            this.replacementHealth = 1
            this.replacementMana = 1
            
            this.activateCheckpoint = function(){
                this.activated = true
                this.self.animations.play("wave", 8, true);
                this.player.lastResetX = x
                this.player.lastResetY = y
                this.replacementHealth = this.player.health
                this.replacementMana = this.player.mana
                
//                for(var x = 0; x < items.contents.length; x++){
//                    if(items.contents[x] instanceof HealthPotion){
//                        tempPotion = new HealthPotion(0,0,this.player)
//                        this.replacementInventory.add(tempPotion)
//                    }
//                    else if(items.contents[x] instanceof ManaPotion){
//                        tempPotion2 = new ManaPotion(0,0,this.player)
//                        this.replacementInventory.add(tempPotion2)
//                    }
//                }
//                console.log(this.replacementInventory.contents)
                
                
                console.log('checkpoint activated')
//                console.log(this.activated + x + ', ' + y)
            }
            this.resetToCheckpoint = function(){
                this.player.health = this.replacementHealth
                this.player.mana = this.replacementMana
//                this.player.body.x = this.player.lastResetX
//                this.player.body.y = this.player.lastResetY
//                this.player.health = this.replacementHealth
//                this.player.mana = this.replacementMana
                console.log('checkpointed')
            }
        }
        
        /////////////////
        //SPELL OBJECTS//
        /////////////////
        aoeItem = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "aoeObject");
            this.interactSound = game.sound.add('interact');
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.player = player;
            
            // Animate
            this.self.animations.add("tempt", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            this.self.animations.play("tempt", 6, true);
            
            // Interaction
            this.interactWith = function () {
                this.interactSound.play();
                this.player.hasAOE = true;
                this.self.kill();
            }     
        }
        aoeProjectile = function (player) {
            this.player = player;
            x0 = this.player.self.body.x + 16;
            y0 = this.player.self.body.y + 24;
            this.self = game.add.sprite(x0, y0, "aoeProjectile");
            
            console.log(this.self)
            
            this.self.anchor.set(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.animations.add("exist", [0, 1]);
            this.self.animations.play("exist", 10, true);
        }
        
        preciseItem = function (x, y, player) {
            // Setup
            this.self = game.add.sprite(x, y, "preciseObject");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.player = player;
            
            // Animate
            this.self.animations.add("tempt", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            this.self.animations.play("tempt", 6, true);
            
            // Interaction
            this.interactWith = function () {
                this.player.hasPrecise = true;
                this.self.kill();
            }
        }
        preciseProjectile = function (player) {
            // Technical variables
            this.player = player;
            x0 = this.player.self.body.x + 24;
            y0 = this.player.self.body.y + 24;
            this.self = game.add.sprite(x0, y0, "preciseProject");
            
            // Setup
            game.physics.enable(this.self);
            this.self.anchor.setTo(0.5, 0.5);
            this.self.scale.y = -1;
            
            // Animation
            this.self.animations.add("exist", [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
            this.self.animations.play("exist", 24, true);
            
            // Physics set up in Bevonia.castPrecise () 
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
        
        
        Bevonia = function (x, y, deathY) {
            this.lastResetX = x
            this.lastResetY = y
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
            this.preciseExists = false;
            
            // Possession variables
            this.hasSword = false;
            this.hasKey = false;
            this.hasSilverKey = false;
            this.damageFactor = .25;
            this.hasAOE = false;
            this.hasPrecise = false;
            
            // Timers
            this.stabTimer = 0;
            this.aoeTimer = 0;
            this.preciseTimer = 0;
            this.invincibilityTimer = 0;
            this.invincibilityPeriod = 2000;
        
        // AUDIO
            this.jumpSound = game.sound.add("jump");
            this.aoeSound = game.sound.add('aoe');
            this.castSound = game.sound.add('cast');
            this.dieSound = game.sound.add('die');
            this.stabSound = game.sound.add('stab');
            // pew pew for precise
            
            
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
            this.self.animations.add("cast", [13, 14, 15], 0, true);
            this.self.animations.add("ARMOREDrun", [9, 10, 11, 12], 0, true);
            this.self.animations.add("ARMOREDjump", [8], 0, true);
            this.self.animations.add("ARMOREDidle", [7], 0, true);
            this.self.animations.add("ARMOREDcast", [16, 16, 16], 0, true);
            this.self.animations.add("hide", [6], 0, true);
            
        // BEVONIA STAB SPRITE STUFF 
            // Setup
            this.stabSprite = game.add.sprite(x, y, "stabBevonia");
            this.stabSprite.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.stabSprite);
            
            // Animate
            this.stabSprite.animations.add("hide",[0], 0, true);
            this.stabSprite.animations.add("stab",[1, 2, 3], 0, false);
            this.stabSprite.animations.add("ARMOREDstab",[4, 5, 6], 0, false);
            this.stabSprite.animations.play("hide", 1, true);
        
            // Melee attack
            this.stab = function () {
                if (this.hasSword && game.input.keyboard.isDown(Phaser.Keyboard.L) && this.stabTimer < game.time.now) {
                    this.stabTimer = game.time.now + 310;
                    this.stabbing = true;
                    this.stabSound.play();
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
            // AOE
            this.castAOE = function () {
                if (this.hasAOE && game.input.keyboard.isDown(Phaser.Keyboard.K) && this.aoeTimer < game.time.now && this.mana > 0.2) {
                    this.aoeTimer = game.time.now + 1000;
                    this.aoeExists = true;
                    this.playerAOE = new aoeProjectile(this);
                    this.castSound.play();
                    
                    // Physics settings here cause it's not working in the class function
                    this.playerAOE.self.body.velocity.x = this.self.scale.x * 400;
                    this.playerAOE.self.body.velocity.y = -150;
                    this.playerAOE.self.body.gravity.y = 1200;
                    
                    this.mana -= .2;
                    var played = false
                }
                else if(this.aoeTimer - 500 > game.time.now) {
                    this.self.animations.play(this.armored + "cast", 12, true);
                    
                }
            }
            // Precise
            this.castPrecise = function () {
                if (this.hasPrecise && game.input.keyboard.isDown(Phaser.Keyboard.J) && this.preciseTimer < game.time.now && this.mana > 0.2) {
                    console.log("working");
                    this.preciseTimer = game.time.now + 500;
                    this.preciseExists = true;
                    this.playerPrecise = new preciseProjectile(this);
                    //sound
                    
                    this.playerPrecise.self.body.velocity.x = this.self.scale.x * 600;
                    
                    this.mana -= .1;
                    
                    
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
                //console.log(this.self.body.velocity.y);
                
                this.grounded = this.self.body.blocked.down;
                    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && jumpTimer == 0 && this.grounded) {
                        //console.log("FUCK");
                        jumpTimer = 1;
                        this.self.body.velocity.y = -475;
                        this.jumpSound.play();
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.W) && (jumpTimer > 0 && jumpTimer < 21)){
                        //console.log("SHIT");
                        jumpTimer++;
                        this.self.body.velocity.y = -475 + (jumpTimer * 7);
                    }
                    else{
                        //console.log("BITCH");
                        jumpTimer = 0;
                    }
                    
                if (this.grounded == false){
                    this.self.animations.play(this.armored + "jump", 1, true);
                    if (this.self.body.velocity.y > 900) {
                        this.self.body.velocity.y = 900;
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
//                    game.sound.stopAll();
//                    game.sound.stopAll();
//                    game.sound.stopAll();
                    this.dieSound.play();
                    
//                    return true
//                    this.health = 1
//                    this.mana = 1
                    this.self.body.x = this.lastResetX - 25
                    this.self.body.y = this.lastResetY - 25
                    return true
//                    game.state.start(game.state.current);

                }
            }

            console.log("princess successfully created");
        }
        
        
        Fireball = function (x, y, player) {
            x0 = x; 
            y0 = y;
            
            this.self = game.add.sprite(x0, y0, "fireball");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.existSound = game.sound.add("fireball");
            this.self.animations.add("exist", [0, 1]);
            this.self.animations.play("exist", 12, true)
            this.existSound.play()
            this.player = player;
            
            var velocity = 600
            var dx = this.player.self.body.x - this.self.body.x;
            var dy = this.player.self.body.y - this.self.body.y;
            var norm = Math.sqrt(dx * dx + dy * dy);
            dx /= norm;
            dy /= norm;
            
            this.self.body.velocity.x = dx * velocity;
            this.self.body.velocity.y = dy * velocity;
            
            this.manageExistence = function () {
                if (this.self.body.x < 0 || this.self.body.y > 512) {
                    this.existSound.stop();
                    this.self.kill()
                }
            }
        }
        
        Dragon = function (player) {
            // Technical variables
            this.player = player;
            this.attacking = false;
            this.attackTimer = 0;
            this.health = 1;
            this.alive = true;
            
            // Setup
            this.self = game.add.sprite(964, 512, "dragon");
            this.self.anchor.setTo(0.5, 0.5);
            game.physics.enable(this.self);
            this.self.body.collideWorldBounds = true;
            this.deathSound = game.add.sound("dragonDeath");
            this.hurtSound = game.add.sound("dragonSpit");
            this.enterSound = game.add.sound("dragonEnter");
            this.spitSound = game.add.sound("dragonSpit");
            this.enterSound.play();
            
            // Animate
            this.self.animations.add("rise", [2, 3, 4, 5, 6, 7, 8]);
            this.self.animations.add("fall", [8, 7, 6, 5, 4, 3, 2]);
            this.self.animations.add("jet", [0, 1]);
            this.self.animations.add("breathe" [7, 8])
            this.self.animations.play("rise", 10, false);
            this.self.animations.play("breathe", 10, true);
            
            this.manageHealth = function () {
                if (this.health <= 0) {
                    if (this.alive) {
                        this.deathSound.play();
                        this.alive = false;
                    }
                    else {
                        this.self.kill();
                    }
                }
            }
        }
            
        
        console.log("princess captured");
        
        
        
        
        game.state.start("title");
    
    }
}
