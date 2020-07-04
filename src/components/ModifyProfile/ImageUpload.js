/* import React, {Component} from 'react';
import Firebase from '../Firebase';

const ImageUpload = () => {
    const allInputs = {imgUrl: ''};
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allImputs);

    const handleImageAsFile = (event) => {
        const image = event.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleFirebaseUpload = event => {
        event.preventDefault();
        const uploadTask = Firebase.storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile))
        uploadTask.on('state_changed',
        () => {
            Firebase.storage.ref('images').child(imageAsFile.name).getDownloadURL()
            .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: firebaseUrl}))
       })
        })
      
      }
  
    return (
        <div>
            <form onSubmit={handleFirebaseUpload}>
                <input
                    type="file"
                    onChange= {handleImageAsFile}
                />
                <button>Upload</button>
            </form>
            <img src={imageAsUrl.imgUrl} alt="image tag" />
        </div>
    );
}

// I followed this tutorial https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj to create the image upload function
// I followed this tutorial https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo to create the image upload function

class ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null,
        url: "",
        progress: 0
      };
    }
  
    handleChange = event => {
      if (event.target.files[0]) {
        const image = event.target.files[0];
        this.setState(() => ({ image }));
      }
    };
  
    handleUpload = () => {
      const { image } = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url });
            });
        }
      );
    };
    render() {
      return (
        <div className="center">
            <br/>
            <h2 className="green-text">React Firebase Image Uploader</h2>
            <br/>
            <br/>
          <div className="row">
            <progress value={this.state.progress} max="100" className="progress" />
          </div>
          <br />
          <br />
          <br />
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" onChange={this.handleChange} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            onClick={this.handleUpload}
            className="waves-effect waves-light btn"
          >
            Upload
          </button>
          <br />
          <br />
          <img
            src={this.state.url || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
            height="300"
            width="400"
          />
        </div>
      );
    }
  }
  
  export default ImageUpload; */