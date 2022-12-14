import React from 'react';

class Envoyer extends React.Component {
    constructor(props) {
      super(props);
      this.state ={ value: '',
      value2: 0};
       
        
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
    const target = event.target;
    const value = target.type === 'text' ? target.value : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    }
    
  
    handleSubmit(event) {
        const contract = this.state.value;
        const nombre = this.state.value2
        //console.log("contract :", this.state.value, ", nombre : ", this.state.value2)
        this.setState({value: ""});
        this.setState({value2: 0});
        event.preventDefault();
        return (
            this.props.send(contract, nombre)
        );

    }   
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Adresse du destinataire :
            <input name="value" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br></br>
          <label>
            Montant reçu par le destinataire :
            <input name="value2" type="number" value={this.state.value2} onChange={this.handleChange} />
          </label>
          <br></br>
          <input type="submit" value="Envoyer" className='formButton'/>
        </form>
      );
    }
  }
  export default Envoyer;
