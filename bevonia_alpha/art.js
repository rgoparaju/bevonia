////////////////////////////////////
//PRELOAD ALL THE GAME ASSETS HERE//
////////////////////////////////////

var demo = {};

demo.art = function () {};
demo.art.prototype = {
    preload: function () {
    // ENVIRONMENT (TILEMAPS, TILESETS, BACKGROUNDS)
        
        //Title Screen
        game.load.image("titlescreen", "assets/sprites/titlescreen.png");
        game.load.image("button", "assets/sprites/button.png");
        game.load.image('titleBackground', 'assets/tilesets_backgrounds/titleBackground.png');
        // Tutorial 
        game.load.tilemap("tutorialLevel", "assets/tilemaps/tutorialLevel.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("floorV4", "assets/tilesets_backgrounds/floorV4.png", 32, 32);
        game.load.image("deathSpikes", "assets/tilesets_backgrounds/deathSpikes.png")
        
        // Level One
//        game.load.tilemap("level1V2", "assets/tilemaps/level1V2.json", null, Phaser.Tilemap.TILED_JSON);
//        game.load.image("platforms", "assets/tilesets_backgrounds/wall sprite 2.png");
//        game.load.image("spikes", "assets/tilesets_backgrounds/deathSpikes.png");
        game.load.image("bg1", "assets/tilesets_backgrounds/test background v5.png", 2624, 1344);
        
        
        // Level Two
        //
        //
        //
        
        // Level Three
        game.load.image('bg3','assets/tilesets_backgrounds/background level 3 ver3.png',3200,1600)
        
        // Level Four
        //
        //
        //
        
        
    // BEVONIA
        game.load.spritesheet("bevonia", "assets/sprites/Bevonia.png", 32, 48);
        game.load.spritesheet("stabBevonia", "assets/sprites/bevoThrust.png", 48, 48); 
        
    //CHECKPOINT FLAG
        game.load.spritesheet('flag','assets/sprites/flag.png',32, 64); 
        
    // GHOST
        game.load.spritesheet("ghost", "assets/sprites/ghost2.png", 32, 64);
        
        
    // ENEMIES
        game.load.spritesheet("bat", "assets/sprites/bat.png", 32, 32);
        game.load.spritesheet("spider_x", "assets/sprites/spiderX.png", 48, 48);
        game.load.spritesheet("spider_y", "assets/sprites/spiderY.png", 48, 48);
        game.load.spritesheet("skeleton", "assets/sprites/skeleton.png", 32, 64);
        game.load.spritesheet("troll", "assets/sprites/troll clone.png", 80, 80);
        game.load.spritesheet("dragon", "assets/sprites/betterDragon.png", 128, 256);
        game.load.spritesheet("fireball", "assets/sprites/fireball.png", 32, 32);
        
        
    // ITEMS
        game.load.spritesheet("helmet", "assets/sprites/helmet.png", 32, 32);
        game.load.spritesheet("key", "assets/sprites/key.png", 32, 32);
        game.load.spritesheet("silverKey", "assets/sprites/silverKey.png", 32, 32);
        game.load.spritesheet("sword", "assets/sprites/sword.png", 32, 64);   
        game.load.spritesheet("chest", "assets/sprites/chest.png", 64, 64);
        game.load.spritesheet("healthPotion", "assets/sprites/health potion.png", 36, 49);
        game.load.spritesheet("manaPotion", "assets/sprites/mana potion.png", 36, 49);
        game.load.spritesheet("door", "assets/sprites/door.png", 32, 96);
        game.load.image('inventory','assets/sprites/inventory.png')
        game.load.image('inventorySelect','assets/sprites/inventory selector.png')
        //aoe spell scroll
        //precise spell scroll
        
        
    // SPELL SPRITES
        // Area of Effect (AoE)
        game.load.spritesheet("aoeObject", "assets/sprites/aoeObject.png", 16, 16);
        game.load.spritesheet('aoeProjectile', "assets/sprites/AoE Projectile.png", 32, 32);
        game.load.spritesheet("aoeBlast", "assets/sprites/AoE Blast.png", 144, 144);
        
        // Precision spell (precise)
        game.load.spritesheet("preciseObject", "assets/sprites/preciseObject.png", 16, 16);
        game.load.spritesheet("preciseProject", "assets/sprites/precise.png", 32, 16);
        
        
    // HEADS UP DISPLAY 
        // Status
        game.load.spritesheet("healthBar", "assets/sprites/healthBar.png", 256, 16);
        game.load.spritesheet("manaBar", "assets/sprites/manaBar.png", 256, 16);
        game.load.spritesheet("barHolder", "assets/sprites/barHolder.png", 32, 96);
        
        // Inventory
        game.load.image('inventory', 'assets/sprites/inventory.png', 267, 55);    
        
        console.log("visual assets preloaded");
        
    
    // AUDIO
        // Sound effects
        game.load.audio('jump', 'assets/sounds/jump.mp3');
        game.load.audio('aoe', 'assets/sounds/aoe.mp3');
        game.load.audio('cast', 'assets/sounds/cast.mp3');
        game.load.audio('die', 'assets/sounds/die.mp3');
        game.load.audio('spiderSound', 'assets/sounds/spiderStep.mp3');
        game.load.audio('spiderDeath', 'assets/sounds/spiderdeath.mp3');
        game.load.audio("spiderHit", "assets/sounds/spiderHit.mp3");
        game.load.audio('skeletonSound', 'assets/sounds/skeletonStep.mp3');
        game.load.audio("skeletonHit", "assets/sounds/skeletonHit.mp3")
        game.load.audio('skeletonDeath', 'assets/sounds/skeletonDeath.mp3');
        game.load.audio('batSound', 'assets/sounds/bat.mp3');
        game.load.audio('batDeath', 'assets/sounds/batSqueal.mp3');
        game.load.audio("trollRoar", "assets/sounds/trollroar.mp3");
        game.load.audio('interact','assets/sounds/interact.mp3');
        game.load.audio('tutorial', 'assets/sounds/tutorial.mp3');
        game.load.audio('levelOne', 'assets/sounds/level1.mp3');
        game.load.audio('levelTwo', 'assets/sounds/level2.mp3');
        game.load.audio('levelThree', 'assets/sounds/level3.mp3');
        game.load.audio('boss', 'assets/sounds/BossMusic.mp3');
        game.load.audio("glug", "assets/sounds/glug.mp3");
        game.load.audio("locked", "assets/sounds/locked.mp3");
        game.load.audio("unlock", "assets/sounds/unlock.mp3");
        game.load.audio("clink" ,"assets/sounds/clink.mp3");
        game.load.audio("jangle", "assets/sounds/keys.mp3");
        game.load.audio("clunk", "assets/sounds/clunk.mp3");
        game.load.audio("schlang", "assets/sounds/swordGet.mp3");
        game.load.audio("stab", "assets/sounds/stab.mp3");
        game.load.audio("getHit", "assets/sounds/getHit.mp3");
        game.load.audio("fireball", "assets/sounds/fireball.mp3");
        game.load.audio("dragonDeath", "assets/sounds/dragonDeath.mp3");
        game.load.audio("dragonEnter", "assets/sounds/dragonEnter.mp3");
        game.load.audio("dragonSpit", "assets/sounds/dragonSpit.mp3");
        
        
        // Music
        game.load.audio('titleMusic', 'assets/sounds/menu.mp3');
        
        
        
        console.log("audio assets preloaded");
        
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log("physics activated");
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        console.log("scalemode set");
        
        game.state.start("classes");
    }    
};
