const takeshitalk = document.getElementById("talk");
const button = document.getElementById("add-button");

function functionA() {
  if (takeshitalk.value === "fucking jap") {
    alert("ファッキンジャップくらいわかるよバカヤロー");
    container.remove();
  } else {
    rand = Math.floor(Math.random() * 4);
    if (rand == 0) msg = "コマネチ";
    if (rand == 1) msg = "ダンカン、バカヤロー";
    if (rand == 2)
      msg =
        "なんかこのアングルいいな〜とおもったら黒沢さんのアングルなんだよな";
    if (rand == 3) msg = "売れたら使ってね";
    if (rand == 4) msg = "もういい木村、帰ろう！";
    alert(msg);
  }
}

let ButtonCount = 0;
const container = document.getElementById("container");

function functionB() {
  ButtonCount += 1;
  if (ButtonCount <= 4) {
    container.textContent = "何度か話しかけてみよう";
  }
  if (ButtonCount >= 4) {
    container.textContent = "fucking jap と話しかけてみよう！";
  }
}
