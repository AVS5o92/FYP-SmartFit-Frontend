import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Shirt, Plus, X, Lock, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClothingUploadDialog, { ClothingItem, PlaceholderItem } from "@/components/ClothingUploadDialog";
import ClothingItemDialog from "@/components/ClothingItemDialog";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BASIC_WARDROBE_LIMIT = 8;
const PLACEHOLDER_ITEMS: PlaceholderItem[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    name: "Classic White Tee",
    category: "Tops",
    garmentType: "T-Shirt",
    color: "White",
    material: "Cotton",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    name: "Everyday Jeans",
    category: "Bottoms",
    garmentType: "Jeans",
    color: "Blue",
    material: "Denim",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop",
    name: "Leather Jacket",
    category: "Outerwear",
    garmentType: "Jacket",
    color: "Brown",
    material: "Leather",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
    name: "White Sneakers",
    category: "Shoes",
    garmentType: "Sneakers",
    color: "White",
    material: "Leather",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop",
    name: "Red Midi Dress",
    category: "Dresses",
    garmentType: "Midi Dress",
    color: "Red",
    material: "Silk",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
    name: "Cozy Hoodie",
    category: "Tops",
    garmentType: "Hoodie",
    color: "Gray",
    material: "Fleece",
  },
];

const Wardrobe = () => {
  const navigate = useNavigate();
  const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [userPlan, setUserPlan] = useState<string>("basic");
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<PlaceholderItem | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [favoriteOutfits, setFavoriteOutfits] = useState<ClothingItem[][]>([]);

  useEffect(() => {
    const plan = localStorage.getItem("userPlan") || "basic";
    setUserPlan(plan);
    // Load favorite outfits from localStorage
    try {
      const saved = localStorage.getItem("favoriteOutfits");
      if (saved) setFavoriteOutfits(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const isBasicPlan = userPlan === "basic";
  const hasReachedLimit = isBasicPlan && items.length >= BASIC_WARDROBE_LIMIT;

  const handleViewItem = (item: ClothingItem) => {
    setSelectedItem(item);
    setItemDialogOpen(true);
  };

  const handleOpenDialog = (placeholder?: PlaceholderItem) => {
    if (hasReachedLimit) return;
    setSelectedPlaceholder(placeholder);
    setUploadDialogOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open) setSelectedPlaceholder(undefined);
    setUploadDialogOpen(open);
  };

  const handleSaveItem = (item: ClothingItem) => {
    if (hasReachedLimit) return;
    setItems((prev) => [...prev, item]);
  };

  const handleConfirmDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleRemoveItem = () => {
    if (itemToDelete) {
      setItems((prev) => prev.filter((item) => item.id !== itemToDelete));
      setItemToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const getItemsByCategory = (category: string) => {
    if (category === "All") return items;
    return items.filter((item) => item.category === category);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Subscription Limit Banner */}
      {hasReachedLimit && (
        <Card className="border-primary/50 bg-primary/5 animate-fade-in-up">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Wardrobe limit reached</p>
                <p className="text-sm text-muted-foreground">
                  You've reached the 8-item limit on the Basic plan. Subscribe to Premium to add unlimited items.
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("/subscription")} className="bg-gradient-to-r from-primary to-primary-glow">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-bold text-foreground">My Wardrobe</h1>
          <p className="text-muted-foreground text-lg">
            Manage your clothing collection
            {isBasicPlan && ` (${items.length}/${BASIC_WARDROBE_LIMIT} items)`}
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-primary to-primary-glow"
          onClick={() => handleOpenDialog()}
          disabled={hasReachedLimit}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Items
        </Button>
      </div>

      <Tabs defaultValue="All" className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category);
          return (
            <TabsContent key={category} value={category} className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  {categoryItems.length === 0 ? (
                    <div className="space-y-6 py-8">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <Shirt className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <div className="text-center space-y-2">
                          <h3 className="text-xl font-semibold text-foreground">No items yet</h3>
                          <p className="text-muted-foreground max-w-md">
                            Click on a sample item below or upload your own photos to build your wardrobe.
                          </p>
                        </div>
                      </div>

                      {/* Placeholder Items Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {PLACEHOLDER_ITEMS.map((placeholder, index) => (
                          <div
                            key={index}
                            onClick={() => handleOpenDialog(placeholder)}
                            className="group relative rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg"
                          >
                            <img
                              src={placeholder.imageUrl}
                              alt={placeholder.name}
                              className="w-full aspect-square object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-3">
                              <p className="font-medium text-sm text-foreground truncate">
                                {placeholder.name}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                                  {placeholder.category}
                                </span>
                                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                  {placeholder.color}
                                </span>
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Plus className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center">
                        <Button
                          className="bg-gradient-to-r from-primary to-primary-glow"
                          onClick={() => handleOpenDialog()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Your Clothes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleViewItem(item)}
                          className="group relative rounded-lg overflow-hidden border bg-card cursor-pointer hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full aspect-square object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConfirmDelete(item.id);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          <div className="p-3 space-y-1">
                            <p className="font-medium text-sm text-foreground truncate">
                              {item.name}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {item.color}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                {item.material}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* My Favorite Outfits */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-primary" />
            <span>My Favorite Outfits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {favoriteOutfits.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">No favorite outfits yet</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Go to Get Styled, generate an outfit, and rate it highly to save it here.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteOutfits.map((outfit, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Outfit #{index + 1}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {outfit.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleViewItem(item)}
                        className="w-12 h-12 rounded-md bg-muted overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      >
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {outfit.map((item) => (
                      <span key={item.id} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ClothingUploadDialog
        open={uploadDialogOpen}
        onOpenChange={handleCloseDialog}
        onSave={handleSaveItem}
        initialData={selectedPlaceholder}
      />

      <ClothingItemDialog
        open={itemDialogOpen}
        onOpenChange={setItemDialogOpen}
        item={selectedItem}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the item from your wardrobe. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveItem} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Wardrobe;
