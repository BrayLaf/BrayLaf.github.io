//HTML elements
const title = document.getElementById("titleScreen");
const display = document.getElementById("display");
const dispStats = document.getElementById("stats");
const userInput = document.getElementById("inputName");
const charCreate = document.getElementById("createChar");
const statPage = document.getElementById("charStats");
const warrior = document.getElementById("Warrior");
const mage = document.getElementById("Mage");
const archer = document.getElementById("Archer");
const disEnemy = document.getElementById("enemy");
const encTitle = document.getElementById("encTitle");
const encounterHTML = document.getElementById("encounter");
const attackHTML = document.getElementById("battle");
const attackButton = document.getElementById("attack");
const runButton = document.getElementById("run");
const enemyDis = document.getElementById("enemyContain");
const contButton = document.getElementById("continue");
const damageDisplay = document.getElementById("enemyDamage");
const enemydisImage = document.getElementById("enemyImage");
const characterImage = document.getElementById("characterImage");
const fireOrChest = document.getElementById("fireChest");
//verson 1.2.1

// Character class
class Character {
    constructor(name, characterClass, health = 0, maxHealth = 0, attack = 0, defense = 0, level = 1, experience = 0) {
        this.name = name;
        this.characterClass = characterClass;
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.defense = defense;
        this.level = level;
        this.experience = experience;
    }
}

// Enemy class
class Enemy {
    constructor(name, health = 0, attack = 0, defense = 0, experienceReward = 0) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.experienceReward = experienceReward;
    }
}

//character variablesc
let player;
let enemy;
let playerName = "";
let classChoice = 0;
let start = false;

//hide the title screen
function startGame(){
    document.body.style.backgroundImage = "url('../D&B-Images/Dungeon_brick_wall_blue.png.png')";
    console.log("hide logo");
    title.style.display = "none";
    charCreate.style.display = "flex";
}

// users choice input
function charSelection(choice){
    switch(choice){
        case 1:
            classChoice = 1;
            break;
        case 2:
            classChoice = 2;
            break;
        default:
            classChoice = 3;
    }
}
//show character creator, display stats/ option to run game
function createCharacter(){
    console.log("create Character");
    playerName = userInput.value;
    console.log(playerName);
    player = new Character(playerName);
    chosenClass(classChoice, player);
}

// assign character display choice
function chosenClass(choice, player){
    console.log(choice);
    switch(choice){
        case 1:
        player.characterClass = "Warrior";
        player.health = 100;
        player.maxHealth = 100;
        player.attack = 15;
        player.defense = 3;
        player.level = 1;
        player.experience = 0;
        characterImage.src = "../D&B-Images/sword.png";
        break;

        case 2:
        player.characterClass = "Mage";
        player.health = 80;
        player.maxHealth = 80;
        player.attack = 20;
        player.defense = 2;
        player.level = 1;
        player.experience = 0;
        characterImage.src = "../D&B-Images/Wizard-hat.png";
        break;

        case 3:
        player.characterClass = "Archer";
        player.health = 90;
        player.maxHealth = 90;
        player.attack = 10;
        player.defense = 5;
        player.level = 1;
        player.experience = 0;
        characterImage.src = "../D&B-Images/bow.png";
        break;
    }
    charCreate.style.display = "none";
    statPage.style.display = "flex";
    console.log(`Character created: ${player.name} the ${player.characterClass}!`);
    display.innerHTML = `Character created: ${player.name} the ${player.characterClass}!`
    displayStats(player);
}

function displayStats(player) {
    console.log(`Character Stats - Level: ${player.level}, Health: ${player.health}/${player.maxHealth}, Attack: ${player.attack}, Defense: ${player.defense}, Experience: ${player.experience}`);
    dispStats.innerHTML = `Character Stats - Level: ${player.level}, Health: ${player.health}/${player.maxHealth}, Attack: ${player.attack}, Defense: ${player.defense}, Experience: ${player.experience}`;
}
function runGame(){
    main(player);
}



function main(player) {
    let playAgain = 'y';

    // Game loop
    if(playAgain === 'y' || playAgain === 'Y') {
        // Game encounters
        
        if((playAgain === 'y' || playAgain === 'Y') && player.health > 0 && player.level < 5) {
            encounter(player);
        }
    
        if (player.health <= 0) {
            console.log("You have been defeated. Game over!");
            enemyDis.style.display = "none";
            statPage.style.display = "none";
            contButton.style.display = "none";
            encTitle.innerHTML = "You have been defeated. Game over!";
            fireOrChest.style.display = "flex";
            fireOrChest.src = "../D&B-Images/lose.png";
        } else if(player.level > 4) {
            console.log("Congratulations! You've reached level 5 and won the game!");
            enemyDis.style.display = "none";
            statPage.style.display = "none";
            contButton.style.display = "none";
            encTitle.innerHTML = "Congratulations! You've reached level 5 and won the game!";
            fireOrChest.style.display = "flex";
            fireOrChest.src = "../D&B-Images/win.png";
        }
    }

    console.log("Thank you for playing! Goodbye!");
}

runButton.addEventListener('click', function() {
    run();
});
function run(){
    console.log(player);
    enemyDis.style.display = "none";
    statPage.style.display = "none";
    contButton.style.display = "flex";
    player.health -= 20;
    encTitle.innerHTML = `A you ran losing 20 health, current health ${player.health}/${player.maxHealth} health`;
    fireOrChest.style.display = "flex";
    fireOrChest.src = "../D&B-Images/run.png";
}

// Battle function
attackButton.addEventListener('click', function() {
    battle();
});


function battle() {
    console.log('you are attacking');
    console.log(player.health);
    if (player.health > 0 && enemy.health > 0) {
        const playerDamage = Math.max(0, player.attack - enemy.defense);
        const enemyDamage = Math.max(0, enemy.attack - player.defense);

        if (attack) {
            console.log(`You attack the ${enemy.name} for ${playerDamage} damage.`);
            encTitle.innerHTML = `You attack the ${enemy.name} for ${playerDamage} damage.`;
            enemy.health -= playerDamage;

            if (enemy.health <= 0) {
                console.log(`You defeated the ${enemy.name} and gained ${enemy.experienceReward} experience points!`);
                player.experience += enemy.experienceReward;
                encTitle.innerHTML = `You defeated the ${enemy.name} and gained ${enemy.experienceReward} experience points!`;
                enemyDis.style.display = "none";
                fireOrChest.style.display = "flex"
                fireOrChest.src = "../D&B-Images/kill.png";
                contButton.style.display = "flex";
                levelUp(player);
            }
            damageDisplay.innerHTML = `The ${enemy.name} attacks you for ${enemyDamage} damage.`;
            console.log(`The ${enemy.name} attacks you for ${enemyDamage} damage.`);
            player.health -= enemyDamage;

            if (player.health <= 0) {
                console.log(`You were defeated by the ${enemy.name}.`);
                encTitle.innerHTML = `You were defeated by the ${enemy.name}.`;
                enemyDis.style.display = "none";
                contButton.style.display = "flex";
                fireOrChest.style.display = "flex";
                fireOrChest.src = "../D&B-Images/lose.png";
            }
        }
    }   
}

// Generate a random enemy based on player level
function createRandomEnemy(playerLevel) {
    const enemy = new Enemy();
    const type = Math.floor(Math.random() * 3);
    enemy.experienceReward = playerLevel * 10;

    if (type === 0) {
        enemy.name = "Goblin";
        enemy.health = playerLevel * 20;
        enemy.attack = playerLevel * 8;
        enemy.defense = playerLevel * 2;
        enemydisImage.src = "../D&B-Images/gobo.png";
    } else if (type === 1) {
        enemy.name = "Orc";
        enemy.health = playerLevel * 25;
        enemy.attack = playerLevel * 10;
        enemy.defense = playerLevel * 3;
        enemydisImage.src = "../D&B-Images/ork.png";
    } else {
        enemy.name = "Troll";
        enemy.health = playerLevel * 30;
        enemy.attack = playerLevel * 9;
        enemy.defense = playerLevel * 4;
        enemydisImage.src = "../D&B-Images/troll.png";
    }

    return enemy;
}

// Level up player
function levelUp(player) {
    const levelThreshold = 50;
    if (player.experience >= levelThreshold) {
        player.level++;
        player.maxHealth += 20;
        player.attack += 5;
        player.defense += 3;
        player.health = player.maxHealth;
        player.experience -= levelThreshold;
        console.log(`Congratulations! You've reached level ${player.level}!`);
        displayStats(player);
    }
}

// Random encounter generator
function encounter(player) {
    const encounterType = Math.floor(Math.random() * 3);
    encounterHTML.style.display = "flex";

    if (encounterType === 0) {
        enemy = createRandomEnemy(player.level);
        console.log(`A wild ${enemy.name} appears!`);
        statPage.style.display = "none";
        encTitle.innerHTML = `A ${enemy.name} appears`;
        damageDisplay.innerHTML = ``
        attackHTML.style.display = "flex";
        enemyDis.style.display = "flex"
        contButton.style.display = "none";
        fireOrChest.style.display = "none";
    } else if (encounterType === 1) {
        const treasure = Math.floor(Math.random() * 20 + 10);
        console.log(`You found a treasure chest and gained ${treasure} experience points!`);
        statPage.style.display = "none";
        contButton.style.display = "flex";
        encTitle.innerHTML = `You found a treasure chest and gained ${treasure} experience points!`;
        fireOrChest.style.display = "flex"
        fireOrChest.src = "../D&B-Images/chest.png";
        player.experience += treasure;
        levelUp(player);
    } else {
        const healAmount = Math.min(player.maxHealth - player.health, 20);
        player.health += healAmount;
        console.log(`You found a safe spot and rested, recovering ${healAmount} health points.`);
        statPage.style.display = "none";
        contButton.style.display = "flex";
        fireOrChest.style.display = "flex"
        fireOrChest.src = "../D&B-Images/fire.png";
        encTitle.innerHTML = `You found a safe spot and rested, recovering ${healAmount} health points.`;

    }
}
