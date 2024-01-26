import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddSVG, DoneSVG, ErrorSVG, UpdateSVG } from "./components/ui/icons";
import { ThemeProvider, useTheme } from "./components/ui/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import TaskList from "./components/ui/taskList";
import { motion } from "framer-motion";
function App() {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingTask, setEditingTask] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
      toast({
        title: (
          <div className="flex">
            <DoneSVG />
            &nbsp;A todo item has been added to your list
          </div>
        ),
      });
    }
  };

  const handleEdit = (task) => {
    setInputValue(task.text);
    setEditingTask(task);
  };

  const addTask = () => {
    if (inputValue.trim() === "") {
      toast({
        title: (
          <div className="flex">
            <ErrorSVG />
            &nbsp;Please enter a task before adding!
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, text: inputValue } : task
        )
      );
      toast({
        title: (
          <div className="flex">
            <DoneSVG />
            &nbsp;Task has been successfully updated.
          </div>
        ),
      });
      setEditingTask(null);
    } else {
      const newTask = {
        id: uuidv4(),
        text: inputValue,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }

    setInputValue("");
  };

  const deleteTask = (taskId, taskIndex) => {
    if (editingTask && editingTask.id === taskId) {
      toast({
        title: (
          <div className="flex">
            <ErrorSVG />
            &nbsp;Finish the update to delete the task.
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const { toast } = useToast();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <div className="dmode">
          <ModeToggle />
        </div>
        <div className="flex justify-center items-center">
          <h2
            className="mb-5 text-3xl pb-5 font-semibold tracking-wide border-b"
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            Daily Task Organizer
          </h2>
        </div>

        <div className="container p-5 flex flex-col items-center md:flex-row md:justify-center">
          <Input
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={handleInputChange}
            className="w-3/5 md:w-2/3 mb-3.5 md:mr-3.5 md:mb-0 md:max-w-[300px]"
            type="text"
            placeholder="Enter your tasks here"
          />
          <motion.div whileTap={{ scale: 0.85 }}>
            <Button
              type="submit"
              onClick={() => {
                toast({
                  title: (
                    <div className="flex">
                      <DoneSVG />
                      &nbsp;A todo item has been added to your list
                    </div>
                  ),
                });
                addTask();
              }}
            >
              {editingTask ? (
                <>
                  Update <UpdateSVG marginLeft={2} />
                </>
              ) : (
                <>
                  Add <AddSVG marginLeft={2} />
                </>
              )}
            </Button>
          </motion.div>
          <Toaster />
        </div>

        <Table className=" w-3/20 mx-auto min-w-[450px]">
          <TableCaption className="mb-5">
            Number of tasks - {tasks.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tasks</TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TaskList
            tasks={tasks}
            handleEdit={handleEdit}
            deleteTask={deleteTask}
            editingTask={editingTask}
          />
        </Table>
      </>
    </ThemeProvider>
  );
}

export default App;
