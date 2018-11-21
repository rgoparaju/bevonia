//variables
var test;
var bevonia = null;
var inventory1 = null;
var platforms1;
demo.state1 = function () {};
demo.state1.prototype = {
    preload: function () {
        // Load environment
        game.load.tilemap("level1", "assets/tilemaps/level1V2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("wall sprite 2", "assets/tilesets_backgrounds/wall sprite 2.png");
        
    },
    create: function () {
    // CREATE ENVIRONMENT
        // Background
        background1 = game.add.sprite(0, 0, "bg1");
        // Tilemap
        var map1 = game.add.tilemap("level1");
        map1.addTilesetImage("wall sprite 2");
        map1.addTilesetImage("deathSpikes");
        // Camera
        game.world.setBounds(0, 0, 2624, 1536);
        
        platforms1 = map1.createLayer("platforms");
        traps1 = map1.createLayer("traps");
        
        map1.setCollision(1, true, "platforms");
        map1.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps");
        
        // Create new Bevonia and HUD
        chest1_1 = new Chest(2084, 1440, null, null);
        door1 = new Door (2560, 672, "state2", null);
        bevonia = new Bevonia(128, 128, 1536);

        // Place enemies
        skeleton1_1 = new Skeleton(48, 1376, 33, 640, bevonia);
        bat1_1 = new Bat(1090, 784, bevonia);
        bat1_2 = new Bat(2433, 974, bevonia);
        spider1_1 = new Spider(1706, 400, 304, 592, "y", -1, bevonia);
        spider1_2 = new Spider(1960, 950, 912, 1360, "y", -1, bevonia);
        skeleton1_2 = new Skeleton(1416, 736, 1482, 1702, bevonia);
        chest1_1.player = bevonia;
        enemies1 = [skeleton1_1, bat1_1, bat1_2, spider1_1, skeleton1_2, spider1_2]
        
        bars = new Bars(bevonia);
        
        
        // Place, store items
        fixBrick = game.add.sprite(2592, 1989, "platforms");
        sword = new Sword(111, 364, bevonia);
        armor = new Armor(1104, 816, bevonia);
        healthPotion = new HealthPotion(353, 1200,bevonia)
        
        healthPotion1 = new HealthPotion(353, 1296,bevonia)
        healthPotion2 = new HealthPotion(362, 1296,bevonia)
        healthPotion3 = new HealthPotion(373, 1296,bevonia)
        healthPotion4 = new HealthPotion(383, 1296,bevonia)
        
        manaPotion = new ManaPotion(638,1200,bevonia)
        key = new Key (2562, 320, bevonia);
        exitKey = new SilverKey(0, 0, bevonia);
        chest1_1.contents = [exitKey];
        spell = new aoeItem(48, 856, bevonia);
        door1.player = bevonia;
        inventory1 = new Inventory(bevonia)
        
        //SFX
        jumpSound = game.sound.add("jump");
        aoeSound = game.sound.add('aoe');
        castSound = game.sound.add('cast');
        
        //MUSIC
        backgroundMusic = game.add.audio('levelOne');
        backgroundMusic.loop = true;
        backgroundMusic.play();        
        
        items1 = [sword, armor, spell, key, exitKey, door1, chest1_1, healthPotion, manaPotion, healthPotion1, healthPotion2, healthPotion3, healthPotion4];
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms1);
        game.physics.arcade.collide(healthPotion.self,platforms1)
        game.physics.arcade.collide(healthPotion1.self,platforms1)
        game.physics.arcade.collide(healthPotion2.self,platforms1)
        game.physics.arcade.collide(healthPotion3.self,platforms1)
        game.physics.arcade.collide(healthPotion4.self,platforms1)
        
        game.physics.arcade.collide(manaPotion.self,platforms1)
        game.physics.arcade.collide(bat1_1.self,platforms1)
        game.physics.arcade.collide(bat1_2.self, platforms1);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        bevonia.castPrecise();
        
        inventory1.selector()
        
        skeleton1_1.patrol();
        bat1_1.watch();
        bat1_2.watch();
        spider1_1.patrol();
        spider1_2.patrol();
        skeleton1_2.patrol();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            console.log("E is down okay");
            var i; for (i = 0; i < items1.length; i++) {
                if (game.physics.arcade.overlap(bevonia.self, items1[i].self)) {
                    console.log("I detect an overlap!!");
                    if(items1[i].interactWith())
                        inventory1.add(items1[i])
                    inventory1.display()
                }
            }
        }
        
        var j; for (j = 0; j < enemies1.length; j++) {
            if (game.physics.arcade.overlap(bevonia.self, enemies1[j].self) && !enemies1[j].vulnerable) {
                if (bevonia.stabbing) {
                    enemies1[j].hitCount += 1;
                    enemies1[j].vulnerable = true;
                    enemies1[j].die();
                    enemies1[j].invincibilityTimer = game.time.now + 500;
                }
                else if (bevonia.vulnerable) {
                    bevonia.health -= bevonia.damageFactor;
                    bevonia.vulnerable = false;
                    bevonia.invincibilityTimer = game.time.now + bevonia.invincibilityPeriod;
                }
            }
            enemies1[j].manageVulnerability();
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
                    
                    enemies1[k].hitCount += 2;
                    enemies1[k].vulnerable = true;
                    enemies1[k].die();
                    enemies1[k].invincibilityTimer = game.time.now + 500;
                    
                    boom.anchor.setTo(.5, .5);
                    boom.scale.setTo(1.5, 1.5);
                    boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                    bevonia.playerAOE.self.kill();
                    boom.animations.play("explode", 9, false);
                    bevonia.aoeExists = false;
                }
            enemies1[k].manageVulnerability();
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
