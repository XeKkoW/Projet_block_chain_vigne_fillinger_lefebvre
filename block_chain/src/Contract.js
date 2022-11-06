import React from 'react';

class ContractAddress extends React.Component {
    constructor(props) {
      super(props);
      this.state ={ value: ''};
        
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        const valeur = this.state.value;
        this.setState({value: ""});
        event.preventDefault();
        return (
            this.props.newContract(valeur)
        );

    }   
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Numéro d'adresse de contrat : 
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br></br>
          <input type="submit" value="Appliquer" />
          <br></br>
        </form>
      );
    }
  }
  export default ContractAddress;
