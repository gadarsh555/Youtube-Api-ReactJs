import React,{ Component } from 'react';

const API = 'AIzaSyBM1i4Pof0d_pRR3MxjDYkV9ioub7DlXvs';
//YOURKEYWORDYOURAPIKEY

class Youtube extends Component {

    constructor(props){
    super(props);
    this.state = {
        channelId:"",
        videoId:"",
        keyword:"",
        videos:[],
        count:10
    };
    this.search = this.search.bind(this);
    this.count = this.count.bind(this);
    }
    
    componentWillMount(){    
        this.update();
    }

    componentWillUpdate(){
        this.update();
    }

    search(event){
        event.preventDefault();
       var item = event.target.search.value;
       this.setState({keyword:item});//after setstate
    }
    
    count(event){ 
        event.preventDefault();
        this.setState({count:event.target.value});
    }

    update(){
        var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='+this.state.count+'&q='+this.state.keyword+'&type=video&key='+API;
        fetch(url)
        .then(response =>  response.json())
        .then(resData => {
           console.log("got the data:",resData);
           var videos = resData.items.map(item => 'https://www.youtube.com/embed/'+item.id.videoId);
           this.setState({ videos:videos },()=>{
               console.log("got the videos:",this.state.videos);
           }); 
        });
    }
render(){
  var video ="";
   if(this.state.videos){
       var video =  this.state.videos.map((link,i) =>{
            var item =  <div>{/* <button style={{backgroundColor:"red",height:"30px",width:"230px",color:"white",fontSize:"15px",fontWeight:"700"}}>View Videos of This Channel</button> */}<div key={i} className="youtube">
                <iframe width="560" height="315" src={link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div></div>;
            return item;
        }) 
   }

return(
<div>
<form onSubmit={this.search}>
<label style={{fontSize:"large"}}>Search Video : </label>
<input style={{width:"450px",height:"35px",marginRight:"25px",border:"2px solid indigo",padding:"5px",fontWeight:"500",fontSize:"large"}} type="search" name="search" />
<label style={{fontSize:"large"}}>Count of Videos :  </label>
<input type="number" name="count" value={this.state.count} onChange={this.count} style={{width:"60px",height:"23px",marginRight:"25px",border:"2px solid indigo",padding:"5px",fontWeight:"500",fontSize:"large"}} />
<button className="youtube-btn" >Get Videos</button>
</form>
<br />
{/* {
           this.state.videos.map((link,i) =>{
           var video = <div key={i} className="youtube"><iframe width="560" height="315" src={link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>;
            return video;
        })
}
{this.video} */}
{video}
<br />
</div>
);
}
}

export default Youtube;