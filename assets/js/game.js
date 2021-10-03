var playerName = window.prompt("What is your robot's name?")
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function () {
   
    window.alert("Welcome to Robot Gladiators!");

    var promptFight = window.prompt("Would you to fight or skip this battle? Enter 'fight' or 'skip' to choose.");
    
   if (promptFight === "fight" || promptFight ==="FIGHT"){
  //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
  enemyHealth = enemyHealth - playerAttack;

  // Log a resulting message to the console so we know that it worked.
  console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.")
  
  //check enemy's health
  if ( enemyHealth <=0) {
      window.alert(enemyName + " has died.");
  }
  else {
      window.alert(enemyName + " still has " + enemyHealth + " heath left.");
  }

  // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
  playerHealth = playerHealth - enemyAttack;

   // Log a resulting message to the console so we know that it worked.
   console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.")

     //check player health
  if (playerHealth <=0) {
    window.alert(playerName + " has died.");
}
else {
    window.alert(playerName + " still has " + playerHealth + " health left.")
}
  } else if (promptFight === "skip" || promptFight === "SKIP"){
      var confirmSkip = window.confirm("Are you sure you'd like to skip this fight? It'll cost you $2.");

      if(confirmSkip) {
          window.alert(playerName + " has decided to skip this fight. $2 has been deducted from your account.");
          playerMoney = playerMoney - 2;
    } else {
        fight();
    }
  }
  else {
      window.alert("Please choose a valid option.");
  };
}

fight ();