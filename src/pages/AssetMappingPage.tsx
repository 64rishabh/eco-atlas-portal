import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import FRAMap from "@/components/map/FRAMap";
import { Search, Layers, Database, TreePine, Droplets, Mountain, Home, Factory } from "lucide-react";

const AssetMappingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("all");
  const [showForestAssets, setShowForestAssets] = useState(true);
  const [showWaterAssets, setShowWaterAssets] = useState(true);
  const [showInfrastructure, setShowInfrastructure] = useState(false);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "district-officer"
  };

  const assetCategories = [
    {
      id: "forest",
      name: "Forest Assets",
      icon: TreePine,
      color: "text-forest-primary",
      count: 2847,
      items: [
        { name: "Dense Forest Cover", area: "45,230 ha", value: "High", status: "Protected" },
        { name: "Open Forest", area: "32,180 ha", value: "Medium", status: "Managed" },
        { name: "Scrub Forest", area: "18,940 ha", value: "Low", status: "Degraded" },
        { name: "Bamboo Groves", area: "8,520 ha", value: "High", status: "Harvested" },
      ]
    },
    {
      id: "water",
      name: "Water Resources",
      icon: Droplets,
      color: "text-water-primary",
      count: 1432,
      items: [
        { name: "Rivers & Streams", area: "1,240 km", value: "High", status: "Flowing" },
        { name: "Natural Ponds", area: "340 units", value: "Medium", status: "Seasonal" },
        { name: "Wells & Springs", area: "890 units", value: "High", status: "Perennial" },
        { name: "Wetlands", area: "2,180 ha", value: "Critical", status: "Protected" },
      ]
    },
    {
      id: "mineral",
      name: "Mineral Resources",
      icon: Mountain,
      color: "text-earth-primary",
      count: 234,
      items: [
        { name: "Iron Ore Deposits", area: "45 sites", value: "High", status: "Surveyed" },
        { name: "Coal Reserves", area: "12 sites", value: "Medium", status: "Mapped" },
        { name: "Stone Quarries", area: "67 sites", value: "Low", status: "Active" },
        { name: "Sand Deposits", area: "23 sites", value: "Medium", status: "Regulated" },
      ]
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: Factory,
      color: "text-government-blue",
      count: 567,
      items: [
        { name: "Forest Rest Houses", area: "45 units", value: "Medium", status: "Functional" },
        { name: "Watch Towers", area: "78 units", value: "High", status: "Operational" },
        { name: "Forest Roads", area: "1,240 km", value: "Medium", status: "Maintained" },
        { name: "Check Posts", area: "34 units", value: "High", status: "Active" },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "protected": case "functional": case "operational": return "bg-green-100 text-green-800";
      case "managed": case "maintained": case "active": return "bg-blue-100 text-blue-800";
      case "degraded": case "seasonal": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getValueColor = (value: string) => {
    switch (value.toLowerCase()) {
      case "high": case "critical": return "bg-forest-primary text-primary-foreground";
      case "medium": return "bg-earth-primary text-primary-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Asset Mapping & Inventory</h1>
          <p className="text-muted-foreground">
            Comprehensive mapping and management of forest and natural resources
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search assets by name, location, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Asset Type</Label>
                <Select value={selectedAssetType} onValueChange={setSelectedAssetType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="forest">Forest Assets</SelectItem>
                    <SelectItem value="water">Water Resources</SelectItem>
                    <SelectItem value="mineral">Mineral Resources</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>District</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="nashik">Nashik</SelectItem>
                    <SelectItem value="raipur">Raipur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Value Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Value</SelectItem>
                    <SelectItem value="medium">Medium Value</SelectItem>
                    <SelectItem value="low">Low Value</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Asset Categories */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Asset Categories
                </CardTitle>
                <CardDescription>
                  Browse assets by category type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assetCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${category.color}`} />
                        <div>
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.count} items</p>
                        </div>
                      </div>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Layer Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Map Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="forest-assets">Forest Assets</Label>
                  <Switch
                    id="forest-assets"
                    checked={showForestAssets}
                    onCheckedChange={setShowForestAssets}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="water-assets">Water Resources</Label>
                  <Switch
                    id="water-assets"
                    checked={showWaterAssets}
                    onCheckedChange={setShowWaterAssets}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="infrastructure">Infrastructure</Label>
                  <Switch
                    id="infrastructure"
                    checked={showInfrastructure}
                    onCheckedChange={setShowInfrastructure}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Asset Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Distribution Map</CardTitle>
                <CardDescription>
                  Geographic visualization of forest and natural resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 rounded-lg overflow-hidden">
                  <FRAMap 
                    onMapLoad={(map) => {
                      console.log("Asset map loaded:", map);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Asset Details */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Details</CardTitle>
                <CardDescription>
                  Detailed inventory of selected asset category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="forest" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="forest">Forest</TabsTrigger>
                    <TabsTrigger value="water">Water</TabsTrigger>
                    <TabsTrigger value="mineral">Mineral</TabsTrigger>
                    <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                  </TabsList>
                  
                  {assetCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-4">
                      <div className="grid gap-3">
                        {category.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.area}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getValueColor(item.value)}>
                                {item.value}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMappingPage;