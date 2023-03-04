import {EditorView, basicSetup} from "codemirror"
import {sql} from "@codemirror/lang-sql"

let editor = new EditorView({
  extensions: [basicSetup, sql()],
  parent: document.querySelector("#editor")
})


editor.dispatch({
  changes: {from: 0, to: editor.state.doc.length, insert: 'SELECT * FROM sample_db.food_item;'}
});



function getEditorText() {
  let t = editor.state.doc.toString();
  console.log(t);
  return t;
}


async function sendData() {
  let user = {
    query_string: getEditorText(),
    type_of_script: 'test'
  };
  let myJSON = JSON.stringify(user);
  
  
  await fetch('http://127.0.0.1:8000/food/codemirror/', {
    // let response = await fetch('https://0f0e1f01-f59f-4f8c-ab05-1b43c57c25e7.mock.pstmn.io/abc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: myJSON,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.text();
  })
  .then((myBlob) => {
    document.getElementById("result").innerHTML = myBlob;
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });;

  // if (response.ok) { // if HTTP-status is 200-299 https://javascript.info/fetch
  //   // https://stackoverflow.com/questions/43420253/django-render-not-working-when-redirected-from-another-view
  //   console.log('x',response.text)
  //   console.log('x',response.text)
  //   // window.location.href = '/food/codemirror/'
  // } else {
  //   alert("HTTP-Error: " + response.status);
  // }
}

document.getElementById("button").addEventListener("click", sendData);

// query: send POST request
// query: asks to visit "result" page
// Django: gets the SQL result
// Django: redirects to "result"
