demo.state4 = function () {};
demo.state4.prototype = {
    preload: function () {
        // LOAD TILEMAP
        game.load.tilemap("dragonRoom", "assets/tilemaps/dragonLairTEMP.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("basalt", "assets/tilesets_backgrounds/basalt.png");
        game.load.image("bg4", "assets/tilesets_backgrounds/bossBG.png", 1088, 512);
        
        // LOAD DRAGON SPRITE
        
        
    },
    create: function () {
        var bg4 = game.add.sprite(0, 0, "bg4");
        
        var map5 = game.add.tilemap("dragonRoom");
        map5.addTilesetImage("basalt");
        
        game.world.setBounds(0, 0, 1088, 512);
        
        platforms5 = map5.createLayer("platforms DRAGON");
        map5.setCollision(1, true, "platforms DRAGON");
        
        door5 = new Door(1024, 384, "title", null);
        bevonia = new Bevonia(48, 32, 512);
        door5.player = bevonia;
        bars = new Bars(bevonia);
        
        dragonBoss = new Dragon(bevonia);
        
        aoe5 = new aoeItem(512, 432, bevonia);
        
        items5 = [door5, aoe5];
        
        backgroundMusic = game.add.audio('boss');
        backgroundMusic.loop = true;
        backgroundMusic.play();
        
        notDead = true;
        
        notReallyACheckpoint = new Checkpoint(-100,-100,bevonia)
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms5);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        if(bevonia.die()) notReallyACheckpoint.resetToCheckpoint()
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        bevonia.castPrecise();
        
        dragonBoss.manageHealth();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            var i; for (i = 0; i < items5.length; i++) {
                if (game.physics.arcade.overlap(bevonia.self, items5[i].self)) {
                    if(items5[i].interactWith())
                        inventory.add(items5[i])
                }
            }
        }
        
        if (bevonia.aoeExists) {
            if (game.physics.arcade.overlap(bevonia.playerAOE.self, dragonBoss.self)) {
                dragonBoss.health -= .25;
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
        
        if (!dragonBoss.attacking && dragonBoss.health > 0) {
            dragonBoss.attacking = true;
            dragonBoss.self.animations.play("breathe", 3, false);
            ball = new Fireball(898, 320, bevonia);
            dragonBoss.attackTimer = game.time.now + 2000;
        }
        else if (dragonBoss.attackTimer < game.time.now) {
            dragonBoss.attacking = false;
        }
        
        if (dragonBoss.health == 0 && notDead){
            notDead = false;
            exitKey4 = new SilverKey(550, 448, bevonia);
            items5.push(exitKey4);
        }
        
        if (game.physics.arcade.overlap(bevonia.self, dragonBoss.self)) {
            bevonia.health = 0;
        }
        if (bevonia.vulnerable && game.physics.arcade.overlap(bevonia.self, ball.self)) {
            bevonia.health -= .5;
            bevonia.vulnerable = false;
            bevonia.invincibilityTimer = game.time.now + bevonia.invincibilityPeriod;
        }
        
    }      
}
