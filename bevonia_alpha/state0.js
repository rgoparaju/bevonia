demo.state0 = function () {};
demo.state0.prototype = {
    preload: function () {
        // Load in hint sprites
        game.load.spritesheet("hint", "assets/sprites/hint.png", 96, 64);
        game.load.spritesheet("E", "assets/sprites/E.png", 32, 32);
        game.load.spritesheet("L", "assets/sprites/L.png", 32, 32);
        game.load.spritesheet("K", "assets/sprites/K.png", 32, 32);
        
    },
    
    create: function () {
    // CREATE ENVIRONMENT
        game.stage.backgroundColor = "#60210d";
        
        
        var map0 = game.add.tilemap("tutorialLevel");
        map0.addTilesetImage("floorV4");
        map0.addTilesetImage("deathSpikes");
        
        game.world.setBounds(0, 0, 2624, 1344);
        
        platforms0 = map0.createLayer("platformsTut");
        traps0 = map0.createLayer("trapsTut");
        map0.setCollision(1, true, "platformsTut");
        map0.setCollision([2, 3, 4, 7], true ,"trapsTut");
        
    // CREATE HINTS
        hint = game.add.sprite(64, 1000, "hint");
        hint.animations.add("flash", [1, 2, 3]);
        hint.animations.play("flash", 4, true);
        
        E1 = game.add.sprite(476, 816, "E");
        E1.animations.add("flash", [0, 1]);
        E1.animations.play("flash", 4, true);
        E2 = game.add.sprite(580, 304, "E");
        E2.animations.add("flash", [0, 1]);
        E2.animations.play("flash", 4, true);
        E3 = game.add.sprite(100, 390, "E");
        E3.animations.add("flash", [0, 1]);
        E3.animations.play("flash", 4, true);
        L = game.add.sprite(100, 420, "L");
        L.animations.add("flash", [0, 1]);
        L.animations.play("flash", 4, true);
        K = game.add.sprite(1020, 600, "K");
        K.animations.add("flash", [1, 0]);
        K.animations.play("flash", 4, true);
        
    // CREATE BEVONIA
        bevonia = new Bevonia(95, 1003, 1344);
        bars = new Bars(bevonia);
        //inventory = new Inventory(866, 0);
        
    // PLACE ITEMS
        key0 = new Key(493, 917, bevonia);
        door0 = new Door(2560, 64, "state1", bevonia);
        sword0 = new Sword(48, 464, bevonia);
        armor0 = new Armor(493, 912, bevonia);
        aoe0 = new aoeItem(-100, -100, bevonia);
        precise0 = new preciseItem(95, 1003, bevonia);
        
        chest0Contents = [aoe0];
        items0 = [key0, armor0, sword0, door0, aoe0, precise0];
        
        chest0 = new Chest(597, 416, chest0Contents, bevonia, items0);
        items0.push(chest0);
        
        skeleton0 = new Skeleton(1060, 800, 832, 1248, bevonia);
        spider0 = new Spider(56, 300, 2, 460, "y", 1, bevonia);
        
        
        
        enemies0 = [skeleton0, spider0];
        
        //MUSIC
        backgroundMusic = game.add.audio('tutorial');
        backgroundMusic.loop = true;
        backgroundMusic.play();  
        
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms0);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        bevonia.castPrecise();
        
        skeleton0.patrol();
        spider0.patrol();
        
        // Item interaction
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            var i; for(i = 0; i < items0.length; i++) {
                if (game.physics.arcade.overlap(bevonia.self, items0[i].self)) {
                    items0[i].interactWith();
                    //items0.splice(j, 1);
                }
            }
        }
        
        // Enemy interaction
        var j; for (j = 0; j < enemies0.length; j++) {
            if (game.physics.arcade.overlap(bevonia.self, enemies0[j].self) && !enemies0[j].vulnerable) {
                if (bevonia.stabbing) {
                    enemies0[j].hitCount += 1;
                    enemies0[j].vulnerable = true;
                    enemies0[j].die();
                    //enemies0[j].self.kill();
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
            console.log(game.physics.arcade.overlap(bevonia.playerAOE.self, enemies0));
            // Detect a collision with either the environment or enemies
            var k; for(k = 0; k < enemies0.length; k++) {
                if (game.physics.arcade.overlap(bevonia.playerAOE.self, enemies0[k].self)) {
                    bevonia.aoeSound.play();
                    xBoom = bevonia.playerAOE.self.body.x;
                    yBoom = bevonia.playerAOE.self.body.y;
                    var boom = game.add.sprite(xBoom, yBoom, "aoeBlast");
                    game.camera.shake(.02, 300);
                    game.physics.enable(boom);
                    enemies0[k].self.kill();
                    boom.anchor.setTo(.5, .5);
                    boom.scale.setTo(1.5, 1.5);
                    boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                    bevonia.playerAOE.self.kill();
                    boom.animations.play("explode", 9, false);
                    bevonia.aoeExists = false;
                }
            }
            if (game.physics.arcade.collide(bevonia.playerAOE.self, [platforms0, traps0])) {
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
            var l; for(l = 0; l < enemies0.length; l++) {
                if (game.physics.arcade.overlap(bevonia.playerPrecise.self, enemies0[l].self)) {
                    enemies0[l].self.kill();
                    bevonia.playerPrecise.self.kill();
                    bevonia.preciseExists = false;
                    
                }
            }
            if (game.physics.arcade.collide(bevonia.playerPrecise.self, platforms0)){
                bevonia.playerPrecise.self.kill();
                bevonia.preciseExists = false;
            }
            
        }
        
        

        if (game.physics.arcade.collide(bevonia.self, traps0)) {
            bevonia.health -= 1;
        }
    }
}
