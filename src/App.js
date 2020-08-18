import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/newsCards/newsCards'
import './App.css';
import useStyles from './styles';
import {Typography} from '@material-ui/core'

const AlanKey = "738cc0c520d23155366b2e22f0de50362e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {

  const [articles, setArticles] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: AlanKey,
      onCommand: (({ command, articles }) => {
        if(command === 'newsFromSource')
        setArticles(articles)
      })
    })
  }, [])

  return (
    <div className="container">
      <div className={classes.logoContainer}>
        <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={articles}/>
    </div>
  );
}

export default App;
