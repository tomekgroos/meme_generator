import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor(props){
        super(props);

        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

      
    }
        componentDidMount () {
            fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs: memes})
            })
        }

        generateImage = (e) => {
            e.preventDefault()
            const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
            const randMemeImg = this.state.allMemeImgs[randNum].url
            this.setState({randomImage: randMemeImg})
        }

        onHandleChange = (e) => {

            let value = e.target.value;
            let name = e.target.name;

           this.setState({[name]: value})

        }

    render () {
        return (
            <div>
                <form className="meme-form" onSubmit={this.generateImage}>

                    <input 
                    type="text"
                    name="topText"
                    placeholder="Top Text" 
                    value={this.state.topText}
                    onChange={this.onHandleChange}
                     />

                      <input
                      type="text" 
                      name="bottomText"
                      placeholder="Bottom Text"
                      value={this.state.bottomText}
                      onChange={this.onHandleChange} 
                     />

                    <button>Generate</button>

                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="some meme"/>
                     <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
           

        )
    }
}



export default MemeGenerator;

