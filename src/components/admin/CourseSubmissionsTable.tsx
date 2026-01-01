import { useState } from "react";
import {
  Check,
  X,
  Search,
  Filter,
  ChevronDown,
  Download,
  Calendar,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseSubmission {
  id: string;
  user_id: string;
  username: string;
  email: string;
  course_link: string;
  course_description: string;
  contact_number: string;
  whatsapp_number: string;
  status: string | null;
  price: number | null;
  created_at: string;
}

interface CourseSubmissionsTableProps {
  courses: CourseSubmission[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onApproveCourse: (courseId: string, price: number) => void;
  onRejectCourse: (courseId: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export const CourseSubmissionsTable = ({
  courses,
  searchTerm,
  onSearchChange,
  onApproveCourse,
  onRejectCourse,
  statusFilter,
  onStatusFilterChange,
}: CourseSubmissionsTableProps) => {
  const [priceInputs, setPriceInputs] = useState<Record<string, string>>({});

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.course_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            Pending Review
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-emerald/10 text-emerald border-emerald/20">
            Published
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handlePriceChange = (courseId: string, value: string) => {
    setPriceInputs((prev) => ({ ...prev, [courseId]: value }));
  };

  const handleApprove = (courseId: string) => {
    const price = parseFloat(priceInputs[courseId] || "0");
    if (price > 0) {
      onApproveCourse(courseId, price);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by username, email, or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onStatusFilterChange("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusFilterChange("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusFilterChange("approved")}>
                Published
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusFilterChange("rejected")}>
                Rejected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4">
        {filteredCourses.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="font-medium">No course submissions found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "Try a different search term" : "No courses waiting for review"}
            </p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="glass-card rounded-2xl p-5 hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Course Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-lg">{course.username}</p>
                        {getStatusBadge(course.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{course.email}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(course.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed">{course.course_description}</p>

                  <a
                    href={course.course_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Course Link
                  </a>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
                    <span>📞 {course.contact_number}</span>
                    <span>💬 {course.whatsapp_number}</span>
                  </div>
                </div>

                {/* Actions */}
                {course.status === "pending" && (
                  <div className="flex flex-col gap-3 lg:w-48">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Set Price (₹)
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        value={priceInputs[course.id] || ""}
                        onChange={(e) => handlePriceChange(course.id, e.target.value)}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRejectCourse(course.id)}
                    >
                      <X className="w-4 h-4 mr-1" /> Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-emerald hover:bg-emerald/90"
                      onClick={() => handleApprove(course.id)}
                      disabled={!priceInputs[course.id] || parseFloat(priceInputs[course.id]) <= 0}
                    >
                      <Check className="w-4 h-4 mr-1" /> Publish Course
                    </Button>
                  </div>
                )}

                {course.status === "approved" && course.price && (
                  <div className="lg:w-48 flex flex-col justify-center">
                    <p className="text-sm text-muted-foreground">Published Price</p>
                    <p className="text-2xl font-bold text-emerald">
                      ₹{course.price.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseSubmissionsTable;
