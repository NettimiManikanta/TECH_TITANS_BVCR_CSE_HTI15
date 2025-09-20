import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, GraduationCap, BookOpen, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Gender Performance Analysis",
      description: "Compare academic performance across gender demographics",
      icon: Users,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      route: "/admin/gender-analysis"
    },
    {
      title: "Parental Education Impact",
      description: "Analyze how parent education levels affect student outcomes",
      icon: GraduationCap,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      route: "/admin/parental-education-analysis"
    },
    {
      title: "Test Preparation Impact",
      description: "Compare students who completed test prep vs those who didn't",
      icon: BookOpen,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      route: "/admin/test-prep-analysis"
    },
    {
      title: "Raw Data Viewer",
      description: "Browse, search and filter the complete student dataset",
      icon: Database,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      route: "/admin/raw-data"
    }
  ];

  const stats = [
    { label: "Total Students", value: "1,000", change: "+12%" },
    { label: "Average Math Score", value: "66.1", change: "+2.3%" },
    { label: "Average Reading Score", value: "69.2", change: "+1.8%" },
    { label: "Average Writing Score", value: "68.1", change: "+2.1%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Student Performance Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive analytics and insights from student performance data
              </p>
            </div>
            <BarChart3 className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analysis Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Analytics Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                  onClick={() => navigate(card.route)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${card.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                          {card.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {card.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Explore Analysis
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Insights */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-foreground">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">Gender Performance</h3>
                <p className="text-sm text-blue-700">
                  Female students show slight advantage in reading and writing scores
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50">
                <h3 className="font-semibold text-green-900 mb-2">Parental Education</h3>
                <p className="text-sm text-green-700">
                  Higher parental education correlates with improved student outcomes
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-yellow-50">
                <h3 className="font-semibold text-yellow-900 mb-2">Test Preparation</h3>
                <p className="text-sm text-yellow-700">
                  Students with test prep show 15% higher average scores
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;