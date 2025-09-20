import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Database, Search, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RawDataViewer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [educationFilter, setEducationFilter] = useState("all");
  const [testPrepFilter, setTestPrepFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock student data - in real app this would come from Supabase
  const mockStudents = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    gender: Math.random() > 0.5 ? "female" : "male",
    parentalEducation: ["some high school", "high school", "some college", "associate's degree", "bachelor's degree"][Math.floor(Math.random() * 5)],
    testPrep: Math.random() > 0.6 ? "completed" : "none",
    mathScore: Math.floor(Math.random() * 40) + 40,
    readingScore: Math.floor(Math.random() * 40) + 40,
    writingScore: Math.floor(Math.random() * 40) + 40,
  }));

  // Filter data based on current filters
  const filteredData = mockStudents.filter(student => {
    const matchesSearch = student.id.toString().includes(searchTerm) ||
                         student.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parentalEducation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = genderFilter === "all" || student.gender === genderFilter;
    const matchesEducation = educationFilter === "all" || student.parentalEducation === educationFilter;
    const matchesTestPrep = testPrepFilter === "all" || student.testPrep === testPrepFilter;

    return matchesSearch && matchesGender && matchesEducation && matchesTestPrep;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-blue-100 text-blue-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const exportData = () => {
    // In real app, this would generate and download CSV/PDF
    const csv = [
      "ID,Gender,Parental Education,Test Prep,Math Score,Reading Score,Writing Score",
      ...filteredData.map(student => 
        `${student.id},${student.gender},${student.parentalEducation},${student.testPrep},${student.mathScore},${student.readingScore},${student.writingScore}`
      )
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "student_performance_data.csv";
    link.click();
  };

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
                  Raw Data Viewer
                </h1>
                <p className="text-muted-foreground text-lg">
                  Browse, search and filter the complete student dataset
                </p>
              </div>
            </div>
            <Database className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters and Search */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <Select value={educationFilter} onValueChange={setEducationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Parent Education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Education Levels</SelectItem>
                  <SelectItem value="some high school">Some High School</SelectItem>
                  <SelectItem value="high school">High School</SelectItem>
                  <SelectItem value="some college">Some College</SelectItem>
                  <SelectItem value="associate's degree">Associate's Degree</SelectItem>
                  <SelectItem value="bachelor's degree">Bachelor's Degree</SelectItem>
                </SelectContent>
              </Select>

              <Select value={testPrepFilter} onValueChange={setTestPrepFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Test Prep" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="completed">Completed Prep</SelectItem>
                  <SelectItem value="none">No Prep</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={exportData} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {paginatedData.length} of {filteredData.length} students
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="border-2">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Parental Education</TableHead>
                    <TableHead>Test Prep</TableHead>
                    <TableHead className="text-center">Math</TableHead>
                    <TableHead className="text-center">Reading</TableHead>
                    <TableHead className="text-center">Writing</TableHead>
                    <TableHead className="text-center">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((student) => {
                    const average = Math.round((student.mathScore + student.readingScore + student.writingScore) / 3);
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {student.gender}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{student.parentalEducation}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={student.testPrep === "completed" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {student.testPrep}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreBadgeColor(student.mathScore)}>
                            {student.mathScore}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreBadgeColor(student.readingScore)}>
                            {student.readingScore}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreBadgeColor(student.writingScore)}>
                            {student.writingScore}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreBadgeColor(average)}>
                            {average}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-6 border-t">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RawDataViewer;