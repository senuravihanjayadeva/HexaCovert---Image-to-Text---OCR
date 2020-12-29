import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "./Progress";

export default function HomeComponent() {
  const [file, setItemImage] = useState(null);
  const [uploadPercentage, setuploadPercentage] = useState(0);
  const [imageURL, setImageURL] = useState(
    "https://lh3.googleusercontent.com/proxy/IpAJOX05QT8xOE-j70p6yWVkzz05ZFK_ACdMNO8stSfpzdxzUzPKuuKgm85mnB-AUOylgEPEkwApAnt97S9v-9bAazvPJBAX78E7y2m-Fw3akEiSzmCX9k6OO3A"
  );

  const [Lines, setLines] = useState([]);
  const [GetText, setGetText] = useState(false);

  function uploadImage(e) {
    e.preventDefault();

    if (file !== null) {
      const uploadTask = storage.ref(`OCRImages/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setuploadPercentage(progress);
        },
        (error) => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          storage
            .ref("OCRImages")
            .child(file.name)
            .getDownloadURL()
            .then((urlFirebase) => {
              console.log(urlFirebase);
              setImageURL(urlFirebase);

              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Ocp-Apim-Subscription-Key":
                    "0d53257411944c778237adc1b6b263c1",
                },
              };
              const newText = {
                url: urlFirebase,
              };
              axios
                .post(
                  "https://eastus.api.cognitive.microsoft.com/vision/v3.0/ocr?language=unk&detectOrientation=true",
                  newText,
                  config
                )
                .then((res) => {
                  //console.log(res.data.regions[0].lines);
                  setLines(res.data.regions[0].lines);
                  setGetText(true);
                })
                .catch((err) => {
                  setGetText(false);
                  alert(err);
                });
            });
        }
      );
    } else {
      alert("First You Must Select An Image");
    }
  }

  return (
    <div>
      <div className="container" style={{ marginTop: "2%" }}>
        <center>
          <img src={imageURL} alt="upload file" style={{ width: "300px" }} />
          <br />
          <br />
          <input
            class="form-control "
            type="file"
            name="Image"
            style={{ padding: "2px" }}
            onChange={(e) => {
              setItemImage(e.target.files[0]);
            }}
          />
          <br />
          <div class="form-group">
            <Progress percentage={uploadPercentage} />
          </div>
          <br />
          <button className="btn btn-primary" onClick={uploadImage}>
            Convert Image
          </button>
        </center>
      </div>
      <div className="container" style={{ marginTop: "2%" }}>
        <div
          className="card"
          style={{
            borderRadius: "20px",
            padding: "20px",
            backgroundColor: "#1578cf",
            color: "white",
          }}
        >
          {" "}
          {GetText ? (
            <p>
              {" "}
              {Lines.map((line) => {
                return (
                  <p>
                    {line.words.map((words) => {
                      return " " + words.text;
                    })}
                  </p>
                );
              })}
            </p>
          ) : (
            <div>
              <p className="text-center">
                Extract text from images (JPG, PNG) and convert into editable
                Text output format
              </p>
              <h6 className="text-center">
                Developed by Senura Vihan Jayadeva
              </h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
