
const videoDetails = document.getElementById('videoDetails')
const playVideo = () => {


    
    let {id,snippet} = JSON.parse(localStorage.getItem("clickedVideo"));
    let title = snippet.title;
    
    // console.log(data)
    // iframe (maps,audio,video)  for playing videos

    let iframe = document.createElement('iframe');
    
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;

    iframe.width = '100%';

    iframe.height = '100%';
     iframe.setAttribute('allowfullscreen',true)
     iframe.setAttribute('autoplay',true)

      let heading = document.createElement('h1')
      heading.innerText = title;
    videoDetails.append(iframe,heading);
}

const recommend = document.getElementById("recommendations");

const API_KEY = `AIzaSyAAGzP827zdAt6vogfdSEEyyMb0-ZXRGhs`
const popular = async () =>{

    // let container = document.getElementById('container');
    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=5&regionCode=IN&key=${API_KEY}`)

        let data = await res.json();

         

        let Data = data.items;
          console.log(Data)
        displayVideos(Data);
    }
    catch(err){
        console.log(err)
    }
}

popular();

const displayVideos = (data) => {
   recommend.innerHTML=null;
  data.forEach(({ snippet, id}) => {
      // console.log(snippet);


      
      const title = snippet.title;
    
      const thumbnail = snippet.thumbnails.high.url;
      const channelName = snippet.channelTitle;

      console.log(title,thumbnail,channelName);


      const box = document.createElement('div');

      const thumb = document.createElement('div');
      const info = document.createElement('div');


         const img = document.createElement("img");
         img.src = thumbnail;

        const heading = document.createElement('h4');
        heading.innerText = title;

        const channel = document.createElement('h5');
        channel.innerText = channelName;

          thumb.append(img);

        info.append(heading,channel);

        box.append(thumb,info)

        recommend.append(box);

  })    
}


