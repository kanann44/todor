//addEventListenerとは特定のイベントが起きた時にJavaScriptの処理を追加する為のブラウザAPIの機能
//ターゲット.addEventListener(イベント名,関数);
//if(条件式){条件式の評価結果がtrueなら実行する処理}
//データの保存localStorage.setItem("キー","値");
//データの取得localStorage.getItem("キー");
//htmlからform,inputの値を取得する
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
//保存したデータを取得する
const todos = JSON.parse(localStorage.getItem("todos"));
//todosが空じゃなかったらliタグを追加する
if (todos) {
  todos.forEach(todo => {
    add(todo);
  })
}
//formがEnterされたときinputに入力された値を取得する
form.addEventListener("submit", function (event) {
  //リロードしないようにする
  event.preventDefault();
  //formをsubmitされたときにリストを追加する関数
  add();
});

function add(todo) {
  //valueはinputなどの中に入っているものの中身を取り出したいときに使う
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }
  //todoTextに文字が入っていたら波カッコ内の処理を実行する
  if (todoText) {
    //createElementでliタグを作る
    const li = document.createElement("li");
    //liのtextとしてユーザがformに入力した値を入れる
    li.innerText = todoText;
    //liタグにデザインをあてるclasslistでclassを指定するadd()で追加する
    li.classList.add("list-group-item");
    //打ち消し線のリロード対策
    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }
    //右クリックしたらリストが消える処理
    li.addEventListener("contextmenu", function (event) {
      //右クリックのデフォルトの動作をしないようにする
      event.preventDefault();
      //liタグに削除
      li.remove();
      //saveDataにも適用
      saveData();
    });
    //左クリックでliタグに打消し線を付ける処理
    li.addEventListener("click", function () {
      //toggleとはtext-decoration-line-throughがあればつけてなければ削除するスイッチ的な機能
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });
    //htmlにulの子供としてliタグを出力する
    ul.appendChild(li);
    //入力フォームを空にする
    input.value = "";
    //リロードしても消えないようにするために保存する
    saveData();
  }
}

function saveData() {
  //liタグのデータを全部取得する
  const lists = document.querySelectorAll("li");
  let todos = [];

  //ループ
  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")
    };
    //todosにlist.innerTextのテキスト情報を入れる
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
