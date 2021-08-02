import React from 'react';

class DogDocs extends React.Component {
  constructor() {
    super();

    this.state = {
      nowDog: undefined,
      loading: true,
    }

    this.giveMore = this.giveMore.bind(this);
  }

  async fetchDog () {
    this.setState(
      { loading: true },
      async () => {
        const url = 'https://dog.ceo/api/breeds/image/random'
        const request = await fetch(url);
        const dogRequest = await request.json();
        this.setState({
          nowDog: dogRequest.message,
          loading: false,
        });
      })
  }
  
  componentDidMount() {
      this.fetchDog();
  }

  giveMore () {
    this.setState(({ loading }) => ({
      loading: false,
    }));

    this.fetchDog();
  }

  render () {
    const { nowDog, loading } = this.state;
    const loadingElement = <span>Loading . . . </span>;
    const dogsImage = <img src={nowDog} alt='randon dog'/>;

    return (
      <div>
        <button onClick={this.giveMore}>
          Give me more
        </button>
        <h1>{loading ? loadingElement : dogsImage }</h1>
      </div>
    );
  }
}

export default DogDocs;
