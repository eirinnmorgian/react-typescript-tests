import * as React from "react";
import { any } from "prop-types";

// component takes 2 types: props and state
// state is currently empty object, as there is none
export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentTask: "",
      tasks: []
    }
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (this.state.currentTask) {
      this.setState({
        currentTask: "",
        tasks: [
          ...this.state.tasks,
          {
            id: this._timeInMilliseconds(),
            value: this.state.currentTask,
            completed: false
          }
        ]
      })
    }

  }

  public deleteTask(id: number): void {
    const filteredTasks: Array<ITask> = this.state.tasks.filter((task: ITask) => {
      return task.id !== id
    })
    this.setState({ tasks: filteredTasks })
  }

  public toggleDone(index: number): void {
    let task: ITask[] = this.state.tasks.splice(index, 1);
    task[0].completed = !task[0].completed;
    debugger;
    const currentTasks: ITask[] = [...this.state.tasks, ...task];
    this.setState({tasks: currentTasks})
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div key={task.id} className="tdl-task">
          <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
          <button onClick={() => this.deleteTask(task.id)}>Delete</button>
          <button onClick={() => this.toggleDone(index)}>
            {task.completed ? "Undo" : "Done"}
          </button>
        </div>
      )
    })
  }

  public render(): JSX.Element {
    console.log(this.state)
    return (
      <div>
        <h1>React Typescript Todo List</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input 
            type="text" 
            className="tdl-input"
            placeholder="Add a task"
            value={this.state.currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}/>
          <button type="submit">
            Add Task
          </button>
        </form>
        <section>
          {this.renderTasks()}
        </section>
      </div>

    )
  }

  private _timeInMilliseconds(): number {
    const date = new Date();
    return date.getTime()
  }

}

interface IState {
  currentTask: string,
  tasks: Array<ITask>
}

interface ITask {
  id: number,
  value: string,
  completed: boolean
}