import React, {useState, useEffect} from 'react';
import './index.css';

const Players = () => {
    const [players, setPlayers] = useState("");

    useEffect(() => {
        fetch("https://api.npoint.io/20c1afef1661881ddc9c", {method:'GET'})
        .then(res => res.json())
        .then(data => {
            setPlayers(data.playerList)
        })
    }, []);


    const renderDate = (dateData) => {
        let date_arr = dateData.split(" ");
        console.log(date_arr)
        let date = new Date(dateData);
        if(date_arr[0] !== ""){
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date_arr[2]}`
        }
    }

    const renderPlayers = (playersData) => {
        if(playersData) {
            if(playersData.length > 0){
                let sortedData = playersData.sort((a, b) => {
                return a.Value - b.Value
                })

                return sortedData.map(player => {
                    return (
                        <div className="card" key={player.Id}>
                            <div className="img-container">
                                <center>
                                    <img className="img" src={`/player-images/${player.Id}.jpg`}></img>
                                </center>
                            </div>
                            
                            <div className="info">
                                <center>
                                    <h3>{player.PFName}</h3>
                                    <h4>({player.SkillDesc})</h4>
                                </center>
                                <h4><b>Value: </b> $ {player.Value}</h4>
                                <h4><b>Upcoming Match: </b>{player.UpComingMatchesList[0].CCode || "N/A"} vs {player.UpComingMatchesList[0].VsCCode || "N/A"}</h4>
                                <h4><b>Match Time: </b>{renderDate(player.UpComingMatchesList[0].MDate) || "N/A"}</h4>

                            </div>
                        </div>
                    )
                })
            }else {
                return (
                    <center>
                        <h2 style={{color:"red"}}>No Data Found</h2>
                    </center>
                )
            }
        }else{
            return (
                <div>
                    <center>
                        <img src="/images/loader.gif" alt="nodata"></img>
                    </center>
                </div>
            );
        }
    }

    const renderSearch = (e) => {
        e.preventDefault();
        let searchValue = document.querySelector("#searchBar").value.toLowerCase().trim();
        
        let filteredPlayers = players.filter(player => {
            return (player.PFName.toLowerCase() === searchValue || player.TName.toLowerCase() === searchValue)
        })
        
        setPlayers(filteredPlayers);
    }


    return (
        <div style={{margin:"auto", overflowX:"hidden"}}>

            <div className="row search">
                <div className="col-md-5">
                    <input className="form-control" id="searchBar" type="text"></input>
                </div>
                <button className='btn btn-warning' onClick={renderSearch}>
                    <i className="fa fa-search"></i>
                </button>
            </div>

            <hr/>

            <center className="text-info">
                <h2>
                    Players Information
                </h2>
            </center>

            <div className="row player-container">
                {
                    renderPlayers(players)
                }
            </div>
        </div>
    )
}


export default Players;