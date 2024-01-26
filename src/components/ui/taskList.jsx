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
import { motion } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function taskList({
  tasks,
  handleEdit,
  deleteTask,
  editingTask,
}) {
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
            <ContextMenu>
              <ContextMenuTrigger type="right-click">
                <div className="trigger-area">
                  {task.text}
                  <br />
                  <p className="text-grey">
                    Created on {formatDate(task.createdAt)}
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => handleEdit(task)}>
                  Edit
                </ContextMenuItem>
                <ContextMenuItem onClick={() => deleteTask(task.id, index)}>
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-black">
                ...
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <motion.div whileTap={{ scale: 0.85 }}>
                  <DropdownMenuItem onClick={() => handleEdit(task)}>
                    Edit&nbsp;
                    <PencilSVG />
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => deleteTask(task.id, index)}>
                    Delete&nbsp;
                    <DeleteSVG />
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  function formatDate(dateString) {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
}
