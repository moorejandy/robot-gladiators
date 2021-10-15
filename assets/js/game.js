var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
  //conditional recursive function
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  // if player picks "skip" confirm and then stop the loop
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
      return true;
    }
  }
  return false;
}

var fight = function(enemy) {
  //Keep track of who attacks first
  var isPlayerTurn = true;
  if(Math.random() > 0.5) {
    isPlayerTurn = false;
  }

    while (playerInfo.health > 0 && enemy.health > 0) {
      // ask player if they'd like to fight or run
      if (isPlayerTurn){
        if (fightOrSkip()) {
          break;
        }
  
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    isPlayerTurn = !isPlayerTurn;
   }
  };
   
  //Random Number function
  var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
  };

//set name function

var getPlayerName = function () {
  var name = "";
  //for loop
while (name==="" || name === null){
  name = prompt("What is your robot's name?");
}
  console.log("Your robot's name is " + name);
  return name;
}

  //Player Object

  var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
      this.health = 100;
      this.money = 10;
      this.attack = 10;
    },
    refillHealth: function (){
      if(this.money >= 7){
        window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -+ 7;
      } else {
        window.alert("You don't have enough money.");
      }
    },
    upgradeAttack: function (){
      if(this.money >= 7){
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -+ 7;
      } else {
        console.log("You don't have enough money.");
      }
    }
  };
  
  // enemy object
  
  var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
  ];
   
  var startGame = function() {
    for (var i = 0; i < enemyInfo.length; i++) {
    if(playerInfo.health > 0 ) {
    //reset player stats
    playerInfo.reset();

        window.alert("Welcome to Robot Galdiators! Round " + (i+1));
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40,60);
        // debugger;
        fight(pickedEnemyObj);
        if (playerInfo.health > 0 && i < enemyInfo.length -1) {
          var storeConfirm = window.confirm("The fight is over, would you like to visit the store before the next round?");
          
          if(storeConfirm){
            shop();
          }
        }
      } else{
        window.alert("You have lost your robot in battle. Game Over!");
      }
    }
    endGame();
  };

  var endGame = function(){
    window.alert("The game has ended. Let's see how you did");

    var highScore = localStorage.getItem("highscore");

    if(highScore === null ) {
      highScore = 0;
    }

    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);

      alert(playerInfo.name + " now has a high score of " + playerInfo.money + "!");
    } else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ".");
    }
  
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
      startGame();
    } else {
      window.alert("Thank you for playing Robot Gladiators! See you next time.")
    }
  };

  var shop = function () {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    
    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch(shopOptionPrompt){
      case 1:
        playerInfo.refillHealth();
        break;

        case 2:
          playerInfo.upgradeAttack();
          break;

          case 3:
            window.alert("Now leaving the store.");
            break;

            default:
              window.alert("You did not pick a valid option. Try again.");

              shop();
              break;
    }
  };

  startGame();