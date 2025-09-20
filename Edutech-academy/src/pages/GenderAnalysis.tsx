import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const GenderAnalysis = () => {
  const navigate = useNavigate();

  // Mock data for gender analysis
  const genderData = [
    {
      subject: "Math",
      male: 68.7,
      female: 63.6,
    },
    {
      subject: "Reading", 
      male: 65.5,
      female: 72.6,
    },
    {
      subject: "Writing",
      male: 63.3,
      female: 72.4,
    },
  ];

  const chartConfig = {
    male: {
      label: "Male Students",
      color: "hsl(var(--chart-1))",
    },
    female: {
      label: "Female Students", 
      color: "hsl(var(--chart-2))",
    },
  };

  const summaryStats = [
    { label: "Male Students", count: "518", percentage: "51.8%" },
    { label: "Female Students", count: "482", percentage: "48.2%" },
    { label: "Average Performance Gap", value: "4.2 points", trend: "↓" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Gender Performance Analysis
                </h1>
                <p className="text-muted-foreground text-lg">
                  Compare academic performance across gender demographics
                </p>
              </div>
            </div>
            <Users className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6 text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {stat.label}
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  {stat.count || stat.value}
                </p>
                {stat.percentage && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.percentage}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Chart */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <span>Performance by Gender and Subject</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[50, 80]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="male" fill="var(--color-male)" />
                  <Bar dataKey="female" fill="var(--color-female)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-blue-900 mb-2">Math Performance</h4>
                  <p className="text-sm text-blue-700">
                    Male students score 5.1 points higher on average in mathematics
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-pink-50">
                  <h4 className="font-semibold text-pink-900 mb-2">Language Arts</h4>
                  <p className="text-sm text-pink-700">
                    Female students excel in reading (+7.1) and writing (+9.1) scores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Implement targeted math support programs for female students
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Develop writing workshops to support male student literacy
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Create cross-gender study groups to leverage complementary strengths
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GenderAnalysis;