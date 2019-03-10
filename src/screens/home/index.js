// @flow
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as homeActions from './actions';
import Layout from '../../components/layout';
import React, {Component, Fragment} from 'react';
import {curry} from 'ramda';
import './styles.css';
import {Link} from 'react-router-dom';
import Page from '../../components/page';
import {search} from '../../libs/utilities';
import queryString from 'query-string';
import BeerDetails from '../../components/beer-details';
import SearchBar from '../../components/search-bar';
import Spinner from '../../components/spinner';
import SortBar from '../../components/sort-bar';

const handleCurrentChange = Symbol('@@HANDLE_CURRENT_CHANGE');
const handleStateChange = Symbol('@@HANDLE_STATE_CHANGE');

type RProps = { id: string, beer_name: string, beer_abv: string, beer_label: string, brewery: Object };

const RowTemplate = ({bid, beer_name, beer_label, beer_ibu, beer_abv, brewery}: RProps): React.Component => (
    <Link className={'home--row'}
          tabIndex={0}
          to={`/beers/${bid}${window.location.search}`}
    >
        <span className={'home--row-wrapper'}>
            <span className='home--beer-label'><img src={brewery.brewery_label} alt={brewery.name}/></span>
            <span className='home--beer-name'>{beer_name}</span>
            <span className='home--beer-brewer'>{brewery.name}</span>
            <span className='home--beer-detail'><span>AVB </span>{beer_abv}</span>
            <span className='home--beer-detail'><span>IBU </span>{beer_ibu}</span>
        </span>
    </Link>
);


/**
 *
 * @param {string} key - state key
 * @param {object} value - value
 * @returns {void}
 * @private
 */
function _handleStateChange(key: string, value: string): void {
    this.setState({[key]: value});
}

/**
 *
 * @param {string} key - state key
 * @param {object} value - value
 * @returns {void}
 * @private
 */
function _handleCurrentChange(key: string, value: string): void {
    this.setState({current: {...this.state.current, [key]: value}});
}

const sortBeers = (beers: Array<{beer_name: string, brewery: {brewery_name: string}}>, field: string, direction:string): Array<Object> => {
    const dir = direction === 'desc' ? 1 : -1;
    switch (field) {
        case 'beer' :
            return beers.sort((a, b) => a.beer_name.toLowerCase() < b.beer_name.toLowerCase() ? dir : dir * -1);
        default:
            return beers.sort((a, b) => a.brewery.brewery_name.toLowerCase() < b.brewery.brewery_name.toLowerCase() ? dir : dir * -1);
    }
};

type Props = {
    actions: Object,
    beerDetails: Array<Object>,
    beerList: Array<Object>,
    bid: ?string,
    error: ?string,
    match: Object
};

class Home extends Component<Props> {

    static getDerivedStateFromProps(nextProps) {
        const bid = nextProps.match.params.bid;
        if (bid && !nextProps.beerDetails[bid]) {
            nextProps.actions.fetchBeer(bid);
        }
        return {};
    }

    constructor(props) {
        super(props);
        this[handleStateChange] = curry(_handleStateChange.bind(this));
        this[handleCurrentChange] = curry(_handleCurrentChange.bind(this));
        this.state = {};
    }


    render() {
        const headerContent = (<SearchBar/>);
        const footerContent = (<SortBar/>);
        const {beerList, beerDetails, match} = this.props;
        const q = queryString.parse(window.location.search);
        const selectedBeer = (beerList.find(beer => beer.bid.toString() === match.params.bid) || {}).beer_name || '';
        const direction = queryString.parse(window.location.search).direction || 'asc';
        const sortField = queryString.parse(window.location.search).sortField || 'brewery';
        const filteredBeers = Boolean(q.search) ? search(beerList, q.search) : beerList;
        const sortedBeers = sortBeers(filteredBeers, sortField, direction);
        return (
            <Layout footer={footerContent} header={headerContent}>
                <Page RowTemplate={RowTemplate}
                      data={sortedBeers}
                      headerContent={headerContent}
                      pagination={false}
                      toolbar={(<SearchBar/>)}
                >

                    {match.params.bid && beerDetails[match.params.bid]
                        ? <BeerDetails beer={beerDetails[match.params.bid]}/>
                        : <Spinner
                            message={(<Fragment><span>{'Loading'}</span><br/><span>{selectedBeer}</span></Fragment>)}/>
                    }
                </Page>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => ({beerList: state.initialize.beerList, beerDetails: state.home.beerDetails});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(homeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);