import FileUploader from "../../components/FileUploader";

// app/upload/page.tsx
export default function UploadPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Upload Your File</h1>
      <FileUploader />
    </div>
  );
}
