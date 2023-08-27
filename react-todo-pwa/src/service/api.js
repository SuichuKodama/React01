import firebase from "firebase/compat/app";
import { db } from "./firebase"

export const initGet = async(uid) => {
  const todo = await db.collection("todo")
  .orderBy("createdAt", "desc")
  .where("uid", "==", uid);

  return todo.get().then((snapShot) => {
    let todos = [];
    snapShot.forEach((doc) => {

      console.log(doc);
      console.log(doc.data());

      todos.push({
        id: doc.id,
        content: doc.data().content,
        isComplete: doc.data().isComplete,
      });
    });
    return todos;
  });
}

export const addTodo = (content, uid) => {
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const todoDelete = (id) => {
  db.collection("todo").doc(id).delete();
}

export const toggleComple = async (id) => {
  const todo = await db.collection("todo").doc(id).get();
  return db.collection("todo").doc(id).update({
  //もしチャックされたtodoが未完了　→ isCompleteをtrue
  //もしチャックされたtodoが完了　→ isCompleteをfalse
  //if(todo.data().isComplete){
  //   false
  // } else {
  //   true
  // }
    isComplete: todo.data().isComplete ? false : true,
  });
}