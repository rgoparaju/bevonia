var bevonia
var map3, platforms3, traps3
demo.state3 = function(){}
demo.state3.prototype = {
    preload: function () {
        game.load.tilemap('level3', 'assets/tilemaps/level 3 v2.json', null, Phaser.Tilemap.TILED_JSON)  
        
    

        
    },
    create: function () {
        var background3 = game.add.sprite(0,10,'bg3')
        
        var map3 = game.add.tilemap("level3");
        map3.addTilesetImage("floorV4");
        map3.addTilesetImage("spikes");
//        
        game.world.setBounds(0, 0, 3200, 1600);
//        
        platforms3 = map3.createLayer("platforms");
        traps3 = map3.createLayer("traps");
//        
        map3.setCollision(1, true, "platforms");
        map3.setCollision([2, 3, 4, 5, 6, 7, 8, 9, 10, 11], true, "traps");
        
        door3 = new Door(864, 224, "state4", null);
        chest3 = new Chest(1890, 768, null, null);
        
        bevonia = new Bevonia(608, 224, 1632);
        flag3 = new Checkpoint(1430,1126,bevonia)
        
        door3.player = bevonia;
        chest3.player = bevonia;
        
        inventory3 = new Inventory(bevonia)

        for(var x = 0; x < inventory2.contents.length; x++){
            if(inventory2.contents[x] instanceof HealthPotion){
                tempPotion = new HealthPotion(0,0,bevonia)
                inventory3.add(tempPotion)
            }
            else if(inventory2.contents[x] instanceof ManaPotion){
                tempPotion2 = new ManaPotion(0,0,bevonia)
                inventory3.add(tempPotion2)
            }
        }
        
        armor3 = new Armor(159, 808, bevonia);
        sword3 = new Sword(257, 1424, bevonia);
        key3 = new Key(1471, 1504, bevonia);
        health3_1 = new HealthPotion(2478, 1168, bevonia);
        health3_2 = new HealthPotion(904, 464, bevonia);
        aoe3 = new aoeItem(382, 624, bevonia);
        
        
        
        mana3_1 = new ManaPotion(2923, 47, bevonia);
        mana3_2 = new ManaPotion(797, 1000, bevonia);
        mana3_3 = new ManaPotion(-8, -8, bevonia);
        mana3_2.self.body.gravity.y = 0;
        mana3_3.self.body.gravity.y = 0;
        exitKey3 = new SilverKey(1748, 160, bevonia);
        
        chest3.contents = [mana3_3];
        
        //MUSIC
        backgroundMusic = game.add.audio('levelThree');
        backgroundMusic.loop = true;
        backgroundMusic.play();
        
        items3 = [door3, chest3, armor3, sword3, key3, health3_1, health3_2, mana3_1, mana3_2, mana3_3, exitKey3, aoe3];
        
        skel3_1 = new Skeleton(400, 592, 322, 417, bevonia);
        skel3_2 = new Skeleton(300, 1424, 127, 387, bevonia);
        skel3_3 = new Skeleton(1500, 592, 1214, 1604, bevonia);
        skel3_4 = new Skeleton(1000, 752, 997, 1057, bevonia);
        skel3_5 = new Skeleton(1200, 912, 1182, 1287, bevonia);
        skel3_6 = new Skeleton(1600, 784, 1507, 1637, bevonia);
        skel3_7 = new Skeleton(2300, 912, 2276, 2496, bevonia);
        skel3_8 = new Skeleton(2000, 272, 1938, 2303, bevonia);
        skel3_9 = new Skeleton(2600, 272, 2463, 2848, bevonia);
        skel3_10 = new Skeleton(2200, 1488, 2112, 2307, bevonia);
        skel3_11 = new Skeleton(2500, 1488, 2467, 2687, bevonia);
        DorgamultothTheFinalSkeleton = new Skeleton(1000, 272, 904, 1121, bevonia);
        
        spider3_1 = new Spider(1608, 1200, 1216, 1424, "y", -1, bevonia);
        spider3_2 = new Spider(1880, 550, 526, 688, "y", 1, bevonia);
        spider3_3 = new Spider(2488, 650, 648, 720, "y", 1, bevonia);
        spider3_4 = new Spider(3080, 1200, 1066, 1328, "y", -1, bevonia);
        spider3_5 = new Spider(1560, 100, 32, 212, "y", 1, bevonia);
        
        bat3_1 = new Bat(2467, 1100, bevonia);
        bat3_2 = new Bat(3120, 275, bevonia);
        bat3_3 = new Bat(1406, 34, bevonia);
        bat3_4 = new Bat(2385, 34, bevonia);
        bat3_5 = new Bat(2655, 34, bevonia);
        bat3_6 = new Bat(2115, 34, bevonia);
        
        
        enemies3 = [skel3_1, skel3_2, skel3_3, skel3_4, skel3_5, skel3_6, skel3_7, skel3_8, skel3_9, skel3_10, skel3_11, spider3_1, spider3_2, spider3_3, spider3_4, spider3_5, bat3_1, bat3_2, bat3_3, bat3_4, bat3_5, bat3_6, DorgamultothTheFinalSkeleton];
        
        bars = new Bars(bevonia);
        
        
        
    },
    update: function(){       
        game.physics.arcade.collide(bevonia.self, platforms3)
        bevonia.run()
        bevonia.jump()
        if(bevonia.die()) flag3.resetToCheckpoint()
        bevonia.manageVulnerability()
        bevonia.stab()
        bevonia.castAOE()
        bevonia.castPrecise()
        
        bars.displayStats();
        inventory3.selector()
        
        if(game.physics.arcade.overlap(bevonia.self,flag3.self) && !flag3.activated){
            flag3.activateCheckpoint()
        }
//        var flagTimer = 0;
//        if (flag3.activated && flagTimer < game.time.now) {
//            
//        }
        
//        skel3_1
//        skel3_2
//        skel3_3
//        skel3_4
//        skel3_5
//        skel3_6
//        skel3_7
//        skel3_8
//        skel3_9
//        spider3_1
//        spider3_2
//        spider3_3
//        bat3_1
//        bat3_2
//        bat3_3
//        bat3_4
        
        game.physics.arcade.collide(skel3_1.self, platforms3);
        game.physics.arcade.collide(skel3_2.self, platforms3);
        game.physics.arcade.collide(skel3_3.self, platforms3);
        game.physics.arcade.collide(skel3_4.self, platforms3);
        game.physics.arcade.collide(skel3_5.self, platforms3);
        game.physics.arcade.collide(skel3_6.self, platforms3);
        game.physics.arcade.collide(skel3_7.self, platforms3);
        game.physics.arcade.collide(skel3_8.self, platforms3);
        game.physics.arcade.collide(skel3_9.self, platforms3);
        game.physics.arcade.collide(skel3_10.self, platforms3);
        game.physics.arcade.collide(skel3_11.self, platforms3);
        game.physics.arcade.collide(DorgamultothTheFinalSkeleton.self, platforms3);
        game.physics.arcade.collide(bat3_1.self, platforms3);
        game.physics.arcade.collide(bat3_2.self, platforms3);
        game.physics.arcade.collide(bat3_3.self, platforms3);
        game.physics.arcade.collide(bat3_4.self, platforms3);
        game.physics.arcade.collide(bat3_5.self, platforms3);
        game.physics.arcade.collide(bat3_6.self, platforms3);
        
        skel3_1.patrol();
        skel3_2.patrol();
        skel3_3.patrol();
        skel3_4.patrol();
        skel3_5.patrol();
        skel3_6.patrol();
        skel3_7.patrol();
        skel3_8.patrol();
        skel3_9.patrol();
        skel3_10.patrol();
        skel3_11.patrol();
        DorgamultothTheFinalSkeleton.patrol();
        spider3_1.patrol();
        spider3_2.patrol();
        spider3_3.patrol();
        spider3_4.patrol();
        spider3_5.patrol();
        bat3_1.watch();
        bat3_2.watch();
        bat3_3.watch();
        bat3_4.watch();
        bat3_5.watch();
        bat3_6.watch();
        
        game.physics.arcade.collide(health3_1.self,platforms3)
        game.physics.arcade.collide(health3_2.self,platforms3)
        game.physics.arcade.collide(mana3_1.self,platforms3)
        game.physics.arcade.collide(mana3_2.self,platforms3)
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            var i; for (i = 0; i < items3.length; i++) {
                if (game.physics.arcade.overlap(bevonia.self, items3[i].self)) {
                    console.log("I detect an overlap!!");
                    if(items3[i].interactWith())
                        inventory3.add(items3[i])
                    inventory3.display()
                }
            }
        }
        
        var j; for (j = 0; j < enemies3.length; j++) {
            if (game.physics.arcade.overlap(bevonia.self, enemies3[j].self) && !enemies3[j].vulnerable) {
                if (bevonia.stabbing) {
                    Skeleton.prototype.toString = function(){
                        return 'Skeleton'
                    }
                    
                    if (enemies3[j].toString() == 'Skeleton'){
                    
                    var enemy_distance = 1000;
                    if (knockedTo == 0){
                        enemies3[j].self.animations.stop();
                        knockedTo = (enemies3[j].self.body.x - (enemy_distance*2));
                    }
//                    enemies1[j].self.body.velocity.x = -500;
                    if (enemies3[j].self.body.x <= (knockedTo + enemy_distance/2)){
                        if (bevonia.self.scale.x == -1){
//                        enemies1[j].self.body.velocity.x = -500;
                        enemies3[j].self.body.velocity.y = -200;
                        console.log("FUCK")
                        }
                        else if (bevonia.self.scale.x == 1){
                            console.log("UM");
//                            enemies1[j].self.body.velocity.x = 500;
                            enemies3[j].self.body.velocity.y = -200;
                        }
//                        game.time.events.add(20, enemies1[j].self.body.velocity.y = -10, this);
                    }
                    else{
                        if (bevonia.self.scale.x == -1){
//                        enemies1[j].self.body.velocity.x = -500;
                        enemies3[j].self.body.velocity.y = -200;
                        console.log("SHIT")
                        }
                        else if (bevonia.self.scale.x == 1){
                            console.log("UM SHIT");
//                            enemies1[j].self.body.velocity.x = 500;
                            enemies3[j].self.body.velocity.y = -200;
                        }
                    }
                    if (enemies3[j].self.body.x <= knockedTo){
                        console.log("BITCH")
                        enemies3[j].frame = 1;
                        knockedTo = 0;
                        knockback = false;
                    }
//                     enemies1[j].self.body.velocity.x = -250   
                    }
                    
                    enemies3[j].hitCount += 1;
                    enemies3[j].vulnerable = true;
                    enemies3[j].die();
                    enemies3[j].invincibilityTimer = game.time.now + 500;
                    
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
            enemies3[j].manageVulnerability();
        }
        if (bevonia.aoeExists) {
            console.log(game.physics.arcade.overlap(bevonia.playerAOE.self, enemies3));
            // Detect a collision with either the environment or enemies
            var k; for(k = 0; k < enemies3.length; k++) {
                if (game.physics.arcade.overlap(bevonia.playerAOE.self, enemies3[k].self)) {
                    bevonia.aoeSound.play();
                    xBoom = bevonia.playerAOE.self.body.x;
                    yBoom = bevonia.playerAOE.self.body.y;
                    var boom = game.add.sprite(xBoom, yBoom, "aoeBlast");
                    game.camera.shake(.02, 300);
                    game.physics.enable(boom);
                    
                    enemies3[k].hitCount += 2;
                    enemies3[k].vulnerable = true;
                    enemies3[k].die();
                    enemies3[k].invincibilityTimer = game.time.now + 500;
                    
                    boom.anchor.setTo(.5, .5);
                    boom.scale.setTo(1.5, 1.5);
                    boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                    bevonia.playerAOE.self.kill();
                    boom.animations.play("explode", 9, false);
                    bevonia.aoeExists = false;
                }
                enemies3[k].manageVulnerability();
            }
            if (game.physics.arcade.collide(bevonia.playerAOE.self, [platforms3, traps3])) {
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
        
        
        if (game.physics.arcade.collide(bevonia.self, traps3)) {
            bevonia.health -= 1;
        }
    }
    
}
