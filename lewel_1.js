class lewel_1 extends Phaser.Scene{
    constructor(){
        super(config);
    }
    

    
    preload ()
    {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('grod', 'assets/grod.png');
        this.load.image('golds', 'assets/gold.png');
        this.load.image('tale1', 'assets/tale-1.png');
        this.load.image('tale2', 'assets/tale-2.png');
        this.load.image('tale3', 'assets/tale-3.png');
        this.load.image('ladder', 'assets/ladder.png');
        this.load.image('hero', 'assets/hero.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.spritesheet('run', 'assets/hero_anim_run.png',{frameWidth:40,frameHeight:60}
        );
        
        this.load.audio('gold', 'assets/sound_19349.mp3');
        this.load.audio('goSound', 'assets/go.mp3');
        this.load.audio('ladderSound', 'assets/on ladder.mp3');
        this.load.audio('sBounce', 'assets/bounce.mp3' );
        this.load.audio('BGSound', 'assets/bg-sound.mp3' );
        

        //загрузка изображений

    }
    create (data){   
            this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
            this.anims.create({
            key: 'turn',
            frames: [ { key: 'run', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('run', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
            this.anims.create({
            key: 'onLadder',
            frames: this.anims.generateFrameNumbers('run', { start: 8, end: 9 }),
            frameRate: 5,
            repeat:-1
        });
            this.anims.create({
            key: 'turnOnLadder',
            frames: [ { key: 'run', frame: 9 } ],
            frameRate: 20
        });


            this.physics.world.setFPS(60);

            platforms = this.physics.add.staticGroup(); // физика для платформ
            platforms.create(500, 580, 'tale1');//размещение платформы
            //первый этаж
            platforms.create(148, 450, 'tale2');
            platforms.create(455, 450, 'tale3');
            platforms.create(330, 450, 'tale3');
            platforms.create(880, 450, 'tale3');
            //второй этаж
            platforms.create(50, 320, 'tale3');
            platforms.create(360, 320, 'tale3');
            platforms.create(670, 320, 'tale3');
            platforms.create(970, 320, 'tale3');
            //третий этаж
            platforms.create(90, 100, 'tale3');
            platforms.create(930, 100, 'tale3');


            ladder = this.physics.add.staticGroup();
            ladder.create(210, 500,'ladder');
            ladder.create(760, 500,'ladder');
            ladder.create(480, 369,'ladder');
            ladder.create(850, 369,'ladder');

            ladderZone = this.physics.add.staticGroup();
            ladderZone.create(210, 500).setSize(1, 120).setVisible(false);
            ladderZone.create(760, 500).setSize(1, 120).setVisible(false);
            ladderZone.create(480, 369).setSize(1, 120).setVisible(false);
            ladderZone.create(850, 369).setSize(1, 120).setVisible(false);


            player = this.physics.add.sprite(30, 520, 'run');//добавление героя с физикой

            player.setBounce(0);
            player.setCollideWorldBounds(true);

            go = this.sound.add('goSound');
            goOnLadder = this.sound.add('ladderSound');
            sBounce = this.sound.add('sBounce');
            BGSound = this.sound.add('BGSound');
            sBounce.volume = 0.1; 
            go.volume = 0.2;
            goOnLadder.volume = 0.2;
            BGSound.volume = 0.1;

            this.physics.add.collider(player, platforms);


            enemy = this.physics.add.image(300, 500, 'enemy');
            enemy.setBounce(0.1);
            enemy.setCollideWorldBounds(true);
            this.physics.add.collider(enemy, platforms);
            this.physics.add.collider(enemy, player);

            grod = this.physics.add.image(350,500,'grod');
            grod.setCollideWorldBounds(true);
            this.physics.add.collider(grod, platforms);
            this.physics.add.collider(grod, player);
            grod.setBounce(0.3);
            grod.setFrictionX(100);
          

            cursors = this.input.keyboard.createCursorKeys();

            gold = this.physics.add.group();
            gold.create(100, 200, 'golds');
            gold.create(900, 200, 'golds');
            gold.create(900, 500, 'golds');


        this.physics.add.collider(gold, platforms);
        this.physics.add.overlap(player, gold, disGold, null, this);
        BGSound.loop = true;
        BGSound.play();

}
    
update(){
    player.body.debugBodyColor = player.body.touching.none ? 0x0099ff : 0xff9900;
    var h = this.add.text(100, 100, 'sddddsss' );
    if(!this.physics.overlap(player,ladderZone)){
    player.body.setAllowGravity(true);
    if (cursors.left.isDown)
    {

        player.setVelocityX(-100);
        player.anims.play('left', true);
        if(!go.isPlaying && player.body.touching.down){
            go.play();
        };


    }
    else if (cursors.right.isDown )
    {
        player.setVelocityX(100);
        player.anims.play('right', true);
        if(!go.isPlaying && player.body.touching.down){
            go.play();
        };

    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn', true);
        
    }

   if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-250);
        sBounce.play();
        
    }
    }
    
    if(this.physics.overlap(player,ladderZone)){
        player.body.setAllowGravity(false);
        
        
        if(cursors.up.isDown ){
            player.setVelocityY(-100);
            player.setVelocityX(0);
            player.anims.play('onLadder', true);
            if(!goOnLadder.isPlaying){ goOnLadder.play()};
            
            
        }
        else if(cursors.down.isDown){
            player.setVelocityY(100);
            player.setVelocityX(0);
            player.anims.play('onLadder', true);
            if(!goOnLadder.isPlaying){ goOnLadder.play()};
            
        }
        else if(cursors.right.isDown ){
            player.setVelocityX(80);
            player.setVelocityY(0);
            player.anims.play('right', true);
            if(!goOnLadder.isPlaying){ goOnLadder.play()};
            
            
        
            
        }else if(cursors.left.isDown){
            player.setVelocityX(-80);
            player.setVelocityY(0);
            player.anims.play('left', true);
            if(!goOnLadder.isPlaying){ goOnLadder.play()};
            
        }else{
            player.setVelocity(0);
            player.anims.play('turnOnLadder', true)
    }
        
}
    
    patrolEnemy();
    
        
    }
}   

 
        
        
    function disGold(player, gold){
        gold.disableBody(true, true);
        this.sound.play('gold');
    }
    function patrolEnemy(){
            
            if(enemy.x<=300){
                enemy.setVelocityX(100);
            }
            if(enemy.x>=600){
                enemy.setVelocityX(-100);
            }
            
        }
    
    
    
    
    
