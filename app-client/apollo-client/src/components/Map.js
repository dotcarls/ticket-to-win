import React from 'react'

require('tracking')
require('tracking/build/data/face')

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 640, height: 480 };
        this.tracker = null;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount () {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        //rgb(245, 234, 141)
        //rgb(240, 229, 49)
        //rgb(230, 207, 72)
        //rgb(252, 222, 121)
        //rgb(226, 202, 0)
        //rgb(243, 220, 94)
        //rgb(253, 233, 42)
        window.tracking.ColorTracker.registerColor('yellow', function(r, g, b) {
            if (r > 225 && g > 197 && g < 240 && b < 150) {
                return true;
            }
            return false;
        });
        
        // blue
        // #01A2DC // rgb(1,162,220)
        // #298BBC // rgb(41,139,188)
        // #45899A // rgb(69,137,154)
        // #00AFF9 // rgb(0,175,249)
        // #349FD0 // rgb(52,159,208)
        window.tracking.ColorTracker.registerColor('blue', function(r, g, b) {
            if (r < 75 && g > 130 && g < 180 && b > 150) {
                return true;
            }
            return false;
        });
        
        // green
        // #869E08 // rgb(134,158,8)
        // #A9C825 // rgb(169,200,37)
        // #A1CC00 // rgb(161,204,0)
        // #8DA63D // rgb(141,166,61)
        // #90C800 // rgb(144,200,0)
        window.tracking.ColorTracker.registerColor('green', function(r, g, b) {
            if (r < 175 && r > 120 && g > 150 && b < 70) {
                return true;
            }
            return false;
        });
        
        // red
        // #B8332A // rgb(184,51,42)
        // #D2846B // rgb(210,132,107)
        // #CB1600 // rgb(203,22,0)
        window.tracking.ColorTracker.registerColor('red', function(r, g, b) {
            if (r > 175 && r < 215 && g > 15 && g < 140 && b < 115) {
                return true;
            }
            return false;
        });
        
        // orange
        // #D67F00 // rgb(214,127,0)
        // #DA9448 // rgb(218,148,72)
        // #D7810A // rgb(215,129,10)
        // #F08C00 // rgb(240,140,0)
        window.tracking.ColorTracker.registerColor('orange', function(r, g, b) {
            if (r > 208 && r < 245 && g > 120 && g < 145 && b < 75) {
                return true;
            }
            return false;
        });
        
        window.tracking.ColorTracker.registerColor('white', function(r, g, b) {
            if (r > 210 && g > 210 && b > 210) {
                return true;
            }
            return false;
        });
        
        // pink
        // #BC8EAF // rgb(188,142,175)
        // #9F668E // rgb(159,102,142)
        // #DBACCE // rgb(219,172,206)
        window.tracking.ColorTracker.registerColor('pink', function(r, g, b) {
            if (r > 155 && r < 225 && g > 90 && g < 180 && b > 130 && b < 210 && (Math.abs(r - g) > 30 || Math.abs(r - b) > 30 || Math.abs(g - b) > 30)) {
                return true;
            }
            return false;
        });
        
        window.tracking.ColorTracker.registerColor('grey', function(r, g, b) {
            if (r > 50 && g > 50 && b > 50 && (Math.abs(r - g) < 30 && Math.abs(r - b) < 30 && Math.abs(g - b) < 30)) {
                return true;
            }
            return false;
        });
        
        this.tracker = new window.tracking.ColorTracker(['pink', 'red', 'green', 'orange', 'yellow', 'blue', 'white', 'grey']);

        // this.tracker.setInitialScale(4)
        // this.tracker.setStepSize(2)
        // this.tracker.setEdgesDensity(0.1)
        
        window.tracking.track(this.refs.img, this.tracker);
        // this.tracker.on('track', event => {
        //     let context = this.refs.canvas.getContext('2d');
        //     context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
        //     event.data.forEach(function(rect) {
        //         context.strokeStyle = '#a64ceb'
        //         context.strokeRect(rect.x, rect.y, rect.width, rect.height)
        //         context.font = '11px Helvetica'
        //         context.fillStyle = "#fff"
        //         context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
        //         context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
        //     })
        // })
        
        this.tracker.on('track', event => {
            event.data.forEach(rect => {
                window.plot(rect.x, rect.y, rect.width, rect.height, rect.color);
            });
        });
        
        window.plot = (x, y, w, h, color) => {
            var rect = document.createElement('div');
            this.refs.mapContainer.appendChild(rect);
            rect.classList.add('rect');
            rect.style.border = '2px solid ' + color;
            rect.style.width = w + 'px';
            rect.style.height = h + 'px';
            rect.style.left = (this.refs.img.offsetLeft + x) + 'px';
            rect.style.top = (this.refs.img.offsetTop + y) + 'px';
        };
    }
    updateWindowDimensions() {
        this.setState({ 
            width: window.innerWidth, 
            height: window.innerHeight,
            imgOffsetLeft: this.refs.img.offsetLeft,
            imgOffsetTop: this.refs.img.offsetTop,
        });
        console.log(this.state);
    }
    
    componentWillUnmount () {
        this.tracker.removeAllListeners();
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    render () {
        return (
            <div ref="mapContainer" className="Map">
                <img ref="img" id="img" width="1280" height="800" src="europe.png" />
            </div>
        )
    }
}