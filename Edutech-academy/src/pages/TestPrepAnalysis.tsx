import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const TestPrepAnalysis = () => {
  const navigate = useNavigate();

  // Mock data for test prep analysis
  const prepComparisonData = [
    {
      subject: "Math",
      withPrep: 69.7,
      withoutPrep: 64.1,
      improvement: 5.6
    },
    {
      subject: "Reading",
      withPrep: 73.9,
      withoutPrep: 66.8,
      improvement: 7.1
    },
    {
      subject: "Writing",
      withPrep: 74.4,
      withoutPrep: 64.5,
      improvement: 9.9
    }
  ];

  const distributionData = [
    { name: "Completed Test Prep", value: 358, color: "hsl(var(--chart-1))" },
    { name: "No Test Prep", value: 642, color: "hsl(var(--chart-2))" }
  ];

  const chartConfig = {
    withPrep: {
      label: "With Test Prep",
      color: "hsl(var(--chart-1))",
    },
    withoutPrep: {
      label: "Without Test Prep",
      color: "hsl(var(--chart-2))",
    },
  };

  const summaryStats = [
    { label: "Students with Test Prep", value: "358", percentage: "35.8%" },
    { label: "Average Improvement", value: "+7.5 points", trend: "↑" },
    { label: "Largest Improvement", value: "Writing +9.9", subject: "points" },
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
                  Test Preparation Impact Analysis
                </h1>
                <p className="text-muted-foreground text-lg">
                  Compare students who completed test prep vs those who didn't
                </p>
              </div>
            </div>
            <BookOpen className="h-12 w-12 text-primary" />
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
                {stat.percentage && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.percentage}
                  </p>
                )}
                {stat.subject && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.subject}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Comparison Chart */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-foreground">
              Performance Comparison: With vs Without Test Prep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[60, 80]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="withPrep" fill="var(--color-withPrep)" />
                  <Bar dataKey="withoutPrep" fill="var(--color-withoutPrep)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Student Distribution */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Test Prep Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Improvement Breakdown */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Score Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {prepComparisonData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.subject}</span>
                      <span className="text-lg font-bold text-green-600">
                        +{item.improvement}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(item.improvement / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Without: {item.withoutPrep}</span>
                      <span>With: {item.withPrep}</span>
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
              <CardTitle className="text-foreground">Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50">
                  <h4 className="font-semibold text-green-900 mb-2">Significant Impact</h4>
                  <p className="text-sm text-green-700">
                    Test preparation shows consistent positive impact across all subjects, with writing showing the largest improvement
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50">
                  <h4 className="font-semibold text-yellow-900 mb-2">Participation Rate</h4>
                  <p className="text-sm text-yellow-700">
                    Only 35.8% of students completed test prep, suggesting opportunity for increased participation
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
                    Increase test prep program capacity to serve more students
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Focus additional writing support in test prep curriculum
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Target outreach to encourage more student participation
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Analyze barriers preventing students from accessing test prep
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

export default TestPrepAnalysis;