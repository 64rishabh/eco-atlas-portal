import { useState } from "react";
import { Search, Layers, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import FRAMap from "@/components/map/FRAMap";

const AtlasPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLayer, setActiveLayer] = useState("");
  const [showForestCover, setShowForestCover] = useState(false);
  const [showWaterBodies, setShowWaterBodies] = useState(false);
  const [showClaimedVillages, setShowClaimedVillages] = useState(true);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "district-officer"
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5" />
                  Search Regions
                </CardTitle>
                <CardDescription>
                  Find states, districts, villages, or specific locations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter location name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button onClick={handleSearch} size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Filter by State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                      <SelectItem value="odisha">Odisha</SelectItem>
                      <SelectItem value="jharkhand">Jharkhand</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Filter by District</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="nashik">Nashik</SelectItem>
                      <SelectItem value="raipur">Raipur</SelectItem>
                      <SelectItem value="bastar">Bastar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Layer Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5" />
                  Map Layers
                </CardTitle>
                <CardDescription>
                  Toggle different data layers on the map
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="forest-cover">Forest Cover</Label>
                  <Switch
                    id="forest-cover"
                    checked={showForestCover}
                    onCheckedChange={(checked) => {
                      setShowForestCover(checked);
                      setActiveLayer(checked ? "forest-cover" : "");
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="water-bodies">Water Bodies</Label>
                  <Switch
                    id="water-bodies"
                    checked={showWaterBodies}
                    onCheckedChange={(checked) => {
                      setShowWaterBodies(checked);
                      setActiveLayer(checked ? "water-bodies" : "");
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="claimed-villages">FRA Claimed Villages</Label>
                  <Switch
                    id="claimed-villages"
                    checked={showClaimedVillages}
                    onCheckedChange={setShowClaimedVillages}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Land Use Classification</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select land use type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agricultural">Agricultural Land</SelectItem>
                      <SelectItem value="forest">Forest Land</SelectItem>
                      <SelectItem value="wasteland">Waste Land</SelectItem>
                      <SelectItem value="water">Water Bodies</SelectItem>
                      <SelectItem value="settlement">Settlement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  Legend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm">Approved Claims</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Claimed Areas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-sm">Pending Claims</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  <span className="text-sm">No Claims</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <FRAMap 
            activeLayer={activeLayer}
            onMapLoad={(map) => {
              console.log("Map loaded:", map);
            }}
          />
          
          {/* Map Controls Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <Card className="bg-background/95 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Active Filters:</span>
                  {showForestCover && <span className="px-2 py-1 bg-forest-primary/10 text-forest-primary rounded text-xs">Forest Cover</span>}
                  {showWaterBodies && <span className="px-2 py-1 bg-water-primary/10 text-water-primary rounded text-xs">Water Bodies</span>}
                  {showClaimedVillages && <span className="px-2 py-1 bg-earth-primary/10 text-earth-primary rounded text-xs">FRA Villages</span>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtlasPage;