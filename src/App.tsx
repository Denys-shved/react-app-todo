// import Todo from "./components/Todo"

import Router from "./Router"
import TasksPage from "./pages/TasksPage"
import TaskPage from "./pages/TaskPage"
import type { ComponentType } from "react";

type Routes = Record<string, ComponentType>;

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404 Page not found</div>
  }

  return (
    // <Todo />
    <Router routes = {routes} />
  )
}

export default App
