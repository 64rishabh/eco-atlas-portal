import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Users, 
  Calendar,
  MapPin,
  BarChart3,
  Target,
  Lightbulb,
  Shield
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const DecisionSupportPage = () => {
  const [selectedScenario, setSelectedScenario] = useState("claim-approval");
  const [inputParameters, setInputParameters] = useState({
    forestCover: "75",
    villagePopulation: "450",
    claimArea: "2.5",
    livelihoodDependency: "high"
  });

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "district-officer"
  };

  // Sample data for decision analytics
  const impactAnalysis = [
    { factor: "Ecological Impact", current: 85, projected: 78, threshold: 70 },
    { factor: "Socio-Economic", current: 65, projected: 82, threshold: 75 },
    { factor: "Legal Compliance", current: 92, projected: 95, threshold: 90 },
    { factor: "Community Welfare", current: 70, projected: 88, threshold: 80 },
  ];

  const riskAssessment = [
    { risk: "Forest Degradation", probability: 25, impact: "Medium", mitigation: "Sustainable practices training" },
    { risk: "Livelihood Loss", probability: 15, impact: "High", mitigation: "Alternative income programs" },
    { risk: "Legal Disputes", probability: 35, impact: "Low", mitigation: "Clear documentation" },
    { risk: "Biodiversity Loss", probability: 20, impact: "Medium", mitigation: "Conservation zones" },
  ];

  const scenarios = [
    {
      id: "claim-approval",
      name: "Claim Approval Analysis",
      description: "Analyze the impact of approving forest rights claims",
      icon: CheckCircle,
      color: "text-forest-primary"
    },
    {
      id: "conservation",
      name: "Conservation Planning",
      description: "Optimize conservation strategies and protected areas",
      icon: Shield,
      color: "text-water-primary"
    },
    {
      id: "resource-allocation",
      name: "Resource Allocation",
      description: "Optimize allocation of forest resources and benefits",
      icon: Target,
      color: "text-earth-primary"
    },
    {
      id: "policy-impact",
      name: "Policy Impact Assessment",
      description: "Evaluate the impact of new policies on forest communities",
      icon: BarChart3,
      color: "text-government-blue"
    }
  ];

  const recommendations = [
    {
      priority: "High",
      title: "Approve Community Forest Rights",
      description: "Based on analysis, recommend approval with sustainable management plan",
      confidence: 87,
      actions: ["Issue title deeds", "Develop management plan", "Set up monitoring system"]
    },
    {
      priority: "Medium",
      title: "Establish Buffer Zones",
      description: "Create buffer zones around critical forest areas to balance conservation and livelihood",
      confidence: 74,
      actions: ["Demarcate boundaries", "Stakeholder consultation", "Compensation framework"]
    },
    {
      priority: "Low",
      title: "Enhance Livelihood Programs",
      description: "Strengthen alternative livelihood programs to reduce forest dependency",
      confidence: 65,
      actions: ["Skill development", "Market linkages", "Financial support"]
    }
  ];

  const chartConfig = {
    current: {
      label: "Current Score",
      color: "hsl(var(--forest-primary))",
    },
    projected: {
      label: "Projected Score",
      color: "hsl(var(--water-primary))",
    },
    threshold: {
      label: "Threshold",
      color: "hsl(var(--destructive))",
    },
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (probability: number) => {
    if (probability >= 30) return "text-red-600";
    if (probability >= 20) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Decision Support System</h1>
          <p className="text-muted-foreground">
            AI-powered analytics and recommendations for informed forest management decisions
          </p>
        </div>

        {/* Scenario Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Analysis Scenarios
            </CardTitle>
            <CardDescription>
              Select a decision scenario to analyze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <div
                    key={scenario.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedScenario === scenario.id ? "border-forest-primary bg-forest-primary/5" : "border-border"
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <Icon className={`h-6 w-6 ${scenario.color} mb-2`} />
                    <h3 className="font-medium text-sm mb-1">{scenario.name}</h3>
                    <p className="text-xs text-muted-foreground">{scenario.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Parameters */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Input Parameters
                </CardTitle>
                <CardDescription>
                  Configure analysis parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forest-cover">Forest Cover (%)</Label>
                  <Input
                    id="forest-cover"
                    type="number"
                    value={inputParameters.forestCover}
                    onChange={(e) => setInputParameters({...inputParameters, forestCover: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="population">Village Population</Label>
                  <Input
                    id="population"
                    type="number"
                    value={inputParameters.villagePopulation}
                    onChange={(e) => setInputParameters({...inputParameters, villagePopulation: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="claim-area">Claim Area (hectares)</Label>
                  <Input
                    id="claim-area"
                    type="number"
                    step="0.1"
                    value={inputParameters.claimArea}
                    onChange={(e) => setInputParameters({...inputParameters, claimArea: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependency">Livelihood Dependency</Label>
                  <Select 
                    value={inputParameters.livelihoodDependency} 
                    onValueChange={(value) => setInputParameters({...inputParameters, livelihoodDependency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (&gt;80%)</SelectItem>
                      <SelectItem value="medium">Medium (40-80%)</SelectItem>
                      <SelectItem value="low">Low (&lt;40%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-factors">Additional Factors</Label>
                  <Textarea
                    id="additional-factors"
                    placeholder="Enter any additional considerations..."
                    className="min-h-20"
                  />
                </div>

                <Button className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">High Approval Probability</p>
                    <p className="text-muted-foreground text-xs">87% chance of successful claim approval</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Monitor Biodiversity</p>
                    <p className="text-muted-foreground text-xs">Implement conservation measures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Positive Social Impact</p>
                    <p className="text-muted-foreground text-xs">Expected 15% improvement in livelihood</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Impact Analysis Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Multi-Criteria Impact Analysis
                </CardTitle>
                <CardDescription>
                  Current vs projected impact scores across key factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={impactAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="factor" 
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
                      <Bar dataKey="current" fill="var(--color-current)" name="Current" />
                      <Bar dataKey="projected" fill="var(--color-projected)" name="Projected" />
                      <Bar dataKey="threshold" fill="var(--color-threshold)" name="Threshold" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment Matrix
                </CardTitle>
                <CardDescription>
                  Identified risks and mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessment.map((risk, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{risk.risk}</h4>
                        <Badge variant="outline" className={getRiskColor(risk.probability)}>
                          {risk.probability}% Risk
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Impact Level: </span>
                          <span className="font-medium">{risk.impact}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Mitigation: </span>
                          <span className="font-medium">{risk.mitigation}</span>
                        </div>
                      </div>
                      <Progress value={risk.probability} className="mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  Prioritized recommendations based on analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{rec.title}</h4>
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority} Priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{rec.confidence}%</div>
                          <div className="text-xs text-muted-foreground">Confidence</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Action Items:</Label>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {rec.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-forest-primary rounded-full"></div>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSupportPage;