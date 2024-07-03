import {useState} from "react"

function ToDoList(){

    const [newTask,setNewTask] = useState("");
    const [tasks,setTasks] = useState([]);

    function inputNewTask(event){
        setNewTask(event.target.value)
    }

    function addTask(){
                //trim function trims down all the white spaces
        if(newTask.trim()!==""){//to avoid cases which might have no letters or has only white spaces from being tasks
            setTasks(s => [...s,newTask]) 
            setNewTask("")
        }
    }

    function deleteTask(index){
        setTasks(s => s.filter((_,i) => i!=index));
        //the line above is a genius move by me. But the below code is more readable for others. 
        //but still for some reason i like the above line
        //const updatedTasks=tasks.filter((_,i) => i !== index);
        //setTasks(updatedTasks)
    }

    function prioritize (index){
        if(index>0){        
            const list = [...tasks];// for some reason, if i put "list=tasks" and perform tha below operations, the swapping 
                                        //would happen but not the GUI. THE GUI WILL ONLY CHANGE AFTER DOING SOMETHING SIMPLE TO THE 
                                        // CODE LIKE ADDING WHITESPACE etc  
            const temp = list[index - 1];
            list[index - 1] = list[index];
            list[index] = temp;    
            setTasks(tasks =>list);

            //Alternatively, we can do "array destructuring" instead of the code from line 33 to 36 by array destructuring
            //[list[index],list[index-1]]=[list[index-1],list[index]];
            //setTasks(tasks =>list);

        }
    }

    function deprioritize (index) {
        if(index != tasks.length-1){
            let lists=[...tasks]; //copying current spreaded tasks to a new variable
            [lists[index],lists[index+1]] = [lists[index+1],lists[index]];
            setTasks(t => lists)
        }
    }

 
    return(
        <div className="To-do-List">
            <h1 className="heading">To-do-List</h1>

            <input type="text" 
                    value={newTask} 
                    onChange={inputNewTask}
                    className="task-input" 
                    placeholder="Enter a Task"/>

            <button onClick={addTask} className="add-button">ADD</button>

            <ol>
                {
                tasks.map((taskPointer,index) => <li key={index}>
                        <span className="text">{taskPointer}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                        <button className="move-button" onClick={() => prioritize(index)}>Up</button>
                        <button className="move-button" onClick={() => deprioritize(index)}>down</button>
                    </li>)
                }
            </ol>  
        </div>  
    )
}

export default ToDoList;