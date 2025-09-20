import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, FileText, Trophy, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  // Mock data - in real app this would come from Supabase
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Mathematics",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      nextLesson: "Algebra Basics",
      instructor: "Dr. Smith",
    },
    {
      id: 2,
      title: "English Literature",
      progress: 45,
      totalLessons: 15,
      completedLessons: 7,
      nextLesson: "Shakespeare's Hamlet",
      instructor: "Prof. Johnson",
    },
    {
      id: 3,
      title: "Science Fundamentals",
      progress: 90,
      totalLessons: 10,
      completedLessons: 9,
      nextLesson: "Final Assessment",
      instructor: "Dr. Brown",
    },
  ];

  const recentQuizzes = [
    { subject: "Mathematics", score: 85, date: "2024-01-15", status: "completed" },
    { subject: "English", score: 92, date: "2024-01-14", status: "completed" },
    { subject: "Science", score: 78, date: "2024-01-13", status: "completed" },
  ];

  const achievements = [
    { title: "Mathematics Master", icon: "🏆", earned: true },
    { title: "Quiz Champion", icon: "🎯", earned: true },
    { title: "Perfect Attendance", icon: "📅", earned: false },
    { title: "Course Completer", icon: "🎓", earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Alex!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/profile">Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Across all quizzes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Studied</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>My Courses</span>
                </CardTitle>
                <CardDescription>Continue your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                      </div>
                      <Badge variant="secondary">{course.progress}% Complete</Badge>
                    </div>
                    
                    <Progress value={course.progress} className="mb-3" />
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                      <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                      <span>Next: {course.nextLesson}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Continue Learning
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Take Quiz
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Quiz Results */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quiz Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentQuizzes.map((quiz, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{quiz.subject}</p>
                      <p className="text-sm text-muted-foreground">{quiz.date}</p>
                    </div>
                    <Badge variant={quiz.score >= 80 ? "default" : "secondary"}>
                      {quiz.score}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg border ${
                        achievement.earned
                          ? "bg-primary/10 border-primary/20"
                          : "bg-muted/50 border-muted opacity-50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <p className="text-xs font-medium">{achievement.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;