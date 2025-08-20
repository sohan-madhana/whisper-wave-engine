import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

const deliveryData = [
  { month: "Jan", sent: 12000, delivered: 11800, read: 7500 },
  { month: "Feb", sent: 15000, delivered: 14700, read: 9200 },
  { month: "Mar", sent: 18000, delivered: 17600, read: 11800 },
  { month: "Apr", sent: 22000, delivered: 21500, read: 14200 },
  { month: "May", sent: 25000, delivered: 24500, read: 16500 },
  { month: "Jun", sent: 28000, delivered: 27400, read: 18900 },
];

const campaignPerformance = [
  { name: "Mango Sale", sent: 15600, delivered: 15372, read: 10174 },
  { name: "Fertilizer Reminder", sent: 12400, delivered: 12152, read: 7240 },
  { name: "Weather Alerts", sent: 8900, delivered: 8723, read: 6014 },
  { name: "Product Launch", sent: 6800, delivered: 6664, read: 4197 },
];

const audienceDistribution = [
  { name: "Farmers - Kharagpur", value: 2500, color: "hsl(var(--primary))" },
  { name: "Premium Customers", value: 1200, color: "hsl(var(--success))" },
  { name: "Weather Subscribers", value: 800, color: "hsl(var(--warning))" },
  { name: "VIP Members", value: 500, color: "hsl(var(--accent-foreground))" },
];

const engagementTrend = [
  { week: "Week 1", readRate: 58.2, clickRate: 12.4 },
  { week: "Week 2", readRate: 62.1, clickRate: 14.8 },
  { week: "Week 3", readRate: 65.3, clickRate: 16.2 },
  { week: "Week 4", readRate: 68.7, clickRate: 18.5 },
];

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Message Delivery Trends */}
      <Card className="shadow-[var(--shadow-card)] lg:col-span-2">
        <CardHeader>
          <CardTitle>Message Delivery Trends (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sent" 
                stackId="1" 
                stroke="hsl(var(--muted-foreground))" 
                fill="hsl(var(--muted))" 
                name="Sent"
              />
              <Area 
                type="monotone" 
                dataKey="delivered" 
                stackId="2" 
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success))" 
                fillOpacity={0.6}
                name="Delivered"
              />
              <Area 
                type="monotone" 
                dataKey="read" 
                stackId="3" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                name="Read"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign Performance */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="sent" fill="hsl(var(--muted))" name="Sent" />
              <Bar dataKey="delivered" fill="hsl(var(--success))" name="Delivered" />
              <Bar dataKey="read" fill="hsl(var(--primary))" name="Read" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Audience Distribution */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Audience Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engagement Trends */}
      <Card className="shadow-[var(--shadow-card)] lg:col-span-2">
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="readRate" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Read Rate (%)"
              />
              <Line 
                type="monotone" 
                dataKey="clickRate" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                name="Click Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}