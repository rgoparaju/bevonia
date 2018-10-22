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
        game.load.tilemap("level1", "assets/tilemaps/level1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("platforms", "assets/tilesets_backgrounds/wall sprite 2.png", 32, 32);
        game.load.image("spikes", "assets/tilesets_backgrounds/deathSpikes.png");
        game.load.image("bg1", "assets/tilesets_backgrounds/test background v5.png", 2624, 1344);
        
        
        // Level Two
        //
        //
        //
        
        // Level Three
        //
        //
        //
        
        // Level Four
        //
        //
        //
        
        
    // BEVONIA
        game.load.spritesheet("bevonia", "assets/sprites/Bevonia.png", 32, 48);
        game.load.spritesheet("stabBevonia", "assets/sprites/bevoThrust.png", 48, 48); 
        
    // GHOST
        game.load.spritesheet("ghost", "assets/sprites/ghost2.png", 32, 64);
        
        
    // ENEMIES
        game.load.spritesheet("bat", "assets/sprites/bat.png", 32, 32);
        game.load.spritesheet("spider_x", "assets/sprites/spiderX.png", 48, 48);
        game.load.spritesheet("spider_y", "assets/sprites/spiderY.png", 48, 48);
        game.load.spritesheet("skeleton", "assets/sprites/skeleton.png", 32, 64);
        
        
    // ITEMS
        game.load.spritesheet("helmet", "assets/sprites/helmet.png", 32, 32);
        game.load.spritesheet("key", "assets/sprites/key.png", 32, 32);
        game.load.spritesheet("sword", "assets/sprites/sword.png", 32, 64);   
        game.load.spritesheet("chest", "assets/sprites/chest.png", 64, 64);
        game.load.image("healthPotion", "assets/sprites/health potion.png");
        game.load.image("manaPotion", "assets/sprites/health potion.png");
        //aoe spell scroll
        //precise spell scroll
        
        
    // SPELL SPRITES
        // Area of Effect (AoE)
        game.load.spritesheet('aoeProjectile', "assets/sprites/AoE Projectile.png", 32, 32);
        game.load.spritesheet("aoeBlast", "assets/sprites/AoE Blast.png", 96, 96);
        
        // Precision spell (precise)
        game.load.spritesheet("precise", "assets/sprites/precise.png", 32, 16);
        
        
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
        
                
        
        
        // Music
        
        
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