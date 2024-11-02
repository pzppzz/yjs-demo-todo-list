import { Signal } from "signal-disposer";
import * as Y from "yjs";

export class TodoListModel {
  signals = {
    changed: new Signal(),
  };

  constructor() {
    this.yDoc = new Y.Doc();
    this.yTodos = this.yDoc.getMap("todos");
    this.yDoc.on("update", () => {
      this.signals.changed.trigger(this.getTodoList());
    });
  }

  #addTodo(todo) {
    const yTodo = new Y.Map();
    yTodo.set("id", todo.id);
    yTodo.set("name", todo.name);
    yTodo.set("completed", todo.completed);
    this.yTodos.set(todo.id, yTodo);
  }

  addTodo(todo) {
    if (this.getTodoList().find((t) => t.name === todo.name)) {
      return;
    }
    this.#addTodo(todo);
  }

  deleteTodo(id) {
    if (!this.yDoc.get(id)) {
      return;
    }
    this.yDoc.transact(() => {
      this.yTodos.delete(id);
    });
  }

  toggleTodo(id) {
    if (!this.yTodos.get(id)) {
      return;
    }
    this.yDoc.transact(() => {
      const yTodo = this.yTodos.get(id);
      yTodo.set("completed", !yTodo.get("completed"));
    });
  }

  toggleAll(done) {
    this.yDoc.transact(() => {
      this.yTodos.forEach((yTodo) => {
        yTodo.set("completed", done);
      });
    });
  }

  deleteAllCompleted() {
    this.yDoc.transact(() => {
      this.yTodos.forEach((yTodo) => {
        if (yTodo.get("completed")) {
          this.yTodos.delete(yTodo.get("id"));
        }
      });
    });
  }

  clearAll() {
    this.yDoc.transact(() => {
      this.yTodos.clear();
    });
  }

  setTodoList(todoList) {
    this.yDoc.transact(() => {
      this.yTodos.clear();
      todoList.forEach((todo) => {
        const yTodo = new Y.Map();
        yTodo.set("id", todo.id);
        yTodo.set("name", todo.name);
        yTodo.set("completed", todo.completed);
        this.yTodos.set(todo.id, yTodo);
      });
    });
  }

  getTodoList() {
    return Array.from(this.yTodos.keys()).map((id) => {
      const yTodo = this.yTodos.get(id);
      return {
        id: yTodo.get("id"),
        name: yTodo.get("name"),
        completed: yTodo.get("completed"),
      };
    });
  }
}
