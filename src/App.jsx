import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilSVG, DeleteSVG, AddSVG, DoneSVG, ErrorSVG } from "./components/ui/icons";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "./components/ui/checkbox";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState([]);
  const [date, setDate] = useState(false);
  const dateObj = new Date();
  console.log(dateObj);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButtonClick();
      toast({
        title:  (
          <div className="flex">
            <DoneSVG />&nbsp;A todo item has been added to your list
          </div>
        ),
      });
    }
  };

  const handleButtonClick = (e) => {
    if (inputValue.trim() === "") {
      toast({
        title:  (
          <div className="flex">
            <ErrorSVG />&nbsp;Please enter a task before adding!
          </div>
        ),
        variant: "destructive",
      });
      date(false);
    }
    setDisplayText(inputValue);
    setDate(true);
    setInputValue("");
  };

  const { toast } = useToast();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <div className="dmode">
          <ModeToggle />
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

          <Button
            type="submit"
            onClick={() => {
              toast({
                title:  (
                  <div className="flex">
                    <DoneSVG />&nbsp;A todo item has been added to your list
                  </div>
                ),
              });
              handleButtonClick();
            }}
          >
            Add <AddSVG marginLeft={2} />
          </Button>
          <Toaster />
        </div>

        <Table className=" w-3/20 mx-auto min-w-[450px]">
          <TableCaption>Number of tasks - 1</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tasks</TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
              <Checkbox /><Label htmlFor="name">{" " + "Task#1"}</Label> 
              </TableCell>

              <TableCell>
                {displayText}
                <br />
                <p className="text-grey">
                  {date
                    ? "Created on" +
                      " " +
                      dateObj.toString().replace(/(\d{2}:\d{2}):\d{2}.*/, "$1")
                    : null}
                </p>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="font-black">
                    ...
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                  
                    <DropdownMenuItem>
                      Edit&nbsp;
                      <PencilSVG />
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      Delete&nbsp;
                      <DeleteSVG />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    </ThemeProvider>
  );
}

export default App;
