import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, FileText, CheckCircle, Clock, Users, MapPin, TreePine, Droplets } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const AnalyticsPage = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "state-officer"
  };

  // Sample data for charts
  const stateWiseData = [
    { state: "Maharashtra", filed: 15420, approved: 12340, pending: 2180, rejected: 900 },
    { state: "Chhattisgarh", filed: 18750, approved: 14200, pending: 3100, rejected: 1450 },
    { state: "Odisha", filed: 12680, approved: 9800, pending: 2100, rejected: 780 },
    { state: "Jharkhand", filed: 14300, approved: 10950, pending: 2400, rejected: 950 },
    { state: "West Bengal", filed: 8920, approved: 7100, pending: 1320, rejected: 500 },
    { state: "Gujarat", filed: 6750, approved: 5400, pending: 980, rejected: 370 },
  ];

  const claimStatusData = [
    { name: "Approved", value: 59790, color: "#22c55e" },
    { name: "Pending", value: 12080, color: "#eab308" },
    { name: "Rejected", value: 4950, color: "#ef4444" },
  ];

  const monthlyTrendData = [
    { month: "Jan", filed: 1200, approved: 800 },
    { month: "Feb", filed: 1450, approved: 950 },
    { month: "Mar", filed: 1680, approved: 1200 },
    { month: "Apr", filed: 1850, approved: 1400 },
    { month: "May", filed: 2100, approved: 1650 },
    { month: "Jun", filed: 2380, approved: 1900 },
  ];

  const landCoverData = [
    { type: "Dense Forest", area: 45.2 },
    { type: "Open Forest", area: 32.8 },
    { type: "Scrub Forest", area: 15.6 },
    { type: "Agricultural", area: 4.8 },
    { type: "Water Bodies", area: 1.6 },
  ];

  const chartConfig = {
    filed: {
      label: "Filed",
      color: "hsl(var(--government-blue))",
    },
    approved: {
      label: "Approved", 
      color: "hsl(var(--forest-primary))",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--earth-primary))",
    },
    rejected: {
      label: "Rejected",
      color: "hsl(var(--destructive))",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">FRA Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into Forest Rights Act implementation across India
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Select defaultValue="all-states">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-states">All States</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
              <SelectItem value="odisha">Odisha</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims Filed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-government-blue">76,820</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Claims Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest-primary">59,790</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> approval rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-earth-primary">12,080</div>
              <p className="text-xs text-muted-foreground">
                Average processing: 45 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beneficiaries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-water-primary">2,45,680</div>
              <p className="text-xs text-muted-foreground">
                Across 8,450 villages
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* State-wise Claims */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                State-wise FRA Claims
              </CardTitle>
              <CardDescription>
                Claims filed, approved, and pending by state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateWiseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="state" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="filed" fill="var(--color-filed)" name="Filed" />
                    <Bar dataKey="approved" fill="var(--color-approved)" name="Approved" />
                    <Bar dataKey="pending" fill="var(--color-pending)" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Claim Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Claim Status Distribution
              </CardTitle>
              <CardDescription>
                Overall status of all FRA claims
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={claimStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {claimStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trends and Land Cover */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Filing Trends
              </CardTitle>
              <CardDescription>
                Claims filed vs approved over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="filed" 
                      stackId="1" 
                      stroke="var(--color-filed)" 
                      fill="var(--color-filed)" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="approved" 
                      stackId="2" 
                      stroke="var(--color-approved)" 
                      fill="var(--color-approved)" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Land Cover Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="h-5 w-5" />
                Land Cover Analysis
              </CardTitle>
              <CardDescription>
                Distribution of land cover types in FRA areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {landCoverData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-sm" 
                      style={{ backgroundColor: `hsl(${120 + index * 30}, 60%, 50%)` }}
                    />
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.area}%</span>
                    <Badge variant="outline" className="text-xs">
                      {item.area > 30 ? "High" : item.area > 15 ? "Medium" : "Low"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;