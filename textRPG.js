//verson 1.2.1

// Character class
class Character {
    constructor(name, characterClass, health = 0, maxHealth = 0, attack = 0, defense = 0, level = 0, experience = 0) {
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

// Function prototypes
function displayStats(player) { /* Display player stats */ }
function battle(player, enemy) { /* Battle function */ }
function createRandomEnemy(playerLevel) { /* Generate a random enemy based on player level */ }
function levelUp(player) { /* Level up player */ }
function encounter(player) { /* Random encounter generator */ }

// Number only
function notnum() {
    let count;
    do {
        count = parseInt(prompt("Enter your choice:"));
    } while (isNaN(count));
    return count;
}

function main() {
    let playAgain = 'y';

    // Game loop
    while (playAgain === 'y' || playAgain === 'Y') {
        // Character creation
        console.log("Welcome to the Text Adventure RPG!");
        const playerName = prompt("Enter your character's name:");
        const player = new Character(playerName);

        console.log("Choose a class:\n1. Warrior\n2. Mage\n3. Thief");
        const classChoice = notnum();

        if (classChoice === 1) {
            player.characterClass = "Warrior";
            player.health = 100;
            player.maxHealth = 100;
            player.attack = 15;
            player.defense = 10;
        } else if (classChoice === 2) {
            player.characterClass = "Mage";
            player.health = 80;
            player.maxHealth = 80;
            player.attack = 20;
            player.defense = 5;
        } else {
            player.characterClass = "Thief";
            player.health = 90;
            player.maxHealth = 90;
            player.attack = 10;
            player.defense = 15;
        }

        player.level = 1;
        player.experience = 0;

        console.log(`Character created: ${player.name} the ${player.characterClass}!`);

        // Game encounters
        let i;
        do {
            encounter(player);
            i = prompt("Continue (y):").toLowerCase();
        } while ((i === 'y' || i === 'Y') && player.health > 0 && player.level < 5);

        if (player.health <= 0) {
            console.log("You have been defeated. Game over!");
        } else {
            console.log("Congratulations! You've reached level 5 and won the game!");
        }

        playAgain = prompt("Would you like to play again? (y/n):").toLowerCase();
    }

    console.log("Thank you for playing! Goodbye!");
}

// Display player stats
function displayStats(player) {
    console.log(`Character Stats - Level: ${player.level}, Health: ${player.health}/${player.maxHealth}, Attack: ${player.attack}, Defense: ${player.defense}, Experience: ${player.experience}`);
}

// Battle function
function battle(player, enemy) {
    console.log(`A wild ${enemy.name} appears!`);

    while (player.health > 0 && enemy.health > 0) {
        const playerDamage = Math.max(0, player.attack - enemy.defense);
        const enemyDamage = Math.max(0, enemy.attack - player.defense);

        const attack = prompt("Attack (y/n)").toLowerCase();
        if (attack === 'y') {
            console.log(`You attack the ${enemy.name} for ${playerDamage} damage.`);
            enemy.health -= playerDamage;

            if (enemy.health <= 0) {
                console.log(`You defeated the ${enemy.name} and gained ${enemy.experienceReward} experience points!`);
                player.experience += enemy.experienceReward;
                levelUp(player);
                return;
            }

            console.log(`The ${enemy.name} attacks you for ${enemyDamage} damage.`);
            player.health -= enemyDamage;

            if (player.health <= 0) {
                console.log(`You were defeated by the ${enemy.name}.`);
                return;
            }
        } else if (attack === 'n') {
            console.log(`You ran from the ${enemy.name}.`);
            return;
        } else {
            console.log("Invalid Input");
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
    } else if (type === 1) {
        enemy.name = "Orc";
        enemy.health = playerLevel * 25;
        enemy.attack = playerLevel * 10;
        enemy.defense = playerLevel * 3;
    } else {
        enemy.name = "Troll";
        enemy.health = playerLevel * 30;
        enemy.attack = playerLevel * 9;
        enemy.defense = playerLevel * 4;
    }

    return enemy;
}

// Level up player
function levelUp(player) {
    const levelThreshold = 50;
    while (player.experience >= levelThreshold) {
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

    if (encounterType === 0) {
        const enemy = createRandomEnemy(player.level);
        battle(player, enemy);
    } else if (encounterType === 1) {
        const treasure = Math.floor(Math.random() * 20 + 10);
        console.log(`You found a treasure chest and gained ${treasure} experience points!`);
        player.experience += treasure;
        levelUp(player);
    } else {
        const healAmount = Math.min(player.maxHealth - player.health, 20);
        player.health += healAmount;
        console.log(`You found a safe spot and rested, recovering ${healAmount} health points.`);
    }
}

// Run the game
main();
