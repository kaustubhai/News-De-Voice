import React from 'react'
import NewsCard from '../newsCard/newsCard'
import {Grid, Grow, Typography} from '@material-ui/core';

const NewsCards = ({articles}) => {
    return (
        <div>
            <Grow in>
                <Grid container alignItems="stretch" spacing={3}>
                    {articles.map((article, i) => (
                        <Grid item s={12} sm={4} lg={3}>
                        <NewsCard articles={articles} i={i}/>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        </div>
    )
}

export default NewsCards
