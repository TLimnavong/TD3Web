// clé api 77c9133483df2cf7a1eb322d38433453
var idInit='51497';
//url for my first movie
var listmovie=['fast five'];

//First Part 1/2/3/4 the movie part 
function GetMovieInfo(id){
movieulr= 'https://api.themoviedb.org/3/movie/'+id+'?api_key=77c9133483df2cf7a1eb322d38433453'
fetch(movieulr)
.then(function(msg){
    return msg.json();
})

.then((msg)=>{
    
    Movie(msg)
    
})
}


function Movie(msg)
{
    
    
    var div1 = document.createElement("div");
    var div2= document.createElement("div");
    var image=document.createElement("img");
    var title=document.createElement("h2");
    var question=document.createElement("h4");
    var date=document.createElement("h3");
    div1.className="container"
    div2.className="container"

    var questiontext = document.createTextNode("Give me an actor");
    question.appendChild(questiontext)
    var nametitle = document.createTextNode(msg.original_title);
    title.appendChild(nametitle)
    div1.appendChild(title)
    var releasedate = document.createTextNode(msg.release_date)
    date.appendChild(releasedate)
    div1.appendChild(date)
    let GetPoster= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${msg.poster_path}`
    image.src=GetPoster
    image.style.width="20%"
    div1.appendChild(image);
    div1.appendChild(question)
    
    var button= document.createElement("button");
    var buttontext = document.createTextNode("submit");
    button.appendChild(buttontext)
    var input=document.createElement("input");
    input.id="answeractor"
    div2.appendChild(button)
    div2.appendChild(input)
    div2.style.paddingBottom="30px";
    document.body.appendChild(div1)
    document.body.appendChild(div2)
    console.log(msg.id)
    button.onclick=function(){SubmitActorDirector(msg.id)}
    
}

//Submit button that will verify if the actor or the director exist and will call the creation of the next div
function SubmitActorDirector(idmovie)
{
    var actor_director=document.getElementById("answeractor").value
    alert(actor_director)

    apiActor= 'https://api.themoviedb.org/3/movie/'+idmovie+'/credits?api_key=77c9133483df2cf7a1eb322d38433453&language=en-US'
fetch(apiActor)
.then(function(msg){
    return msg.json();
})

.then((msg)=>
{
    console.log(msg)
    console.log(msg.cast.length)
    for( var i=0; i< msg.cast.length;i++)
    {
        console.log(msg.cast[i].name.toLowerCase())
        if (msg.cast[i].name.toLowerCase()==actor_director.toLowerCase())
        {
            console.log(actor_director)
            console.log(msg.cast[i].name)
            console.log('true')
            console.log(i)
            break
        }
        
        
    }
    // Si on a fini la boucle des acteurs nous recherchons 
    if (i==msg.cast.length)
    {
        for( var j=0; j< msg.crew.length;j++)
        {
        if (msg.crew[j].name.toLowerCase()==actor_director.toLowerCase()&& msg.crew[j].job=="Director" )
            {
                console.log(actor_director)
                console.log(msg.crew[i].name)
            
                console.log('true')
                console.log(i)
                break
            }
        }
        if(j==msg.crew.length)
                {
                    console.log("pas trouvé")
                    var input=document.getElementById('answeractor')
                    input.value=''
                    input.placeholder="wrong"
                    
                }
        else{
        console.log('directeur trouvé')
        document.getElementById("answeractor").id = "oldactor"
        GetActorDirectorInfo(msg.crew[j].id)
        }
        }
        else   
        {
            console.log("trouvé")
            
            GetActorDirectorInfo(msg.cast[i].id)
            document.getElementById("answeractor").id = "oldactor"
        
        }   
    
})

// Get the data of the actor or the director (image+name)
//Get info Actor
function GetActorDirectorInfo(id){
    actordirectorulr= 'https://api.themoviedb.org/3/person/'+id+'?api_key=77c9133483df2cf7a1eb322d38433453&language=en-US'
    fetch(actordirectorulr)
    .then(function(msg){
        return msg.json();
    })
    
    .then((msg)=>{
        
        ActorDirector(msg)
        
    })
    }
}

function ActorDirector(msg)
{
    var div3 = document.createElement("div");
    var div4= document.createElement("div");
    var image=document.createElement("img");
    var title=document.createElement("h2");
    var question=document.createElement("h4");
    div3.className="container"
    div4.className="container"

    var nametitle = document.createTextNode(msg.name);
    var questiontext = document.createTextNode("Give me a movie");
    question.appendChild(questiontext)
    title.appendChild(nametitle)
    div3.appendChild(title)
    console.log(msg.id)

    
    
    let GetPoster= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${msg.profile_path}`
    image.src=GetPoster
    image.style.width="20%"
    div3.appendChild(image);
    div3.appendChild(question)
    
    var button= document.createElement("button");
    var buttontext = document.createTextNode("submit");
    button.appendChild(buttontext)
    var input=document.createElement("input");
    input.id="answermovie"
    console.log(input)
    div4.appendChild(button)
    div4.appendChild(input)
    div4.style.paddingBottom="30px";
    document.body.appendChild(div3)
    document.body.appendChild(div4)
    console.log(msg)
    button.onclick=function(){SubmitMovie(msg.id)}
    
}
function SubmitMovie(idactor)
{
    var movie=document.getElementById("answermovie").value
    
    
    alert(movie)
    moviecrediturl='https://api.themoviedb.org/3/person/'+idactor+'/movie_credits?api_key=77c9133483df2cf7a1eb322d38433453&language=en-US'
    fetch(moviecrediturl)
    .then(function(msg){
        return msg.json();
    })
    .then((msg)=>{
    if (listmovie.includes(movie.toLowerCase()))
        {
            var input=document.getElementById('answermovie')
            input.value=''
            input.placeholder="you have already use this movie"
        }
    else{
        for( var i=0; i< msg.cast.length;i++)
    {
        console.log(msg.cast[i].title.toLowerCase())
        if (msg.cast[i].title.toLowerCase()==movie.toLowerCase() )
        {
            listmovie.push(movie.toLowerCase())
            
            
            
            console.log('true')
            
            break
        }
    }
        if(i==msg.cast.length)
        {
        console.log("pas trouvé")
        var input=document.getElementById('answermovie')
        input.value=''
        input.placeholder="wrong"
        }
        else{
            console.log('film trouvé')
            
            document.getElementById("answermovie").id = "oldmovie"
            document.getElementById("oldmovie")
            GetMovieInfo(msg.cast[i].id)
        }}
    })
}


function Main(){
    GetMovieInfo(idInit)
}
Main()

