import React from 'react';
import './index.css'
import Topbar from './topbar/index.js'
import {MdCancel,MdInfoOutline} from 'react-icons/md' 
import ImgHandle from './helpers/imgClass';
import api from './api'
import MultiImageUpload from './helpers/imgClassMulti'
import CircleLoader from "react-spinners/CircleLoader";
import { saveAs } from 'file-saver';





function ListItem(props) {
  return (<div className= "listItem">{props.value}</div>)
}



export class Picto extends React.Component{
  constructor(props){
      super(props);
      this.state={      
        openUploader: true,
        img: null,
        imgUrl: null,
        multiImg: [],
        multiImgUrl: [],
        responseImg: null,
        loader: false,
        mobile: false,
         
      }
  }
  componentDidMount(){
    window.addEventListener("resize", this.updateWindowDimensions());
  }


  updateWindowDimensions() {
    const mobil = window.innerWidth<=500
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
    this.setState({ mobile: mobil},()=>console.log('mobil  ',mobil));
}













  croppedImg = async (e)=>{ 
    const picName = this.state.userName
    let file = await fetch(e)
    .then(r => r.blob())
    .then(blobFile => new File([blobFile], picName, {type: "image/jpeg", name: 'file' }))
    console.log('los gehts......',e)

    this.setState({
        img:file,
        imgUrl:e,
    })
  }

  no_croppedMultiImg = async (srcArray)=>{ 
    for ( const e of srcArray){
      const picName = this.state.userName
    let file = await fetch(e)
    .then(r => r.blob())
    .then(blobFile => new File([blobFile], picName, {type: "image/jpeg", name: 'file' }))
   

    this.setState({
        multiImg:this.state.multiImg.concat(file),
        multiImgUrl:this.state.multiImgUrl.concat(e),
    })
  }
    }
    













  sendFile = async()=> {
    const formData = new FormData()
    const mainPic = this.state.img
    const multiPic = this.state.multiImg
    
    multiPic.forEach(async(img,index)=>{
      const label = 'multipic'+String(index)
      formData.append(label, img)
      formData.append('multi_count', index)
    })
    formData.append('mainpic', mainPic)
    this.setState({loader: true})
    await api.insertForm(formData).then(res=>{
      console.log('upload..........')
      console.log(res.data)
      const img = res.data.img
      this.setState({responseImg: img, loader:false})
      
    })

  }

  // multipics show
  //
  multiImagCubes = ()=>{
    const urlArray = this.state.multiImgUrl
    const imgList = []
    urlArray.forEach((e, index) => {
      if(index <= 60){
        imgList.push(
          <div className='image_cube_div'>
            <img className='image_cube' src={e} alt={'...'}></img>
            <button className='btn_cancel' onClick={()=>this.removeMultiPic(index)}><MdCancel size={20}/></button>
          </div>
        )
      }
      
    });
    const listItems = imgList.map((item) =>
        <ListItem value={item} key={imgList.indexOf(item) } />);

    return listItems;
  }

  removeMultiPic = (index)=>{
    const urlArray = this.state.multiImgUrl
    const imgArray = this.state.multiImg
    urlArray.splice(index, 1)
    imgArray.splice(index, 1)
    this.setState({multiImgUrl: urlArray, multiImg:imgArray})
  }


  mainFrameLeft = ()=>{
    if(this.state.img){
      return(
        <div className={!this.state.mobile?'left_side_picto':'top_side_picto'}>
        <div className='bez_window'></div>
          <div className={!this.state.mobile?'btn_1':'btn_1_mobile'}>
            <img className='image_1' src={this.state.imgUrl} alt={'...'}></img>
           {!this.state.mobile?  null: this.makePhoto_mobile()}
            <button className='btn_cancel' onClick={()=>{this.setState({img: null, imgUrl:null})}}><MdCancel size={20}/></button>
        </div>
        </div>
      )
    }else{
      return(
        <div className={!this.state.mobile?'left_side_picto':'top_side_picto'}>
        <button className='btn_info'>
          <MdInfoOutline size={30}/>
        </button> 
        <div className='bez_window'>Vollbid auswahl:</div>
        <button className={!this.state.mobile?'btn_1':'btn_1_mobile'}>
          <ImgHandle img={this.croppedImg} open={this.state.openUploader}/>
        </button>
        </div>
      )
    }
  }

  mainFrameRight = ()=>{
    if(this.state.multiImgUrl.length>0){
      return(
        <div className={!this.state.mobile?'right_side_picto':'bottom_side_picto'}>
          <div className='bez_window'>
            <MultiImageUpload img={this.no_croppedMultiImg} open={this.state.openUploader}/>
          </div>
          <div className={!this.state.mobile?'btn_2':'btn_2_mobile'}>
            {this.multiImagCubes()}
          </div>
        </div>
      )
    }else{
      return(
        <div className={!this.state.mobile?'right_side_picto':'bottom_side_picto'}>
        <button className='btn_info'>
          <MdInfoOutline size={30}/>
        </button> 
        <div className='bez_window'>Mosaiken auswahl:</div>
        <button className={!this.state.mobile?'btn_1':'btn_1_mobile'}>
          <MultiImageUpload img={this.no_croppedMultiImg} open={this.state.openUploader}/>
        </button>
        </div>
      )
    }
  }

  makePhoto_mobile = ()=>{
    const single_img = this.state.imgUrl
    const mulit_img = this.state.multiImgUrl
    if(single_img && mulit_img.length>0){
      return(
            <button className='sendBtn_mobile' onClick={()=>this.sendFile()}><span className='sendBtn_span'>create</span></button>
          
      )
    }else{
      return(
        null
      )
    }
  }

  makePhoto = ()=>{
    const single_img = this.state.imgUrl
    const mulit_img = this.state.multiImgUrl
    if(single_img && mulit_img.length!==0){
      return(
        <div className='middle_place'>
          <div className='sendBtn_div'>
            <button className='sendBtn' onClick={()=>this.sendFile()}><span className='sendBtn_span'>create</span></button>
          </div>
        </div>
      )
    }else{
      return(
        <div className='middle_place'>
          <div className='sendBtn_div'>
          </div>
        </div>
      )
    }
  }

  downloadFile = ()=>{
    const url = this.state.responseImg
    saveAs(url, 'photomosaik.jpg')
  }

  mainView = ()=>{
    if(this.state.responseImg){
      return(
        <div className='picto_1'>
          <div className='picto_2'>
            <button className='btn_finish' onClick={()=>this.downloadFile()}>
              <img className='image_finish' src={this.state.responseImg} alt={'...'}></img>
            </button>
          </div>
        </div>
      )
    }else{
      return(
        <div className={!this.state.mobile?'picto_1':'picto_1_mobile'}>
            {this.mainFrameLeft()}
            {!this.state.mobile?this.makePhoto():null}
            {this.mainFrameRight()}
          </div>
      )
    }
  }



  loaderScreen = ()=>{
    return(
      <div className='loaderScreen'>
        <CircleLoader color='#333333' loading={true} css='' size={150} />
      </div>
    )
  }



  render(){
    return(
      <div>
        <div className='main'>
          <Topbar/>
          {!this.state.loader ? this.mainView() : this.loaderScreen() }
          
        </div>
      </div>
    ); 
  }
}

export default Picto;
