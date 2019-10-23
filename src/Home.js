import React from 'react'

class Home extends React.Component {
    render() {
        return (
        <div className="wrapper">
            <div className="table-button">
                <a href="">
                    <div className="table-container">
                        <div className="table-content"><img src={require('../src/assets/record.svg')}/></div>
                        <div className="table-content">Record Stock</div>
                    </div>
                </a>
            </div>
            <div className="table-button">
                <a href="">
                    <div className="table-container">
                        <div className="table-content"><img src={require('../src/assets/analysis.svg')}/></div>
                        <div className="table-content">Stock Analysis</div>
                    </div>
                </a>
            </div>
            <div className="table-button">
                <a href="">
                    <div className="table-container">
                        <div className="table-content"><img src={require('../src/assets/settings.svg')}/></div>
                        <div className="table-content">Settings</div>
                    </div>
                </a>
            </div>
        </div>
        )
    }
}
export default Home