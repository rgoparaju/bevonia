var bevonia;
var map2;
var knockedTo = 10;
var inventory2 = null;
demo.state2 = function () {};
demo.state2.prototype = {
    preload: function () {
        // LOAD TILEMAP
        game.load.tilemap("level2", "assets/tilemaps/level2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("spikes", "assets/tilesets_backgrounds/deathSpikes.png", 32, 32);
        game.load.image("bg2", "assets/tilesets_backgrounds/bg22.png", 2912, 1952);
        game.load.image("floorV5", "assets/tilesets_backgrounds/floorV5.png", 32, 32);
        
    },
    create: function () {
        // CREATE ENVIRONMENT
        game.stage.backgroundColor = "#111111";
        var bg2 = game.add.sprite(0, 0, "bg2");
        
        
        map2 = game.add.tilemap("level2");
        map2.addTilesetImage("floorV5");
        map2.addTilesetImage("spikes");
        
        game.world.setBounds(0, 0, 2912, 1952);
        
        platforms2 = map2.createLayer("platforms");
        traps2 = map2.createLayer("traps");
        
        map2.setCollision(10, true, "platforms");
        map2.setCollision([1, 2, 3, 4, 5, 6, , 7, 8], true, "traps");
        door2 = new Door(992, 128, "state3", null);
        chest2_1 = new Chest(1030, 480, null, null);
        
        bevonia = new Bevonia(128, 128, 1952);
        door2.player = bevonia;
        chest2_1.player = bevonia;
        flag2_1 = new Checkpoint(1090,1152,bevonia)
        
        armor2 = new Armor(1952, 1772, bevonia);
        sword2 = new Sword(80, 818, bevonia);
        key2 = new Key (903, 1860, bevonia);
        exitKey2 = new SilverKey(0, 0, bevonia);
        chest2_1.contents = [exitKey2];
        spell2 = new aoeItem(48, 1106, bevonia);
        healthPotion2_1 = new HealthPotion(1998, 592, bevonia);
        healthPotion2_2 = new HealthPotion(32, 1392, bevonia);
        manaPotion2_1 = new ManaPotion(2414,144, bevonia);
        
        mana2_1 = new ManaPotion(57, 560, bevonia);
        mana2_2 = new ManaPotion(2480, 784, bevonia);
        mana2_3 = new ManaPotion(1120, 256, bevonia);
        mana2_3.self.body.gravity.y = 0;
        health1_1 = new HealthPotion(160, 1750, bevonia);
        health1_2 = new HealthPotion(2800, 784, bevonia);
        health1_1.self.body.gravity.y = 0;
        
        inventory2 = new Inventory(bevonia)

        for(var x = 0; x < inventory1.contents.length; x++){
            if(inventory1.contents[x] instanceof HealthPotion){
                tempPotion = new HealthPotion(0,1900,bevonia)
                inventory2.add(tempPotion)
            }
            else if(inventory1.contents[x] instanceof ManaPotion){
                tempPotion2 = new ManaPotion(0,1900,bevonia)
                inventory2.add(tempPotion2)
            }
        } 
//        console.log(inventory2.contents)
        
        //MUSIC
        backgroundMusic = game.add.audio('levelTwo');
        backgroundMusic.loop = true;
        backgroundMusic.play();        
        
        
        items2 = [armor2, sword2, door2,chest2_1,exitKey2,spell2,key2, healthPotion2_1, healthPotion2_2, manaPotion2_1, mana2_1, mana2_2, mana2_3, health1_2, health1_1];
        
        skeleton2_1 = new Skeleton(400, 1856, 257, 892, bevonia);
        skeleton2_2 = new Skeleton(200, 960, 192, 647, bevonia);
        skeleton2_3 = new Skeleton(48, 576, 36, 642, bevonia);
        skeleton2_4 = new Skeleton(710, 768, 707, 880, bevonia);
        skeleton2_5 = new Skeleton(1600, 368, 1540, 1916, bevonia);
        skeleton2_6 = new Skeleton(2000, 368, 1948, 2428, bevonia);
        
//         PLACE 11 BATS evenly over x in range 2112, 2466 (y ~ 164)
//        bat1_1 = new Bat(2112, 1666, bevonia);
        bat1_2 = new Bat(2144, 1666, bevonia);
        bat1_3 = new Bat(2176, 1666, bevonia);
        bat1_4 = new Bat(2208, 1666, bevonia);
        bat1_5 = new Bat(2240, 1666, bevonia);
//        bat1_6 = new Bat(2272, 1666, bevonia);
        bat1_7 = new Bat(2304, 1666, bevonia);
        bat1_8 = new Bat(2336, 1666, bevonia);
        bat1_9 = new Bat(2368, 1666, bevonia);
        bat1_10 = new Bat(2400, 1666, bevonia);
        bat1_11 = new Bat(2432, 1666, bevonia);
        
        
        
        spider1_1 = new Spider(2408, 784, 867, 1264, "y", -1, bevonia);
        spider1_2 = new Spider(2488, 784, 867, 1264, "y", 1, bevonia);
        
        bars = new Bars(bevonia);
//        tempInventory = game.add.sprite(325,8,'inventory')
//        tempInventory.fixedToCamera = true
        enemies2 = [skeleton2_1, skeleton2_2, skeleton2_3, skeleton2_4, skeleton2_5, skeleton2_6, spider1_1, spider1_2,bat1_2,bat1_3,bat1_4,bat1_5,bat1_7,bat1_8,bat1_9,bat1_10,bat1_11]
    
        inventory2.display()
        
        // chest 1035 464
//        chest2Contents = [healthPotion];
////        items2 = [armor2, sword2, door2, aoe2];
//        
//        chest2 = new Chest(1035, 464, chest2Contents, bevonia, items2);
//        items2.push(chest2);
    },
    update: function () {
        inventory2.selector()     
        
        game.physics.arcade.collide(bevonia.self, platforms2);
        //game.physics.arcade.collide(bat1_1.self, platforms2);
        game.physics.arcade.collide(skeleton2_1.self, platforms2);
        game.physics.arcade.collide(skeleton2_2.self, platforms2);
        game.physics.arcade.collide(skeleton2_3.self, platforms2);
        game.physics.arcade.collide(skeleton2_4.self, platforms2);
        game.physics.arcade.collide(skeleton2_5.self, platforms2);
        game.physics.arcade.collide(skeleton2_6.self, platforms2);
        game.physics.arcade.collide(bat1_2.self, platforms2);
        game.physics.arcade.collide(bat1_3.self, platforms2);
        game.physics.arcade.collide(bat1_4.self, platforms2);
        game.physics.arcade.collide(bat1_5.self, platforms2);
        //game.physics.arcade.collide(bat1_6.self, platforms2);
        game.physics.arcade.collide(bat1_7.self, platforms2);
        game.physics.arcade.collide(bat1_8.self, platforms2);
        game.physics.arcade.collide(bat1_9.self, platforms2);
        game.physics.arcade.collide(bat1_10.self, platforms2);
        game.physics.arcade.collide(bat1_11.self, platforms2);
        game.physics.arcade.collide(healthPotion2_1.self,platforms1)
        game.physics.arcade.collide(healthPotion2_2.self,platforms1)
        game.physics.arcade.collide(manaPotion2_1.self,platforms1)
        game.physics.arcade.collide(mana2_1.self, platforms2);
        game.physics.arcade.collide(mana2_2.self, platforms2);
        game.physics.arcade.collide(mana2_3.self, platforms2);
        game.physics.arcade.collide(health1_1.self, platforms2);
        game.physics.arcade.collide(health1_2.self, platforms2);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        bevonia.castPrecise();
        
        skeleton2_1.patrol();
        skeleton2_2.patrol();
        skeleton2_3.patrol();
        skeleton2_4.patrol();
        skeleton2_5.patrol();
        skeleton2_6.patrol();
        
        spider1_1.patrol();
        spider1_2.patrol();
        //bat1_1.watch();
        bat1_2.watch();
        bat1_3.watch();
        bat1_4.watch();
        bat1_5.watch();
        //bat1_6.watch();
        bat1_7.watch();
        bat1_8.watch();
        bat1_9.watch();
        bat1_10.watch();
        bat1_11.watch();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            var i; for (i = 0; i < items2.length; i++) {
                if (game.physics.arcade.overlap(bevonia.self, items2[i].self)) {
                    console.log("I detect an overlap!!");
                    if(items2[i].interactWith())
                        inventory2.add(items2[i])
                    inventory2.display()
                }
            }
        }
        
        var j; for (j = 0; j < enemies2.length; j++) {
            if (game.physics.arcade.overlap(bevonia.self, enemies2[j].self) && !enemies2[j].vulnerable) {
                if (bevonia.stabbing) {
                    Skeleton.prototype.toString = function(){
                        return 'Skeleton'
                    }
                    
                    if (enemies2[j].toString() == 'Skeleton'){
                    
                    var enemy_distance = 1000;
                    if (knockedTo == 0){
                        enemies2[j].self.animations.stop();
                        knockedTo = (enemies2[j].self.body.x - (enemy_distance*2));
                    }
//                    enemies2[j].self.body.velocity.x = -500;
                    if (enemies2[j].self.body.x <= (knockedTo + enemy_distance/2)){
                        if (bevonia.self.scale.x == -1){
//                        enemies2[j].self.body.velocity.x = -500;
                        enemies2[j].self.body.velocity.y = -200;
                        //console.log("FUCK")
                        }
                        else if (bevonia.self.scale.x == 1){
                            console.log("UM");
//                            enemies2[j].self.body.velocity.x = 500;
                            enemies2[j].self.body.velocity.y = -200;
                        }
//                        game.time.events.add(20, enemies2[j].self.body.velocity.y = -10, this);
                    }
                    else{
                        if (bevonia.self.scale.x == -1){
//                        enemies2[j].self.body.velocity.x = -500;
                        enemies2[j].self.body.velocity.y = -200;
                        //console.log("SHIT")
                        }
                        else if (bevonia.self.scale.x == 1){
                            console.log("UM SHIT");
//                            enemies2[j].self.body.velocity.x = 500;
                            enemies2[j].self.body.velocity.y = -200;
                        }
                    }
                    if (enemies2[j].self.body.x <= knockedTo){
                        //console.log("BITCH")
                        enemies2[j].frame = 1;
                        knockedTo = 0;
                        knockback = false;
                    }
//                     enemies2[j].self.body.velocity.x = -250   
                    }
                    
                    enemies2[j].hitCount += 1;
                    enemies2[j].vulnerable = true;
                    enemies2[j].die();
                    enemies2[j].invincibilityTimer = game.time.now + 500;
                    
                }
                else if (bevonia.vulnerable) {
                    bevonia.health -= bevonia.damageFactor;
                    bevonia.self.animations.stop();
                var distance = 1000;
                if (knockedTo == 0){
                    knockedTo = (bevonia.self.body.x - (distance*2));
                    bevonia.vulnerable = false;
                }
                bevonia.self.body.velocity.x = -500;
                if (bevonia.self.body.x <= (knockedTo + distance/2)){
                    bevonia.self.body.velocity.x = -500;
                    bevonia.self.body.velocity.y = -200;
                }
                else{
                    bevonia.self.body.velocity.y = -250;
                    bevonia.self.body.velocity.x = -500;
                }
                if (bevonia.self.body.x <= knockedTo){
                    bevonia.frame = 2;
                    knockedTo = 0;
                    knockback = false;
                }
                function invincible() {
                    bevonia.self.body.sprite.alpha = 1;
                }
                    bevonia.vulnerable = false;
                    bevonia.self.body.sprite.alpha = 0.5;
                    bevonia.invincibilityTimer = game.time.now + bevonia.invincibilityPeriod;                   
                    game.time.events.add(bevonia.invincibilityPeriod, invincible, this);
                    
                }
            }
            enemies2[j].manageVulnerability();
        }
        if(game.physics.arcade.overlap(bevonia.self,flag2_1.self) && !flag2_1.activated){
            flag2_1.activateCheckpoint()
        }
        if(bevonia.die()) flag2_1.resetToCheckpoint()
        
        // Spell enemy interaction
        if (bevonia.aoeExists) {
            console.log(game.physics.arcade.overlap(bevonia.playerAOE.self, enemies2));
            // Detect a collision with either the environment or enemies
            var k; for(k = 0; k < enemies2.length; k++) {
                if (game.physics.arcade.overlap(bevonia.playerAOE.self, enemies2[k].self)) {
                    bevonia.aoeSound.play();
                    xBoom = bevonia.playerAOE.self.body.x;
                    yBoom = bevonia.playerAOE.self.body.y;
                    var boom = game.add.sprite(xBoom, yBoom, "aoeBlast");
                    game.camera.shake(.02, 300);
                    game.physics.enable(boom);
                    
                    enemies2[k].hitCount += 2;
                    enemies2[k].vulnerable = true;
                    enemies2[k].die();
                    enemies2[k].invincibilityTimer = game.time.now + 500;
                    
                    boom.anchor.setTo(.5, .5);
                    boom.scale.setTo(1.5, 1.5);
                    boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                    bevonia.playerAOE.self.kill();
                    boom.animations.play("explode", 9, false);
                    bevonia.aoeExists = false;
                }
                enemies2[k].manageVulnerability();
            }
            if (game.physics.arcade.collide(bevonia.playerAOE.self, [platforms2, traps2])) {
                bevonia.aoeSound.play();
                xBoom = bevonia.playerAOE.self.body.x;
                yBoom = bevonia.playerAOE.self.body.y;
                var boom = game.add.sprite(xBoom, yBoom, "aoeBlast");
                game.camera.shake(.02, 300);
                game.physics.enable(boom);
                boom.anchor.setTo(.5, .5);
                boom.scale.setTo(1.5, 1.5);
                boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                bevonia.playerAOE.self.kill();
                boom.animations.play("explode", 9, false);
                bevonia.aoeExists = false;
                
            }
        }
        if (bevonia.preciseExists) {
            var l; for(l = 0; l < enemies2.length; l++) {
                if (game.physics.arcade.overlap(bevonia.playerPrecise.self, enemies2[l].self)) {
                    enemies2[l].self.kill();
                    bevonia.playerPrecise.self.kill();
                    bevonia.preciseExists = false;
                    
                }
            }
            if (game.physics.arcade.collide(bevonia.playerPrecise.self, platforms2)){
                bevonia.playerPrecise.self.kill();
                bevonia.preciseExists = false;
            }
            
        }
        
        
        if (game.physics.arcade.collide(bevonia.self, traps2)) {
            bevonia.health -= 1;
        }
    }
}
