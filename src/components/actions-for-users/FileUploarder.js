import { useState } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Form, ProgressBar } from "react-bootstrap";

function FileUploader({ setFileUrl, fileInProgress, setFileInProgress }) {
  const [progress, setProgress] = useState(undefined);

  const startUploading = (file) => {
    const name = new Date().getTime() + file.name;
    const imageRef = ref(storage, `images/${name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    setProgress(undefined);
    setFileInProgress(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = parseInt(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(p);
        console.log(`${p}% uploaded`);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        setFileInProgress(false);
      },
      async () => {
        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setFileUrl(fileUrl);
        setFileInProgress(false);
      }
    );
  };

  return (
    <div>
      <Form.Control
        disabled={fileInProgress}
        type="file"
        required
        onChange={(event) => {
          startUploading(event.target.files[0]);
        }}
      />
      {progress != null && <ProgressBar now={progress} />}
    </div>
  );
}

export default FileUploader;
