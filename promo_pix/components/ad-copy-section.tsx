import * as React from "react"
import { ChevronsUpDown, Plus, X } from "lucide-react"

import { AdCopy } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

const AdCopyComponent = (adCopy: AdCopy) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
      <Separator />
      <div className="my-4 flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">{adCopy.headline}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="m-4 text-justify">
        <p className="text-sm">{adCopy.ad_copy}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default AdCopyComponent
