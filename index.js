import * as Y from "yjs";
import "layui/dist/layui.js";
import "layui/dist/css/layui.css";
import "./style.css";
import { TodoApp } from "./TodoApp";

const app1 = new TodoApp();
// const app2 = new TodoApp();

// app1.todoListModel.yDoc.on("update", () => {
//   Y.applyUpdate(
//     app2.todoListModel.yDoc,
//     Y.encodeStateAsUpdate(app1.todoListModel.yDoc)
//   );
// });

// app2.todoListModel.yDoc.on("update", () => {
//   Y.applyUpdate(
//     app1.todoListModel.yDoc,
//     Y.encodeStateAsUpdate(app2.todoListModel.yDoc)
//   );
// });

document.getElementById("app").appendChild(app1.todoListView.view);
