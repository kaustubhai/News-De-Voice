import React from "react";
import { Card, CardActions, CardActionArea, CardMedia, CardContent, Button, Typography } from '@material-ui/core'
import useStyles from './styles';

const NewsCard = ({ article, i }) => {

  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardActionArea>
          <div>
            <Typography compnent="h2" variant="body2">{new Date(article.publishedAt).toDateString()}</Typography>
            <Typography compnent="h2" variant="body2">{article.source.name}</Typography>
          </div>
        <CardMedia className={classes.image} image={article.urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}></CardMedia>
        <CardContent>
          <Typography variant="h6" component="h1">{article.title}</Typography>
          <Typography variant="body2" component="p" color="textSecondary">{article.description}</Typography>
          </CardContent>
          </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">Learn More</Button>
          <Typography variant="h6" component="h6" color="textSecondary">{i + 1}</Typography>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewsCard;
