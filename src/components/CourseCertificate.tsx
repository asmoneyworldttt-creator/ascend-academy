import { useRef } from "react";
import { X, Download, Share2, Award, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface CourseCertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  onClose: () => void;
}

const CourseCertificate = ({ 
  studentName, 
  courseName, 
  completionDate, 
  certificateId,
  onClose 
}: CourseCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Certificate download would be triggered here. In production, this would generate a PDF.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate of Completion - ${courseName}`,
        text: `I just completed ${courseName} at Skill Honors!`,
        url: `https://skillhonors.com/verify/${certificateId}`,
      });
    } else {
      navigator.clipboard.writeText(`https://skillhonors.com/verify/${certificateId}`);
      alert("Certificate verification link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm overflow-y-auto">
      <div className="my-8">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-card hover:bg-muted transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Certificate */}
        <div 
          ref={certificateRef}
          className="relative bg-gradient-to-br from-[#fef9e7] via-white to-[#f5f5dc] rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl overflow-hidden"
          style={{ aspectRatio: '1.414/1' }}
        >
          {/* Decorative Border */}
          <div className="absolute inset-4 border-2 border-primary/30 rounded-2xl pointer-events-none" />
          <div className="absolute inset-6 border border-primary/20 rounded-xl pointer-events-none" />

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-xl" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-xl" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-xl" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-xl" />

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <Award className="w-full h-full text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="relative text-center">
            {/* Logo */}
            <img src={logo} alt="Skill Honors" className="h-16 md:h-20 mx-auto mb-6" />

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
              Certificate of Completion
            </h1>
            <div className="w-32 h-1 bg-gradient-gold mx-auto rounded-full mb-8" />

            {/* Description */}
            <p className="text-muted-foreground mb-4">This is to certify that</p>

            {/* Student Name */}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4" 
                style={{ fontFamily: 'serif' }}>
              {studentName}
            </h2>

            {/* Course Info */}
            <p className="text-muted-foreground mb-2">has successfully completed the course</p>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8">
              {courseName}
            </h3>

            {/* Date & ID */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{completionDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>ID: {certificateId}</span>
              </div>
            </div>

            {/* Signature Area */}
            <div className="flex justify-center gap-16">
              <div className="text-center">
                <div className="w-32 border-b-2 border-primary/40 mb-2" />
                <p className="text-xs text-muted-foreground">Director</p>
              </div>
              <div className="text-center">
                <div className="w-32 border-b-2 border-primary/40 mb-2" />
                <p className="text-xs text-muted-foreground">Course Instructor</p>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute bottom-8 right-12 w-24 h-24">
              <div className="w-full h-full rounded-full bg-gradient-gold flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <Award className="w-8 h-8 text-primary-foreground mx-auto" />
                  <p className="text-xs font-bold text-primary-foreground mt-1">VERIFIED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share Certificate
          </Button>
          <Button variant="hero" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCertificate;
