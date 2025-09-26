import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TreePine, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

const Navbar = ({ user }: NavbarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b border-border/40 shadow-[var(--shadow-card)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="h-8 w-8 text-forest-primary" />
            <span className="text-xl font-bold text-foreground">FRA Portal</span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/atlas"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/atlas")
                    ? "bg-forest-primary text-primary-foreground"
                    : "text-foreground hover:text-forest-primary hover:bg-forest-primary/10"
                }`}
              >
                FRA Atlas
              </Link>
              <Link
                to="/analytics"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/analytics")
                    ? "bg-forest-primary text-primary-foreground"
                    : "text-foreground hover:text-forest-primary hover:bg-forest-primary/10"
                }`}
              >
                Analytics
              </Link>
              <Link
                to="/file-claim"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/file-claim")
                    ? "bg-forest-primary text-primary-foreground"
                    : "text-foreground hover:text-forest-primary hover:bg-forest-primary/10"
                }`}
              >
                File Claim
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-forest-primary text-primary-foreground">
                        {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-forest-primary font-medium capitalize">
                      {user.role.replace("-", " ")}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;