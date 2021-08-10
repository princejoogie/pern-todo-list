import React from "react";
import { makeAutoObservable } from "mobx";
import {
  makePersistable,
  clearPersistedStore,
  isHydrated,
  isPersisting,
} from "mobx-persist-store";

export interface ITodo {
  id: string;
  title: string;
  finished: boolean;
  dateAdded: number;
}

export class AppStore {
  todos: ITodo[] = [];

  constructor() {
    makeAutoObservable(this);

    makePersistable(
      this,
      {
        name: "AppStore",
        properties: ["todos"],
        storage: window.localStorage,
        stringify: true,
        debugMode: false,
      },
      { delay: 0 }
    );
  }

  get isHydrated() {
    return isHydrated(this);
  }

  get isPersisting() {
    return isPersisting(this);
  }

  async clearPersistedData(): Promise<void> {
    await clearPersistedStore(this);
  }

  addTodo(todo: ITodo) {
    const old = JSON.parse(JSON.stringify(this.todos));
    this.todos = [...old, todo];
  }

  updateTodo(id: string, todo: ITodo) {
    this.todos = this.todos.filter((e) => e.id !== id);
    this.addTodo(todo);
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter((e) => e.id !== id);
  }
}

export const appStore = new AppStore();
export const AppStoreContext = React.createContext(appStore);
export const useAppStore = (): AppStore => React.useContext(AppStoreContext);
