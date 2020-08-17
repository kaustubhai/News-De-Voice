import React from 'react'
import NewsCard from '../newsCard/newsCard'
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from './styles'

const NewsCards = ({ articles }) => {
    const classes = useStyles();

    return (
        <div>
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {articles.map((article, i) => (
                        <Grid item s={12} sm={6} lg={4}>
                        <NewsCard article={article} i={i}/>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        </div>
    )
}

export default NewsCards
