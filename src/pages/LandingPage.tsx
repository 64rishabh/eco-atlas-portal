import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, FileText, BarChart3, Users, ArrowRight, Shield, TreePine } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-primary via-government-blue to-forest-secondary">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center text-white">
            <TreePine className="mx-auto mb-6 h-16 w-16" />
            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Forest Rights Act Portal
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg lg:text-xl opacity-90">
              Empowering forest communities through digital governance. File claims, track applications, 
              and explore forest resources with our comprehensive FRA management system.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-forest-primary hover:bg-white/90">
                <Link to="/auth">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Forest Rights Management</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools needed for efficient FRA implementation and monitoring.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-[var(--shadow-elevation)] transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-forest-primary mb-4" />
                <CardTitle>FRA Atlas</CardTitle>
                <CardDescription>
                  Interactive mapping with land use, forest cover, and claimed villages visualization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-[var(--shadow-elevation)] transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 mx-auto text-earth-primary mb-4" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive statistics on claims filed, approved, and state-wise data analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-[var(--shadow-elevation)] transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 mx-auto text-water-primary mb-4" />
                <CardTitle>File Claims</CardTitle>
                <CardDescription>
                  Digital claim submission with document upload and application tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-[var(--shadow-elevation)] transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-government-blue mb-4" />
                <CardTitle>Secure Access</CardTitle>
                <CardDescription>
                  Role-based authentication for applicants, officers, and administrators.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About FRA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About the Forest Rights Act</h2>
              <p className="text-muted-foreground mb-4">
                The Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006, 
                commonly known as the Forest Rights Act (FRA), is a landmark legislation that recognizes and vests 
                forest rights in forest dwelling Scheduled Tribes and other traditional forest dwellers.
              </p>
              <p className="text-muted-foreground mb-6">
                This digital portal streamlines the FRA implementation process, making it more transparent, 
                efficient, and accessible to forest communities across India.
              </p>
              <Button asChild variant="default">
                <Link to="/auth">Start Your Application</Link>
              </Button>
            </div>
            <Card className="bg-gradient-to-br from-forest-primary/10 to-forest-secondary/10 border-forest-primary/20">
              <CardHeader>
                <CardTitle className="text-forest-primary">Key Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">Recognition of traditional forest dwelling rights</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">Digital claim submission and tracking</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">Transparent approval process</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">Comprehensive data visualization and analytics</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">FRA Portal</h3>
              <p className="text-white/80 text-sm">
                Empowering forest communities through digital governance and transparent claim management.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/auth" className="text-white/80 hover:text-white">Login</Link></li>
                <li><Link to="/atlas" className="text-white/80 hover:text-white">FRA Atlas</Link></li>
                <li><Link to="/analytics" className="text-white/80 hover:text-white">Analytics</Link></li>
                <li><Link to="/file-claim" className="text-white/80 hover:text-white">File Claim</Link></li>
                <li><Link to="/asset-mapping" className="text-white/80 hover:text-white">Asset Mapping</Link></li>
                <li><Link to="/decision-support" className="text-white/80 hover:text-white">Decision Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-white/80 text-sm">
                Ministry of Tribal Affairs<br />
                Government of India<br />
                New Delhi, India
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            © 2024 Forest Rights Act Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;