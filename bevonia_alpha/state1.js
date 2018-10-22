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
        bevonia = new Bevonia(128, 128);
        bars = new Bars(bevonia);
        inventory = new Inventory(866, 0);
        
        // Tutorial ghost test
        //ghost1 = new tutorialGhost (360, 128, bevonia, "Press A to go left, D to go right, and W to \n jump");
        
        
        
        // Place enemies
        skeleton1 = new Skeleton(48, 736, 32, 880);
        bat1 = new Bat(1216, 368, bevonia);
        spider1 = new Spider(1120, 76, 64, 240, "y", 1);
        skeleton2 = new Skeleton(1425, 304, 1420, 1430);
        
        enemies1 = [skeleton1, bat1, spider1, skeleton2]
        
        
        
        // Place, store items
        sword = new Sword(160, 128, bevonia);
        armor = new Armor(180, 128, bevonia);
        key = new Key (200, 128, bevonia);
        
        //SFX
        jumpSound = game.sound.add("jump");
        aoeSound = game.sound.add('aoe');
        castSound = game.sound.add('cast');
        
        
        items1 = [sword];
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms1);
        //game.physics.arcade.collide(test2.self, platforms1);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        
        //ghost1.manifest();
        
        skeleton1.patrol();
        bat1.watch();
        spider1.patrol();
        skeleton2.patrol();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            var i; for (i = 0; i < items1.length; i++) {
                if (game.physics.arcade.overlap(bevonia.this, items1[i].self)) {
                    bevonia.interactWith(items1[i]);
                }
            
            }
        }
        if (bevonia.vulnerable) {
            var j; for (j = 0; j < enemies1.length; j++) {
                if (game.physics.arcade.overlap(bevonia.self, enemies1[j].self)) {
                    bevonia.health -= bevonia.damageFactor;
                    bevonia.vulnerable = false;
                    bevonia.invincibilityTimer = game.time.now + bevonia.invincibilityPeriod;
                }
            }
        }
        
        if (game.physics.arcade.collide(bevonia.self, traps1)) {
            bevonia.health -= 1;
        }
        
        
        
        //test.patrol();
    }
}