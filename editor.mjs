import {EditorView, basicSetup} from "codemirror"
import {sql} from "@codemirror/lang-sql"

let editor = new EditorView({
  extensions: [basicSetup, sql()],
  parent: document.querySelector("#editor")
})


function getEditorText() {
  let t = editor.state.doc.toString();
  console.log(t);
  return t;
}

var obj = { "name":"John", "age":30, "city":"New York"};
var myJSON = JSON.stringify(obj);


async function sendData() {
  let user = {
    name: getEditorText(),
    surname: 'Smith'
  };
  
  let response = await fetch('http://127.0.0.1:8000/food/codemirror/', {
    // let response = await fetch('https://0f0e1f01-f59f-4f8c-ab05-1b43c57c25e7.mock.pstmn.io/abc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: myJSON
  });
  
}


document.getElementById("button").addEventListener("click", sendData);
