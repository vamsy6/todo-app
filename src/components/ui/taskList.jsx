import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilSVG, DeleteSVG } from "./icons";
import { Label } from "@/components/ui/label";
import { Checkbox } from "./checkbox";

export default function taskList({ tasks, handleEdit, deleteTask }) {
  return (
    <TableBody>
      {tasks.map((task, index) => (
        <TableRow key={task.id}>
          <TableCell className="font-medium">
            <div className="flex space-x-1.5">
              <Checkbox />{" "}
              <Label htmlFor="name">{" " + `Task#${index + 1}`}</Label>
            </div>
          </TableCell>
          <TableCell>
            {task.text}
            <br />
            <p className="text-grey">
              Created on {task.createdAt.toLocaleTimeString()}
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

                <DropdownMenuItem onClick={() => handleEdit(task)}>
                  Edit&nbsp;
                  <PencilSVG />
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => deleteTask(task.id, index)}>
                  Delete&nbsp;
                  <DeleteSVG />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
