import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {

  const [tasks, setTasks] = useState([]);
  const transformTask = objTask => {
    const loadedTasks = [];

    for (const taskKey in objTask) {
      loadedTasks.push({ id: taskKey, text: objTask[taskKey].text });
    }}
    const { isLoading,error,  sendReq:fetchTasks } = useHttp({
        url: 'https://react-http-53317-default-rtdb.firebaseio.com/tasks.json'
      }, transformTask);

    

    useEffect(() => {
      fetchTasks();
    }, []);

    const taskAddHandler = (task) => {
      setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
      <React.Fragment>
        <NewTask onAddTask={taskAddHandler} />
        <Tasks
          items={tasks}
          loading={isLoading}
          error={error}
          onFetch={fetchTasks}
        />
      </React.Fragment>
    );
  }

  export default App;
