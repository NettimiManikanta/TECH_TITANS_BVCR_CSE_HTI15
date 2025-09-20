import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

const ParentalEducationAnalysis = () => {
  const navigate = useNavigate();

  // Mock data for parental education analysis
  const educationData = [
    {
      level: "Some High School",
      math: 58.2,
      reading: 60.1,
      writing: 59.4,
      count: 196
    },
    {
      level: "High School",
      math: 62.1,
      reading: 65.8,
      writing: 64.2,
      count: 238
    },
    {
      level: "Some College", 
      math: 67.8,
      reading: 70.4,
      writing: 69.1,
      count: 226
    },
    {
      level: "Associate's Degree",
      math: 70.2,
      reading: 73.1,
      writing: 71.9,
      count: 222
    },
    {
      level: "Bachelor's Degree",
      math: 73.5,
      reading: 76.2,
      writing: 74.8,
      count: 118
    }
  ];

  const chartConfig = {
    math: {
      label: "Math Score",
      color: "hsl(var(--chart-1))",
    },
    reading: {
      label: "Reading Score",
      color: "hsl(var(--chart-2))",
    },
    writing: {
      label: "Writing Score", 
      color: "hsl(var(--chart-3))",
    },
  };

  const summaryStats = [
    { label: "Highest Impact Factor", value: "Bachelor's Degree", change: "+15.3 pts avg" },
    { label: "Largest Student Group", value: "High School", count: "238 students" },
    { label: "Performance Gap", value: "15.3 points", trend: "↑" },
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
                  Parental Education Impact Analysis
                </h1>
                <p className="text-muted-foreground text-lg">
                  Analyze how parent education levels affect student outcomes
                </p>
              </div>
            </div>
            <GraduationCap className="h-12 w-12 text-primary" />
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
                  {stat.value}
                </p>
                {stat.change && (
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change}
                  </p>
                )}
                {stat.count && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.count}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Chart */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-foreground">
              Academic Performance by Parental Education Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={educationData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="level" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis domain={[50, 80]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="math" fill="var(--color-math)" />
                  <Bar dataKey="reading" fill="var(--color-reading)" />
                  <Bar dataKey="writing" fill="var(--color-writing)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Trend Analysis */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={educationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" hide />
                    <YAxis domain={[55, 80]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="math" stroke="var(--color-math)" strokeWidth={3} />
                    <Line type="monotone" dataKey="reading" stroke="var(--color-reading)" strokeWidth={3} />
                    <Line type="monotone" dataKey="writing" stroke="var(--color-writing)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Distribution */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Student Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {educationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.level}</span>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="h-2 bg-primary rounded"
                        style={{ width: `${(item.count / 238) * 100}px` }}
                      ></div>
                      <span className="text-sm text-muted-foreground">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50">
                  <h4 className="font-semibold text-green-900 mb-2">Strong Correlation</h4>
                  <p className="text-sm text-green-700">
                    Clear positive correlation between parental education and student performance across all subjects
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-blue-900 mb-2">Consistent Growth</h4>
                  <p className="text-sm text-blue-700">
                    Each education level shows consistent 4-6 point improvement in average scores
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
                    Provide additional support for students from lower education backgrounds
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Implement parent education programs to support home learning environment
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Create mentorship programs pairing students across education backgrounds
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

export default ParentalEducationAnalysis;