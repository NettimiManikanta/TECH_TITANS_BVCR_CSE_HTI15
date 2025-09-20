import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  BookOpen, 
  Users, 
  BarChart3, 
  Edit, 
  Trash2,
  Eye,
  Upload,
  TrendingUp,
  Star
} from "lucide-react";
import { Layout } from "@/components/ui/Layouts";
import { Link } from "react-router-dom";

const instructorCourses = [
  {
    id: 1,
    title: "Introduction to Programming",
    students: 45,
    avgRating: 4.8,
    completionRate: 78,
    totalLessons: 24,
    status: "Published",
    category: "Computer Science",
    lastUpdated: "2024-12-10"
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    students: 32,
    avgRating: 4.9,
    completionRate: 85,
    totalLessons: 36,
    status: "Published",
    category: "Web Development",
    lastUpdated: "2024-12-08"
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    students: 0,
    avgRating: 0,
    completionRate: 0,
    totalLessons: 18,
    status: "Draft",
    category: "Computer Science",
    lastUpdated: "2024-12-12"
  }
];

const recentActivity = [
  {
    type: "enrollment",
    message: "5 new students enrolled in Web Development Bootcamp",
    time: "2 hours ago"
  },
  {
    type: "completion",
    message: "Sarah completed Introduction to Programming",
    time: "4 hours ago"
  },
  {
    type: "review",
    message: "New 5-star review on Web Development Bootcamp",
    time: "1 day ago"
  },
  {
    type: "quiz",
    message: "Average quiz score improved by 12% this week",
    time: "2 days ago"
  }
];

export default function InstructorDashboard() {
  const totalStudents = instructorCourses.reduce((acc, course) => acc + course.students, 0);
  const publishedCourses = instructorCourses.filter(course => course.status === "Published").length;
  const avgCompletionRate = Math.round(
    instructorCourses
      .filter(course => course.students > 0)
      .reduce((acc, course) => acc + course.completionRate, 0) / 
    instructorCourses.filter(course => course.students > 0).length
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="heading-secondary">Instructor Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your courses and track student progress</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="outline">
              <BarChart3 className="mr-2 w-4 h-4" />
              Analytics
            </Button>
            <Button asChild className="btn-academic">
              <Link to="/instructor/upload">
                <Plus className="mr-2 w-4 h-4" />
                Create Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                +8 new this week
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCourses}</div>
              <p className="text-xs text-muted-foreground">
                {instructorCourses.length - publishedCourses} in draft
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgCompletionRate}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                Based on 127 reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Courses</h2>
              <Button asChild variant="outline" size="sm">
                <Link to="/instructor/courses">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {instructorCourses.map((course) => (
                <Card key={course.id} className="course-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.category} • {course.totalLessons} lessons</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-primary">{course.students}</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-warning">
                          {course.avgRating > 0 ? course.avgRating : "N/A"}
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-success">{course.completionRate}%</div>
                        <div className="text-xs text-muted-foreground">Completion</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        Updated: {course.lastUpdated}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full btn-academic">
                  <Link to="/instructor/upload">
                    <Upload className="mr-2 w-4 h-4" />
                    Upload New Course
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/instructor/students">
                    <Users className="mr-2 w-4 h-4" />
                    View Students
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/instructor/analytics">
                    <BarChart3 className="mr-2 w-4 h-4" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border-l-2 border-primary pl-3 py-2">
                    <div className="text-sm font-medium">{activity.message}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}