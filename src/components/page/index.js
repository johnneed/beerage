// @flow
import React, {Component} from 'react';
import './styles.css';

const toggleFlyout = Symbol('@@TOGGLE_FLYOUT');

/**
 * Opens or closes detail panel
 * @param {boolean} open - panel is open
 * @returns {void}
 * @private
 */
function _toggleFlyout(open: ?boolean): void {
    this.setState({isOpen: Boolean(open)});
}

type Props = {
    children: any, // lazy
    data: Array,
    onRowSelect?: any => any,
    onSearch: (data: any, query: ?string) => Object,
    RowTemplate: React.Component,
    toolbar?: React.Component,
    headerContent: React.Component
};

type State = { isOpen: boolean };

class Page extends Component<Props, State> {

    constructor(props) {
        super(props);
        this[toggleFlyout] = _toggleFlyout.bind(this);
        this.state = {isOpen: false};
    }

    render() {
        const {data, onRowSelect, RowTemplate} = this.props;
        const {isOpen} = this.state;
        const rows = (data || []).map(datum => (
            <div
                className={'page--row'}
                key={datum.id || datum.uid}
                onClick={() => {
                    if (Boolean(onRowSelect)) {
                        onRowSelect(datum.id || datum.uid);
                    }
                    this[toggleFlyout](true);
                }}
                onKeyDown={(event) => {
                    if (event.code === 13) {
                        if (Boolean(onRowSelect)) {
                            onRowSelect(datum.id || datum.uid);
                        }
                        this[toggleFlyout](true);
                    }
                }}
                role={'button'}
                tabIndex={0}
            >
                <RowTemplate {...datum}/>
            </div>
        ));

        return (

            <article className='page'>
                <div className='page--summaries'>
                    <div className={'page--summaries-wrapper'}>
                        <div className={'page--rows'}>
                            {rows}
                        </div>
                    </div>
                </div>
                <div className={`page--detail${isOpen ? ' is-visible' : ''}`}>
                    <div className={'page--detail-header'}>
                        <button
                            className={'page--close-detail'}
                            onClick={() => this[toggleFlyout](false)}
                            title={'Close'}
                        >
                            <i className={'mdi mdi-close-circle-outline'}/>
                        </button>
                    </div>
                    <div className={'page--scroll-area'}
                         id='targetElementId'>
                        {this.props.children}
                    </div>
                </div>
            </article>
        );
    }
}


export default Page;