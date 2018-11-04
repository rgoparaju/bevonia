//variables
var test;
var bevonia;
var platforms1;
demo.state1 = function () {};
demo.state1.prototype = {
    create: function () {
    // CREATE ENVIRONMENT
        // Background
        background1 = game.add.sprite(0, 0, "bg1");
        // Tilemap
        var map1 = game.add.tilemap("level1");
        map1.addTilesetImage("platforms");
        map1.addTilesetImage("spikes");
        // Camera
        game.world.setBounds(0, 0, 2624, 1344);
        
        platforms1 = map1.createLayer("platforms");
        traps1 = map1.createLayer("traps");
        
        map1.setCollision(1, true, "platforms");
        map1.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps");
        
        // Create new Bevonia and HUD
        //bevonia = new Bevonia(128, 128);
        bevonia = new Bevonia(128, 128, 1344);
        //inventory = new Inventory(866, 0);
        
        // Tutorial ghost test
        //ghost1 = new tutorialGhost (360, 128, bevonia, "Press A to go left, D to go right, and W to \n jump");
        
        
        
        // Place enemies
        skeleton1_1 = new Skeleton(48, 896, 48, 736);
        bat1_1 = new Bat(896, 368, bevonia);
        spider1_1 = new Spider(1144, 76, 64, 240, "y", 1);
        skeleton1_2 = new Skeleton(1425, 320, 1312, 1606);
//        chest1_1 = new Chest(100,895,'healthPotion',bevonia);
        
        enemies1 = [skeleton1_1, bat1_1, spider1_1, skeleton1_2]
        
        bars = new Bars(bevonia);
        
        
        // Place, store items
        fixBrick = game.add.sprite(2592, 1989, "platforms");
        sword = new Sword(376, 528, bevonia);
        armor = new Armor(947, 688, bevonia);
        healthPotion = new HealthPotion(400,700,bevonia)
        manaPotion = new ManaPotion(450,700,bevonia)
        //key = new Key (200, 128, bevonia);
        spell = new aoeItem(848, 528, bevonia);
        door1 = new Door (2592, 1089, "state2", bevonia);
        inventory = new Inventory(bevonia)
        
        //SFX
        jumpSound = game.sound.add("jump");
        aoeSound = game.sound.add('aoe');
        castSound = game.sound.add('cast');
        
        
        items1 = [sword, armor, spell, door1,healthPotion,manaPotion];
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms1);
        game.physics.arcade.collide(healthPotion.self,platforms1)
        game.physics.arcade.collide(manaPotion.self,platforms1)
        game.physics.arcade.collide(bat1_1.self,platforms1)
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        bevonia.castPrecise();
        
        //ghost1.manifest();
        
        skeleton1_1.patrol();
        bat1_1.watch();
        spider1_1.patrol();
        skeleton1_2.patrol();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            console.log("E is down okay");
            var i; for (i = 0; i < items1.length; i++) {
                if (game.physics.arcade.overlap(bevonia.self, items1[i].self)) {
                    console.log("I detect an overlap!!");
                    if(items1[i].interactWith())
                        inventory.add(items1[i])
                }
            
            }
        }
        var j; for (j = 0; j < enemies1.length; j++) {
            if (game.physics.arcade.overlap(bevonia.self, enemies1[j].self)) {
                if (bevonia.stabbing) {
                    enemies1[j].self.kill();
                }
                else if (bevonia.vulnerable) {
                    bevonia.health -= bevonia.damageFactor;
                    bevonia.vulnerable = false;
                    bevonia.invincibilityTimer = game.time.now + bevonia.invincibilityPeriod;
                }
            }
        }
        
        // Spell enemy interaction
        if (bevonia.aoeExists) {
            //console.log(game.physics.arcade.overlap(bevonia.playerAOE.self, enemies1));
            // Detect a collision with either the environment or enemies
            var k; for(k = 0; k < enemies1.length; k++) {
                if (game.physics.arcade.overlap(bevonia.playerAOE.self, enemies1[k].self)) {
                    bevonia.aoeSound.play();
                    xBoom = bevonia.playerAOE.self.body.x;
                    yBoom = bevonia.playerAOE.self.body.y;
                    var boom = game.add.sprite(xBoom, yBoom, "aoeBlast");
                    game.camera.shake(.02, 300);
                    game.physics.enable(boom);
                    enemies1[k].self.kill();
                    boom.anchor.setTo(.5, .5);
                    boom.scale.setTo(1.5, 1.5);
                    boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                    bevonia.playerAOE.self.kill();
                    boom.animations.play("explode", 9, false);
                    bevonia.aoeExists = false;
                }
            }
            if (game.physics.arcade.collide(bevonia.playerAOE.self, [platforms1, traps1])) {
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
            var l; for(l = 0; l < enemies1.length; l++) {
                if (game.physics.arcade.overlap(bevonia.playerPrecise.self, enemies1[l].self)) {
                    enemies1[l].self.kill();
                    bevonia.playerPrecise.self.kill();
                    bevonia.preciseExists = false;
                    
                }
            }
            if (game.physics.arcade.collide(bevonia.playerPrecise.self, platforms1)){
                bevonia.playerPrecise.self.kill();
                bevonia.preciseExists = false;
            }
            
        }
        
        if (game.physics.arcade.collide(bevonia.self, traps1)) {
            bevonia.health -= 1;
        }
        
        
        
        //test.patrol();
    }
}
