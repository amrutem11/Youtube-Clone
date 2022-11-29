
const API_KEY = `AIzaSyAAGzP827zdAt6vogfdSEEyyMb0-ZXRGhs`
const popular = async () =>{

    // let container = document.getElementById('container');
    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`)

        let data = await res.json();

         

        let Data = data.items;
        //  console.log(data)
        displayVideos(Data);
    }
    catch(err){
        console.log(err)
    }
}

popular();

const searchVideos = async () => {

    try{
        const query = document.getElementById('query').value;

        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`)
        const data = await res.json();
        //  console.log(data)

        const actualData = data.items;
        //  console.log(actualData)
        displayVideos(actualData);
    } 
    catch (error){
        console.log(error);
    }

   
    

};
let container = document.getElementById('container');
const displayVideos = (data) => {
    container.innerHTML=null;
    data.forEach(({ snippet, id}) => {
        // console.log(ele);
       
        const title = snippet.title;
         const videoId = id.viedoId;
         const thumbnail = snippet.thumbnails.high.url;
         const channelName = snippet.channelTitle

        // console.log(thumbnail)

        const box = document.createElement('div');

        const img = document.createElement("img");
        img.src = thumbnail;

        const heading = document.createElement('h4');
        heading.innerText = title;

        const channel = document.createElement('h5');
        channel.innerText = channelName;

        let data = {
            id,
            snippet,
        };
        // console.log(data)


        // let data = {
        //     videoId:videoId,
        //     snippet:snippet,
        // };


        box.onclick = () => {
            // console.log('in');

            storeClickedVideo(data);
        }

        box.append(img,heading,channel);

        container.append(box);


    });

};

function storeClickedVideo(data) {
    localStorage.setItem('clickedVideo',JSON.stringify(data));

    window.location.href = 'video.html';
}

