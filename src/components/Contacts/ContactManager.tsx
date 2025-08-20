import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Upload,
  UserPlus,
  Phone,
  MapPin,
  Users,
  Filter,
  Download
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockContacts = [
  {
    id: 1,
    firstName: "Ramesh",
    lastName: "Kumar",
    phone: "+919876543210",
    location: "Kharagpur",
    audiences: ["Farmers - Kharagpur", "Premium Customers"],
    optedIn: true,
    lastMessage: "2 days ago"
  },
  {
    id: 2,
    firstName: "Priya",
    lastName: "Sharma",
    phone: "+919876543211",
    location: "Midnapore",
    audiences: ["Weather Subscribers"],
    optedIn: true,
    lastMessage: "1 week ago"
  },
  {
    id: 3,
    firstName: "Suresh",
    lastName: "Patel",
    phone: "+919876543212",
    location: "Kharagpur",
    audiences: ["Farmers - Kharagpur", "VIP Members"],
    optedIn: false,
    lastMessage: "Never"
  },
  {
    id: 4,
    firstName: "Anjali",
    lastName: "Das",
    phone: "+919876543213",
    location: "Paschim Medinipur",
    audiences: ["Premium Customers"],
    optedIn: true,
    lastMessage: "3 hours ago"
  }
];

export function ContactManager() {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Contact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">5,247</p>
            <p className="text-sm text-muted-foreground">Total Contacts</p>
          </CardContent>
        </Card>
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">4,892</p>
            <p className="text-sm text-muted-foreground">Opted In</p>
          </CardContent>
        </Card>
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">355</p>
            <p className="text-sm text-muted-foreground">Opted Out</p>
          </CardContent>
        </Card>
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Audiences</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact List */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Contact Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockContacts.map((contact) => (
              <div 
                key={contact.id}
                className="flex items-center justify-between p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {contact.firstName[0]}{contact.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {contact.firstName} {contact.lastName}
                    </h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {contact.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last message</p>
                    <p className="text-sm font-medium">{contact.lastMessage}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 max-w-64">
                    {contact.audiences.map((audience) => (
                      <Badge key={audience} variant="outline" className="text-xs">
                        {audience}
                      </Badge>
                    ))}
                  </div>

                  <Badge variant={contact.optedIn ? "default" : "destructive"}>
                    {contact.optedIn ? "Opted In" : "Opted Out"}
                  </Badge>

                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target Audiences */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Target Audiences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Farmers - Kharagpur", count: 2500, description: "Active farmers in Kharagpur region" },
              { name: "Premium Customers", count: 1200, description: "High-value customer segment" },
              { name: "Weather Subscribers", count: 800, description: "Users subscribed to weather alerts" },
              { name: "VIP Members", count: 500, description: "Exclusive membership tier" },
              { name: "New Customers", count: 300, description: "Recently onboarded customers" },
              { name: "Seasonal Buyers", count: 450, description: "Customers active during specific seasons" }
            ].map((audience) => (
              <Card key={audience.name} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-2">{audience.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{audience.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{audience.count}</span>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}