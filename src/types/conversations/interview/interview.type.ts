export interface PresignedUrlResponse {
  url: string;
}
export interface UploadedFile {
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}
export interface InterviewFormData {
  companyName: string;
  jobTitle: string;
  jobPosting: string;
  files: File[];
}



export const INTERVIEW_STYLES = [
  { value: "friendly", label: "Friendly" },
  { value: "standard", label: "Standard" },
  { value: "strict", label: "Strict" },
] as const;

export type InterviewStyle = (typeof INTERVIEW_STYLES)[number]["value"];
