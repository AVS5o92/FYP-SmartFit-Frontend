import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

export interface PlaceholderItem {
  imageUrl: string;
  name: string;
  category: string;
  garmentType: string;
  color: string;
  material: string;
}

interface ClothingUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: ClothingItem) => void;
  initialData?: PlaceholderItem;
}

export interface ClothingItem {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
  garmentType: string;
  color: string;
  material: string;
}

const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"] as const;

const GARMENT_TYPES: Record<string, string[]> = {
  Tops: ["T-Shirt", "Shirt", "Blouse", "Tank Top", "Sweater", "Hoodie", "Polo"],
  Bottoms: ["Jeans", "Pants", "Shorts", "Skirt", "Leggings", "Chinos", "Joggers"],
  Dresses: ["Maxi Dress", "Mini Dress", "Midi Dress", "Cocktail Dress", "Casual Dress", "Formal Dress"],
  Outerwear: ["Jacket", "Coat", "Blazer", "Cardigan", "Vest", "Windbreaker", "Parka"],
  Shoes: ["Sneakers", "Boots", "Sandals", "Heels", "Flats", "Loafers", "Athletic"],
  Accessories: ["Hat", "Scarf", "Belt", "Bag", "Jewelry", "Watch", "Sunglasses"],
};

const MATERIALS = [
  "Cotton", "Denim", "Nylon", "Wool", "Polyester", "Silk",
  "Linen", "Leather", "Cashmere", "Velvet", "Satin", "Fleece",
];

const COLORS = [
  "Black", "White", "Gray", "Navy", "Blue", "Red", "Green",
  "Yellow", "Orange", "Pink", "Purple", "Brown", "Beige", "Cream", "Multicolor",
];

const ClothingUploadDialog = ({ open, onOpenChange, onSave, initialData }: ClothingUploadDialogProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [name, setName] = useState<string>(initialData?.name || "");
  const [category, setCategory] = useState<string>(initialData?.category || "");
  const [garmentType, setGarmentType] = useState<string>(initialData?.garmentType || "");
  const [color, setColor] = useState<string>(initialData?.color || "");
  const [material, setMaterial] = useState<string>(initialData?.material || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setImagePreview(null);
    setName("");
    setCategory("");
    setGarmentType("");
    setColor("");
    setMaterial("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && initialData) {
      setImagePreview(initialData.imageUrl);
      setName(initialData.name);
      setCategory(initialData.category);
      setGarmentType(initialData.garmentType);
      setColor(initialData.color);
      setMaterial(initialData.material);
    } else if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const handleSave = () => {
    if (!imagePreview) {
      toast.error("Please upload an image");
      return;
    }
    if (!name.trim()) {
      toast.error("Please enter an item name");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!garmentType) {
      toast.error("Please select a garment type");
      return;
    }
    if (!color) {
      toast.error("Please select a color");
      return;
    }
    if (!material) {
      toast.error("Please select a material");
      return;
    }

    const newItem: ClothingItem = {
      id: crypto.randomUUID(),
      imageUrl: imagePreview,
      name: name.trim(),
      category,
      garmentType,
      color,
      material,
    };

    onSave(newItem);
    resetForm();
    onOpenChange(false);
    toast.success("Item added to wardrobe!");
  };

  const availableGarmentTypes = category ? GARMENT_TYPES[category] || [] : [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Clothing Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Photo</Label>
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload a photo</p>
              </div>
            ) : (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={handleRemoveImage}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Item Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My favorite blue shirt"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(val) => {
                setCategory(val);
                setGarmentType("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Garment Type */}
          <div className="space-y-2">
            <Label>Garment Type</Label>
            <Select value={garmentType} onValueChange={setGarmentType} disabled={!category}>
              <SelectTrigger>
                <SelectValue placeholder={category ? "Select garment type" : "Select category first"} />
              </SelectTrigger>
              <SelectContent>
                {availableGarmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label>Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Material */}
          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {MATERIALS.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <Button className="w-full bg-gradient-to-r from-primary to-primary-glow" onClick={handleSave}>
            Add to Wardrobe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClothingUploadDialog;
