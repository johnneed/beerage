// @flow
import React from 'react';
import './styles.css';
import Card from '../card';
import BeerMap from '../beer-map';

type Props = { beer: Object };


const BeerDetails = ({beer}: Props): React.Component => {

    return (
        <article className={'beer-details'}>
            <Card>
                <div className={'beer-details--name'}> {beer.beer_name}</div>
                <div className={'beer-details--description'}>{beer.beer_description}</div>
                <div className={'beer-details--label'}><img alt={'label'} src={beer.beer_label}/></div>
            </Card>
            <Card>
                <div className={'beer-details--detail'}><span>{'ABV: '}</span>{beer.beer_abv}</div>
                <div className={'beer-details--detail'}><span>{'IBU: '}</span>{beer.beer_ibu}</div>
                <div className={'beer-details--detail'}><span>{'Style: '}</span>{beer.beer_style}</div>
                <div className={'beer-details--detail'}><span>{'Rating: '}</span>{beer.rating_score}</div>
            </Card>
            <Card>
                <div className={'beer-details--name'}> {beer.brewery.brewery_name}</div>
                <div
                    className={'beer-details--detail'}>{beer.brewery.location.brewery_city}{', '}{beer.brewery.location.brewery_state}</div>
                <BeerMap breweries={[beer.brewery]} location={beer.brewery.location}/>
            </Card>
        </article>
    );
}


export default BeerDetails;