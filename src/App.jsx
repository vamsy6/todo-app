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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilSVG, DeleteSVG, AddSVG} from "./icons";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Toaster, toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <div className="dmode">
          <ModeToggle />
        </div>
        <div className="container p-5 flex flex-col items-center md:flex-row md:justify-center">
        <Input
    className="w-3/5 md:w-2/3 mb-3.5 md:mr-3.5 md:mb-0 md:max-w-[300px]"
    type="text"
    placeholder="Enter your tasks here"
  />

          <Button
            onClick={() =>
              toast.success("A todo item has been added to your list")
            }
            type="submit"
          >
            Add <AddSVG marginLeft={2} />
          </Button>
          <Toaster />
        </div>

        <Table className=" w-3/20 mx-auto">
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
              <span>
                <Checkbox />
                <TableCell className="font-medium">TASK#1</TableCell>
              </span>
              <TableCell>
                Organize Home Office Space and Declutter Desk
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <DropdownMenuTrigger className="font-black">
                          ...
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>More Options</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

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
