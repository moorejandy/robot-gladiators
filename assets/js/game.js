var playerName = window.prompt("What is your robot's name?")
var playerHealth = 100;
var playerAttack = 15;
var playerMoney = 10;

// console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = Math.max(0, playerMoney - 10);
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      var damage = randomNumber(playerAttack - 3, playerAttack);
      enemyHealth = Math.max(0, enemyHealth - damage);
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      var damage = randomNumber(enemyAttack - 3, enemyAttack);
      playerHealth = Math.max(0, playerHealth - damage);
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
    }
  };
   
  //Random Number function
  var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
  };


   
  var startGame = function() {
    for (var i = 0; i < enemyNames.length; i++) {
    if(playerHealth > 0 ) {
    //reset player stats
    playerHealth=100;
    playerAttack=15;
    playerMoney=10;

        window.alert("Welcome to Robot Galdiators! Round " + (i+1));
        var pickedEnemyName = enemyNames[i];
        enemyHealth = randomNumber(40, 60);
        // debugger;
        fight(pickedEnemyName);
        if (playerHealth > 0 && i < enemyNames.length -1) {
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
    if(playerHealth > 0 )
    {
      window.alert("Great job, you've won the battle! You now have a score of " + playerMoney + ".");
    } else{
      window.alert("You've lost your robot in battle");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
      startGame();
    } else {
      window.alert("Thank you for playing Robot Gladiators! See you next time.")
    }
  };

  var shop = function () {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE"
    + " the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    switch(shopOptionPrompt){
      case "refill":
        case "REFILL":
        if (playerMoney >= 7){
          window.alert("Refilling player's health by 20 for 7 dollars.");
          playerHealth = playerHealth + 20;
          playerMoney = playerMoney - 7;
        } else {
          window.alert("You don't have enought money.");
        }
        break;

        case "upgrade":
          case "UPGRADE":
          if(playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
          } else {
            window.alert("You don't have enought money.");
          }
          break;

          case "leave":
            case "LEAVE":
            window.alert("Now leaving the store.");
            break;

            default:
              window.alert("You did not pick a valid option. Try again.");

              shop();
              break;
    }
  };

 

  startGame();