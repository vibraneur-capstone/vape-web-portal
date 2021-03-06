import React from 'react';

export default class Button extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            buttonState: 'normal'
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    mouseEnter() {
        this.setState({
            buttonState: 'hover'
        })
    }

    mouseLeave() {
        this.setState({
            buttonState: 'normal'
        })
    }

    onClick() {
        this.setState({
            buttonState: 'active'
        })
    }

    render () {

        let colourStyle;
        
        switch (this.state.buttonState) {
            case 'active':
                colourStyle = {
                    'backgroundColor': this.props.colours.primary,
                    'color': this.props.colours.secondary,
                    'border': '1px solid ' + this.props.colours.primary,
                }
                break;

            case 'hover':
                colourStyle = {
                    'backgroundColor': this.props.colours.secondary,
                    'color': this.props.colours.primary,
                    'border': '1px solid ' + this.props.colours.primary,
                }
                break;

            case 'normal':
                colourStyle = {
                    'backgroundColor': this.props.colours.primary,
                    'color': this.props.colours.secondary,
                    'border': '1px solid ' + this.props.colours.primary,
                }
                break;
        }
        
        let style;
        if (this.props.style !== undefined) {
            style = { ...this.props.style, ...colourStyle};
        } else {
            style = {
                'padding': '5px',
                'borderRadius': '5px'
            }
            style = { ...style, ...colourStyle};
        }
        

        return (
            <button
            //className='button'
            className={this.props.classes}
            style={style}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            onClick={this.props.onClick}
            >
                {this.props.contents}
            </button>
        )
    }
}