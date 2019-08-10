class intro_1 extends Phaser.Scene{
    constructor(){
        super("intro_1");
    }
    preload(){
        
    }
    create(){
        this.add.text(20, 20, "sdvsdvds");
        this.scene.start('mainMenu_1');
    }
}