import React from 'react';
import TitleBar from './TitleBar.jsx';
import Draggable from 'react-draggable';

import SingleBearing from './DashBoardPanels/SingleBearing.jsx';
import BearingDatabase from './DashBoardPanels/BearingDatabase.jsx';
import UnhealthyBearings from './DashBoardPanels/UnhealthyBearings.jsx';
import BearingCoverage from './DashBoardPanels/BearingCoverage.jsx';
import BearingCount from './DashBoardPanels/BearingCount.jsx';
import AddBearing from './DashBoardPanels/AddBearing.jsx';
import AddSensor from './DashBoardPanels/AddSensor.jsx';

import { Resizable } from 're-resizable';

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        let panelTypes = {
            'Single Bearing': SingleBearing,
            'Bearing Dataset': BearingDatabase,
            'Unhealthy Bearings': UnhealthyBearings,
            'Bearing Coverage': BearingCoverage,
            'Bearing Count': BearingCount,
            'Add Bearing': AddBearing,
            'Add Sensor': AddSensor,
        };

        let style = {
            height: '510px',
            width: '545px'
        };
        let offset = {
            x: 0,
            y: 57,
        };
        let maximized = false;
        let draggable = true;
        if ('config' in this.props) {
            if ('size' in this.props.config) {
                style = this.props.config.size;
            }

            if ('position' in this.props.config) {
                offset = this.props.config.position;
            }

            if ('maximized' in this.props.config) {
                maximized = this.props.config.maximized;
            }

            if ('draggable' in this.props.config) {
                draggable = this.props.config.draggable;
            }  
        }
        this.props.changeFocus(undefined, this.props.id)

        this.state = {
            panelTypes: panelTypes,
            lastState: undefined,
            reset: undefined,
            style: style,
            offset:offset,
            maximized: maximized,
            draggable: draggable
            
        }

        this.removePanel = this.removePanel.bind(this);
        this.toggleDraggable = this.toggleDraggable.bind(this);
        this.toggleMaximize = this.toggleMaximize.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    removePanel() {
        this.props.removePanel(this.props.id);
    }

    toggleDraggable () {
        this.setState({
            draggable: !this.state.draggable
        })
    }

    toggleMaximize () {
        this.setState({
            maximized: !this.state.maximized
        })
        this.toggleDraggable()
    }

    saveState(state) {
        if (!this.state.maximized) {
            this.setState({
                offset: {
                    x: state.lastX,
                    y: state.lastY,
                }
            })
        }
        
    }

    setTitle(title) {
        this.setState({
            panelTitle: title
        })
    }

    render() {

        /*let draggableStyle = {
            backgroundColor: '#f8f9fa'
        }  
        draggableStyle = {
            ...draggableStyle, ...this.state.style
        }*/
        //let draggableStyle = this.state.style;

        let titleStyle = {
            width: '100%',
            height: '30px',
            'backgroundColor': this.props.colours.primary,
        }

        let containerStyle = {
            width: '100%',
            height: '100%',
            border: '4px solid ' + this.props.colours.primary
        }
        const Content = this.state.panelTypes[this.props.config.type];
        
        let size;
        let position;
        let resizePermissions = undefined;
        if (this.state.maximized) {
            size = {
                height: 'calc(100% - 57px)',
                width: '100%',
            }
            position = {
                x: 0,
                y: 57,
            }
            resizePermissions = { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }
        } else {
            size = { width: this.state.style.width, height: this.state.style.height }
            position = this.state.offset
        }

        let test_style = undefined;
        if (this.props.id !== this.props.focus) {
            test_style = { backgroundColor: '#f8f9fa'}
        } else {
            test_style = {backgroundColor: '#f8f9fa', 'zIndex': '1'}
        }
        
        return (

            <Draggable 
                onDrag={(e) => this.props.changeFocus(e, this.props.id)}
                onStop={(e, draggable) => this.saveState(draggable)}
                grid={[5,5]}
                bounds={{top: 56}}
                disabled={!this.state.draggable}
                position={position}
            >
                <Resizable
                    enable={resizePermissions}
                    
                    size={size}
                    grid={[5,5]}
                    onResizeStart={(e) => {e.stopPropagation(); this.props.changeFocus(undefined, this.props.id)}}
                    onResizeStop={(e, direction, ref, d) => {
                        e.stopPropagation();
                        if (direction === 'topLeft' || direction === 'topRight') {
                        }
                        this.setState({
                            offset: {
                                x: this.state.offset.x,// - d.width,
                                y: this.state.offset.y// - d.height,
                            },
                            style: {
                                width: this.state.style.width + d.width,
                                height: this.state.style.height + d.height,
                            }
                        });
                    }}
                    style={test_style}
                >
                <div style={containerStyle} className='panelContainer' onClick={(e) => this.props.changeFocus(e, this.props.id)}>
                    <TitleBar 
                        style={titleStyle}
                        colours={this.props.colours}
                        removePanel={this.removePanel}
                        toggleDraggable={this.toggleDraggable}
                        toggleMaximize={this.toggleMaximize}
                        title={this.state.panelTitle}
                    ></TitleBar>
                    <Content
                        style={{width: '100%', height: 'calc(100% - 30px)'}}
                        onClick={(e) => e.stopPropagation()}
                        config={this.props.config.config}
                        setTitle={this.setTitle}
                        addPanel={this.props.addPanel}
                        colours={this.props.colours}
                        organization={this.props.organization}
                    >
                    </Content>
                </div>
                </Resizable>

            </Draggable >
            
        )
    }
}
