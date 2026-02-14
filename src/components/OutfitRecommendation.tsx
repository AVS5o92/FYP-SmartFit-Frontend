import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClothingItem } from "@/components/ClothingUploadDialog";
import ClothingItemDialog from "@/components/ClothingItemDialog";
import { Calendar, CloudSun, MapPin } from "lucide-react";

interface OutfitRecommendationProps {
  outfit: ClothingItem[];
  occasion: string;
  weather: string;
}

const CATEGORY_ORDER = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];

const OutfitRecommendation = ({ outfit, occasion, weather }: OutfitRecommendationProps) => {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const groupedItems = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: outfit.filter((item) => item.category === cat),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      {/* Context Info */}
      <div className="flex flex-wrap gap-3 mb-6">
        {occasion && (
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 text-sm">
            <Calendar className="w-3.5 h-3.5" />
            {occasion}
          </Badge>
        )}
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 text-sm">
          <CloudSun className="w-3.5 h-3.5" />
          {weather || "Auto"}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 text-sm">
          <MapPin className="w-3.5 h-3.5" />
          22°C · Partly Cloudy
        </Badge>
      </div>

      {/* Outfit Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {groupedItems.map((group) =>
          group.items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group cursor-pointer rounded-lg border bg-card hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-square bg-muted relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-2.5 space-y-1">
                <p className="font-medium text-sm text-foreground truncate">
                  {item.name}
                </p>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>

      <ClothingItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selectedItem}
      />
    </>
  );
};

export default OutfitRecommendation;
