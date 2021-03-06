import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faWindowMaximize, faThumbtack } from '@fortawesome/free-solid-svg-icons'

export default class TitleBar extends React.Component {
    
    render () {

        let containerStyle = {
            
        }

        containerStyle = { ...containerStyle, ...this.props.style};

        let buttonStyle = {
            'borderRadius': '50%',
            position: 'relative',
            float: 'right',
            top: '5px',
            right: '5px',
            width: '17px',
            height: '17px',
            padding: '2px',
            'marginLeft': '3px'
        }

        let titleStyle = {
            float: 'left',
            'paddingLeft': '10px',
            color: this.props.colours.secondary,
        }

        let iconStyle = {
            'fontSize': '12px',
            'top': '-7px',
            'position': 'relative',
        }

        return (
            <div style={containerStyle}>
                <h5 style={titleStyle}>{this.props.title}</h5>
                <button 
                    className='button_invert'
                    style={buttonStyle}
                    onClick={this.props.removePanel}
                ><FontAwesomeIcon style={iconStyle} icon={faTimes}/></button>
                <button 
                    className='button_invert'
                    style={buttonStyle}
                    onClick={this.props.toggleDraggable}
                ><FontAwesomeIcon style={iconStyle} icon={faThumbtack}/></button>
                <button 
                    className='button_invert'
                    style={buttonStyle}
                    onClick={this.props.toggleMaximize}
                ><FontAwesomeIcon style={iconStyle} icon={faWindowMaximize}/></button>
            </div>
        )
    }
}

