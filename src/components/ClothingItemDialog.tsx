import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ClothingItem } from "./ClothingUploadDialog";
import { Shirt, Palette, Layers } from "lucide-react";

interface ClothingItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ClothingItem | null;
}

const ClothingItemDialog = ({ open, onOpenChange, item }: ClothingItemDialogProps) => {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Attributes */}
          <div className="space-y-4">
            {/* Category & Garment Type */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shirt className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Category & Type</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">{item.category}</Badge>
                  <Badge variant="secondary">{item.garmentType}</Badge>
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Color</p>
                <Badge variant="outline" className="text-foreground">
                  {item.color}
                </Badge>
              </div>
            </div>

            {/* Material */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Material</p>
                <Badge variant="outline" className="text-foreground">
                  {item.material}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClothingItemDialog;
