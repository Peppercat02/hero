var rounds = 10;
var hero = new Hero("Bernard", 130, 30);
var monster = new Monster("Skeleton", 130, 30);

function endTurn() {
  rounds--;
  document.getElementById("round-num").textContent = rounds;
  if (rounds < 1) {
    finish();
  }
}

function heroAttack() {
  // Hero 選技能時觸發回合開始
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  setTimeout(function() {
    hero.element.classList.add("attacking");
    setTimeout(function() {
      hero.attack(monster);
      hero.element.classList.remove("attacking");
    }, 500);
  }, 100);

  setTimeout(function() {
    if (monster.alive) {
      monster.element.classList.add("attacking");
      setTimeout(function() {
        monster.attack(hero);
        monster.element.classList.remove("attacking");
        endTurn();
        if (hero.alive == false) {
          finish();
        } else {
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      }, 500);
    } else {
      finish();
    }
  }, 1100);

}

function addSkillEvent() {
  var skill = document.getElementById("skill");
  skill.onclick = function() {
    heroAttack();
  }
}

function heroHeal() {
    // Hero 選技能時觸發回合開始
    document.getElementsByClassName("skill-block")[0].style.display = "none";


    setTimeout(function() {
        hero.heal(hero);
      // hero.element.classList.add("attacking");
      // setTimeout(function() {
      //   hero.attack(monster);
      //   hero.element.classList.remove("attacking");
      // }, 500);
    }, 100);

    setTimeout(function() {
      if (monster.alive) {
        monster.element.classList.add("attacking");
        setTimeout(function() {
          monster.attack(hero);
          monster.element.classList.remove("attacking");
          endTurn();
          if (hero.alive == false) {
            finish();
          } else {
            document.getElementsByClassName("skill-block")[0].style.display = "block";
          }
        }, 500);
      } else {
        finish();
      }
    }, 1100);
}

function addSHealEvent() {
  var heal = document.getElementById("heal");
  heal.onclick = function() {
    heroHeal();
  }
}
addSkillEvent();
addSHealEvent();

function finish() {
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.alive == false) {
    dialog.classList.add("win");
  } else {
    dialog.classList.add("lose");
  }
}
