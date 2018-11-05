var bevonia;
var map2;
demo.state2 = function () {};
demo.state2.prototype = {
    preload: function () {
        // LOAD TILEMAP
        game.load.tilemap("level2", "assets/tilemaps/level2.json", null, Phaser.Tilemap.TILED_JSON);
        
    },
    create: function () {
        // CREATE ENVIRONMENT
        game.stage.backgroundColor = "#000000"
        
        map2 = game.add.tilemap("level2");
        map2.addTilesetImage("floorV4");
        map2.addTilesetImage("spikes");
        
        game.world.setBounds(0, 0, 2912, 1952);
        
        platforms2 = map2.createLayer("platforms");
        traps2 = map2.createLayer("traps");
        
        map2.setCollision(1, true, "platforms");
        map2.setCollision([2, 3, 4, 5, 6, 8], true, "traps");
        
        bevonia = new Bevonia(128, 128, 1952);
        bars = new Bars(bevonia);
        
        armor2 = new Armor(1952, 1772, bevonia);
        sword2 = new Sword(80, 818, bevonia);
        door2 = new Door(992, 128, "state4", bevonia);
        
        //MUSIC
        backgroundMusic = game.add.audio('levelTwo');
        backgroundMusic.loop = true;
        backgroundMusic.play();        
        
        
        items2 = [armor2, sword2, door2];
        
        // PLACE 11 BATS evenly over x in range 2112, 2466 (y ~ 164)
        //bat1_1 = new Bat(2112, 1666, bevonia);
        bat1_2 = new Bat(2144, 1666, bevonia);
        bat1_3 = new Bat(2176, 1666, bevonia);
        bat1_4 = new Bat(2208, 1666, bevonia);
        bat1_5 = new Bat(2240, 1666, bevonia);
        //bat1_6 = new Bat(2272, 1666, bevonia);
        bat1_7 = new Bat(2304, 1666, bevonia);
        bat1_8 = new Bat(2336, 1666, bevonia);
        bat1_9 = new Bat(2368, 1666, bevonia);
        bat1_10 = new Bat(2400, 1666, bevonia);
        bat1_11 = new Bat(2432, 1666, bevonia);
        
        // 1 troll in the troll section (2389, 368)
        troll1_1 = new Troll(2389, 376, 2262, 2317, 300, 368, bevonia);
        
        spider1_1 = new Spider(2408, 784, 867, 1264, "y", -1);
        spider1_2 = new Spider(2488, 784, 867, 1264, "y", 1);
        
        enemies2 = [spider1_1, spider1_2,bat1_2,bat1_3,bat1_4,bat1_5,bat1_7,bat1_8,bat1_9,bat1_10,bat1_11, troll1_1]
    
        
        
        // chest 1035 464
//        chest2Contents = [healthPotion];
////        items2 = [armor2, sword2, door2, aoe2];
//        
//        chest2 = new Chest(1035, 464, chest2Contents, bevonia, items2);
//        items2.push(chest2);
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms2);
        //game.physics.arcade.collide(bat1_1.self, platforms2);
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
        game.physics.arcade.collide(troll1_1.self, platforms2);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        bevonia.castPrecise();
        
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
        troll1_1.patrol();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            var i; for (i = 0; i < items2.length; i++) {
                if (game.physics.arcade.overlap(bevonia.self, items2[i].self)) {
                    console.log("I detect an overlap!!");
                    items2[i].interactWith();
                }
            
            }
        }
        
        var j; for (j = 0; j < enemies2.length; j++) {
            if (game.physics.arcade.overlap(bevonia.self, enemies2[j].self)) {
                if (bevonia.stabbing) {
                    enemies2[j].self.kill();
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
                    enemies2[k].self.kill();
                    boom.anchor.setTo(.5, .5);
                    boom.scale.setTo(1.5, 1.5);
                    boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                    bevonia.playerAOE.self.kill();
                    boom.animations.play("explode", 9, false);
                    bevonia.aoeExists = false;
                }
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