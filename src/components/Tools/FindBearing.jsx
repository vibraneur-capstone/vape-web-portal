import React from 'react';
import SearchFilter from './SearchFilter';
import { Button } from 'react-bootstrap';

export default class FindBearing extends React.Component {

    results (results) {
        return <div>
            {results.map(el => (
                <Button
                    onClick={() => this.props.setBearing(el.id)}
                    className='searchCol'
                >
                    <span>{el.tags.name}</span>
                    
                </Button>
            ))}
        </div> 
    }

    render () {
        return (
            <div>
                <SearchFilter
                    renderResults={this.results}
                    setBearing={this.props.changeBearing}
                    dataSource='https://sensor.vibraneur.com/inventory/v1/husky/bearings?status=ALL'
                ></SearchFilter>
            </div>
        )
    }
}