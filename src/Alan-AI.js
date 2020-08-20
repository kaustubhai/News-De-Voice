intent('what does this app do?', 'how can you help?', 'Give insructions to use?', reply('This is a voice supported News Application specifically for visually impaired'));
intent('hello', reply(`(Hello | Hey there!)`));
intent('How are you', reply('Doing Fine Thank You'));
intent('Who Developed you?', reply('I was developed by Kaustubh'))
intent('What do you do', reply('I give you news you ask for, try saying give me latest news'))
intent('How to use it',  reply('Ask for whatever news you want or refer to the cards on the homepage'))


const API = '7f65b9be314649eebf1dc72b7b94e3d7';
let savedArticles = [];

//news from source
intent('Give me news from $(source* (.*))', (p) => {
    let API_URL_SOURCE = `http://newsapi.org/v2/top-headlines?apiKey=${API}`;
    
    if(p.source.value){
        API_URL_SOURCE = `${API_URL_SOURCE}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`;
    }
    
    //Alan inbuilt API function like axios
    api.request(API_URL_SOURCE, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(articles.length === 0){
            p.play("Sorry, try some different news source");
            return;
        }
    
    savedArticles = articles;
    p.play({command: 'newsFromSource', articles});
    p.play(`Here are some (latest|recent|fresh) news from ${p.source.value}`)
        
    p.play("Would you like me to read the headlines?");
    p.then(confirmation);
        
    })
})

//news about something
intent('What\'s up with $(terms* (.*))', (p) => {
    let API_URL_SOURCE = `http://newsapi.org/v2/everything?apiKey=${API}`;
    
    if(p.terms.value){
        API_URL_SOURCE = `${API_URL_SOURCE}&q=${p.terms.value.toLowerCase().split(" ").join('-')}`;
    }
    
    //Alan inbuilt API function like axios
    api.request(API_URL_SOURCE, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(articles.length === 0){
            p.play("Sorry, try searching for something else");
            return;
        }
    
    savedArticles = articles;
    p.play({command: 'newsFromSource', articles});
    p.play(`Here are some (latest|recent|fresh) news about ${p.terms.value}`)
        
    p.play("Would you like me to read the headlines?");
    p.then(confirmation);
        
    })
})

//news based upon caregories
intent(`Give me (latest|recent) news (about|) $(categories* (.*))`, (p) => {
    let API_URL_SOURCE = `http://newsapi.org/v2/top-headlines?apiKey=${API}`;
    
    if(p.categories.value){
        API_URL_SOURCE = `${API_URL_SOURCE}&q=${p.categories.value.toLowerCase().split(" ").join('-')}`;
    }
    else{
        API_URL_SOURCE = `${API_URL_SOURCE}&country=in`
    }
    
    //Alan inbuilt API function like axios
    api.request(API_URL_SOURCE, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(articles.length === 0){
            p.play('Sorry try searching for something else');
            return;
        }
    
    savedArticles = articles;
    p.play({command: 'newsFromSource', articles});
        
    if(p.categories.value){
        p.play(`Here are some (latest|recent|fresh) news related to ${p.categories.value}`)
    }
    else{
        p.play(`Here are some latest|fresh|recent news`);
    }
        
    p.play("Would you like me to read the headlines?");
    p.then(confirmation);
    })
})

const confirmation = context(() => {
    intent('Yes', async (p) =>{
        for(let i = 0; i < savedArticles.length; i++){
            p.play({command: 'highlight', highlight: savedArticles[i]})
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('No', async (p) =>{
            p.play(`OK! Try asking me to open any article number though`);
    })
})

intent(`open article number $(number* (.*))`, (p) => {
    p.play({command: 'open', open: p.number.value, articles: savedArticles})
})