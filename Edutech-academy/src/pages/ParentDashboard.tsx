import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Download,
  Calendar,
  Clock,
  Target,
  BarChart3,
  FileText,
  Star
} from "lucide-react";
import { Layout } from "@/components/ui/Layouts";

const children = [
  {
    id: 1,
    name: "Alex Johnson",
    grade: "10th Grade",
    avatar: "AJ",
    totalCourses: 4,
    completedCourses: 2,
    overallProgress: 75,
    weeklyStudyHours: 12.5,
    achievements: 8
  },
  {
    id: 2,
    name: "Emma Johnson", 
    grade: "8th Grade",
    avatar: "EJ",
    totalCourses: 3,
    completedCourses: 1,
    overallProgress: 65,
    weeklyStudyHours: 8.2,
    achievements: 5
  }
];

const alexProgress = [
  {
    course: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    progress: 85,
    currentGrade: "A-",
    quizAverage: 92,
    attendance: 100,
    lastActivity: "2 hours ago"
  },
  {
    course: "Advanced Mathematics",
    instructor: "Prof. Michael Chen", 
    progress: 70,
    currentGrade: "B+",
    quizAverage: 88,
    attendance: 95,
    lastActivity: "1 day ago"
  },
  {
    course: "Digital Marketing",
    instructor: "Lisa Rodriguez",
    progress: 95,
    currentGrade: "A",
    quizAverage: 96,
    attendance: 100,
    lastActivity: "3 hours ago"
  },
  {
    course: "Creative Writing",
    instructor: "James Wilson",
    progress: 50,
    currentGrade: "B",
    quizAverage: 85,
    attendance: 90,
    lastActivity: "2 days ago"
  }
];

const recentActivities = [
  {
    child: "Alex",
    activity: "Completed Programming Quiz #8",
    score: "95%",
    time: "2 hours ago",
    type: "achievement"
  },
  {
    child: "Emma",
    activity: "Finished Math Lesson 12",
    score: "Progress: 65%",
    time: "4 hours ago",
    type: "progress"
  },
  {
    child: "Alex",
    activity: "Earned 'Code Master' Badge",
    score: "Achievement",
    time: "1 day ago",
    type: "badge"
  },
  {
    child: "Emma",
    activity: "Submitted Science Project",
    score: "A-",
    time: "2 days ago",
    type: "assignment"
  }
];

const upcomingEvents = [
  {
    child: "Alex",
    event: "Programming Final Project Due",
    date: "Dec 15, 2024",
    type: "deadline"
  },
  {
    child: "Emma", 
    event: "Parent-Teacher Conference",
    date: "Dec 18, 2024",
    type: "meeting"
  },
  {
    child: "Alex",
    event: "Mathematics Quiz",
    date: "Dec 20, 2024",
    type: "assessment"
  }
];

export default function ParentDashboard() {
  const selectedChild = children[0]; // Alex by default

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="heading-secondary">Parent Dashboard</h1>
            <p className="text-muted-foreground mt-2">Monitor your children's academic progress and achievements</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="outline">
              <FileText className="mr-2 w-4 h-4" />
              Generate Report
            </Button>
            <Button className="btn-academic">
              <Download className="mr-2 w-4 h-4" />
              Download CSV
            </Button>
          </div>
        </div>

        {/* Children Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child) => (
            <Card key={child.id} className="course-card hover-lift">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {child.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <CardDescription>{child.grade}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-primary">{child.completedCourses}/{child.totalCourses}</div>
                    <div className="text-xs text-muted-foreground">Courses</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-success">{child.achievements}</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{child.overallProgress}%</span>
                  </div>
                  <Progress value={child.overallProgress} className="h-2" />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weekly Study Time:</span>
                  <span className="font-medium">{child.weeklyStudyHours}h</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View */}
        <Tabs defaultValue="alex" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alex">Alex's Progress</TabsTrigger>
            <TabsTrigger value="emma">Emma's Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="alex" className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                  <Star className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.7</div>
                  <p className="text-xs text-muted-foreground">
                    +0.2 from last semester
                  </p>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <Calendar className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96%</div>
                  <p className="text-xs text-muted-foreground">
                    Excellent attendance
                  </p>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5h</div>
                  <p className="text-xs text-muted-foreground">
                    This week
                  </p>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quiz Average</CardTitle>
                  <Target className="h-4 w-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">90%</div>
                  <p className="text-xs text-muted-foreground">
                    Across all subjects
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Course Progress */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Course Progress</h3>
                <div className="space-y-4">
                  {alexProgress.map((course, index) => (
                    <Card key={index} className="dashboard-card">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{course.course}</CardTitle>
                            <CardDescription>{course.instructor}</CardDescription>
                          </div>
                          <Badge variant={course.currentGrade.startsWith('A') ? 'default' : course.currentGrade.startsWith('B') ? 'secondary' : 'outline'}>
                            {course.currentGrade}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="progress-fill h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-primary transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Quiz Avg:</span>
                            <span className="ml-1 font-medium">{course.quizAverage}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Attendance:</span>
                            <span className="ml-1 font-medium">{course.attendance}%</span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Last activity: {course.lastActivity}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Recent Activity */}
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 w-5 h-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivities.filter(activity => activity.child === "Alex").map((activity, index) => (
                      <div key={index} className="border-l-2 border-primary pl-3 py-2">
                        <div className="text-sm font-medium">{activity.activity}</div>
                        <div className="text-xs text-muted-foreground">{activity.score}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 w-5 h-5 text-warning" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingEvents.filter(event => event.child === "Alex").map((event, index) => (
                      <div key={index} className="border-l-2 border-warning pl-3 py-2">
                        <div className="text-sm font-medium">{event.event}</div>
                        <div className="text-xs text-muted-foreground">{event.date}</div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="emma" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-muted-foreground">Emma's detailed progress view would be similar to Alex's with her specific data</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}