import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "../lib/utils"
import { Button } from "../componentsSHADCN/ui/button"
import { Calendar } from "../componentsSHADCN/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../componentsSHADCN/ui/popover"
import { useState } from "react"

export function DatePicker({date, setDate}) {
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="opacity-100 mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
};
