import React from 'react'
import { getOrientation } from 'get-orientation/browser'
import { getRotatedImage } from './rotateImage'
import './index.css'
import heic2any from "heic2any";
import { FaUpload } from 'react-icons/fa';




const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6':  0,
  '8': -90,
}



class ImgSize extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageSrc: [],
      crop: { x: 0, y: 0 },
      zoom: 2,
      aspect: 3 / 4,
      croppedAreaPixels: null,
      croppedImage: null,
      isCropping: false,
      correctImg: null,
      file: [],
      heicFile:null,
      heicLoad: false,
    }
  }



  // callback cropped Image......
  callbackCorrectImg = async (e) =>{
    this.props.img(e)
    this.setState({correctImg: e})
    this.close()
  }

  


  onClose = async () => {
    this.setState({
      croppedImage: null,
    })
  }

  rotation = async () => {
    if(this.state.file=== null){
      return
    }
    const file = this.state.file
      let imageDataUrl = await readFile(file)

      // auto rotation.....
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }
      this.setState({
        //imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
      })
    
  }


  isHeic = async file =>{
    await heic2any({
      blob: file,
      toType: "image/jpeg",
      multiple: false,
      quality: 0.2
    })
      .then(res=> {
        this.setState({heicFile:res},()=>this.onHeicFileChange())
      })
    .catch((e) => {
      console.log('catch file')
      console.log(e)
    });
    

    
  }

  onHeicFileChange = async()  => {
    const heicImg = this.state.heicFile
    let imageDataUrl = await readFile(heicImg)

    // auto rotation.....
    const orientation = await getOrientation(heicImg)
    const rotation = ORIENTATION_TO_ANGLE[orientation]
    if (rotation) {
       imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
    }
    this.setState({
      file: heicImg,
      heicLoad:false,
      imageSrc: imageDataUrl,
      crop: { x: 0, y: 0 },
      zoom: 1,
    })
  }

  onFileChange = async e => {
    let fileCollection = [];
    while (fileCollection.length) {
      fileCollection.pop();
    }

    Array.from(e.target.files).map(f => fileCollection.push(f));
    for(const tagetFile of fileCollection){
        if(tagetFile.type==='image/heic'){
          this.setState({heicLoad:true},()=>this.isHeic(file))
          return
        }
        const file = tagetFile
        
        let imageDataUrl = await readFile(file)
  
        // auto rotation.....
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }
        
        this.setState({
          file: this.state.file.concat(file),
          imageSrc: this.state.imageSrc.concat(imageDataUrl),
          crop: { x: 0, y: 0 },
          zoom: 1,
        })
      }

      this.props.img(this.state.imageSrc)
      this.close()

  }



  


  close = ()=>{
      this.setState({imageSrc:[], file:[]})
  }



  

  render() {
    if(this.props.open){
      return (
        <div className="App">
          <div className="ggg">
          <div className="icon_upload"><FaUpload size={30} color={'#363636'}/></div>
            <div className="picPos">
              
              <input id="fileInput" className="hidden" type="file" accept="image/* .heic" onChange={this.onFileChange}/>  
              
              </div>
            </div>
        </div>
       
      )

    }else{
      return null
    }
    
  }
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}


export default ImgSize;