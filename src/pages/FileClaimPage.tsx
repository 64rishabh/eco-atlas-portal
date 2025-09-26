import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Upload, FileText, CheckCircle, AlertCircle, Calendar, MapPin, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "uploaded" | "pending" | "error";
}

const FileClaimPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "applicant"
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const requiredDocuments = [
    { name: "Identity Proof", description: "Aadhaar Card, Voter ID, or Passport", required: true },
    { name: "Residence Proof", description: "Utility bill, Ration card, or Bank statement", required: true },
    { name: "Occupation Evidence", description: "Documents proving forest-based livelihood", required: true },
    { name: "Community Certificate", description: "ST/OTFD community membership proof", required: true },
    { name: "Land Records", description: "Village land records or survey documents", required: false },
    { name: "Forest Use Evidence", description: "Photos, witness statements, or traditional use proof", required: false },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newFile: FileUpload = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          status: "uploaded"
        };
        setUploadedFiles(prev => [...prev, newFile]);
      });
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Claim Submitted Successfully",
        description: "Your FRA claim has been submitted and is under review. Reference ID: FRA2024001234",
      });
      // Reset form or redirect
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">File FRA Claim</h1>
            <p className="text-muted-foreground">
              Submit your Forest Rights Act claim application with required documentation
            </p>
          </div>

          {/* Progress Indicator */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Application Progress</span>
                <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
              </div>
              <Progress value={progress} className="mb-4" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className={currentStep >= 1 ? "text-forest-primary font-medium" : ""}>Personal Info</span>
                <span className={currentStep >= 2 ? "text-forest-primary font-medium" : ""}>Claim Details</span>
                <span className={currentStep >= 3 ? "text-forest-primary font-medium" : ""}>Documents</span>
                <span className={currentStep >= 4 ? "text-forest-primary font-medium" : ""}>Review & Submit</span>
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Provide your personal details for the FRA claim
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter last name" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name *</Label>
                    <Input id="fatherName" placeholder="Enter father's name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" type="date" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Current Address *</Label>
                  <Textarea id="address" placeholder="Enter complete address" required />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                        <SelectItem value="odisha">Odisha</SelectItem>
                        <SelectItem value="jharkhand">Jharkhand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
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
                    <Label htmlFor="village">Village *</Label>
                    <Input id="village" placeholder="Enter village name" required />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Claim Details
                </CardTitle>
                <CardDescription>
                  Specify the details of your forest rights claim
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="claimType">Type of Claim *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select claim type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Forest Rights</SelectItem>
                      <SelectItem value="community">Community Forest Rights</SelectItem>
                      <SelectItem value="community-forest-resource">Community Forest Resource Rights</SelectItem>
                      <SelectItem value="habitat">Habitat Rights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="forestArea">Forest Area/Beat *</Label>
                    <Input id="forestArea" placeholder="Enter forest area or beat name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="claimArea">Claim Area (in hectares) *</Label>
                    <Input id="claimArea" type="number" step="0.01" placeholder="0.00" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Primary Occupation/Livelihood *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="animal-husbandry">Animal Husbandry</SelectItem>
                      <SelectItem value="ntfp-collection">NTFP Collection</SelectItem>
                      <SelectItem value="hunting-fishing">Hunting & Fishing</SelectItem>
                      <SelectItem value="handicrafts">Handicrafts</SelectItem>
                      <SelectItem value="other">Other Forest-based Livelihood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration of Forest Use *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How long have you been using this forest area?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">0-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10-25">10-25 years</SelectItem>
                      <SelectItem value="25+">25+ years</SelectItem>
                      <SelectItem value="generational">Generational (family tradition)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="claimDescription">Detailed Description of Claim *</Label>
                  <Textarea 
                    id="claimDescription" 
                    placeholder="Describe your forest use, traditional practices, and the specific rights you are claiming..."
                    className="min-h-32"
                    required 
                  />
                </div>

                <div className="space-y-4">
                  <Label>Additional Rights (check all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="grazing" />
                      <Label htmlFor="grazing" className="text-sm">Grazing Rights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="water" />
                      <Label htmlFor="water" className="text-sm">Water Rights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fishing" />
                      <Label htmlFor="fishing" className="text-sm">Fishing Rights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ntfp" />
                      <Label htmlFor="ntfp" className="text-sm">NTFP Collection</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Upload
                </CardTitle>
                <CardDescription>
                  Upload required documents to support your FRA claim
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Required Documents List */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Required Documents</h3>
                  <div className="grid gap-3">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-start justify-between p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{doc.name}</h4>
                            {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                        </div>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your files here, or click to browse
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="max-w-sm mx-auto"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
                  </p>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Uploaded Documents</h3>
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={file.status === "uploaded" ? "default" : "destructive"}>
                            {file.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Review & Submit
                </CardTitle>
                <CardDescription>
                  Review your application details before submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Application Summary</h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applicant Name:</span>
                      <span>John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Claim Type:</span>
                      <span>Individual Forest Rights</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Forest Area:</span>
                      <span>Dharampur Beat, Maharashtra</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Claim Area:</span>
                      <span>2.5 hectares</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Documents:</span>
                      <span>{uploadedFiles.length} files uploaded</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I declare that the information provided is true and accurate to the best of my knowledge.
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="consent" required />
                    <Label htmlFor="consent" className="text-sm">
                      I consent to the processing of my personal data for the purpose of this FRA claim.
                    </Label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Important Notice</p>
                      <p className="text-blue-700">
                        After submission, your application will be reviewed by the Village Forest Rights Committee. 
                        You will receive updates via SMS/email. The typical processing time is 45-60 days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-forest-primary hover:bg-forest-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileClaimPage;