import { WebsocketProvider } from "y-websocket";
import { TodoListView } from "./src/view/TodoListView";
import { TodoListModel } from "./src/model/TodoListModel";
import { TodoListController } from "./src/controller/TodoListController";

export class TodoApp {
  constructor() {
    this.todoListModel = new TodoListModel();
    this.todoListView = new TodoListView();
    this.todoListController = new TodoListController(
      this.todoListModel,
      this.todoListView
    );
    this.wsProvider = new WebsocketProvider(
      "ws://localhost:5173",
      "todo-list-room",
      this.todoListModel.yDoc
    );
  }
}
