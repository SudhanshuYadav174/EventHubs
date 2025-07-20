import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Calendar, TrendingUp, Award } from "lucide-react";

export default function Analytics() {
  // Mock data for user event participation
  const eventParticipation = [
    { month: 'Jan', events: 4, type: 'Tech' },
    { month: 'Feb', events: 6, type: 'Music' },
    { month: 'Mar', events: 3, type: 'Business' },
    { month: 'Apr', events: 8, type: 'Tech' },
    { month: 'May', events: 5, type: 'Sports' },
    { month: 'Jun', events: 7, type: 'Music' },
  ];

  const totalEvents = eventParticipation.reduce((sum, month) => sum + month.events, 0);
  const favoriteCategory = 'Tech Events';
  const avgEventsPerMonth = Math.round(totalEvents / eventParticipation.length);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your event participation and discover your preferences</p>
        </div>
        <BarChart3 size={32} className="text-primary" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Monthly</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{avgEventsPerMonth}</div>
            <p className="text-xs text-muted-foreground">events per month</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Category</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">{favoriteCategory}</div>
            <p className="text-xs text-muted-foreground">Most attended</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Score</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">85</div>
            <p className="text-xs text-muted-foreground">participation rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Event Participation Chart */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle>Monthly Event Participation</CardTitle>
          <CardDescription>Your event attendance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventParticipation.map((month, index) => (
              <div key={month.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  {month.month}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                        style={{ width: `${(month.events / 10) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-sm font-medium">{month.events}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {month.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle>Event Categories</CardTitle>
          <CardDescription>Your participation across different event types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Tech Events', count: 12, percentage: 36, color: 'bg-blue-500' },
              { name: 'Music & Art', count: 8, percentage: 24, color: 'bg-purple-500' },
              { name: 'Business', count: 6, percentage: 18, color: 'bg-green-500' },
              { name: 'Sports', count: 7, percentage: 22, color: 'bg-orange-500' },
            ].map((category) => (
              <div key={category.name} className="text-center space-y-2">
                <div className={`w-16 h-16 rounded-full ${category.color} mx-auto flex items-center justify-center text-white font-bold text-lg`}>
                  {category.count}
                </div>
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}